import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { Index } from './page/starship-viewer';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { NotFound } from './_components/not-found';

const root = document.getElementById('root');

const router = createBrowserRouter([
  {
    path: '/page/:page',
    element: <Index />,
    children: [
      {
        path: 'homeworld/:homeworldID',
        element: <Index />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
