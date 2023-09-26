import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  //@ts-ignore
  <React.StrictMode>
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>
    <App />
  </React.StrictMode>,
);
