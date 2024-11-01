import { Spinner } from "@/components/ui/Spinner";
import { SignIn, useUser } from "@clerk/clerk-react";

const SignInPage = () => {
  const { isLoaded } = useUser();

  return !isLoaded ? (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <div className="mx-auto my-20 flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
