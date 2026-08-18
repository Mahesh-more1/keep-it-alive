import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MetricsBanner from './components/MetricsBanner';
import TargetCard from './components/TargetCard';
import AddEditModal from './components/AddEditModal';
import ActivityLogTable from './components/ActivityLogTable';
import CloudWorkflowGen from './components/CloudWorkflowGen';
import ColdStartGuide from './components/ColdStartGuide';
import { DEFAULT_TARGETS } from './data/defaultTargets';
import { Server, Plus, Globe, Trash2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [targets, setTargets] = useState(() => {
    const saved = localStorage.getItem('keepitalive_targets_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved targets:', e);
      }
    }
    return DEFAULT_TARGETS; // Clean empty array []
  });

  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('keepitalive_logs_v2');
    if (savedLogs) {
      try {
        return JSON.parse(savedLogs);
      } catch (e) {
        console.error('Failed to parse saved logs:', e);
      }
    }
    return [];
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTarget, setEditingTarget] = useState(null);
  const [isPingingAll, setIsPingingAll] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [nextGlobalPingSec, setNextGlobalPingSec] = useState(600);

  useEffect(() => {
    localStorage.setItem('keepitalive_targets_v2', JSON.stringify(targets));
  }, [targets]);

  useEffect(() => {
    localStorage.setItem('keepitalive_logs_v2', JSON.stringify(logs));
  }, [logs]);

  const playPingSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  };

  const pingUrl = async (target) => {
    const startTime = performance.now();
    let status = 'success';
    let code = 200;
    let statusMsg = '200 OK (Container Warm)';
    let latency = 0;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(target.url, {
        method: target.httpMethod || 'GET',
        cache: 'no-store',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      latency = Math.round(performance.now() - startTime);
      code = response.status;
      statusMsg = `${response.status} ${response.statusText || 'OK'}`;
    } catch (err) {
      try {
        const startTimeFallback = performance.now();
        await fetch(target.url, {
          method: 'GET',
          mode: 'no-cors',
          cache: 'no-store'
        });
        latency = Math.round(performance.now() - startTimeFallback);
        code = 200;
        statusMsg = '200 OK (Opaque Pulse Succeeded - Container Awake)';
      } catch (fallbackErr) {
        latency = Math.round(performance.now() - startTime);
        status = 'error';
        code = 0;
        statusMsg = err.name === 'AbortError' ? 'Timeout (Cold Start >10s)' : (err.message || 'Network Error');
      }
    }

    return { status, code, latency, statusMsg };
  };

  const handlePingSingle = async (targetId) => {
    const target = targets.find(t => t.id === targetId);
    if (!target) return;

    setTargets(prev => prev.map(t => t.id === targetId ? { ...t, status: 'pinging' } : t));

    const result = await pingUrl(target);
    playPingSound();

    const now = new Date();
    const nextPing = new Date(now.getTime() + (target.intervalMinutes || 10) * 60 * 1000);

    setTargets(prev => prev.map(t => {
      if (t.id === targetId) {
        const history = [...(t.latencyHistory || []), result.latency].slice(-10);
        const avgLat = Math.round(history.reduce((a, b) => a + b, 0) / history.length);
        return {
          ...t,
          status: result.status === 'success' ? 'online' : 'sleeping',
          lastStatusMsg: result.statusMsg,
          lastPingTime: now.toISOString(),
          nextPingTime: nextPing.toISOString(),
          avgLatency: avgLat,
          totalPings: (t.totalPings || 0) + 1,
          pingsSaved: (t.pingsSaved || 0) + 1,
          latencyHistory: history
        };
      }
      return t;
    }));

    const newLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: now.toISOString(),
      appName: target.name,
      url: target.url,
      status: result.status,
      code: result.code,
      latency: result.latency,
      statusMsg: result.statusMsg
    };

    setLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  const handlePulseAll = async () => {
    if (targets.length === 0) return;
    setIsPingingAll(true);
    const enabledTargets = targets.filter(t => t.enabled);

    for (const target of enabledTargets) {
      await handlePingSingle(target.id);
    }

    setIsPingingAll(false);
    setNextGlobalPingSec(600);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setNextGlobalPingSec(prev => {
        if (prev <= 1) {
          handlePulseAll();
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targets]);

  const handleSaveTarget = (newOrUpdatedTarget) => {
    if (editingTarget) {
      setTargets(prev => prev.map(t => t.id === newOrUpdatedTarget.id ? newOrUpdatedTarget : t));
    } else {
      setTargets(prev => [newOrUpdatedTarget, ...prev]);
    }
  };

  const handleDeleteTarget = (targetId) => {
    if (window.confirm('Remove target application?')) {
      setTargets(prev => prev.filter(t => t.id !== targetId));
    }
  };

  const handleClearAllTargets = () => {
    if (window.confirm('Clear all registered target applications?')) {
      setTargets([]);
    }
  };

  const handleToggleEnableTarget = (targetId) => {
    setTargets(prev => prev.map(t => t.id === targetId ? { ...t, enabled: !t.enabled } : t));
  };

  const handleOpenAddModal = () => {
    setEditingTarget(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (target) => {
    setEditingTarget(target);
    setIsAddModalOpen(true);
  };

  const handleClearLogs = () => {
    if (window.confirm('Clear all logs?')) {
      setLogs([]);
    }
  };

  return (
    <div className="editorial-container">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={handleOpenAddModal}
        onPulseAll={handlePulseAll}
        isPingingAll={isPingingAll}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        nextGlobalPingSec={nextGlobalPingSec}
      />

      <MetricsBanner 
        targets={targets}
        nextGlobalPingSec={nextGlobalPingSec}
      />

      {activeTab === 'dashboard' && (
        <main>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Server className="text-emerald-400" size={18} /> Monitored Applications ({targets.length})
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {targets.length > 0 && (
                <button className="btn-editorial-ghost" style={{ fontSize: '0.8rem', color: '#fb7185' }} onClick={handleClearAllTargets}>
                  <Trash2 size={13} /> Clear All
                </button>
              )}
              <button className="btn-editorial-primary" style={{ fontSize: '0.8rem' }} onClick={handleOpenAddModal}>
                <Plus size={14} /> Add Target URL
              </button>
            </div>
          </div>

          {targets.length === 0 ? (
            <div className="empty-workspace-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <Globe size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.35rem', color: '#ffffff' }}>
                  No Target Applications Registered
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '460px', margin: '0 auto', lineHeight: '1.5' }}>
                  Enter your backend API or frontend website URLs to keep them active and prevent cloud sleep.
                </p>
              </div>
              <button className="btn-editorial-primary" style={{ marginTop: '0.5rem' }} onClick={handleOpenAddModal}>
                <Plus size={16} /> Add Your Target URL
              </button>
            </div>
          ) : (
            <div className="bento-grid">
              {targets.map((target) => (
                <div key={target.id} className="bento-col-4">
                  <TargetCard 
                    target={target}
                    onPingSingle={handlePingSingle}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteTarget}
                    onToggleEnable={handleToggleEnableTarget}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {activeTab === 'logs' && (
        <ActivityLogTable 
          logs={logs}
          onClearLogs={handleClearLogs}
        />
      )}

      {activeTab === 'github' && (
        <CloudWorkflowGen 
          targets={targets}
        />
      )}

      {activeTab === 'guide' && (
        <ColdStartGuide />
      )}

      <AddEditModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveTarget}
        editingTarget={editingTarget}
      />
    </div>
  );
}
