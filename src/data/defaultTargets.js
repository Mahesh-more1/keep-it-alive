export const DEFAULT_TARGETS = [];

export const PLATFORM_PRESETS = [
  { name: 'Render Free Tier', intervalMinutes: 10, note: 'Render sleeps after 15 minutes of inactivity.' },
  { name: 'Glitch App', intervalMinutes: 4, note: 'Glitch sleeps after 5 minutes of inactivity.' },
  { name: 'Koyeb Free Tier', intervalMinutes: 10, note: 'Koyeb sleeps free web services.' },
  { name: 'Supabase / Heroku', intervalMinutes: 14, note: 'Prevents database pausing or container sleep.' },
  { name: 'Railway / Custom API', intervalMinutes: 10, note: 'Keeps API endpoint warm in memory.' }
];
