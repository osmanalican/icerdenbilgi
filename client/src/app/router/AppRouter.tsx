import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import { MainLayout } from "../../shared/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}