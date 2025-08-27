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
  // February 2025 - slow start
  { month: 'Feb 2025', players: 1200, revenue: 890, sessions: 2400, retention: 45 },
  // March 2025 - slight growth
  { month: 'Mar 2025', players: 1850, revenue: 1340, sessions: 3700, retention: 52 },
  // April 2025 - steady growth
  { month: 'Apr 2025', players: 2900, revenue: 2100, sessions: 5800, retention: 58 },
  // May 2025 - huge bump starts here
  { month: 'May 2025', players: 8500, revenue: 6200, sessions: 17000, retention: 67 },
  // June 2025 - continued growth
  { month: 'Jun 2025', players: 12400, revenue: 9800, sessions: 24800, retention: 73 },
  // July 2025 - strong growth
  { month: 'Jul 2025', players: 16800, revenue: 14500, sessions: 33600, retention: 78 },
  // August 2025 - approaching peak
  { month: 'Aug 2025', players: 19200, revenue: 18400, sessions: 38400, retention: 80 },
  // September 2025 - peak
  { month: 'Sep 2025', players: 17278, revenue: 15800, sessions: 34556, retention: 85 }
];

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