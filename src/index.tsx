import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import Index from './pages/help-center/page';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <Index />
    </StrictMode>
  );
}
