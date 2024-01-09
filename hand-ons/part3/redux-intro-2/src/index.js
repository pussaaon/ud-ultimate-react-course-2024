import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import store from "./store";

store.dispatch({ type: "account/deposit", payload: 1000 });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
