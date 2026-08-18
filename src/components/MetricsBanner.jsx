import React from 'react';
import { Server, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function MetricsBanner({ targets, nextGlobalPingSec }) {
  const totalApps = targets.length;
  const activeApps = targets.filter(t => t.status === 'online').length;
  const totalPings = targets.reduce((sum, t) => sum + (t.totalPings || 0), 0);
  const pingsSaved = targets.reduce((sum, t) => sum + (t.pingsSaved || 0), 0);
  
  const formatCountdown = (sec) => {
    if (sec <= 0) return 'Pinging...';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="bento-grid">
      {/* Bento Card 1: System Health Index (3 cols) */}
      <div className="bento-card bento-col-3 hero-feature">
        <div className="bento-header-meta">
          <span className="bento-tag">
            <Server size={14} className="text-emerald-400" /> SYSTEM HEALTH
          </span>
          <span className="editorial-pill online" style={{ fontSize: '0.65rem', padding: '0.25rem 0.65rem' }}>
            <span className="dot-halo"></span> 100% AWAKE
          </span>
        </div>
        <div>
          <div className="bento-val-large">{activeApps} / {totalApps}</div>
          <div className="bento-lbl-sub">Active & Responding</div>
        </div>
      </div>

      {/* Bento Card 2: Pulse Telemetry (3 cols) */}
      <div className="bento-card bento-col-3">
        <div className="bento-header-meta">
          <span className="bento-tag">
            <Zap size={14} className="text-indigo-400" /> TELEMETRY
          </span>
        </div>
        <div>
          <div className="bento-val-large">{totalPings.toLocaleString()}</div>
          <div className="bento-lbl-sub">Keep-Alive Pings Sent</div>
        </div>
      </div>

      {/* Bento Card 3: Auto Pulse Timer (3 cols) */}
      <div className="bento-card bento-col-3">
        <div className="bento-header-meta">
          <span className="bento-tag">
            <Clock size={14} className="text-amber-400" /> AUTO PULSE TIMER
          </span>
        </div>
        <div>
          <div className="bento-val-large" style={{ color: '#fbbf24' }}>
            {formatCountdown(nextGlobalPingSec)}
          </div>
          <div className="bento-lbl-sub">Next Automated Batch</div>
        </div>
      </div>

      {/* Bento Card 4: Cold Starts Prevented (3 cols - Equal width!) */}
      <div className="bento-card bento-col-3">
        <div className="bento-header-meta">
          <span className="bento-tag">
            <ShieldCheck size={14} className="text-emerald-400" /> PREVENTED SLEEP
          </span>
        </div>
        <div>
          <div className="bento-val-large" style={{ color: '#34d399' }}>{pingsSaved}</div>
          <div className="bento-lbl-sub">Cold Starts Avoided</div>
        </div>
      </div>
    </div>
  );
}
