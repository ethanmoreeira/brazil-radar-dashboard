import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './styles/variables.css';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
