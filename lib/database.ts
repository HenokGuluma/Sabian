
export interface UserRecord {
  id: string
  username: string
  email: string
  phone: string
  bio: string
  totalGems: number
  lastActive: string
  trendingScore: number
  purchaseHistory: Array<{
    item: string
    amount: number
    date: string
  }>
  totalGamesPlayed: number
  totalGamesWon: number
  joinDate: string
  level: number
  avatar: string
}

// Generate realistic user data
const generateUserData = (count: number): UserRecord[] => {
  const users: UserRecord[] = []
  const usernames = ['GameMaster', 'ProGamer', 'PixelWarrior', 'NeonNinja', 'CyberPunk', 'StellarVoid', 'QuantumLeap', 'EpicRaider', 'MysticSage', 'TechnoViking']
  const bios = [
    'Passionate mobile gamer since 2020',
    'Competitive player looking for challenges',
    'Casual gamer enjoying new adventures',
    'Strategy game enthusiast',
    'RPG lover and guild leader',
    'Speed run specialist',
    'Puzzle game master',
    'Battle royale champion',
    'Indie game supporter',
    'Retro gaming collector'
  ]

  for (let i = 1; i <= count; i++) {
    const baseUsername = usernames[Math.floor(Math.random() * usernames.length)]
    const randomNum = Math.floor(Math.random() * 9999)
    const username = `${baseUsername}${randomNum}`
    
    const email = `${username.toLowerCase()}@${['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'][Math.floor(Math.random() * 4)]}`
    
    const phoneNum = Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
    const phone = `+251-9${phoneNum.slice(0, 8)}`
    
    const totalGamesPlayed = Math.floor(Math.random() * 1000) + 10
    const totalGamesWon = Math.floor(totalGamesPlayed * (0.3 + Math.random() * 0.4))
    
    const purchases = []
    const numPurchases = Math.floor(Math.random() * 5)
    for (let j = 0; j < numPurchases; j++) {
      purchases.push({
        item: ['Gem Pack', 'Premium Battle Pass', 'Character Skin', 'Weapon Upgrade', 'XP Booster'][Math.floor(Math.random() * 5)],
        amount: Math.floor(Math.random() * 50) + 5,
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      })
    }

    users.push({
      id: `user_${i.toString().padStart(6, '0')}`,
      username,
      email,
      phone,
      bio: bios[Math.floor(Math.random() * bios.length)],
      totalGems: Math.floor(Math.random() * 10000) + 100,
      lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      trendingScore: Math.floor(Math.random() * 1000),
      purchaseHistory: purchases,
      totalGamesPlayed,
      totalGamesWon,
      joinDate: new Date(Date.now() - Math.random() * 730 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      level: Math.floor(Math.random() * 100) + 1,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
    })
  }

  return users
}

export const userDatabase = generateUserData(16000)

// Player stats interface
export interface PlayerStats {
  id: string
  userId: string
  username: string
  averageSessionTime: number
  favoriteGameMode: string
  winRate: number
  killDeathRatio: number
  rank: string
  seasonStats: {
    season: string
    wins: number
    losses: number
    points: number
  }[]
}

// Generate player stats
const generatePlayerStats = (): PlayerStats[] => {
  return userDatabase.slice(0, 5000).map((user, index) => ({
    id: `stats_${(index + 1).toString().padStart(6, '0')}`,
    userId: user.id,
    username: user.username,
    averageSessionTime: Math.floor(Math.random() * 120) + 15,
    favoriteGameMode: ['Battle Royale', 'Team Deathmatch', 'Capture the Flag', 'Survival', 'Racing'][Math.floor(Math.random() * 5)],
    winRate: Math.floor((user.totalGamesWon / user.totalGamesPlayed) * 100),
    killDeathRatio: (Math.random() * 2 + 0.5).toFixed(2),
    rank: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'][Math.floor(Math.random() * 5)],
    seasonStats: [
      {
        season: 'Season 3',
        wins: Math.floor(Math.random() * 50) + 10,
        losses: Math.floor(Math.random() * 30) + 5,
        points: Math.floor(Math.random() * 2000) + 500
      }
    ]
  }))
}

export const playerStatsDatabase = generatePlayerStats()

// Game sessions interface
export interface GameSession {
  id: string
  userId: string
  username: string
  gameMode: string
  duration: number
  score: number
  result: 'win' | 'loss' | 'draw'
  timestamp: string
  map: string
  kills?: number
  deaths?: number
}

// Generate game sessions
const generateGameSessions = (): GameSession[] => {
  const sessions: GameSession[] = []
  const gameModes = ['Battle Royale', 'Team Deathmatch', 'Capture the Flag', 'Survival', 'Racing']
  const maps = ['Desert Storm', 'Urban Warfare', 'Forest Hunt', 'Space Station', 'Ancient Ruins']
  
  for (let i = 0; i < 50000; i++) {
    const user = userDatabase[Math.floor(Math.random() * userDatabase.length)]
    sessions.push({
      id: `session_${(i + 1).toString().padStart(6, '0')}`,
      userId: user.id,
      username: user.username,
      gameMode: gameModes[Math.floor(Math.random() * gameModes.length)],
      duration: Math.floor(Math.random() * 1800) + 300, // 5-35 minutes
      score: Math.floor(Math.random() * 5000),
      result: Math.random() > 0.5 ? 'win' : 'loss',
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      map: maps[Math.floor(Math.random() * maps.length)],
      kills: Math.floor(Math.random() * 20),
      deaths: Math.floor(Math.random() * 15)
    })
  }
  
  return sessions
}

export const gameSessionsDatabase = generateGameSessions()

// Analytics data for 7 months with growth pattern
export const analyticsData = [
  { month: 'February', players: 2100, retention: 45, newUsers: 850 },
  { month: 'March', players: 2800, retention: 52, newUsers: 1200 },
  { month: 'April', players: 3500, retention: 58, newUsers: 1450 },
  { month: 'May', players: 8200, retention: 72, newUsers: 4800 }, // Huge bump
  { month: 'June', players: 12400, retention: 78, newUsers: 5200 },
  { month: 'July', players: 15600, retention: 82, newUsers: 4800 },
  { month: 'August', players: 17278, retention: 85, newUsers: 3200 }
]
