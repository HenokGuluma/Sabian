// Mock database with realistic game data using CSV data
export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  bio: string;
  totalGems: number;
  lastActive: string;
  country: string;
  trendingScore: number;
  purchaseHistory: Array<{
    item: string;
    amount: number;
    date: string;
  }>;
  totalGamesPlayed: number;
  totalGamesWon: number;
  level: number;
  joinDate: string;
  status: 'online' | 'offline';
  age: number;
  city: string;
  region: string;
}

export interface PlayerStats {
  id: string;
  userId: string;
  username: string;
  level: number;
  experience: number;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  averageScore: number;
  bestScore: number;
  totalPlayTime: number; // in minutes
  achievements: string[];
  rank: string;
}

export interface GameSession {
  id: string;
  userId: string;
  username: string;
  gameType: string;
  duration: number; // in minutes
  score: number;
  result: 'win' | 'loss' | 'draw';
  startTime: string;
  endTime: string;
  server: string;
  region: string;
}

// Generate realistic user data using CSV data and fill remaining with similar patterns
const generateUsers = (): User[] => {
  const users: User[] = [];
  const gameThemes = ['Dragon', 'Shadow', 'Fire', 'Ice', 'Lightning', 'Steel', 'Mystic', 'Void', 'Star', 'Moon'];
  const roles = ['Slayer', 'Hunter', 'Mage', 'Warrior', 'Ninja', 'Knight', 'Wizard', 'Ranger', 'Assassin', 'Guardian'];

  // Use CSV data for first batch of users
  const csvData = [
    { name: "addnega", email: "addnega@gmail.com", last_seen: "2025-08-25T08:05:44", phone: "251967339851", age: 20 },
    { name: "deaddis", email: "deaddis@gmail.com", last_seen: "2025-08-25T08:06:27", phone: "251935312450", age: 27 },
    { name: "officialtek", email: "officialtek@gmail.com", last_seen: "2025-08-25T08:07:44", phone: "251947373152", age: 24 },
    { name: "realash", email: "realash@gmail.com", last_seen: "2025-08-25T08:23:13", phone: "251934067509", age: 26 },
    { name: "so_ber", email: "so_ber@gmail.com", last_seen: "2025-08-25T08:23:40", phone: "251962528955", age: 19 },
    { name: "negasiqueen", email: "negasiqueen@gmail.com", last_seen: "2025-08-25T08:24:19", phone: "251942254931", age: 22 },
    { name: "ta_get", email: "ta_get@gmail.com", last_seen: "2025-08-25T08:26:01", phone: "251938325960", age: 19 },
    { name: "gondertse", email: "gondertse@gmail.com", last_seen: "2025-08-25T08:27:50", phone: "251984336895", age: 19 },
    { name: "senezeri", email: "senezeri@gmail.com", last_seen: "2025-08-25T08:29:14", phone: "251917893988", age: 26 },
    { name: "addis.hailu", email: "addis.hailu@gmail.com", last_seen: "2025-08-25T08:29:49", phone: "251929800168", age: 24 },
  ];

  // Create first 1000 users based on CSV pattern
  for (let i = 0; i < Math.min(1000, csvData.length); i++) {
    const csvUser = csvData[i % csvData.length];
    const purchaseHistory = Array.from({ length: Math.floor(Math.random() * 5) }, (_, j) => ({
      item: ['Gold Pack', 'Gem Bundle', 'Premium Sword', 'Energy Potion', 'Legendary Shield'][j % 5],
      amount: Math.floor(Math.random() * 50) + 5,
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));

    users.push({
      id: (i + 1).toString(),
      username: csvUser.name,
      email: csvUser.email,
      phoneNumber: `+${csvUser.phone}`,
      bio: `Gaming enthusiast from Addis Ababa. Love playing mobile games and collecting rare items!`,
      totalGems: Math.floor(Math.random() * 10000) + 100,
      lastActive: csvUser.last_seen,
      trendingScore: Math.floor(Math.random() * 1000) + 50,
      purchaseHistory,
      totalGamesPlayed: Math.floor(Math.random() * 500) + 10,
      totalGamesWon: Math.floor((Math.floor(Math.random() * 500) + 10) * (0.3 + Math.random() * 0.4)),
      level: Math.floor(Math.random() * 100) + 1,
      country: 'Ethiopia',
      city: 'Addis Ababa',
      region: 'Addis Ababa',
      age: csvUser.age,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: Math.random() > 0.7 ? 'online' : 'offline'
    });
  }

  // Fill remaining users with Ethiopian names and patterns
  const ethiopianNames = [
    'Abebe', 'Almaz', 'Bekele', 'Desta', 'Emebet', 'Fikadu', 'Genet', 'Haile', 'Iyasu', 'Kidus',
    'Lemma', 'Meron', 'Negash', 'Olana', 'Paulos', 'Qene', 'Rahel', 'Selamawit', 'Tadesse', 'Umed',
    'Wondwossen', 'Yared', 'Zara', 'Alem', 'Berhane', 'Cherinet', 'Dawit', 'Ephrem', 'Fasil', 'Girma'
  ];

  for (let i = 1000; i < 17278; i++) {
    const baseName = ethiopianNames[Math.floor(Math.random() * ethiopianNames.length)].toLowerCase();
    const suffix = Math.floor(Math.random() * 999) + 1;
    const username = Math.random() > 0.5 ? `${baseName}${suffix}` : `${baseName}_${gameThemes[Math.floor(Math.random() * gameThemes.length)].toLowerCase()}`;

    const phoneNumber = `+251-9${Math.floor(Math.random() * 90000000) + 10000000}`;

    const purchaseHistory = Array.from({ length: Math.floor(Math.random() * 5) }, (_, j) => ({
      item: ['Gold Pack', 'Gem Bundle', 'Premium Sword', 'Energy Potion', 'Legendary Shield'][j % 5],
      amount: Math.floor(Math.random() * 50) + 5,
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));

    users.push({
      id: (i + 1).toString(),
      username,
      email: `${username}@gmail.com`,
      phoneNumber,
      bio: `Gaming enthusiast from Addis Ababa. Love playing mobile games and collecting rare items!`,
      totalGems: Math.floor(Math.random() * 10000) + 100,
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      trendingScore: Math.floor(Math.random() * 1000) + 50,
      purchaseHistory,
      totalGamesPlayed: Math.floor(Math.random() * 500) + 10,
      totalGamesWon: Math.floor((Math.floor(Math.random() * 500) + 10) * (0.3 + Math.random() * 0.4)),
      level: Math.floor(Math.random() * 100) + 1,
      country: 'Ethiopia',
      city: 'Addis Ababa',
      region: 'Addis Ababa',
      age: Math.floor(Math.random() * 30) + 18,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: Math.random() > 0.7 ? 'online' : 'offline'
    });
  }

  return users;
};

// Generate player stats
const generatePlayerStats = (users: User[]): PlayerStats[] => {
  return users.map(user => ({
    id: user.id,
    userId: user.id,
    username: user.username,
    level: user.level,
    experience: user.level * 1000 + Math.floor(Math.random() * 1000),
    gamesPlayed: user.totalGamesPlayed,
    gamesWon: user.totalGamesWon,
    winRate: Math.round((user.totalGamesWon / user.totalGamesPlayed) * 100),
    averageScore: Math.floor(Math.random() * 5000) + 1000,
    bestScore: Math.floor(Math.random() * 15000) + 5000,
    totalPlayTime: Math.floor(Math.random() * 10000) + 100,
    achievements: Array.from({ length: Math.floor(Math.random() * 10) }, (_, i) => 
      ['First Win', 'Speed Demon', 'Perfectionist', 'Survivor', 'Champion', 'Legend', 'Master', 'Elite', 'Hero', 'Conqueror'][i]
    ).filter(Boolean),
    rank: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'][Math.floor(Math.random() * 5)]
  }));
};

// Generate game sessions
const generateGameSessions = (users: User[]): GameSession[] => {
  const sessions: GameSession[] = [];
  const gameTypes = ['Battle Royale', 'Team Deathmatch', 'Capture Flag', 'King of Hill', 'Arena'];
  const servers = ['us-east-1', 'eu-west-1', 'asia-1', 'us-west-1'];
  const regions = ['US East', 'EU West', 'Asia Pacific', 'US West'];

  for (let i = 0; i < 50000; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const duration = Math.floor(Math.random() * 30) + 5;
    const startTime = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

    sessions.push({
      id: i.toString(),
      userId: user.id,
      username: user.username,
      gameType: gameTypes[Math.floor(Math.random() * gameTypes.length)],
      duration,
      score: Math.floor(Math.random() * 10000) + 500,
      result: Math.random() > 0.6 ? 'win' : Math.random() > 0.5 ? 'loss' : 'draw',
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      server: servers[Math.floor(Math.random() * servers.length)],
      region: regions[Math.floor(Math.random() * regions.length)]
    });
  }

  return sessions;
};

// Generate analytics data for past 8 months (Feb 2025 - Sep 2025)
export const analyticsData = [
  { month: "February", players: 1200, newUsers: 280, retention: 45 },
  { month: "March", players: 1850, newUsers: 450, retention: 52 },
  { month: "April", players: 2900, newUsers: 680, retention: 58 },
  { month: "May", players: 8500, newUsers: 2200, retention: 67 },
  { month: "June", players: 12400, newUsers: 3100, retention: 73 },
  { month: "July", players: 16800, newUsers: 4200, retention: 78 },
  { month: "August", players: 19200, newUsers: 4800, retention: 80 },
]

// Weekly player growth data starting from November 2024
export const weeklyPlayerGrowth = [
  // November 2024
  { date: "2024-11-01", players: 52, newUsers: 12, revenue: 45, sessions: 180, week: "Week 1 Nov", month: "November 2024" },
  { date: "2024-11-08", players: 58, newUsers: 14, revenue: 52, sessions: 195, week: "Week 2 Nov", month: "November 2024" },
  { date: "2024-11-15", players: 61, newUsers: 16, revenue: 58, sessions: 210, week: "Week 3 Nov", month: "November 2024" },
  { date: "2024-11-22", players: 64, newUsers: 18, revenue: 62, sessions: 225, week: "Week 4 Nov", month: "November 2024" },

  // December 2024
  { date: "2024-12-01", players: 68, newUsers: 20, revenue: 68, sessions: 240, week: "Week 1 Dec", month: "December 2024" },
  { date: "2024-12-08", players: 72, newUsers: 22, revenue: 75, sessions: 260, week: "Week 2 Dec", month: "December 2024" },
  { date: "2024-12-15", players: 78, newUsers: 25, revenue: 82, sessions: 285, week: "Week 3 Dec", month: "December 2024" },
  { date: "2024-12-22", players: 85, newUsers: 28, revenue: 90, sessions: 310, week: "Week 4 Dec", month: "December 2024" },

  // January 2025
  { date: "2025-01-01", players: 120, newUsers: 35, revenue: 125, sessions: 420, week: "Week 1 Jan", month: "January 2025" },
  { date: "2025-01-08", players: 180, newUsers: 45, revenue: 185, sessions: 650, week: "Week 2 Jan", month: "January 2025" },
  { date: "2025-01-15", players: 280, newUsers: 68, revenue: 295, sessions: 980, week: "Week 3 Jan", month: "January 2025" },
  { date: "2025-01-22", players: 420, newUsers: 95, revenue: 445, sessions: 1450, week: "Week 4 Jan", month: "January 2025" },

  // February 2025
  { date: "2025-02-01", players: 650, newUsers: 135, revenue: 580, sessions: 2200, week: "Week 1 Feb", month: "February 2025" },
  { date: "2025-02-08", players: 850, newUsers: 165, revenue: 720, sessions: 2850, week: "Week 2 Feb", month: "February 2025" },
  { date: "2025-02-15", players: 1050, newUsers: 195, revenue: 865, sessions: 3500, week: "Week 3 Feb", month: "February 2025" },
  { date: "2025-02-22", players: 1200, newUsers: 225, revenue: 980, sessions: 4200, week: "Week 4 Feb", month: "February 2025" },

  // March 2025
  { date: "2025-03-01", players: 1380, newUsers: 255, revenue: 1125, sessions: 4850, week: "Week 1 Mar", month: "March 2025" },
  { date: "2025-03-08", players: 1580, newUsers: 285, revenue: 1280, sessions: 5520, week: "Week 2 Mar", month: "March 2025" },
  { date: "2025-03-15", players: 1750, newUsers: 315, revenue: 1420, sessions: 6100, week: "Week 3 Mar", month: "March 2025" },
  { date: "2025-03-22", players: 1850, newUsers: 340, revenue: 1520, sessions: 6450, week: "Week 4 Mar", month: "March 2025" },

  // April 2025
  { date: "2025-04-01", players: 2100, newUsers: 385, revenue: 1780, sessions: 7350, week: "Week 1 Apr", month: "April 2025" },
  { date: "2025-04-08", players: 2420, newUsers: 445, revenue: 2050, sessions: 8480, week: "Week 2 Apr", month: "April 2025" },
  { date: "2025-04-15", players: 2680, newUsers: 495, revenue: 2280, sessions: 9380, week: "Week 3 Apr", month: "April 2025" },
  { date: "2025-04-22", players: 2900, newUsers: 535, revenue: 2480, sessions: 10150, week: "Week 4 Apr", month: "April 2025" },

  // May 2025 - Major growth begins
  { date: "2025-05-01", players: 4200, newUsers: 785, revenue: 3650, sessions: 14700, week: "Week 1 May", month: "May 2025" },
  { date: "2025-05-08", players: 6800, newUsers: 1285, revenue: 5920, sessions: 23800, week: "Week 2 May", month: "May 2025" },
  { date: "2025-05-15", players: 8200, newUsers: 1565, revenue: 7150, sessions: 28700, week: "Week 3 May", month: "May 2025" },
  { date: "2025-05-22", players: 8500, newUsers: 1620, revenue: 7420, sessions: 29750, week: "Week 4 May", month: "May 2025" },

  // June 2025
  { date: "2025-06-01", players: 9800, newUsers: 1865, revenue: 8550, sessions: 34300, week: "Week 1 Jun", month: "June 2025" },
  { date: "2025-06-08", players: 11200, newUsers: 2125, revenue: 9780, sessions: 39200, week: "Week 2 Jun", month: "June 2025" },
  { date: "2025-06-15", players: 12100, newUsers: 2295, revenue: 10560, sessions: 42350, week: "Week 3 Jun", month: "June 2025" },
  { date: "2025-06-22", players: 12400, newUsers: 2350, revenue: 10820, sessions: 43400, week: "Week 4 Jun", month: "June 2025" },

  // July 2025
  { date: "2025-07-01", players: 14200, newUsers: 2685, revenue: 12400, sessions: 49700, week: "Week 1 Jul", month: "July 2025" },
  { date: "2025-07-08", players: 15800, newUsers: 2985, revenue: 13800, sessions: 55300, week: "Week 2 Jul", month: "July 2025" },
  { date: "2025-07-15", players: 16500, newUsers: 3125, revenue: 14410, sessions: 57750, week: "Week 3 Jul", month: "July 2025" },
  { date: "2025-07-22", players: 16800, newUsers: 3180, revenue: 14670, sessions: 58800, week: "Week 4 Jul", month: "July 2025" },

  // August 2025
  { date: "2025-08-01", players: 18200, newUsers: 3445, revenue: 15890, sessions: 63700, week: "Week 1 Aug", month: "August 2025" },
  { date: "2025-08-08", players: 18900, newUsers: 3580, revenue: 16500, sessions: 66150, week: "Week 2 Aug", month: "August 2025" },
  { date: "2025-08-15", players: 19100, newUsers: 3615, revenue: 16680, sessions: 66850, week: "Week 3 Aug", month: "August 2025" },
  { date: "2025-08-22", players: 19200, newUsers: 3635, revenue: 16770, sessions: 67200, week: "Week 4 Aug", month: "August 2025" },

  // September 2025
  { date: "2025-09-01", players: 18800, newUsers: 3555, revenue: 16420, sessions: 65800, week: "Week 1 Sep", month: "September 2025" },
  { date: "2025-09-08", players: 17850, newUsers: 3375, revenue: 15590, sessions: 62450, week: "Week 2 Sep", month: "September 2025" },
  { date: "2025-09-15", players: 17500, newUsers: 3310, revenue: 15280, sessions: 61250, week: "Week 3 Sep", month: "September 2025" },
  { date: "2025-09-22", players: 17278, newUsers: 3268, revenue: 15085, sessions: 60473, week: "Week 4 Sep", month: "September 2025" },
]

export const userDatabase = generateUsers();
export const playerStatsDatabase = generatePlayerStats(userDatabase);
export const gameSessionsDatabase = generateGameSessions(userDatabase);

// Export a subset for display
export const recentPlayers = userDatabase.slice(0, 50).map(user => ({
  id: user.id,
  username: user.username,
  level: user.level,
  lastSeen: new Date(user.lastActive).toLocaleString(),
  status: user.status,
  country: user.country
}));