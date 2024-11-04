import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/auth/sign-in/SignInPage";
import App from "./App";
import Home from "./pages/app/home/Home";
import AuthWrapper from "./AuthWrapper";
import Dashboard from "./pages/app/dashboard/Dashboard";
import Edit from "./pages/app/dashboard/resume/[resumeId]/edit/Edit";
import SignUpPage from "./pages/auth/sign-up/SignUpPage";
import View from "./pages/app/resume/[resumeId]/View";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthWrapper>
        <App />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <AuthWrapper isProtected={true}>
            <Dashboard />
          </AuthWrapper>
        ),
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: (
          <AuthWrapper isProtected={true}>
            <Edit />
          </AuthWrapper>
        ),
      },
      {
        path: "/resume/:resumeId/view",
        element: (
          <AuthWrapper isProtected={false}>
            <View />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUpPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
