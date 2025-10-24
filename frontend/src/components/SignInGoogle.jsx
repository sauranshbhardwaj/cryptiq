import GoogleLogo from "./GoogleLogo.jsx";
import styles from "./css/SignInGoogle.module.css";
import { getAuthorisationURLWithQueryParamsAndSetState } from "supertokens-web-js/lib/build/recipe/thirdparty";
import { frontendURL } from "../../config.js";

function SignInGoogle({ text }) {
  async function googleSignInClicked() {
    try {
      const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
        thirdPartyId: "google",
        frontendRedirectURI: `${frontendURL}/auth/callback/google`,
      });
      window.location.assign(authUrl);
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        console.error(err);
      }
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={googleSignInClicked}
      >
        <GoogleLogo />
        {text}
      </button>
    </>
  );
}

export default SignInGoogle;
