import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router";
import ClerkWrapper from "./Clerk";

createRoot(document.getElementById("root")).render(
  <ClerkWrapper>
    <Router />
  </ClerkWrapper>,
);
