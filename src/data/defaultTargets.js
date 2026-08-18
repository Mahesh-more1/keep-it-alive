export const DEFAULT_TARGETS = [];

export const PLATFORM_PRESETS = [
  { 
    name: 'Render Free Tier', 
    platform: 'Render', 
    intervalMinutes: 10, 
    note: 'Render web services sleep after 15 minutes of inactivity. Pinging every 10m keeps containers warm.' 
  },
  { 
    name: 'Koyeb Free Service', 
    platform: 'Koyeb', 
    intervalMinutes: 10, 
    note: 'Koyeb free web services sleep after inactivity. 10m ping resets container timer.' 
  },
  { 
    name: 'Glitch App', 
    platform: 'Glitch', 
    intervalMinutes: 4, 
    note: 'Glitch projects sleep after 5 minutes of inactivity. Requires frequent 4m pings.' 
  },
  { 
    name: 'Supabase / PostgreSQL', 
    platform: 'Supabase', 
    intervalMinutes: 14, 
    note: 'Pinging connected backend endpoints keeps free Supabase database projects active.' 
  },
  { 
    name: 'MongoDB Atlas API', 
    platform: 'MongoDB Atlas', 
    intervalMinutes: 14, 
    note: 'Pinging Express/Node backends keeps active Mongoose connections to prevent 60-day Atlas pause.' 
  },
  { 
    name: 'Railway Web App', 
    platform: 'Railway', 
    intervalMinutes: 10, 
    note: 'Keeps container instance warm in memory.' 
  },
  { 
    name: 'Fly.io App', 
    platform: 'Fly.io', 
    intervalMinutes: 10, 
    note: 'Prevents auto-suspend on free Fly machines.' 
  },
  { 
    name: 'Replit Project', 
    platform: 'Replit', 
    intervalMinutes: 4, 
    note: 'Replit always-on workarounds require pings every 4 minutes.' 
  },
  { 
    name: 'Back4App / Parse API', 
    platform: 'Back4App', 
    intervalMinutes: 10, 
    note: 'Keeps free Parse server containers warm.' 
  },
  { 
    name: 'Vercel API Route', 
    platform: 'Vercel', 
    intervalMinutes: 14, 
    note: 'Gentle periodic pinging for serverless API endpoints.' 
  },
  { 
    name: 'Custom Server / API', 
    platform: 'Custom API', 
    intervalMinutes: 10, 
    note: 'Universal keep-alive ping for any hosted HTTP endpoint.' 
  }
];
