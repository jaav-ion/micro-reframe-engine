// src/ReframeForm.js
import React, { useState } from 'react';
import { getReframe } from './api';

function ReframeForm() {
  const [situation, setSituation] = useState('');
  const [loudestThought, setLoudestThought] = useState('');
  const [wishToHear, setWishToHear] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await getReframe(situation, loudestThought, wishToHear);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Micro Reframe Engine</h1>
      <p style={styles.subheading}>Shift your inner dialogue in 10 seconds or less.</p>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          What’s happening right now?
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            rows="3"
            required
            style={styles.textarea}
          />
        </label>

        <label style={styles.label}>
          What’s the loudest thought in your head?
          <textarea
            value={loudestThought}
            onChange={(e) => setLoudestThought(e.target.value)}
            rows="3"
            required
            style={styles.textarea}
          />
        </label>

        <label style={styles.label}>
          What do you wish someone would say to you?
          <textarea
            value={wishToHear}
            onChange={(e) => setWishToHear(e.target.value)}
            rows="3"
            required
            style={styles.textarea}
          />
        </label>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Thinking...' : 'Get Reframe'}
        </button>
      </form>

      {response && (
        <div style={styles.responseBox}>
          <h3 style={styles.responseHeading}>Here’s Your Reframe</h3>
          {response.split('\n').map((line, index) => (
            <p key={index} style={styles.responseLine}>
              <strong>{line.split(':')[0]}:</strong> {line.split(':').slice(1).join(':')}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    max
