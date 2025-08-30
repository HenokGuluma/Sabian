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
  // November 2024 - Starting flat around 247
  { date: "2024-11-01", players: 247, newUsers: 35, revenue: 180, sessions: 890, week: "Week 1 Nov", month: "November 2024" },
  { date: "2024-11-08", players: 251, newUsers: 38, revenue: 165, sessions: 905, week: "Week 2 Nov", month: "November 2024" },
  { date: "2024-11-15", players: 245, newUsers: 32, revenue: 195, sessions: 880, week: "Week 3 Nov", month: "November 2024" },
  { date: "2024-11-22", players: 249, newUsers: 41, revenue: 170, sessions: 895, week: "Week 4 Nov", month: "November 2024" },

  // December 2024 - Slight increase from flat start
  { date: "2024-12-01", players: 253, newUsers: 43, revenue: 210, sessions: 910, week: "Week 1 Dec", month: "December 2024" },
  { date: "2024-12-08", players: 258, newUsers: 39, revenue: 185, sessions: 925, week: "Week 2 Dec", month: "December 2024" },
  { date: "2024-12-15", players: 261, newUsers: 45, revenue: 225, sessions: 940, week: "Week 3 Dec", month: "December 2024" },
  { date: "2024-12-22", players: 267, newUsers: 48, revenue: 200, sessions: 960, week: "Week 4 Dec", month: "December 2024" },

  // January 2025 - Gradual growth begins
  { date: "2025-01-01", players: 285, newUsers: 52, revenue: 240, sessions: 1020, week: "Week 1 Jan", month: "January 2025" },
  { date: "2025-01-08", players: 298, newUsers: 58, revenue: 220, sessions: 1065, week: "Week 2 Jan", month: "January 2025" },
  { date: "2025-01-15", players: 315, newUsers: 61, revenue: 275, sessions: 1125, week: "Week 3 Jan", month: "January 2025" },
  { date: "2025-01-22", players: 342, newUsers: 68, revenue: 255, sessions: 1220, week: "Week 4 Jan", month: "January 2025" },

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

  // February 2025 - More noticeable growth
  { date: "2025-02-01", players: 395, newUsers: 78, revenue: 320, sessions: 1410, week: "Week 1 Feb", month: "February 2025" },
  { date: "2025-02-08", players: 445, newUsers: 85, revenue: 380, sessions: 1580, week: "Week 2 Feb", month: "February 2025" },
  { date: "2025-02-15", players: 520, newUsers: 98, revenue: 350, sessions: 1850, week: "Week 3 Feb", month: "February 2025" },
  { date: "2025-02-22", players: 610, newUsers: 115, revenue: 420, sessions: 2180, week: "Week 4 Feb", month: "February 2025" },

  // March 2025 - Steady acceleration
  { date: "2025-03-01", players: 745, newUsers: 135, revenue: 480, sessions: 2650, week: "Week 1 Mar", month: "March 2025" },
  { date: "2025-03-08", players: 890, newUsers: 158, revenue: 520, sessions: 3170, week: "Week 2 Mar", month: "March 2025" },
  { date: "2025-03-15", players: 1085, newUsers: 185, revenue: 590, sessions: 3860, week: "Week 3 Mar", month: "March 2025" },
  { date: "2025-03-22", players: 1320, newUsers: 218, revenue: 680, sessions: 4700, week: "Week 4 Mar", month: "March 2025" },

  // April 2025 - Continued growth
  { date: "2025-04-01", players: 1580, newUsers: 255, revenue: 720, sessions: 5620, week: "Week 1 Apr", month: "April 2025" },
  { date: "2025-04-08", players: 1920, newUsers: 298, revenue: 650, sessions: 6840, week: "Week 2 Apr", month: "April 2025" },
  { date: "2025-04-15", players: 2350, newUsers: 348, revenue: 850, sessions: 8370, week: "Week 3 Apr", month: "April 2025" },
  { date: "2025-04-22", players: 2850, newUsers: 410, revenue: 790, sessions: 10150, week: "Week 4 Apr", month: "April 2025" },

  // May 2025 - Major breakthrough begins
  { date: "2025-05-01", players: 3520, newUsers: 485, revenue: 1150, sessions: 12540, week: "Week 1 May", month: "May 2025" },
  { date: "2025-05-08", players: 4850, newUsers: 685, revenue: 980, sessions: 17280, week: "Week 2 May", month: "May 2025" },
  { date: "2025-05-15", players: 6420, newUsers: 920, revenue: 1380, sessions: 22890, week: "Week 3 May", month: "May 2025" },
  { date: "2025-05-22", players: 8100, newUsers: 1185, revenue: 1650, sessions: 28860, week: "Week 4 May", month: "May 2025" },

  // June 2025 - Sustained growth
  { date: "2025-06-01", players: 9950, newUsers: 1420, revenue: 1850, sessions: 35460, week: "Week 1 Jun", month: "June 2025" },
  { date: "2025-06-08", players: 11780, newUsers: 1650, revenue: 1520, sessions: 41950, week: "Week 2 Jun", month: "June 2025" },
  { date: "2025-06-15", players: 13680, newUsers: 1890, revenue: 2180, sessions: 48720, week: "Week 3 Jun", month: "June 2025" },
  { date: "2025-06-22", players: 15420, newUsers: 2130, revenue: 2450, sessions: 54950, week: "Week 4 Jun", month: "June 2025" },

  // July 2025 - Peak growth phase
  { date: "2025-07-01", players: 17280, newUsers: 2380, revenue: 2850, sessions: 61600, week: "Week 1 Jul", month: "July 2025" },
  { date: "2025-07-08", players: 19150, newUsers: 2630, revenue: 2340, sessions: 68250, week: "Week 2 Jul", month: "July 2025" },
  { date: "2025-07-15", players: 20980, newUsers: 2850, revenue: 3450, sessions: 74760, week: "Week 3 Jul", month: "July 2025" },
  { date: "2025-07-22", players: 22650, newUsers: 3080, revenue: 3850, sessions: 80760, week: "Week 4 Jul", month: "July 2025" },

  // August 2025 - Stabilizing at high levels
  { date: "2025-08-01", players: 24120, newUsers: 3250, revenue: 4150, sessions: 86030, week: "Week 1 Aug", month: "August 2025" },
  { date: "2025-08-08", players: 25480, newUsers: 3420, revenue: 3680, sessions: 90860, week: "Week 2 Aug", month: "August 2025" },
  { date: "2025-08-15", players: 26750, newUsers: 3580, revenue: 4520, sessions: 95380, week: "Week 3 Aug", month: "August 2025" },
  { date: "2025-08-22", players: 27850, newUsers: 3720, revenue: 4980, sessions: 99260, week: "Week 4 Aug", month: "August 2025" },

  // September 2025 - Reaching target of 26,378 players (slight dip and recovery)
  { date: "2025-09-01", players: 26890, newUsers: 3580, revenue: 4680, sessions: 95870, week: "Week 1 Sep", month: "September 2025" },
  { date: "2025-09-08", players: 26150, newUsers: 3420, revenue: 4350, sessions: 93240, week: "Week 2 Sep", month: "September 2025" },
  { date: "2025-09-15", players: 26378, newUsers: 3650, revenue: 4850, sessions: 94050, week: "Week 3 Sep", month: "September 2025" },
  { date: "2025-09-22", players: 26239, newUsers: 3580, revenue: 4720, sessions: 93580, week: "Week 4 Sep", month: "September 2025" },

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