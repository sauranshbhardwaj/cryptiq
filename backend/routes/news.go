package routes

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
)

func GetTop15News(w http.ResponseWriter, r *http.Request) {
	news, err := fetchCoinDeskNews()

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(news)
	if err != nil {
		fmt.Println("failed to encode news: ", err)
		return
	}
}

func fetchCoinDeskNews() (map[string]interface{}, error) {
	url := "https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=15"

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	req.Header.Set("Authorization", fmt.Sprintf("Apikey %s", os.Getenv("COINDESK_API_KEY")))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making request: %w", err)
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println("Error closing response body: ", err)
		}
	}(resp.Body)

	if resp.StatusCode != http.StatusOK {
		body, _ := ioutil.ReadAll(resp.Body)
		return nil, fmt.Errorf("non-200 status code: %d - %s", resp.StatusCode, string(body))
	}

	var result map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return nil, fmt.Errorf("error decoding JSON: %w", err)
	}

	return result, nil
}
