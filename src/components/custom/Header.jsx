import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  // const fetchData = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const token = await getToken({
  //       template: "supabase",
  //     });
  //     if (token) {
  //       const data = await fetchTasks(token);
  //       console.log(data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const goTo = (path) => navigate(path);
  return (
    <div className="flex justify-between p-3 px-5 shadow-md">
      <img src="/logo.svg" alt="logo" height={100} width={100} />
      {isSignedIn ? (
        <div className="flex items-center gap-x-2">
          <Button variant="outline" onClick={() => goTo("/dashboard")}>
            Dashboard
          </Button>
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
