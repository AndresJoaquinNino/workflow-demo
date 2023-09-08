import { createBrowserRouter } from "react-router-dom";
import { WorkflowLayout } from "./components";
import { Login, Workflow, WorkflowManager } from "./pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/workflow',
    element: <WorkflowLayout />,
    children: [
      {
        index: true,
        element: <Workflow />,
      },
      {
        path: 'create',
        element: <WorkflowManager/>
      },
    ]
  },
  {
    path: '*',
    element: <h1>404 | Pagina no encontrada</h1>
  }
]);

export default router;