'use client';

import { useState } from 'react';
import styles from '@/app/page.module.css';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) {
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setEmail('');
        setMessage('');
      }
    } catch (err) {
      console.error('Unexpected error inserting message:', err);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className={styles.footerForm}>
      <div className={styles.footerInputGroup}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.footerInput}
        />
        <textarea
          placeholder="Your message..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className={styles.footerTextarea}
        />
      </div>
      {submitStatus === 'success' && (
        <p className={styles.statusSuccess}>Message received! Thank you.</p>
      )}
      {submitStatus === 'error' && (
        <p className={styles.statusError}>Failed to send. Please try again.</p>
      )}
      <button type="submit" disabled={submitting} className={styles.footerSubmit}>
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
