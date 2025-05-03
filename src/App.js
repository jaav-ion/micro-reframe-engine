// src/App.js

import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import ReframeForm from './ReframeForm';
import './App.css';

export default function App() {
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
