// src/App.js
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReframeForm from './ReframeForm';
import './App.css'; // make sure this is imported to apply styles

function App() {
  return (
    <div className="main-container">
      <ReframeForm />
      <Analytics />
    </div>
  );
}

export default App;
