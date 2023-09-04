import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Login</h1>,
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