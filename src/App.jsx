import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/custom/Header";
import { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";

function App() {
  useEffect(() => {
    console.log("hello");
  });

  return (
    <>
      <Header />
      <div className="p-10">
        <Outlet />
      </div>
      <Toaster position="bottom-left" closeButton />
    </>
  );
}

export default App;
