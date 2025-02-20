import { MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.scss";
import StarWarNav from "./components/AppNavbar";
import useAuthStore from "./store/auth-store";
import { theme } from "./theme";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  console.log("pathName: ", pathname);
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {pathname !== "/login" && <StarWarNav />}
      <Outlet />
    </MantineProvider>
  );
}
