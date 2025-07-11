import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { Layout } from "./components/layout";
import { NotFound } from "./pages/notFound";
import { Datail } from "./pages/datail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      }, 
      {
        path: "/cart", 
        element: <Cart />
      },
      {
        path: "/produto/:id",
        element: <Datail/>
      },
      {
        path: "*",
        element: <NotFound/>
      }
    ]
  }
])

export { router }