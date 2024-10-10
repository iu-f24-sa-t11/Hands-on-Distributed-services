import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { register, login, getFeed, postMessage, setLike, unsetLike } from './api/requests.ts';

// Интерфейс для сообщения
interface Message {
  id: string;
  content: string;
  author_username: string;
  created_at: string;
  liked_by_usernames: string[];
  likes: number;
  liked: boolean;
}

export default function Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      getFeed().then(response => {
        // Форматируем сообщения для удобства работы с ними
        const formattedMessages = response.data.map((msg: Message) => ({
          ...msg,
          liked: msg.liked_by_usernames.includes(username), // Проверка, лайкнул ли пользователь это сообщение
          likes: msg.liked_by_usernames.length, // Количество лайков
        }));
        setMessages(formattedMessages);
      }).catch(error => {
        console.error("Error fetching feed:", error);
      });
    }
  }, [isLoggedIn, username]);

  const handleLogin = () => {
    if (username.trim()) {
      login(username)
        .then(() => {
          setIsLoggedIn(true);
          setIsDialogOpen(false);
        })
        .catch(error => {
          console.error("Login error:", error);
        });
    }
  };

  const handleRegister = () => {
    if (username.trim()) {
      register(username)
        .then(() => {
          setIsLoggedIn(true);
          setIsDialogOpen(false);
        })
        .catch(error => {
          console.error("Registration error:", error);
        });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      postMessage(newMessage, username)
        .then(response => {
          const newMsg: Message = {
            ...response.data,
            liked_by_usernames: [], // Новое сообщение ещё не имеет лайков
            liked: false,
            likes: 0,
          };
          setMessages([newMsg, ...messages]);
          setNewMessage("");
        })
        .catch(error => {
          console.error("Error sending message:", error);
        });
    }
  };

  const handleLike = (id: string, liked: boolean) => {
    const apiAction = liked ? unsetLike : setLike;
    apiAction(id, username)
      .then(() => {
        setMessages(messages.map(msg =>
          msg.id === id
            ? { ...msg, likes: liked ? msg.likes - 1 : msg.likes + 1, liked: !msg.liked }
            : msg
        ));
      })
      .catch(error => {
        console.error("Error setting like:", error);
      });
  };

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
                    <Button variant="secondary" onClick={handleRegister}>Register</Button>
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
                <p className="font-semibold text-gray-800">{message.author_username}</p>
                <p className="text-gray-600">{message.content}</p>
                <div className="flex items-center text-gray-500">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-0 hover:bg-transparent ${message.liked ? 'text-red-500' : ''}`}
                    onClick={() => handleLike(message.id, message.liked)}
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
  );
}
