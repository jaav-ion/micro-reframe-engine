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
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h2>Micro Reframe Engine</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
  <label>
    What’s happening right now?
    <textarea
      value={situation}
      onChange={(e) => setSituation(e.target.value)}
      rows="3"
      required
      style={{ width: '100%' }}
    />
  </label>

  <label>
    What’s the loudest thought in your head?
    <textarea
      value={loudestThought}
      onChange={(e) => setLoudestThought(e.target.value)}
      rows="3"
      required
      style={{ width: '100%' }}
    />
  </label>

  <label>
    What do you wish someone would say to you?
    <textarea
      value={wishToHear}
      onChange={(e) => setWishToHear(e.target.value)}
      rows="3"
      required
      style={{ width: '100%' }}
    />
  </label>

  <button type="submit" disabled={loading}>
    {loading ? 'Thinking...' : 'Get Reframe'}
  </button>
</form>

{response && (
  <div style={{ marginTop: '2rem', backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '12px' }}>
    <h3 style={{ marginBottom: '1rem' }}>Here’s Your Reframe</h3>
    {response.split('\n').map((line, index) => (
     <p key={index} style={{ marginBottom: '0.75rem' }}>
     <strong>{line.split(':')[0]}:</strong> {line.split(':').slice(1).join(':')}
   </p>
    ))}
  </div>
)}

    </div>
  );
}

export default ReframeForm;
