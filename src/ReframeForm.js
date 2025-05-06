// src/ReframeForm.js
import React, { useState } from 'react'
import { getReframe } from './api'

function ReframeForm() {
  const [situation, setSituation] = useState('')
  const [loudestThought, setLoudestThought] = useState('')
  const [wishToHear, setWishToHear] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await getReframe(situation, loudestThought, wishToHear)
    setResponse(result)
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      {/* ==== TOOL UI ==== */}
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
          {response.split('\n').map((line, i) => (
            <p key={i} style={styles.responseLine}>
              <strong>{line.split(':')[0]}:</strong> {line.split(':').slice(1).join(':')}
            </p>
          ))}
        </div>
      )}

      <p style={styles.disclaimer}>
        This tool is not a substitute for professional mental health care. If you're in crisis or need urgent help, please contact a licensed therapist, medical professional, or emergency support line.
      </p>
      <p style={styles.crisisLine}>
        If you're in the U.S., you can text HOME to 741741 for free, 24/7 support from the Crisis Text Line.
      </p>

      {/* ==== DIVIDER ==== */}
      <hr style={styles.divider} />

      {/* ==== MARKETING BLOCK ==== */}
      <p style={styles.marketingText}>
        This isn’t just a tool — it’s a preview of what’s in <em>Brutally Alive</em>,  
        our upcoming guide to short-circuiting spirals, grounding your mind,  
        and taking micro-steps toward clarity.
      </p>
      <p style={{ ...styles.marketingLink, marginBottom: '1rem' }}>
        Preorder it here:&nbsp;
        <a
          href="https://defemberproductions.gumroad.com/l/brutallyalive"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: '600', color: '#2f80ed' }}
        >
          Brutally Alive on Gumroad
        </a>
      </p>

      {/* ==== ROTATING AFFILIATE LINK (with disclaimer) ==== */}
      <p style={{ fontSize: '0.85rem', textAlign: 'center', color: '#555', marginBottom: '0.25rem' }}>
        Plus, check out one of our trusted resources:
      </p>
      <AffiliateLink />
      <p style={{ fontSize: '0.75rem', textAlign: 'center', color: '#888', marginTop: '0.25rem' }}>
        (These are affiliate links — at no extra cost to you, we earn a small commission if you purchase.)
      </p>

      {/* ==== CONTACT / FEEDBACK FORM ==== */}
      <FeedbackForm />
    </div>
  )
}

/** Rotating affiliate component **/
function AffiliateLink() {
  const options = [
    {
      text: 'Try Online-Therapy (sponsor)',
      url: 'https://onlinetherapy.go2cloud.org/aff_c?offer_id=2&aff_id=4939',
    },
    {
      text: 'Read The Stress-Proof Brain',
      url: 'https://amzn.to/4mb4xy3',
    },
  ]
  const choice = options[Math.floor(Math.random() * options.length)]

  return (
    <p style={styles.affiliate}>
      <a href={choice.url} target="_blank" rel="noopener noreferrer">
        {choice.text}
      </a>
    </p>
  )
}

/** Simple mailto form for feedback **/
function FeedbackForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleFeedback = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(message + (email ? `\n\nFrom: ${email}` : ''))
    window.location.href = `mailto:hello@defemberproductions.com?subject=Reframe%20Engine%20Feedback&body=${body}`
  }

  return (
    <form onSubmit={handleFeedback} style={styles.feedbackForm}>
      <h4 style={styles.feedbackHeading}>Send Feedback</h4>
      <input
        type="email"
        placeholder="Your email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.feedbackInput}
      />
      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows="3"
        style={styles.feedbackTextarea}
      />
      <button type="submit" style={styles.button}>Send</button>
    </form>
  )
}

const styles = {
  container: {
    maxWidth: '720px',
    margin: '3rem auto',
    padding: '2rem',
    fontFamily: 'system-ui, sans-serif',
    color: '#222',
    background: '#fff',
    borderRadius: '8px',
  },
  heading: { fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem' },
  subheading: { fontSize: '1rem', textAlign: 'center', marginBottom: '2rem', color: '#666' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  label: { fontSize: '1rem', fontWeight: 500, color: '#333', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  textarea: { padding: '0.75rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '8px', resize: 'vertical' },
  button: { padding: '0.75rem 1.25rem', fontSize: '1rem', fontWeight: 600, color: '#fff', backgroundColor: '#2f80ed', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  responseBox: { backgroundColor: '#f9f9f9', border: '1px solid #eee', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem' },
  responseHeading: { marginBottom: '1rem' },
  responseLine: { marginBottom: '0.75rem', lineHeight: 1.5 },
  disclaimer: { marginTop: '2rem', fontSize: '0.85rem', color: '#666', textAlign: 'center' },
  crisisLine: { fontSize: '0.8rem', color: '#888', textAlign: 'center', marginTop: '0.5rem' },
  divider: { margin: '3rem 0', border: 'none', height: '1px', background: '#eee' },
  marketingText: { fontSize: '0.9rem', textAlign: 'center', color: '#444' },
  marketingLink: { fontSize: '0.9rem', textAlign: 'center' },
  affiliate: { fontSize: '0.85rem', textAlign: 'center', marginTop: '1rem', color: '#555' },
  feedbackForm: { marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' },
  feedbackHeading: { marginBottom: '0.5rem' },
  feedbackInput: { width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' },
  feedbackTextarea: { width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical' },
}

export default ReframeForm
