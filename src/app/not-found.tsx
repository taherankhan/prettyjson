import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';

export const metadata = {
  title: 'Page Not Found | JSON Formatter',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
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
          {/* Neon-glow styled 404 number */}
          <h1 style={{
            fontFamily: 'var(--font-headings)',
            fontSize: 'clamp(96px, 15vw, 160px)',
            fontWeight: 800,
            lineHeight: 1,
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--purple) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            filter: 'drop-shadow(0 0 15px rgba(0, 212, 170, 0.2))',
          }}>
            404
          </h1>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-headings)',
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '12px',
          color: 'var(--text-primary)',
        }}>
          Page Not Found
        </h2>
        
        <p style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          maxWidth: '420px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
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
            textDecoration: 'none',
            transition: 'transform 0.15s ease, filter 0.15s ease',
            cursor: 'pointer',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Safety
        </Link>
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} JSON Formatter. Free forever.
        </p>
      </footer>
    </div>
  );
}
