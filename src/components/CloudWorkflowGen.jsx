import React, { useState } from 'react';
import { GitBranch, Copy, Check, Download, Terminal, ShieldCheck } from 'lucide-react';

export default function CloudWorkflowGen({ targets }) {
  const [copied, setCopied] = useState(false);

  const generateYaml = () => {
    const curlSteps = targets.map((t) => {
      return `      - name: Keep-Alive ${t.name}
        run: |
          echo "Pinging ${t.name} (${t.url})..."
          curl -s -X ${t.httpMethod || 'GET'} "${t.url}" -o /dev/null -w "HTTP %{http_code} - Total Time: %{time_total}s\\n"
`;
    }).join('\n');

    return `name: KeepItAlive 24/7 Cloud Keep-Alive

on:
  schedule:
    # Runs every 10 minutes automatically 24/7/365
    - cron: '*/10 * * * *'
  workflow_dispatch: # Manual trigger from GitHub UI

jobs:
  keep_alive:
    name: Ping Applications & Prevent Sleeping
    runs-on: ubuntu-latest
    steps:
      - name: Display Timestamp
        run: echo "Starting scheduled ping batch at $(date -u)"

${curlSteps || `      - name: Ping Default Target
        run: curl -s "https://student-app-backend.onrender.com/api/health" -o /dev/null -w "%{http_code}"`}
      - name: Summary
        run: echo "All applications successfully pinged. Server containers kept active!"
`;
  };

  const yamlCode = generateYaml();

  const handleCopy = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(yamlCode);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = yamlCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    } catch (e) {
      console.warn("Fallback copy execution:", e);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([yamlCode], {type: 'text/yaml'});
    element.href = URL.createObjectURL(file);
    element.download = "keep_it_alive.yml";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bento-card bento-col-12" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(16, 185, 129, 0.06), var(--bg-bento))', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem', lineHeight: 1.3 }}>
            <GitBranch size={22} className="text-emerald-400" /> 24/7 GitHub Actions Cloud Worker Generator
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
            Zero PC upkeep. GitHub Actions pings your servers every 10 minutes automatically 24/7/365 from cloud infrastructure.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-editorial-ghost" onClick={handleDownload}>
            <Download size={15} /> Download YAML
          </button>
          <button className="btn-editorial-primary" onClick={handleCopy}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? 'Copied!' : 'Copy Workflow Code'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: 'var(--radius-inner)', border: '1px solid var(--border-light)' }}>
          <h4 style={{ color: '#818cf8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Terminal size={16} /> 3-Step Setup
          </h4>
          <ol style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#d1d5db', display: 'flex', flexDirection: 'column', gap: '0.85rem', lineHeight: 1.5 }}>
            <li>
              In your GitHub repo, create directory:
              <br />
              <code style={{ background: '#12141d', padding: '2px 8px', borderRadius: '4px', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                .github/workflows/
              </code>
            </li>
            <li>
              Create file: <code style={{ background: '#12141d', padding: '2px 8px', borderRadius: '4px', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>keep_it_alive.yml</code>
            </li>
            <li>
              Paste the code on the right & push!
              <br />
              <span style={{ color: '#34d399', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <ShieldCheck size={12} /> Completely free 24/7 cloud pinging active.
              </span>
            </li>
          </ol>
        </div>

        <div style={{ position: 'relative', background: '#07080c', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-inner)', padding: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#a7f3d0', overflowX: 'auto', maxHeight: '380px' }}>
          <button 
            className="btn-editorial-ghost" 
            style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.3rem 0.6rem', fontSize: '0.72rem' }}
            onClick={handleCopy}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          <pre style={{ margin: 0 }}>
            {yamlCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
