import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@microsoftgraveyard/index.css';
import App from '@microsoftgraveyard/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
