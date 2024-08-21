import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import Links from "./components/Links";
import RedirectLinks from "./components/RedirectLink";
import LandingPage from "./components/LandingPage";
import UrlProvider from "./context";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "link:id",
        element: <Links />,
      },
      {
        path: ":id",
        element: <RedirectLinks />,
      },
    ],
  },
]);
function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
