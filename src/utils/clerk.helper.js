const getClerkKey = () => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }
  return PUBLISHABLE_KEY;
};

const getSignUpLink = () => {
  const SIGN_UP_URL = import.meta.env.VITE_CLERK_SIGN_UP_URL;

  if (!SIGN_UP_URL) {
    throw new Error("Missing sign up link");
  }
  return SIGN_UP_URL;
};

const getSignInLink = () => {
  const SIGN_IN_URL = import.meta.env.VITE_CLERK_SIGN_IN_URL;

  if (!SIGN_IN_URL) {
    throw new Error("Missing sign in link");
  }
  return SIGN_IN_URL;
};

export { getClerkKey, getSignUpLink, getSignInLink };
