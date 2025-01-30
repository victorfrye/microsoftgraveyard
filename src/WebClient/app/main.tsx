import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mockingmirror/index.css';
import App from '@mockingmirror/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
