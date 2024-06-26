import { createBrowserRouter } from "react-router-dom";
import { RootPage } from "./pages/RootPage";
import DetailsPage from "./pages/DetailsPage";
import { Layout } from "./pages/Layout";
import Footer from "./components/Footer/Footer";
import Timekiller from "./components/Timekiller/Timekiller";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <RootPage /> },

      {
        path: "/details/:id",
        element: <DetailsPage />,
      },

      {
        path: "/",
        element: <Footer />,
      },

      {
        path: "/timekiller",
        element: <Timekiller />,
      },
    ],
  },
]);
