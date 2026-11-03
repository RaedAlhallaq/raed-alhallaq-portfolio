import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/shell/app-shell'
import { HomePage } from '@/routes/home-page'
import { NotFoundPage } from '@/routes/not-found-page'
import { ProjectDetailPage } from '@/routes/project-detail-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'projects/:slug',
        element: <ProjectDetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])