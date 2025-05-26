import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { maggieKnowledgeBase } from "./maggieChatbotData";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const MaggieChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm Maggie. You can ask me questions, request a poem, or ask for a short story about me!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateResponse(input);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const normalizedInput = userInput.toLowerCase();
    
    // Check for poem request
    if (normalizedInput.includes("poem") || normalizedInput.includes("poetry")) {
      return getRandomItem(maggieKnowledgeBase.poems);
    }
    
    // Check for story request
    if (normalizedInput.includes("story") || normalizedInput.includes("tell me about")) {
      return getRandomItem(maggieKnowledgeBase.stories);
    }
    
    // Check for greetings
    if (
      normalizedInput.includes("hello") || 
      normalizedInput.includes("hi") || 
      normalizedInput.includes("hey")
    ) {
      return getRandomItem(maggieKnowledgeBase.greetings);
    }
    
    // Check for questions about Maggie
    for (const qa of maggieKnowledgeBase.questionsAndAnswers) {
      for (const keyword of qa.keywords) {
        if (normalizedInput.includes(keyword)) {
          return qa.answer;
        }
      }
    }
    
    // Default response if no match is found
    return getRandomItem(maggieKnowledgeBase.fallbacks);
  };

  const getRandomItem = (items: string[]): string => {
    return items[Math.floor(Math.random() * items.length)];
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-purple-200">
      <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl font-['Comic_Neue']">
          <Bot className="h-6 w-6 text-indigo-600" />
          Chat with Maggie
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[350px] p-4">
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.sender === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "bg-purple-100 text-gray-800"
                )}
              >
                <div className="flex items-center gap-2">
                  {message.sender === "bot" ? (
                    <img 
                      src="/lovable-uploads/22798029-d558-453e-8673-fa3d5ec62840.png" 
                      alt="Maggie" 
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="font-semibold">
                    {message.sender === "user" ? "You" : "Maggie"}
                  </span>
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-purple-100 text-gray-800">
                <div className="flex items-center gap-2">
                  <img 
                    src="/lovable-uploads/22798029-d558-453e-8673-fa3d5ec62840.png" 
                    alt="Maggie" 
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="font-semibold">Maggie</span>
                </div>
                <div className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder="Ask Maggie a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default MaggieChatbot;