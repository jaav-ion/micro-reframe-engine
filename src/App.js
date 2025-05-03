// src/App.js
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReframeForm from './ReframeForm';
import './App.css';

function App() {
  const bgStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/bg-calm.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    filter: 'brightness(95%) blur(2px)',
    minHeight: '100vh',
    width: '100%',
  };

  return (
    <div style={bgStyle}>
      <div className="main-container">
        <ReframeForm />
        <Analytics />
      </div>
    </div>
  );
}

export default App;
