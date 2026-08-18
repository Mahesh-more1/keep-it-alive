import React from 'react';
import { Activity, Zap, Plus, RefreshCw, Volume2, VolumeX, ShieldCheck, GitBranch, Layers } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenAddModal, 
  onPulseAll, 
  isPingingAll, 
  soundEnabled, 
  setSoundEnabled,
  nextGlobalPingSec
}) {
  return (
    <header className="editorial-header">
      <div className="editorial-brand">
        <div className="brand-badge">
          <Zap size={22} />
        </div>
        <div>
          <div className="brand-title-editorial">KEEP IT ALIVE</div>
          <div className="brand-subtitle-editorial">EDITORIAL SERVER ANTI-SLEEP STUDIO</div>
        </div>
      </div>

      <div className="nav-pills">
        <button 
          className={`nav-pill-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Activity size={15} /> Dashboard
        </button>
        <button 
          className={`nav-pill-btn ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <Layers size={15} /> Live Telemetry
        </button>
        <button 
          className={`nav-pill-btn ${activeTab === 'github' ? 'active' : ''}`}
          onClick={() => setActiveTab('github')}
        >
          <GitBranch size={15} /> 24/7 Cloud Worker
        </button>
        <button 
          className={`nav-pill-btn ${activeTab === 'guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('guide')}
        >
          <ShieldCheck size={15} /> Cold-Start Docs
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button 
          className="btn-editorial-ghost"
          style={{ width: '40px', height: '40px', padding: 0, justifyContent: 'center' }}
          title={soundEnabled ? "Mute ping audio" : "Enable ping audio"}
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <button 
          className="btn-editorial-primary btn-editorial-pulse" 
          onClick={onPulseAll}
          disabled={isPingingAll}
        >
          <RefreshCw size={15} className={isPingingAll ? "spin" : ""} />
          {isPingingAll ? "Pinging..." : "Pulse All Now"}
        </button>

        <button className="btn-editorial-primary" onClick={onOpenAddModal}>
          <Plus size={15} /> Add Target
        </button>
      </div>
    </header>
  );
}
