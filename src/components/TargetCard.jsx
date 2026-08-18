import React from 'react';
import { ExternalLink, Zap, Edit3, Trash2, Power, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function TargetCard({ target, onPingSingle, onEdit, onDelete, onToggleEnable }) {
  const getStatusBadge = () => {
    if (!target.enabled) {
      return (
        <span className="editorial-pill" style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af', borderColor: 'rgba(255,255,255,0.1)' }}>
          Paused
        </span>
      );
    }

    switch (target.status) {
      case 'online':
        return (
          <span className="editorial-pill online">
            <span className="dot-halo"></span> Awake
          </span>
        );
      case 'sleeping':
        return (
          <span className="editorial-pill sleeping">
            <AlertTriangle size={11} /> Sleeping
          </span>
        );
      case 'pinging':
        return (
          <span className="editorial-pill pinging">
            <span className="dot-halo"></span> Pinging
          </span>
        );
      default:
        return (
          <span className="editorial-pill online">
            <span className="dot-halo"></span> Awake
          </span>
        );
    }
  };

  const getBarColor = (ms) => {
    if (!ms) return 'rgba(255,255,255,0.08)';
    if (ms < 200) return '#10b981'; // Emerald
    if (ms < 500) return '#6366f1'; // Indigo
    if (ms < 1200) return '#f59e0b'; // Amber
    return '#f43f5e'; // Rose
  };

  const history = target.latencyHistory || [150];
  const maxLat = Math.max(...history, 500);

  return (
    <div className={`app-bento-card ${target.status} ${!target.enabled ? 'disabled' : ''}`}>
      <div className="app-header-row">
        <div className="app-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h3 className="app-name-editorial">{target.name}</h3>
            <span style={{ 
              fontSize: '0.65rem', 
              fontFamily: 'var(--font-mono)', 
              padding: '2px 8px', 
              borderRadius: '9999px', 
              background: 'rgba(255,255,255,0.06)', 
              color: '#9ca3af', 
              border: '1px solid rgba(255,255,255,0.08)',
              fontWeight: 500 
            }}>
              {target.platform || 'Cloud App'}
            </span>
          </div>

          <a 
            href={target.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="app-url-mono"
          >
            {target.url} <ArrowUpRight size={12} />
          </a>
        </div>

        {getStatusBadge()}
      </div>

      <div className="metric-strip-editorial">
        <div className="strip-item">
          <div className="strip-val">{target.avgLatency ? `${target.avgLatency}ms` : '--'}</div>
          <div className="strip-lbl">Avg Latency</div>
        </div>
        <div className="strip-item">
          <div className="strip-val">{target.intervalMinutes}m</div>
          <div className="strip-lbl">Interval</div>
        </div>
        <div className="strip-item">
          <div className="strip-val">{target.totalPings || 0}</div>
          <div className="strip-lbl">Pings</div>
        </div>
      </div>

      {/* Latency History Sparkline */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
          <span>Telemetry Spectrum</span>
          <span>{target.lastStatusMsg || 'Ready'}</span>
        </div>
        <div className="sparkline-box">
          {history.slice(-12).map((ms, idx) => {
            const pct = Math.min(100, Math.max(15, (ms / maxLat) * 100));
            return (
              <div 
                key={idx}
                className="spark-bar"
                style={{ 
                  height: `${pct}%`, 
                  backgroundColor: getBarColor(ms) 
                }}
                title={`${ms}ms`}
              />
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.6rem', borderTop: '1px solid var(--border-light)' }}>
        <button 
          className="btn-editorial-ghost" 
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
          onClick={() => onPingSingle(target.id)}
          disabled={target.status === 'pinging'}
        >
          <Zap size={13} style={{ color: '#fbbf24' }} />
          {target.status === 'pinging' ? 'Testing...' : 'Test Pulse'}
        </button>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button 
            className="btn-editorial-ghost" 
            style={{ width: '32px', height: '32px', padding: 0, justifyContent: 'center' }}
            title={target.enabled ? "Pause auto-ping" : "Resume auto-ping"}
            onClick={() => onToggleEnable(target.id)}
          >
            <Power size={14} style={{ color: target.enabled ? '#34d399' : '#6b7280' }} />
          </button>
          <button 
            className="btn-editorial-ghost" 
            style={{ width: '32px', height: '32px', padding: 0, justifyContent: 'center' }}
            title="Edit Target"
            onClick={() => onEdit(target)}
          >
            <Edit3 size={14} />
          </button>
          <button 
            className="btn-editorial-ghost" 
            style={{ width: '32px', height: '32px', padding: 0, justifyContent: 'center', color: '#fb7185' }}
            title="Delete Target"
            onClick={() => onDelete(target.id)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
