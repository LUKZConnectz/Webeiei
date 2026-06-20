import { Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Fuel from "./pages/Fuel";
import History from "./pages/History";
import Login from "./pages/Login";
import NewTrip from "./pages/NewTrip";
import Settings from "./pages/Settings";
import Stats from "./pages/Stats";

export const appRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/new-trip", element: <NewTrip /> },
  { path: "/history", element: <History /> },
  { path: "/fuel", element: <Fuel /> },
  { path: "/stats", element: <Stats /> },
  { path: "/settings", element: <Settings /> }
];

export const publicRoutes = [{ path: "/login", element: <Login /> }];

export function renderRoutes(routes) {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));
}
