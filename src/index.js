import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.variable.min.css';


import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/auth";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
);

reportWebVitals();
