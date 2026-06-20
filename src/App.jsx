import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import { appRoutes, publicRoutes } from "./routes";

export default function App() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}

      {appRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <Layout>
              {route.element}
            </Layout>
          }
        />
      ))}
    </Routes>
  );
}
