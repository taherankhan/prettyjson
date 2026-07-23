'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics or error tracking service
    console.error('Captured application error:', error);
  }, [error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'relative',
          marginBottom: '24px',
        }}>
          {/* Neon-glow styled error sign */}
          <div style={{
            fontSize: '64px',
            color: 'var(--error)',
            filter: 'drop-shadow(0 0 10px rgba(255, 85, 119, 0.3))',
            marginBottom: '16px',
          }}>
            ⚠️
          </div>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-headings)',
          fontSize: '28px',
          fontWeight: 800,
          marginBottom: '12px',
          color: 'var(--text-primary)',
        }}>
          Something went wrong
        </h1>
        
        <p style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          maxWidth: '420px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}>
          An unexpected error occurred while processing this page. Please try again.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button
            onClick={() => reset()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--accent)',
              color: '#0a0a0f',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'transform 0.15s ease, filter 0.15s ease',
            }}
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
          >
            Go Home
          </button>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} JSON Formatter. Free forever.
        </p>
      </footer>
    </div>
  );
}
