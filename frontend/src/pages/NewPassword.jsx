import { useDarkMode } from "usehooks-ts";
import styles from "./css/Login.module.css";
import { useState } from "react";

import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import { toast, Toaster } from "react-hot-toast";

async function forgotPassword(password) {
  try {
    const response = await EmailPassword.submitNewPassword({
      formFields: [
        {
          id: "password",
          value: password,
        },
      ],
    });

    if (response.status === "FIELD_ERROR") {
      toast.error(response.formFields[0].error);
    } else if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
      toast.error(
        "Password reset token has expired, please go back to the sign in page",
      );
    }

    toast.success("Password reset successfully.");
    setTimeout(() => {
      window.location.assign("/login");
    }, 2000);
  } catch (e) {
    toast.error("An error occurred while resetting the password.");
  }
}

function NewPassword() {
  const { isDarkMode } = useDarkMode();
  const [passwordValue, setPasswordValue] = useState("");

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleSubmit = async () => {
    await forgotPassword(passwordValue);
  };

  return (
    <>
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
          <div className={styles.forgot__container}>
            <p
              className={styles.container__title}
              style={{ marginBottom: "16px" }}
            >
              Set new Password
            </p>

            <div className={styles.login__container}>
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
            <button
              type="button"
              className={styles.login__button}
              onClick={async () => {
                await handleSubmit();
              }}
            >
              Set Password
            </button>
            <p className={styles.login__signupCta}>
              Already have an account?&nbsp;
              <a href="/login">
                <b>Log in</b>
              </a>
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

export default NewPassword;
