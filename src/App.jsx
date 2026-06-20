import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import { appRoutes, publicRoutes } from "./routes";

export default function App() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              {appRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}
