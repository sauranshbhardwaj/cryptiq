import { useDarkMode } from "usehooks-ts";
import SignInGoogle from "../components/SignInGoogle.jsx";
import Divider from "../components/Divider.jsx";
import styles from "./css/Login.module.css";
import { useEffect, useState } from "react";

import { signUp, signIn } from "supertokens-web-js/recipe/emailpassword";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import { Helmet } from "react-helmet";

async function submitClicked(name, email, password, isSignup) {
  try {
    let response;
    if (isSignup) {
      response = await signUp({
        formFields: [
          {
            id: "name",
            value: name,
          },
          {
            id: "email",
            value: email,
          },
          {
            id: "password",
            value: password,
          },
        ],
      });
    } else {
      response = await signIn({
        formFields: [
          {
            id: "email",
            value: email,
          },
          {
            id: "password",
            value: password,
          },
        ],
      });
    }

    if (response.status === "FIELD_ERROR") {
      response.formFields.forEach((formField) => {
        toast.error(formField.error);
      });
    } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
      toast.error("Email password combination is incorrect.");
    } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
      toast.error(response.reason);
    } else {
      window.location.href = "/dashboard";
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      toast.error(err.message);
    }
  }
}

function LoginSignup({ isSignup }) {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && auth.isLoggedIn) {
      window.location.href = "/dashboard";
    }
  }, [auth.isLoading]);

  const { isDarkMode } = useDarkMode();

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleSubmit = async () => {
    await submitClicked(nameValue, emailValue, passwordValue, isSignup);
  };

  return (
    <>
      <Helmet>
        <title>CryptIQ | {isSignup ? "Signup" : "Login"}</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.container__left}>
          <img
            src="logo/Black_BG.png"
            alt="logo"
            className={styles.container__logo}
            onClick={() => {
              window.location.href = "/";
            }}
          />
          <div>
            <p className={styles.container__title}>Welcome Back</p>
            <p className={styles.container__subtitle}>
              Continue with Google or enter your details
            </p>

            <SignInGoogle
              text={isSignup ? "Sign up with Google" : "Log in with Google"}
            />

            <Divider text="or" />

            <div className={styles.login__container}>
              {isSignup ? (
                <div className="relative">
                  <input
                    type="text"
                    className={styles.login__input}
                    placeholder="Name"
                    value={nameValue}
                    onChange={handleNameChange}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="relative">
                <input
                  type="email"
                  className={styles.login__input}
                  placeholder="Email"
                  value={emailValue}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  className={styles.login__input}
                  placeholder="Password"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            {isSignup ? (
              <></>
            ) : (
              <div className={styles.remember__container}>
                <div className="flex">
                  <input
                    type="checkbox"
                    className={styles.remember__checkbox}
                    id="remember"
                  />
                  <label
                    htmlFor="remember"
                    className={styles.remember__checkboxLabel}
                  >
                    Remember Me
                  </label>
                </div>
                <a className={styles.login__forgot} href="/reset-password">
                  Forgot Password
                </a>
              </div>
            )}
            <button
              type="button"
              className={styles.login__button}
              onClick={async () => {
                await handleSubmit();
              }}
            >
              {isSignup ? "Sign up" : "Log in"}
            </button>
            <p className={styles.login__signupCta}>
              {isSignup ? (
                <>
                  Already have an account?&nbsp;
                  <a href="/login">
                    <b>Log in</b>
                  </a>
                </>
              ) : (
                <>
                  Don&#39;t have an account?&nbsp;
                  <a href="/signup">
                    <b>Sign up for free</b>
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
        <div
          className={styles.container__right}
          style={{
            backgroundImage: `url('background/sand_light.webp')`,
          }}
        >
          <img
            src="logo/White_BG.png"
            alt="logo"
            className="h-24 w-auto"
          />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default LoginSignup;
