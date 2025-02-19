import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AuthGuard from "./components/AuthGuard";
import Films from "./pages/Films/Films";
import FilmsDetails from "./pages/Films/FilmsDetails";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import People from "./pages/people/People";
import PeopleDetails from "./pages/people/PeopleDetails";
import Planets from "./pages/Planets/Planets";
import PlanetsDetails from "./pages/Planets/PlanetsDetails";
import Species from "./pages/Species/Species";
import SpeciesDetails from "./pages/Species/SpeciesDetails";
import StarShips from "./pages/Starships/Starships";
import StarShipsDetails from "./pages/Starships/StarShipsDetails";
import Vehicles from "./pages/Vehicles/Vehicles";
import VehiclesDetails from "./pages/Vehicles/VehiclesDetails";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: (
          <AuthGuard requiredAuth={false}>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "/people",
        element: (
          <AuthGuard requiredAuth={true}>
            <People />
          </AuthGuard>
        ),
      },
      {
        path: "/people/:id",
        element: (
          <AuthGuard requiredAuth={true}>
            <PeopleDetails />
          </AuthGuard>
        ),
      },
      {
        path: "/planets",
        element: (
          <AuthGuard requiredAuth={true}>
            <Planets />
          </AuthGuard>
        ),
      },
      {
        path: "/planets/:id",
        element: (
          <AuthGuard requiredAuth={true}>
            <PlanetsDetails />
          </AuthGuard>
        ),
      },
      {
        path: "/films",
        element: (
          <AuthGuard requiredAuth={true}>
            <Films />
          </AuthGuard>
        ),
      },
      {
        path: "/films/:id",
        element: (
          <AuthGuard requiredAuth={true}>
            <FilmsDetails />
          </AuthGuard>
        ),
      },
      {
        path: "/species",
        element: (
          <AuthGuard requiredAuth={true}>
            <Species />
          </AuthGuard>
        ),
      },
      {
        path: "/species/:id",
        element: (
          <AuthGuard requiredAuth={true}>
            <SpeciesDetails />
          </AuthGuard>
        ),
      },
      {
        path: "/vehicles",
        element: (
          <AuthGuard requiredAuth={true}>
            <Vehicles />
          </AuthGuard>
        ),
      },
      {
        path: "/vehicles/:id",
        element: (
          <AuthGuard requiredAuth={true}>
            <VehiclesDetails />
          </AuthGuard>
        ),
      },
      {
        path: "/starships",
        element: (
          <AuthGuard requiredAuth={true}>
            <StarShips />
          </AuthGuard>
        ),
      },
      {
        path: "/starships/:id",
        element: (
          <AuthGuard requiredAuth={true}>
            <StarShipsDetails />
          </AuthGuard>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
