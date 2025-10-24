import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ForgotPassword from "./ForgotPassword.jsx";
import NewPassword from "./NewPassword.jsx";
import { Helmet } from "react-helmet";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [tokenPresent, setTokenPresent] = useState(false);
  useEffect(() => {
    setTokenPresent(searchParams.has("token"));
  }, [searchParams]);

  return (
    <>
      <Helmet>
        <title>CryptIQ | Forgot Password</title>
      </Helmet>
      {tokenPresent ? <NewPassword /> : <ForgotPassword />}
    </>
  );
}

export default ResetPassword;
