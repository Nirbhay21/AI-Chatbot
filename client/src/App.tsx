import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { useSelector } from "react-redux"
import type { RootState } from "./app/store";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      {(user) ? (
        <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white">
          <div className="flex w-screen h-screen">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center bg-gradient-to-b from-[#242124] to-[#000000] w-screen h-screen">
          <LoginPage />
        </div>
      )}
    </>
  )
}

export default App
