import { ClerkProvider } from "@clerk/clerk-react";
import { getClerkKey } from "./utils";
import { dark, experimental__simple } from "@clerk/themes";
import { useTheme } from "./providers/ThemeProvider";
import { getSignInLink, getSignUpLink } from "./utils/clerk.helper";

const CLERK_KEY = getClerkKey();
const SIGN_IN_URL = getSignInLink();
const SIGN_UP_URL = getSignUpLink();

const ClerkWrapper = ({ children }) => {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      publishableKey={CLERK_KEY}
      signInUrl={SIGN_IN_URL}
      signUpUrl={SIGN_UP_URL}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: theme === "dark" ? dark : experimental__simple,
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkWrapper;
