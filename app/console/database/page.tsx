
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
import { Search, Edit, Save, Users, BarChart3, Gamepad2, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { userDatabase as users, playerStatsDatabase as playerStats, gameSessionsDatabase as gameSessions, type User, type PlayerStats, type GameSession } from "@/lib/database"
import Link from "next/link"

const ITEMS_PER_PAGE = 50;

export default function DatabasePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedPlayerStat, setSelectedPlayerStat] = useState<PlayerStats | null>(null)
  const [selectedGameSession, setSelectedGameSession] = useState<GameSession | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState<any>({})
  
  // Pagination states
  const [userPage, setUserPage] = useState(0)
  const [statsPage, setStatsPage] = useState(0)
  const [sessionsPage, setSessionsPage] = useState(0)

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber.includes(searchTerm)
  )

  const filteredPlayerStats = playerStats.filter(stat =>
    searchTerm === "" || stat.userId.includes(searchTerm) || stat.rank.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredGameSessions = gameSessions.filter(session =>
    searchTerm === "" || session.userId.includes(searchTerm) || session.gameType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination helpers
  const paginateUsers = (page: number) => {
    const start = page * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }

  const paginateStats = (page: number) => {
    const start = page * ITEMS_PER_PAGE;
    return filteredPlayerStats.slice(start, start + ITEMS_PER_PAGE);
  }

  const paginateSessions = (page: number) => {
    const start = page * ITEMS_PER_PAGE;
    return filteredGameSessions.slice(start, start + ITEMS_PER_PAGE);
  }

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

  const PaginationControls = ({ 
    currentPage, 
    totalItems, 
    onPageChange, 
    label 
  }: { 
    currentPage: number; 
    totalItems: number; 
    onPageChange: (page: number) => void; 
    label: string;
  }) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startItem = currentPage * ITEMS_PER_PAGE + 1;
    const endItem = Math.min((currentPage + 1) * ITEMS_PER_PAGE, totalItems);

    return (
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700">
        <div className="text-sm text-slate-400">
          Showing {startItem} to {endItem} of {totalItems} {label}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-slate-300">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage >= totalPages - 1}
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/console">
              <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Console
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Database Console</h1>
              <p className="text-slate-300">Browse and manage your game database</p>
            </div>
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
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-700 text-white">
              <Users className="h-4 w-4 mr-2" />
              Users ({users.length.toLocaleString()})
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-slate-700 text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Player Stats ({playerStats.length.toLocaleString()})
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-slate-700 text-white">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Game Sessions ({gameSessions.length.toLocaleString()})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">User Database</CardTitle>
                <CardDescription className="text-slate-300">
                  Manage user accounts and profiles ({filteredUsers.length.toLocaleString()} total users)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700 bg-slate-800/80">
                        <TableHead className="text-slate-200 font-semibold">Username</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Email</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Phone</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Age</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Gems</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Last Active</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginateUsers(userPage).map((user) => (
                        <TableRow key={user.id} className="border-slate-700 hover:bg-slate-700/30">
                          <TableCell className="text-white font-medium">{user.username}</TableCell>
                          <TableCell className="text-slate-300">{user.email}</TableCell>
                          <TableCell className="text-slate-300">{user.phoneNumber}</TableCell>
                          <TableCell className="text-slate-300">{user.age}</TableCell>
                          <TableCell className="text-slate-300">{user.totalGems.toLocaleString()}</TableCell>
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
                              <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-xl">User Details: {selectedUser?.username}</DialogTitle>
                                  <DialogDescription className="text-slate-300">
                                    View and edit user information
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedUser && (
                                  <div className="space-y-6">
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
                                          <Label className="text-white">Age</Label>
                                          <Input
                                            type="number"
                                            value={editData.age || selectedUser.age}
                                            onChange={(e) => setEditData({...editData, age: parseInt(e.target.value)})}
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
                                        <div>
                                          <Label className="text-white">City</Label>
                                          <Input
                                            value={editData.city || selectedUser.city}
                                            onChange={(e) => setEditData({...editData, city: e.target.value})}
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
                                          <Button variant="outline" onClick={() => setEditMode(false)} className="border-slate-600 text-white hover:bg-slate-700">
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                          <div>
                                            <Label className="text-slate-400">Username</Label>
                                            <p className="text-white font-medium text-lg">{selectedUser.username}</p>
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
                                            <Label className="text-slate-400">Age</Label>
                                            <p className="text-white">{selectedUser.age} years old</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Location</Label>
                                            <p className="text-white">{selectedUser.city}, {selectedUser.region}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Total Gems</Label>
                                            <p className="text-white font-semibold text-lg text-yellow-400">{selectedUser.totalGems.toLocaleString()}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Games Played</Label>
                                            <p className="text-white">{selectedUser.totalGamesPlayed.toLocaleString()}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Games Won</Label>
                                            <p className="text-white">{selectedUser.totalGamesWon.toLocaleString()}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Win Rate</Label>
                                            <p className="text-white">{((selectedUser.totalGamesWon / selectedUser.totalGamesPlayed) * 100).toFixed(1)}%</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Level</Label>
                                            <p className="text-white font-semibold">{selectedUser.level}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Trending Score</Label>
                                            <Badge className="bg-pink-600">{selectedUser.trendingScore}</Badge>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Status</Label>
                                            <Badge className={selectedUser.status === 'online' ? 'bg-green-600' : 'bg-gray-600'}>
                                              {selectedUser.status}
                                            </Badge>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Last Active</Label>
                                            <p className="text-white">{new Date(selectedUser.lastActive).toLocaleString()}</p>
                                          </div>
                                          <div>
                                            <Label className="text-slate-400">Join Date</Label>
                                            <p className="text-white">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                                          </div>
                                        </div>
                                        <div>
                                          <Label className="text-slate-400">Bio</Label>
                                          <p className="text-white bg-slate-700/30 p-3 rounded-lg mt-1">{selectedUser.bio}</p>
                                        </div>
                                        <Separator className="bg-slate-700" />
                                        <div>
                                          <Label className="text-slate-400">Purchase History</Label>
                                          <div className="space-y-2 mt-3">
                                            {selectedUser.purchaseHistory.map((purchase, index) => (
                                              <div key={index} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                                                <div>
                                                  <span className="text-white font-medium">{purchase.item}</span>
                                                  <p className="text-slate-400 text-sm">{purchase.date}</p>
                                                </div>
                                                <span className="text-green-400 font-semibold">${purchase.amount}</span>
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
                </div>
                <PaginationControls
                  currentPage={userPage}
                  totalItems={filteredUsers.length}
                  onPageChange={setUserPage}
                  label="users"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Player Statistics</CardTitle>
                <CardDescription className="text-slate-300">
                  View player performance and progression data ({filteredPlayerStats.length.toLocaleString()} total records)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700 bg-slate-800/80">
                        <TableHead className="text-slate-200 font-semibold">Username</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Level</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Rank</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Best Score</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Win Rate</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginateStats(statsPage).map((stat) => (
                        <TableRow key={stat.id} className="border-slate-700 hover:bg-slate-700/30">
                          <TableCell className="text-white font-medium">{stat.username}</TableCell>
                          <TableCell className="text-slate-300">{stat.level}</TableCell>
                          <TableCell>
                            <Badge className="bg-cyan-600">{stat.rank}</Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{stat.bestScore.toLocaleString()}</TableCell>
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
                </div>
                <PaginationControls
                  currentPage={statsPage}
                  totalItems={filteredPlayerStats.length}
                  onPageChange={setStatsPage}
                  label="stats"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Game Sessions</CardTitle>
                <CardDescription className="text-slate-300">
                  Browse game session data and analytics ({filteredGameSessions.length.toLocaleString()} total sessions)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700 bg-slate-800/80">
                        <TableHead className="text-slate-200 font-semibold">Session ID</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Username</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Game Type</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Duration</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Result</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Score</TableHead>
                        <TableHead className="text-slate-200 font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginateSessions(sessionsPage).map((session) => (
                        <TableRow key={session.id} className="border-slate-700 hover:bg-slate-700/30">
                          <TableCell className="text-white font-medium">#{session.id}</TableCell>
                          <TableCell className="text-slate-300">{session.username}</TableCell>
                          <TableCell className="text-slate-300">{session.gameType}</TableCell>
                          <TableCell className="text-slate-300">{session.duration}m</TableCell>
                          <TableCell>
                            <Badge className={
                              session.result === 'win' ? 'bg-green-600' : 
                              session.result === 'loss' ? 'bg-red-600' : 'bg-yellow-600'
                            }>
                              {session.result}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{session.score.toLocaleString()}</TableCell>
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
                </div>
                <PaginationControls
                  currentPage={sessionsPage}
                  totalItems={filteredGameSessions.length}
                  onPageChange={setSessionsPage}
                  label="sessions"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
