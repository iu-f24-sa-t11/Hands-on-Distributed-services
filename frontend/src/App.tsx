import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { register, login, getFeed, postMessage, setLike, unsetLike } from './api/requests.ts';

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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
      getFeed().then(response => {
        const formattedMessages = response.data.map((msg: Message) => ({
          ...msg,
          liked: msg.liked_by_usernames.includes(username),
          likes: msg.liked_by_usernames.length,
        }));
        setMessages(formattedMessages);
      }).catch(error => {
        console.error("Error fetching feed:", error);
      });
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (username.trim()) {
      login(username)
        .then(() => {
          sessionStorage.setItem("username", username);
          setIsLoggedIn(true);
          setIsDialogOpen(false);
          setErrorMessage("");
          setSuccessMessage("");
        })
        .catch(error => {
            if (error.response.status == 404){
                setErrorMessage("You need registration before Log In")
            }
            console.log(error.message)
        });
    }
  };

  const handleRegister = () => {
    if (username.trim()) {
      register(username)
        .then(() => {
            setSuccessMessage("You successfully register, now you can Log In");
            setErrorMessage("");
        })
        .catch(error => {
          setErrorMessage(error.message)
        });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    sessionStorage.removeItem("username");
  };

const handleSendMessage = () => {
    if (newMessage.trim()) {
      postMessage(newMessage, username)
        .then(response => {
          const newMsg: Message = {
            ...response.data,
            liked_by_usernames: [],
            liked: false,
            likes: 0,
          };

          const updatedMessages = [newMsg, ...messages];
          if (updatedMessages.length > 10) {
            updatedMessages.pop();
          }

          setMessages(updatedMessages);
          setNewMessage("");
        })
        .catch(error => {
          console.error("Error sending message:", error);
        });
    }
  };

  const handleLike = (id: string, liked: boolean) => {
    if (isLoggedIn) {
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
    } else {
      setIsDialogOpen(() => true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Blue Cactus</h1>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>Log Out</Button>
            </div>
          ) : (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">Log In</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Log In or Register</DialogTitle>
                </DialogHeader>
                <DialogDescription>You need to Log In to write and like messages</DialogDescription>
                {errorMessage &&
                  <DialogDescription className="text-red-500">{errorMessage}</DialogDescription>
                }
                {successMessage &&
                  <DialogDescription className="text-blue-600">{successMessage}</DialogDescription>
                }
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
                    <Button onClick={handleLogin}>Log In</Button>
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
