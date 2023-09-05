import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <h1>Dashboard</h1>,
  },
  {
    path: '*',
    element: <h1>404 | Pagina no encontrada</h1>
  }
]);

export default router;