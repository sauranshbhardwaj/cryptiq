import { useDarkMode } from "usehooks-ts";
import styles from "./css/Login.module.css";
import { useState } from "react";

import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import { toast, Toaster } from "react-hot-toast";

async function forgotPassword(email) {
  try {
    const response = await EmailPassword.sendPasswordResetEmail({
      formFields: [
        {
          id: "email",
          value: email,
        },
      ],
    });

    if (response.status !== "OK") {
      toast.error(response.formFields[0].error);
    } else {
      toast.success("Password reset email sent successfully.");
    }
  } catch (e) {
    toast.error("An error occurred while sending the password reset email.");
  }
}

function ForgotPassword() {
  const { isDarkMode } = useDarkMode();
  const [emailValue, setEmailValue] = useState("");

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handleSubmit = async () => {
    await forgotPassword(emailValue);
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
              Forgot Password?
            </p>

            <div className={styles.login__container}>
              <div className="relative">
                <input
                  type="email"
                  className={styles.login__input}
                  placeholder="Email"
                  value={emailValue}
                  onChange={handleEmailChange}
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
              Forgot Password
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

export default ForgotPassword;
