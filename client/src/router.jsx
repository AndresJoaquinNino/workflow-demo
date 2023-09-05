import { createBrowserRouter } from "react-router-dom";
import { Login, Workflow } from "./pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Workflow/>,
  },
  {
    path: '*',
    element: <h1>404 | Pagina no encontrada</h1>
  }
]);

export default router;