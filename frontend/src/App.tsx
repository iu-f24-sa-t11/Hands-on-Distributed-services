import {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card";
import {Heart} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {getFeed, login, postMessage, register, setLike, unsetLike} from './api/requests.ts';
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

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

    function clearErrorMessageAndSuccessMessage() {
        setErrorMessage("");
        setSuccessMessage("");
    }

    function setErrorMessageAndClearSuccessMessage(message: string) {
        setErrorMessage(message);
        setSuccessMessage("");
    }

    function setSuccessMessageAndClearErrorMessage(message: string) {
        setErrorMessage("");
        setSuccessMessage(message);
    }

    const handleLogin = () => {
        if (username.trim()) {
            login(username)
                .then(() => {
                    sessionStorage.setItem("username", username);
                    setIsLoggedIn(true);
                    setIsDialogOpen(false);
                    clearErrorMessageAndSuccessMessage();
                })
                .catch(error => {
                    if (error.response.status == 404) {
                        setErrorMessageAndClearSuccessMessage("You need registration before Log In")
                    } else if (error.response.status == 422) {
                        setErrorMessageAndClearSuccessMessage("Username does not meet the requirements")
                    } else {
                        setErrorMessageAndClearSuccessMessage("Something went wrong")
                    }
                    console.log(error.message)
                });
        }
    };

    const handleRegister = () => {
        if (username.trim()) {
            register(username)
                .then(() => {
                    setSuccessMessageAndClearErrorMessage("You successfully register, now you can Log In");
                })
                .catch(error => {
                    if (error.response.status == 400) {
                        setErrorMessageAndClearSuccessMessage("User already exists")
                    } else if (error.response.status == 422) {
                        setErrorMessageAndClearSuccessMessage("Username does not meet the requirements")
                    } else {
                        setErrorMessageAndClearSuccessMessage("Something went wrong")
                    }
                    console.log(error.message)
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
                            ? {...msg, likes: liked ? msg.likes - 1 : msg.likes + 1, liked: !msg.liked}
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
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen">
            <header className="shadow-sm bg-zinc-100 dark:bg-zinc-900">
                <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Blue Cactus</h1>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-lg">{username}</span>
                                <Button variant="outline" size="default" onClick={handleLogout}>Log Out</Button>
                            </div>
                        ) : (
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button size="default">Log In</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Log In or Register</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-2 py-4">
                                        <DialogDescription>You need to Log In to write and like messages</DialogDescription>
                                        <DialogDescription>Username must be 3-30 characters long, containing only letters,
                                            numbers, and underscores.</DialogDescription>
                                        {errorMessage &&
                                            <DialogDescription className="text-red-500">{errorMessage}</DialogDescription>
                                        }
                                        {successMessage &&
                                            <DialogDescription
                                                className="text-blue-600">{successMessage}</DialogDescription>
                                        }
                                    </div>
                                    <div className="grid gap-4 py-4">
                                        <Input
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                            <Button variant="default" onClick={handleLogin}>Log In</Button>
                                            <Button variant="secondary" onClick={handleRegister}>Register</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                {isLoggedIn && (
                    <div className="mb-8 flex space-x-2">
                        <Input
                            type="text"
                            placeholder="What's happening? (max 400 characters)"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-grow"
                        />
                        <Button onClick={handleSendMessage}>Send</Button>
                    </div>
                )}

                <div className="space-y-4">
                    {messages.map((message) => (
                        <Card key={message.id} className="p-4 rounded-xl break-words">
                            <div className="space-y-2">
                                <p className="font-semibold">{message.author_username}</p>
                                <p className="">{message.content}</p>
                                <div className="flex items-center">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`p-0 hover:bg-transparent ${message.liked ? 'text-red-500' : ''}`}
                                        onClick={() => handleLike(message.id, message.liked)}
                                    >
                                        <Heart className="w-4 h-4 mr-1" fill={message.liked ? "currentColor" : "none"}/>
                                        <span>{message.likes}</span>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
        </ThemeProvider>
    );
}
