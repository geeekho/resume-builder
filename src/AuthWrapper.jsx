import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./components/ui/Spinner";
import { useUser } from "@clerk/clerk-react";

function AuthWrapper({ children, isProtected = false }) {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isProtected && !isSignedIn | !user) {
      navigate("/auth/sign-in", { replace: true });
    }
  }, [isLoaded, isProtected, navigate, isSignedIn, user]);
  return !isLoaded ? (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    children
  );
}

export default AuthWrapper;
