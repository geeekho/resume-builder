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
    <div
      className="scroll-bar max-h-full min-h-full overflow-y-auto overflow-x-hidden"
      id="app-container"
    >
      <Header />
      <div className="h-full w-full p-10">
        <Outlet />
      </div>
      <Toaster position="bottom-left" closeButton />
    </div>
  );
}

export default App;
