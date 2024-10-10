import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const mockMessages = [
  { id: 1, author: "JohnDoe", content: "Just had a great coffee! ☕", likes: 5, liked: false },
  { id: 2, author: "JaneSmith", content: "Working on a new project. Excited!", likes: 8, liked: false },
  { id: 3, author: "BobJohnson", content: "Beautiful day for a walk 🌳", likes: 3, liked: false },
]

export default function Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleLogin = () => {
    if (username.trim()) {
      setIsLoggedIn(true)
      setIsDialogOpen(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        { id: messages.length + 1, author: username, content: newMessage, likes: 0, liked: false },
        ...messages
      ])
      setNewMessage("")
    }
  }

  const handleLike = (id: number) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, likes: msg.liked ? msg.likes - 1 : msg.likes + 1, liked: !msg.liked } : msg
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">MiniBird</h1>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>Log Out</Button>
            </div>
          ) : (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">Sign In</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Sign In or Register</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleLogin}>Sign In</Button>
                    <Button variant="secondary" onClick={handleLogin}>Register</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {isLoggedIn && (
          <div className="mb-8 flex space-x-2">
            <Input
              type="text"
              placeholder="What's happening?"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className="p-4 rounded-xl">
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">{message.author}</p>
                <p className="text-gray-600">{message.content}</p>
                <div className="flex items-center text-gray-500">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-0 hover:bg-transparent ${message.liked ? 'text-red-500' : ''}`}
                    onClick={() => handleLike(message.id)}
                  >
                    <Heart className="w-4 h-4 mr-1" fill={message.liked ? "currentColor" : "none"} />
                    <span>{message.likes}</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
