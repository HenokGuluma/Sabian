
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, Edit, Save, Users, BarChart3, GameController2 } from "lucide-react"
import { users, playerStats, gameSessions, type User, type PlayerStats, type GameSession } from "@/lib/database"

export default function DatabasePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedPlayerStat, setSelectedPlayerStat] = useState<PlayerStats | null>(null)
  const [selectedGameSession, setSelectedGameSession] = useState<GameSession | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState<any>({})

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber.includes(searchTerm)
  )

  const filteredPlayerStats = playerStats.filter(stat =>
    searchTerm === "" || stat.userId.includes(searchTerm) || stat.rank.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredGameSessions = gameSessions.filter(session =>
    searchTerm === "" || session.userId.includes(searchTerm) || session.gameMode.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (item: any, type: string) => {
    setEditData({ ...item })
    setEditMode(true)
  }

  const handleSave = () => {
    // In a real application, this would save to the actual database
    console.log("Saving:", editData)
    setEditMode(false)
    // Update the selected item with new data
    if (selectedUser) setSelectedUser(editData)
    if (selectedPlayerStat) setSelectedPlayerStat(editData)
    if (selectedGameSession) setSelectedGameSession(editData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Database Console</h1>
            <p className="text-slate-300">Browse and manage your game database</p>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search users, stats, sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-700">
              <Users className="h-4 w-4 mr-2" />
              Users ({users.length})
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-slate-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Player Stats ({playerStats.length})
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-slate-700">
              <GameController2 className="h-4 w-4 mr-2" />
              Game Sessions ({gameSessions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">User Database</CardTitle>
                <CardDescription className="text-slate-300">
                  Manage user accounts and profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Username</TableHead>
                        <TableHead className="text-slate-300">Email</TableHead>
                        <TableHead className="text-slate-300">Phone</TableHead>
                        <TableHead className="text-slate-300">Gems</TableHead>
                        <TableHead className="text-slate-300">Last Active</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.slice(0, 50).map((user) => (
                        <TableRow key={user.id} className="border-slate-700">
                          <TableCell className="text-white font-medium">{user.username}</TableCell>
                          <TableCell className="text-slate-300">{user.email}</TableCell>
                          <TableCell className="text-slate-300">{user.phoneNumber}</TableCell>
                          <TableCell className="text-slate-300">{user.totalGems}</TableCell>
                          <TableCell className="text-slate-300">
                            {new Date(user.lastActive).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedUser(user)}
                                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>User Details: {selectedUser?.username}</DialogTitle>
                                  <DialogDescription className="text-slate-300">
                                    View and edit user information
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedUser && (
                                  <div className="space-y-4">
                                    {editMode ? (
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-white">Username</Label>
                                          <Input
                                            value={editData.username || selectedUser.username}
                                            onChange={(e) => setEditData({...editData, username: e.target.value})}
                                            className="bg-slate-700 border-slate-600 text-white"
                                          />
                                        </div>
                                        <div>
                                          <Label className="text-white">Email</Label>
                                          <Input
                                            value={editData.email || selectedUser.email}
                                            onChange={(e) => setEditData({...editData, email: e.target.value})}
                                            className="bg-slate-700 border-slate-600 text-white"
                                          />
                                        </div>
                                        <div>
                                          <Label className="text-white">Phone</Label>
                                          <Input
                                            value={editData.phoneNumber || selectedUser.phoneNumber}
                                            onChange={(e) => setEditData({...editData, phoneNumber: e.target.value})}
                                            className="bg-slate-700 border-slate-600 text-white"
                                          />
                                        </div>
                                        <div>
                                          <Label className="text-white">Total Gems</Label>
                                          <Input
                                            type="number"
                                            value={editData.totalGems || selectedUser.totalGems}
                                            onChange={(e) => setEditData({...editData, totalGems: parseInt(e.target.value)})}
                                            className="bg-slate-700 border-slate-600 text-white"
                                          />
                                        </div>
                                        <div className="col-span-2">
                                          <Label className="text-white">Bio</Label>
                                          <Textarea
                                            value={editData.bio || selectedUser.bio}
                                            onChange={(e) => setEditData({...editData, bio: e.target.value})}
                                            className="bg-slate-700 border-slate-600 text-white"
                                          />
                                        </div>
                                        <div className="col-span-2 flex space-x-2">
                                          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                          </Button>
                                          <Button variant="outline" onClick={() => setEditMode(false)}>
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <Label className="text-slate-400">Username</Label>
                                            <p className="text-white font-medium">{selectedUser.username}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Email</Label>
                                            <p className="text-white">{selectedUser.email}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Phone</Label>
                                            <p className="text-white">{selectedUser.phoneNumber}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Total Gems</Label>
                                            <p className="text-white">{selectedUser.totalGems}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Games Played</Label>
                                            <p className="text-white">{selectedUser.totalGamesPlayed}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Games Won</Label>
                                            <p className="text-white">{selectedUser.totalGamesWon}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Trending Score</Label>
                                            <Badge className="bg-pink-600">{selectedUser.trendingScore}</Badge>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Last Active</Label>
                                            <p className="text-white">{new Date(selectedUser.lastActive).toLocaleDateString()}</p>
                                          </div>
                                        </div>
                                        <div>
                                          <Label className="text-slate-400">Bio</Label>
                                          <p className="text-white">{selectedUser.bio}</p>
                                        </div>
                                        <Separator className="bg-slate-700" />
                                        <div>
                                          <Label className="text-slate-400">Purchase History</Label>
                                          <div className="space-y-2 mt-2">
                                            {selectedUser.purchaseHistory.map((purchase, index) => (
                                              <div key={index} className="flex justify-between items-center bg-slate-700/50 p-2 rounded">
                                                <span className="text-white">{purchase.item}</span>
                                                <span className="text-slate-300">${purchase.amount} - {purchase.date}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <Button onClick={() => handleEdit(selectedUser, 'user')} className="bg-blue-600 hover:bg-blue-700">
                                          <Edit className="h-4 w-4 mr-2" />
                                          Edit User
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Player Statistics</CardTitle>
                <CardDescription className="text-slate-300">
                  View player performance and progression data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">User ID</TableHead>
                        <TableHead className="text-slate-300">Level</TableHead>
                        <TableHead className="text-slate-300">Rank</TableHead>
                        <TableHead className="text-slate-300">K/D Ratio</TableHead>
                        <TableHead className="text-slate-300">Win Rate</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPlayerStats.slice(0, 50).map((stat) => (
                        <TableRow key={stat.id} className="border-slate-700">
                          <TableCell className="text-white font-medium">{stat.userId}</TableCell>
                          <TableCell className="text-slate-300">{stat.level}</TableCell>
                          <TableCell>
                            <Badge className="bg-cyan-600">{stat.rank}</Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{stat.killDeathRatio}</TableCell>
                          <TableCell className="text-slate-300">{stat.winRate}%</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedPlayerStat(stat)}
                              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Game Sessions</CardTitle>
                <CardDescription className="text-slate-300">
                  Browse game session data and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Session ID</TableHead>
                        <TableHead className="text-slate-300">User ID</TableHead>
                        <TableHead className="text-slate-300">Game Mode</TableHead>
                        <TableHead className="text-slate-300">Duration</TableHead>
                        <TableHead className="text-slate-300">Result</TableHead>
                        <TableHead className="text-slate-300">Score</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGameSessions.slice(0, 50).map((session) => (
                        <TableRow key={session.id} className="border-slate-700">
                          <TableCell className="text-white font-medium">{session.id}</TableCell>
                          <TableCell className="text-slate-300">{session.userId}</TableCell>
                          <TableCell className="text-slate-300">{session.gameMode}</TableCell>
                          <TableCell className="text-slate-300">{Math.floor(session.duration / 60)}m</TableCell>
                          <TableCell>
                            <Badge className={
                              session.result === 'win' ? 'bg-green-600' : 
                              session.result === 'loss' ? 'bg-red-600' : 'bg-yellow-600'
                            }>
                              {session.result}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{session.score}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedGameSession(session)}
                              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
