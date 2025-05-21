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
      {/* TOOL UI */}
      <h1 style={styles.heading}>Micro Reframe Engine</h1>
      <p style={styles.subheading}>Shift your inner dialogue in 10 seconds or less.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          What’s happening around you?
          <textarea
            style={styles.textarea}
            rows="3"
            required
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
          />
        </label>

        <label style={styles.label}>
          What are you feeling (physically and emotionally)?
          <textarea
            style={styles.textarea}
            rows="3"
            required
            value={feelings}
            onChange={(e) => setFeelings(e.target.value)}
          />
        </label>

        <label style={styles.label}>
          Is there a dominant thought or fear?
          <textarea
            style={styles.textarea}
            rows="3"
            required
            value={dominantThought}
            onChange={(e) => setDominantThought(e.target.value)}
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

      {/* DISCLAIMER */}
      <p style={styles.disclaimer}>
        This tool is not a substitute for professional mental health care. If you're in crisis or need urgent help, please contact a licensed therapist, medical professional, or emergency support line.
      </p>
      <p style={styles.crisisLine}>
        If you're in the U.S., you can text HOME to 741741 for free, 24/7 support from the Crisis Text Line.
      </p>

      <hr style={styles.divider} />

      {/* AFFILIATE + FEEDBACK (unchanged) */}
      <p style={styles.affiliateIntro}>
        Plus, check out one of our trusted resources:
      </p>
      <AffiliateLink />
      <p style={styles.affiliateDisclaimer}>
        (These are affiliate links — at no extra cost to you, we earn a small commission if you purchase.)
      </p>

      <FeedbackForm />
    </div>
  )
}

/** Rotating affiliate link **/
function AffiliateLink() {
  const options = [
    { text: 'Try Online-Therapy (sponsor)', url: 'https://onlinetherapy.go2cloud.org/aff_c?offer_id=2&aff_id=4939' },
    { text: 'Read The Stress-Proof Brain',     url: 'https://amzn.to/4mb4xy3' },
  ]
  const { text, url } = options[Math.floor(Math.random() * options.length)]
  return (
    <p style={styles.affiliate}>
      <a href={url} target="_blank" rel="noopener noreferrer">{text}</a>
    </p>
  )
}

/** Mailto feedback form **/
function FeedbackForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendMail = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(message + (email ? `\n\nFrom: ${email}` : ''))
    window.location.href = `mailto:hello@defemberproductions.com?subject=Reframe%20Engine%20Feedback&body=${body}`
  }

  return (
    <form onSubmit={sendMail} style={styles.feedbackForm}>
      <h4 style={styles.feedbackHeading}>Feedback?</h4>
      <input
        type="email"
        placeholder="Your email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.feedbackInput}
      />
      <textarea
        placeholder="Your message"
        required
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.feedbackTextarea}
      />
      <button type="submit" style={styles.button}>Send</button>
    </form>
  )
}

const styles = {
  container:     { maxWidth: 720, margin: '3rem auto', padding: '2rem', background: '#fff', borderRadius: 8, fontFamily: 'system-ui' },
  heading:       { fontSize: '2rem', textAlign: 'center', marginBottom: '.5rem' },
  subheading:    { fontSize: '1rem', textAlign: 'center', marginBottom: '2rem', color: '#666' },
  form:          { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  label:         { display: 'flex', flexDirection: 'column', gap: '.5rem', fontSize: '1rem', color: '#333' },
  textarea:      { padding: '.75rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: 8, resize: 'vertical' },
  button:        { padding: '.75rem 1.25rem', fontSize: '1rem', fontWeight: 600, color: '#fff', background: '#2f80ed', border: 'none', borderRadius: 8, cursor: 'pointer' },
  responseBox:   { marginTop: '2rem', padding: '1.5rem', background: '#f9f9f9', borderRadius: 12, border: '1px solid #eee' },
  responseHeading:{ marginBottom: '1rem' },
  responseLine:  { marginBottom: '.75rem', lineHeight: 1.5 },
  disclaimer:    { marginTop: '2rem', fontSize: '.85rem', textAlign: 'center', color: '#666' },
  crisisLine:    { marginTop: '.5rem', fontSize: '.8rem', textAlign: 'center', color: '#888' },
  divider:       { margin: '3rem 0', border: 0, height: 1, background: '#eee' },
  affiliateIntro:{ fontSize: '.85rem', textAlign: 'center', color: '#555' },
  affiliate:     { fontSize: '.85rem', textAlign: 'center', margin: '0.5rem 0' },
  affiliateDisclaimer:{ fontSize: '.75rem', textAlign: 'center', color: '#888' },
  feedbackForm:  { marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '.75rem' },
  feedbackHeading:{ textAlign: 'center', margin: 0 },
  feedbackInput: { padding: '.5rem', borderRadius: 6, border: '1px solid #ccc', width: '100%' },
  feedbackTextarea:{ padding: '.5rem', borderRadius: 6, border: '1px solid #ccc', resize: 'vertical', width: '100%' },
}

export default ReframeForm
