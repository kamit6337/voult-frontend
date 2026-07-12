import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL, postReq } from "@/config/api";

const oauthSession = async (token: string) => {
  const url = `${BASE_URL}/auth/oauth-session`;

  const response = await postReq(url, { token });
  return response;
};

const OAuth = () => {
  const token = useSearchParams()[0].get("verify");
  const errMsg = useSearchParams()[0].get("error");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const handleOAuthSession = async () => {
      try {
        setIsLoading(true);
        await oauthSession(token);
        navigate("/", { replace: true });
      } catch (error) {
        console.log("Error", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleOAuthSession();
  }, [token]);

  if (!token) {
    return (
      <Navigate
        to={`/signin?errMsg=${errMsg || "Login Again to Google"}`}
        replace
      />
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return null;
};

export default OAuth;
