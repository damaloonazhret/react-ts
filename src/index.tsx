import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { Index } from './page/starship-viewer';
import { ErrorBoundary } from './_components/error-boundary';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <Index />
      </ErrorBoundary>
    </StrictMode>
  );
}
