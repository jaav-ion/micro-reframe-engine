// src/App.js
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReframeForm from './ReframeForm';

function App() {
  return (
    <div>
      <ReframeForm />
      <Analytics />
    </div>
  );
}


export default App;
