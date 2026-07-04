import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../../features/home/HomePage';
import { MainLayout } from '../../shared/layouts/MainLayout';
import { CompanyDetailPage } from '@/features/companies/CompanyDetailPage';
import { LoginPage } from '@/features/auth/LoginPage';
import { RegisterPage } from '@/features/auth/RegisterPage';
import { NotFoundPage } from '@/features/not-found/NotFoundPage';
import { SubmitExperiencePage } from '@/features/experiences/SubmitExperiencePage';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ':slug', element: <CompanyDetailPage /> },
      { path: 'giris', element: <LoginPage /> },
      { path: 'kayit', element: <RegisterPage /> },
      {
        path: 'paylas',
        element: (
          <ProtectedRoute>
            <SubmitExperiencePage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
