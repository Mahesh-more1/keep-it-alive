import React, { useState } from 'react';
import { Layers, Download, Trash2, CheckCircle2, AlertCircle, Clock, Search } from 'lucide-react';

export default function ActivityLogTable({ logs, onClearLogs }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log => 
    log.appName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.statusMsg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadLogsCSV = () => {
    if (logs.length === 0) return;
    const headers = ['Timestamp', 'Application', 'URL', 'Status', 'LatencyMs', 'Message'];
    const rows = logs.map(l => [
      `"${l.timestamp}"`,
      `"${l.appName}"`,
      `"${l.url}"`,
      `"${l.status}"`,
      l.latency,
      `"${l.statusMsg}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pulsekeep_ping_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bento-card bento-col-12" style={{ padding: 0 }}>
      <div style={{ padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Layers className="text-indigo-400" size={20} /> Live Telemetry Log stream
        </h2>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search logs..."
              className="form-input-editorial"
              style={{ paddingLeft: '34px', width: '220px', padding: '0.45rem 0.75rem 0.45rem 34px', fontSize: '0.8rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="btn-editorial-ghost" style={{ fontSize: '0.8rem' }} onClick={downloadLogsCSV}>
            <Download size={14} /> Export CSV
          </button>
          
          <button className="btn-editorial-ghost" style={{ fontSize: '0.8rem' }} onClick={onClearLogs}>
            <Trash2 size={14} /> Clear
          </button>
        </div>
      </div>

      <div className="editorial-table-box" style={{ border: 'none', borderRadius: 0 }}>
        <table className="editorial-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Application Target</th>
              <th>HTTP Response</th>
              <th>Latency</th>
              <th>Status Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--text-muted)' }}>
                  No telemetry logged yet. Execute "Pulse All Now" or wait for scheduled interval.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ whiteSpace: 'nowrap', color: 'var(--text-dim)' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '6px' }} />
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{log.appName}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{log.url}</div>
                  </td>
                  <td>
                    <span className={`editorial-pill ${log.status === 'success' ? 'online' : 'sleeping'}`}>
                      {log.status === 'success' ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                      {log.code ? `${log.code} HTTP` : (log.status === 'success' ? '200 OK' : 'FAILED')}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: log.latency > 800 ? '#f59e0b' : '#34d399' }}>
                    {log.latency}ms
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    {log.statusMsg}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
