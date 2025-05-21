// src/ReframeForm.js
import React, { useState } from 'react'
import { getReframe } from './api'

function ReframeForm() {
  const [environment, setEnvironment] = useState('')
  const [feelings, setFeelings] = useState('')
  const [dominantThought, setDominantThought] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await getReframe(environment, feelings, dominantThought)
    setResponse(result)
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Micro Reframe Engine</h1>
      <p style={styles.subheading}>Shift your inner dialogue in 10 seconds or less.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          What’s happening around you?
          <textarea
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            rows="3"
            required
            style={styles.textarea}
          />
        </label>

        <label style={styles.label}>
          What are you feeling (physically and emotionally)?
          <textarea
            value={feelings}
            onChange={(e) => setFeelings(e.target.value)}
            rows="3"
            required
            style={styles.textarea}
          />
        </label>

        <label style={styles.label}>
          Is there a dominant thought or fear?
          <textarea
            value={dominantThought}
            onChange={(e) => setDominantThought(e.target.value)}
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
          {response.split('\n').map((line, i) => (
            <p key={i} style={styles.responseLine}>
              <strong>{line.split(':')[0]}:</strong>
              {line.split(':').slice(1).join(':')}
            </p>
          ))}
        </div>
      )}

      <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#666', textAlign: 'center' }}>
        This tool is not a substitute for professional mental health care…
      </p>
      <p style={{ fontSize: '0.8rem', color: '#888', textAlign: 'center', marginTop: '0.5rem' }}>
        If you're in the U.S., you can text HOME to 741741 for crisis support.
      </p>
    </div>
  )
}

const styles = {
  container: { /* ... your existing styles ... */ },
  heading:   { /* ... */ },
  subheading:{ /* ... */ },
  form:      { /* ... */ },
  label:     { /* ... */ },
  textarea:  { /* ... */ },
  button:    { /* ... */ },
  responseBox:     { /* ... */ },
  responseHeading: { /* ... */ },
  responseLine:    { /* ... */ },
}

export default ReframeForm
