import { signInAndUp } from "supertokens-web-js/recipe/thirdparty";
import { useEffect, useState } from "react";

export default function Google() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function handleGoogleCallback() {
      try {
        const response = await signInAndUp();

        if (response.status === "OK") {
          window.location.assign("/");
        } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
          setMessage(response.reason);
        } else {
          setMessage(
            "No email provided by social login. Please use another form of login",
          );
          setTimeout(() => {
            window.location.assign("/login");
          }, 3000);
        }
      } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
          setMessage(err.message);
        }
      }
    }

    handleGoogleCallback();
  }, []);

  return <>Redirecting... {message}</>;
}
