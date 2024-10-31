import { ClerkProvider } from "@clerk/clerk-react";
import { getClerkKey } from "./utils";

const CLERK_KEY = getClerkKey();

const ClerkWrapper = ({ children }) => {
  return (
    <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  );
};

export default ClerkWrapper;
