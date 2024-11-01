import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router";
import ClerkWrapper from "./Clerk";
import ThemeProvider from "./providers/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ClerkWrapper>
      <Router />
    </ClerkWrapper>
  </ThemeProvider>,
);
