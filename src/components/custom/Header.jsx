import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Separator } from "../ui/separator";

const Header = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { setTheme, theme } = useTheme();

  const goTo = (path) => navigate(path);
  return (
    <div className="flex justify-between p-3 px-5 shadow-md">
      <Link to="/">
        <img src="/logo.svg" alt="logo" height={80} width={80} />
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-x-2">
          <Button variant="outline" onClick={() => goTo("/dashboard")}>
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-center"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Separator orientation="vertical" />
          <UserButton />
        </div>
      ) : (
        <Button className="capitalize" onClick={() => goTo("/auth/sign-in")}>
          get started
        </Button>
      )}
    </div>
  );
};

export default Header;
