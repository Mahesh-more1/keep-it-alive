import React from 'react';
import { ShieldAlert, Cpu, Zap, CheckCircle2, Server, HelpCircle } from 'lucide-react';

export default function ColdStartGuide() {
  const platformConditions = [
    {
      platform: 'Render',
      sleepCondition: 'Spins down after 15 minutes of zero HTTP traffic.',
      coldStartDelay: '30 to 60 seconds delay on cold start.',
      recommendedPing: 'Every 10 to 14 minutes.',
      safeKeepAlive: '100% Safe (Resets 15m idle countdown timer).'
    },
    {
      platform: 'Koyeb',
      sleepCondition: 'Free instances pause after inactivity.',
      coldStartDelay: '15 to 30 seconds delay.',
      recommendedPing: 'Every 10 minutes.',
      safeKeepAlive: 'Safe & effective.'
    },
    {
      platform: 'Glitch',
      sleepCondition: 'App goes to sleep after 5 minutes of inactivity.',
      coldStartDelay: '10 to 20 seconds delay.',
      recommendedPing: 'Every 4 minutes.',
      safeKeepAlive: 'Required for constant availability.'
    },
    {
      platform: 'Supabase',
      sleepCondition: 'Free project pauses after 7 days of inactivity.',
      coldStartDelay: 'Manual unpause required via dashboard if paused.',
      recommendedPing: 'Every 14 minutes to connected backend.',
      safeKeepAlive: 'Keeps connected database connections active.'
    },
    {
      platform: 'MongoDB Atlas',
      sleepCondition: 'M0 Free Cluster pauses after 60 days of zero database connections.',
      coldStartDelay: 'Cluster resumes upon new connection attempt.',
      recommendedPing: 'Every 14 minutes to connected Express backend.',
      safeKeepAlive: 'Maintains active Mongoose connection pool.'
    },
    {
      platform: 'Fly.io',
      sleepCondition: 'Free Fly Machines auto-suspend when idle.',
      coldStartDelay: '2 to 5 seconds delay.',
      recommendedPing: 'Every 10 minutes.',
      safeKeepAlive: 'Keeps machines warm in memory.'
    },
    {
      platform: 'Replit',
      sleepCondition: 'Repls go to sleep shortly after browser closes.',
      coldStartDelay: '5 to 15 seconds delay.',
      recommendedPing: 'Every 4 minutes.',
      safeKeepAlive: 'Keeps Repl instance awake.'
    },
    {
      platform: 'Vercel (Frontend)',
      sleepCondition: 'Never sleeps! Served on global Edge CDN.',
      coldStartDelay: '0 ms (Instant).',
      recommendedPing: 'Not needed for static frontends.',
      safeKeepAlive: 'Pinging unnecessary for static UI.'
    }
  ];

  return (
    <div className="bento-grid">
      {/* Banner */}
      <div className="bento-card bento-col-12" style={{ background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.25)' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          <ShieldAlert size={26} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '3px' }} />
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#fef08a', marginBottom: '0.5rem', lineHeight: 1.4 }}>
              Why do free-tier web hosting services spin down inactive apps?
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#d1d5db', lineHeight: '1.65' }}>
              Free cloud hosting providers (Render, Koyeb, Glitch, Supabase, Railway) spin down inactive web service containers to save server RAM and CPU cores. When a real user visits your application after a period of inactivity, the platform must boot the container from scratch—causing a 30 to 60-second delay called a <strong>Cold Start</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Conditions Table */}
      <div className="bento-card bento-col-12">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Server size={20} className="text-emerald-400" /> Platform Conditions & Keep-Alive Policy Matrix
        </h3>
        <div className="editorial-table-box">
          <table className="editorial-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Sleep Condition</th>
                <th>Cold Start Delay</th>
                <th>Recommended Ping Frequency</th>
                <th>Safety & Impact</th>
              </tr>
            </thead>
            <tbody>
              {platformConditions.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: '#ffffff' }}>{row.platform}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.sleepCondition}</td>
                  <td style={{ color: '#fb7185', fontWeight: 600 }}>{row.coldStartDelay}</td>
                  <td style={{ color: '#38bdf8', fontWeight: 600 }}>{row.recommendedPing}</td>
                  <td style={{ color: '#34d399' }}>{row.safeKeepAlive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Architecture Cards */}
      <div className="bento-card bento-col-6">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#fb7185', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.35 }}>
          <Cpu size={20} /> The Cold Start Problem
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '1rem' }}>
          When your backend (like your Student App or Social Media API) goes idle:
        </p>
        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '0.65rem', lineHeight: 1.5 }}>
          <li>Cloud host unallocates container RAM and CPU cores.</li>
          <li>First API visitor gets stuck on a loading screen for 30–60 seconds.</li>
          <li>Frontend network requests fail with 504 Gateway Timeouts.</li>
        </ul>
      </div>

      <div className="bento-card bento-col-6">
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.35 }}>
          <Zap size={20} /> The KeepItAlive Prevention Solution
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
          <CheckCircle2 size={20} /> Best Practices for Open-Source Users
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
