package main

import (
	"backend/database"
	"backend/routes"
	"backend/twelvedata"
	"backend/utils"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/robfig/cron/v3"
	"github.com/supertokens/supertokens-golang/ingredients/emaildelivery"
	"github.com/supertokens/supertokens-golang/recipe/dashboard"
	"github.com/supertokens/supertokens-golang/recipe/emailpassword"
	"github.com/supertokens/supertokens-golang/recipe/emailpassword/epmodels"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty/tpmodels"
	"github.com/supertokens/supertokens-golang/recipe/usermetadata"
	"github.com/supertokens/supertokens-golang/supertokens"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	err = supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: "http://supertokens:3567",
			APIKey:        os.Getenv("SUPERTOKENS_API_KEY"),
		},
		AppInfo: supertokens.AppInfo{
			AppName:       "CryptIQ",
			APIDomain:     os.Getenv("BACKEND_URL"),
			WebsiteDomain: os.Getenv("FRONTEND_URL"),
		},
		RecipeList: []supertokens.Recipe{
			dashboard.Init(nil),
			usermetadata.Init(nil),
			emailpassword.Init(&epmodels.TypeInput{
				Override: &epmodels.OverrideStruct{
					APIs: func(originalImplementation epmodels.APIInterface) epmodels.APIInterface {
						originalSignUpPOST := *originalImplementation.SignUpPOST

						*originalImplementation.SignUpPOST = func(formFields []epmodels.TypeFormField, tenantId string, options epmodels.APIOptions, userContext supertokens.UserContext) (epmodels.SignUpPOSTResponse, error) {
							resp, err := originalSignUpPOST(formFields, tenantId, options, userContext)
							if err != nil {
								return epmodels.SignUpPOSTResponse{}, err
							}

							if resp.OK != nil {
								_, err = usermetadata.UpdateUserMetadata(resp.OK.User.ID, map[string]interface{}{
									"name": formFields[0].Value,
								})
								if err != nil {
									return epmodels.SignUpPOSTResponse{}, err
								}
							}

							return resp, err
						}

						return originalImplementation
					},
				},
				SignUpFeature: &epmodels.TypeInputSignUp{
					FormFields: []epmodels.TypeInputFormField{
						{
							ID: "name",
						},
					},
				},
				EmailDelivery: &emaildelivery.TypeInput{
					Override: func(originalImplementation emaildelivery.EmailDeliveryInterface) emaildelivery.EmailDeliveryInterface {
						originalSendEmail := *originalImplementation.SendEmail

						*originalImplementation.SendEmail = func(input emaildelivery.EmailType, userContext supertokens.UserContext) error {
							if input.PasswordReset != nil {
								metadata, err := usermetadata.GetUserMetadata(input.PasswordReset.User.ID)

								resetURL := strings.Replace(
									input.PasswordReset.PasswordResetLink,
									fmt.Sprintf("%s/auth/reset-password", os.Getenv("FRONTEND_URL")),
									fmt.Sprintf("%s/reset-password", os.Getenv("FRONTEND_URL")), 1,
								)
								userEmail := input.PasswordReset.User.Email
								name := metadata["name"].(string)

								var buf bytes.Buffer
								tmpl, err := template.ParseFiles("template/reset.html")
								if err != nil {
									fmt.Println("Error parsing template: ", err)
								}

								type ResetPasswordEmail struct {
									Name      string
									ActionURL string
								}

								tmplData := ResetPasswordEmail{
									Name:      name,
									ActionURL: resetURL,
								}

								err = tmpl.Execute(&buf, tmplData)
								if err != nil {
									fmt.Println("Error executing template: ", err)
								}

								payload := map[string]interface{}{
									"app_id":          os.Getenv("ONESIGNAL_APP_ID"),
									"email_to":        []string{userEmail},
									"email_subject":   "Reset your password",
									"email_preheader": "Use this link to reset your password.",
									"email_body":      buf.String(),
								}

								jsonPayload, err := json.Marshal(payload)
								if err != nil {
									return err
								}

								headers := map[string]string{
									"accept":        "application/json",
									"Authorization": fmt.Sprintf("Key %s", os.Getenv("ONESIGNAL_API_KEY")),
									"content-type":  "application/json",
								}

								resp, err := utils.Post("https://api.onesignal.com/notifications?c=email", headers, jsonPayload)
								if err != nil {
									fmt.Println("Error: ", err)
								}

								defer func(Body io.ReadCloser) {
									err := Body.Close()
									if err != nil {
										fmt.Println("Error closing response body: ", err)
									}
								}(resp.Body)

								return nil
							}

							return originalSendEmail(input, userContext)
						}
						return originalImplementation
					},
				},
			}),
			thirdparty.Init(&tpmodels.TypeInput{
				SignInAndUpFeature: tpmodels.TypeInputSignInAndUp{
					Providers: []tpmodels.ProviderInput{
						{
							Config: tpmodels.ProviderConfig{
								ThirdPartyId: "google",
								Clients: []tpmodels.ProviderClientConfig{
									{
										ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
										ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
									},
								},
							},
						},
					},
				},
				Override: &tpmodels.OverrideStruct{
					Functions: func(originalImplementation tpmodels.RecipeInterface) tpmodels.RecipeInterface {
						originalSignInUp := *originalImplementation.SignInUp

						*originalImplementation.SignInUp = func(thirdPartyID string, thirdPartyUserID string, email string, oAuthTokens map[string]interface{}, rawUserInfoFromProvider tpmodels.TypeRawUserInfoFromProvider, tenantId string, userContext *map[string]interface{}) (tpmodels.SignInUpResponse, error) {
							resp, err := originalSignInUp(thirdPartyID, thirdPartyUserID, email, oAuthTokens, rawUserInfoFromProvider, tenantId, userContext)
							if err != nil {
								return tpmodels.SignInUpResponse{}, err
							}

							if resp.OK != nil {
								// For some weird reason Google sometimes doesn't return the name of the user?
								var name string
								if rawUserInfoFromProvider.FromUserInfoAPI["name"] == nil {
									if rawUserInfoFromProvider.FromUserInfoAPI["email"] != nil {
										name = rawUserInfoFromProvider.FromUserInfoAPI["email"].(string)
									} else {
										name = "Anonymous"
									}
								} else {
									name = rawUserInfoFromProvider.FromUserInfoAPI["name"].(string)
								}

								metadata, err := usermetadata.GetUserMetadata(resp.OK.User.ID)
								if metadata["name"] != nil {
									name = metadata["name"].(string)
								}

								_, err = usermetadata.UpdateUserMetadata(resp.OK.User.ID, map[string]interface{}{
									"name": strings.Fields(name)[0],
								})

								if err != nil {
									return tpmodels.SignInUpResponse{}, err
								}
							}

							return resp, err
						}

						return originalImplementation
					},
				},
			}),
			session.Init(nil),
		},
	})

	if err != nil {
		fmt.Println("Error initializing supertokens: ", err)
	}

	r := chi.NewRouter()

	// CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{os.Getenv("FRONTEND_URL")},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: append([]string{"Content-Type"},
			supertokens.GetAllCORSHeaders()...),
		AllowCredentials: true,
	}))

	r.Use(supertokens.Middleware)

	fmt.Println("running server")

	utils.SetupAdminUser()
	database.Init()
	twelvedata.Init()
	go routes.Init()
	go routes.BinanceInit()

	r.Get("/name", session.VerifySession(nil, routes.GetName))
	r.Post("/name", session.VerifySession(nil, routes.ChangeNameAPI))

	r.Get("/balance", session.VerifySession(nil, routes.GetBalance))

	r.Get("/portfolio", session.VerifySession(nil, routes.GetPortfolio))
	r.Get("/portfolio/historic", session.VerifySession(nil, routes.GetHistoricNetworth))
	r.Get("/portfolio/spy-xau", session.VerifySession(nil, routes.GetXAUSPYPortfolio))

	r.Get("/transactions", session.VerifySession(nil, routes.GetTransactions))
	r.Post("/transactions", session.VerifySession(nil, routes.AddTransaction))

	r.Get("/leaderboard", routes.GetTop10Networth)
	r.Get("/leaderboard/me", session.VerifySession(nil, routes.GetUserNetworth))

	r.Get("/news", routes.GetTop15News)

	r.Get("/crypto/priceChange", routes.GetPriceChangePercent)
	r.Get("/crypto/{coin}", routes.CryptoWebsocket)
	r.Get("/crypto/historic/{coin}/{time}", routes.GetHistoricData)

	r.Post("/contact", routes.AddContactForm)
	r.Post("/new_password", session.VerifySession(nil, routes.ChangePasswordAPI))

	r.Get("/healthcheck", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, err := w.Write([]byte("OK"))

		if err != nil {
			fmt.Println("error writing response: ", err)
			return
		}
	})

	c := cron.New()

	_, err = c.AddFunc("0,30 * * * *", func() {
		fmt.Println("Running procedure to capture net worth snapshot...")

		err := callCaptureNetworthSnapshot(database.Pool)
		if err != nil {
			fmt.Println("Error calling procedure:", err)
		} else {
			fmt.Println("Procedure executed successfully")
		}
	})
	if err != nil {
		log.Fatal(err)
	}

	c.Start()

	err = http.ListenAndServe("0.0.0.0:3000", r)
	if err != nil {
		fmt.Println("Error starting server: ", err)
	}
}

func callCaptureNetworthSnapshot(db *pgxpool.Pool) error {
	_, err := db.Exec(context.Background(), "CALL capture_networth_snapshot();")
	if err != nil {
		return fmt.Errorf("failed to execute procedure: %v", err)
	}
	return nil
}
