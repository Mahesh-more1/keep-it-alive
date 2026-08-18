import React from 'react';
import { ShieldAlert, Cpu, Zap, CheckCircle2 } from 'lucide-react';

export default function ColdStartGuide() {
  return (
    <div className="bento-grid">
      <div className="bento-card bento-col-12" style={{ background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.25)' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          <ShieldAlert size={26} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '3px' }} />
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#fef08a', marginBottom: '0.5rem', lineHeight: 1.4 }}>
              Why do free-tier web hosting services spin down inactive apps?
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#d1d5db', lineHeight: '1.65' }}>
              Free hosting providers (such as Render, Koyeb, Glitch, Supabase, Railway) spin down inactive web service containers after 15 minutes of no incoming HTTP traffic to save server resources (RAM/CPU). When a new visitor clicks your app link after inactivity, the platform has to spin up the container from scratch—causing a 30 to 60-second delay called a <strong>Cold Start</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="bento-card bento-col-6">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#fb7185', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.35 }}>
          <Cpu size={20} /> The Cold Start Phenomenon
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '1rem' }}>
          When your backend (like your Student App or Social Media API) goes idle:
        </p>
        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '0.65rem', lineHeight: 1.5 }}>
          <li>Cloud host unallocates container RAM and CPU cores.</li>
          <li>First API visitor gets stuck on a blank loading screen for 30–60 seconds.</li>
          <li>Frontend network requests fail with 504 Gateway Timeout.</li>
        </ul>
      </div>

      <div className="bento-card bento-col-6">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.35 }}>
          <Zap size={20} /> The KeepItAlive Prevention Architecture
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '1rem' }}>
          KeepItAlive regularly sends automated lightweight HTTP pings (every 5-10 minutes):
        </p>
        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '0.65rem', lineHeight: 1.5 }}>
          <li>Continuously resets the host's 15-minute idle countdown timer.</li>
          <li>Keeps Node.js & Database connection pools warm in memory.</li>
          <li>Delivers instantaneous 100ms response times for all real visitors.</li>
        </ul>
      </div>

      <div className="bento-card bento-col-12">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', lineHeight: 1.35 }}>
          <CheckCircle2 size={20} /> Operational Best Practices
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          <div>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>1. Add a Dedicated Health Check Endpoint</strong>
            Create a lightweight route in Express/Node.js like <code>app.get('/api/health', (req, res) =&gt; res.send('OK'))</code> to minimize database queries on ping.
          </div>
          <div>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>2. Enable GitHub Actions 24/7 Cloud Worker</strong>
            Combine this dashboard with our built-in GitHub Actions workflow so your apps stay active even when your laptop is closed.
          </div>
          <div>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>3. Tune Ping Intervals</strong>
            Set Render apps to ping every 10-12 minutes. Set Glitch apps to ping every 4-5 minutes.
          </div>
        </div>
      </div>
    </div>
  );
}
