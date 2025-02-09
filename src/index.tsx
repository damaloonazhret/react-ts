import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { Index } from './page/starship-viewer';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ErrorBoundary } from './_components/error-boundary';

const root = document.getElementById('root');

const router = createBrowserRouter([
  {
    path: '/page/:page',
    element: <Index />,
    // loader: ({ params }) => fetchPageData(params.page),
    children: [
      {
        path: 'person/:personId',
        element: <Index />,
        // loader: ({ params }) => fetchPersonData(params.personId),
      },
    ],
  },
]);

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </StrictMode>
  );
}
