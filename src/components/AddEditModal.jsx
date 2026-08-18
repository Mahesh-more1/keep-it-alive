import React, { useState, useEffect } from 'react';
import { X, Server, Globe, Clock, Sparkles } from 'lucide-react';
import { PLATFORM_PRESETS } from '../data/defaultTargets';

export default function AddEditModal({ isOpen, onClose, onSave, editingTarget }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('Render');
  const [intervalMinutes, setIntervalMinutes] = useState(10);
  const [httpMethod, setHttpMethod] = useState('GET');

  useEffect(() => {
    if (editingTarget) {
      setName(editingTarget.name || '');
      setUrl(editingTarget.url || '');
      setPlatform(editingTarget.platform || 'Render');
      setIntervalMinutes(editingTarget.intervalMinutes || 10);
      setHttpMethod(editingTarget.httpMethod || 'GET');
    } else {
      setName('');
      setUrl('');
      setPlatform('Render');
      setIntervalMinutes(10);
      setHttpMethod('GET');
    }
  }, [editingTarget, isOpen]);

  if (!isOpen) return null;

  const handleApplyPreset = (preset) => {
    setPlatform(preset.platform);
    setIntervalMinutes(preset.intervalMinutes);
    if (!name) {
      setName(`${preset.platform} Application`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    onSave({
      id: editingTarget ? editingTarget.id : `target-${Date.now()}`,
      name: name.trim(),
      url: formattedUrl,
      platform,
      intervalMinutes: parseInt(intervalMinutes, 10) || 10,
      httpMethod,
      enabled: editingTarget ? editingTarget.enabled : true,
      status: editingTarget ? editingTarget.status : 'online',
      latencyHistory: editingTarget ? editingTarget.latencyHistory : [180, 210, 190],
      totalPings: editingTarget ? editingTarget.totalPings : 0,
      pingsSaved: editingTarget ? editingTarget.pingsSaved : 0,
      avgLatency: editingTarget ? editingTarget.avgLatency : 200,
      lastStatusMsg: editingTarget ? editingTarget.lastStatusMsg : 'Added'
    });

    onClose();
  };

  return (
    <div className="modal-editorial-overlay" onClick={onClose}>
      <div className="modal-editorial-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Server size={20} className="text-emerald-400" />
            {editingTarget ? 'Edit Application Target' : 'Register New Application Target'}
          </div>
          <button className="btn-editorial-ghost" style={{ width: '32px', height: '32px', padding: 0, justifyContent: 'center' }} onClick={onClose}>
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <div className="form-label-editorial" style={{ marginBottom: '0.5rem' }}>
              <Sparkles size={12} style={{ color: '#fbbf24' }} /> Supported Platform Presets
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', maxHeight: '140px', overflowY: 'auto', paddingRight: '4px' }}>
              {PLATFORM_PRESETS.map((p, i) => (
                <button 
                  key={i} 
                  type="button" 
                  className={`btn-editorial-ghost ${platform === p.platform ? 'active' : ''}`}
                  style={{ 
                    fontSize: '0.72rem', 
                    padding: '0.3rem 0.65rem', 
                    background: platform === p.platform ? 'rgba(99, 102, 241, 0.2)' : undefined,
                    borderColor: platform === p.platform ? 'rgba(99, 102, 241, 0.5)' : undefined,
                    color: platform === p.platform ? '#818cf8' : undefined
                  }}
                  onClick={() => handleApplyPreset(p)}
                  title={p.note}
                >
                  {p.name} ({p.intervalMinutes}m)
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label-editorial">Application Name</label>
            <input 
              type="text"
              className="form-input-editorial"
              placeholder="e.g. My Render Express API or Student App Backend"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label-editorial">
              <Globe size={12} /> Target URL Endpoint
            </label>
            <input 
              type="url"
              className="form-input-editorial"
              placeholder="https://my-backend-app.onrender.com/api/health"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '4px', display: 'block' }}>
              Tip: Use a lightweight health route (e.g. <code>/api/health</code> or <code>/ping</code>)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="form-label-editorial">
                <Clock size={12} /> Ping Frequency
              </label>
              <select 
                className="form-select-editorial"
                value={intervalMinutes}
                onChange={(e) => setIntervalMinutes(e.target.value)}
              >
                <option value={4}>Every 4 Minutes (Glitch / Replit)</option>
                <option value={5}>Every 5 Minutes (Strict)</option>
                <option value={10}>Every 10 Minutes (Render / Koyeb / Fly)</option>
                <option value={14}>Every 14 Minutes (Supabase / MongoDB)</option>
                <option value={30}>Every 30 Minutes (Standard)</option>
              </select>
            </div>

            <div>
              <label className="form-label-editorial">Platform Tag</label>
              <select 
                className="form-select-editorial"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value="Render">Render</option>
                <option value="Koyeb">Koyeb</option>
                <option value="Glitch">Glitch</option>
                <option value="Supabase">Supabase</option>
                <option value="MongoDB Atlas">MongoDB Atlas</option>
                <option value="Railway">Railway</option>
                <option value="Fly.io">Fly.io</option>
                <option value="Replit">Replit</option>
                <option value="Back4App">Back4App</option>
                <option value="Vercel">Vercel</option>
                <option value="Custom API">Custom API</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.4rem' }}>
            <button type="button" className="btn-editorial-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-editorial-primary">
              {editingTarget ? 'Save Changes' : 'Register Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
