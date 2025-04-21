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
    maxWidth: '720px',
    margin: '4rem auto',
    padding: '2rem',
    fontFamily: 'system-ui, sans-serif',
    color: '#222',
  },
  heading: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  subheading: {
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    resize: 'vertical',
  },
  button: {
    padding: '0.75rem 1.25rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#2f80ed',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  responseBox: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #eee',
    padding: '1.5rem',
    borderRadius: '12px',
    marginTop: '3rem',
  },
  responseHeading: {
    marginBottom: '1rem',
  },
  responseLine: {
    marginBottom: '0.75rem',
    lineHeight: 1.5,
  },
};
export default ReframeForm;
