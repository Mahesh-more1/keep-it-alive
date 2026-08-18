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
    setPlatform(preset.name.split(' ')[0]);
    setIntervalMinutes(preset.intervalMinutes);
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
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Server size={22} className="text-emerald-400" />
            {editingTarget ? 'Edit Application Target' : 'Register New Application Target'}
          </div>
          <button className="btn-editorial-ghost" style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div className="form-label-editorial">
              <Sparkles size={12} style={{ color: '#fbbf24' }} /> Platform Presets
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {PLATFORM_PRESETS.map((p, i) => (
                <button 
                  key={i} 
                  type="button" 
                  className="btn-editorial-ghost"
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem' }}
                  onClick={() => handleApplyPreset(p)}
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
              placeholder="e.g. Student App Backend or Social Media API"
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
                <option value={4}>Every 4 Minutes (Glitch)</option>
                <option value={5}>Every 5 Minutes (Strict)</option>
                <option value={10}>Every 10 Minutes (Render)</option>
                <option value={14}>Every 14 Minutes (General)</option>
                <option value={30}>Every 30 Minutes</option>
              </select>
            </div>

            <div>
              <label className="form-label-editorial">Platform Tag</label>
              <input 
                type="text"
                className="form-input-editorial"
                placeholder="Render / Koyeb / Glitch"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" className="btn-editorial-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-editorial-primary">
              {editingTarget ? 'Save Changes' : 'Save Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
