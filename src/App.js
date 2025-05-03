import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReframeForm from './ReframeForm';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <div className="background-blur" />
      <div className="main-container">
        <ReframeForm />
        <Analytics />
      </div>
    </div>
  );
}

export default App;
