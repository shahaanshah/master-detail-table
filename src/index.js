import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";

import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/auth";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </StrictMode>
);

reportWebVitals();
