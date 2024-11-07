"use client";

import { useState } from "react";
import { Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/providers/AuthProvider";
import { EditLimitModal } from "@/components/modals/edit-limit-modal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI assistant. How would you like to customize your website?",
    },
  ]);
  const [input, setInput] = useState("");
  const [showEditLimitModal, setShowEditLimitModal] = useState(false);
  const { user, decrementEdits } = useAuth();

  const handleSend = () => {
    if (!input.trim()) return;

    if (user?.editsRemaining === 0) {
      setShowEditLimitModal(true);
      return;
    }

    decrementEdits();
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content:
          "I'll help you customize that. What specific changes would you like to make?",
      },
    ]);
    setInput("");
  };

  const handleRestart = () => {
    if (user?.editsRemaining === 0) {
      setShowEditLimitModal(true);
      return;
    }

    decrementEdits();
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm your AI assistant. How would you like to customize your website?",
      },
    ]);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="font-semibold">AI Customization Chat</h2>
        <Button variant="ghost" size="sm" onClick={handleRestart}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Restart
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your customization request..."
              className="min-h-[60px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button onClick={handleSend} className="px-3">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {user && (
              <p>
                Edits remaining: {user.editsRemaining}/{user.totalEdits}
              </p>
            )}
          </div>
        </div>
      </div>
      <EditLimitModal
        open={showEditLimitModal}
        onOpenChange={setShowEditLimitModal}
      />
    </div>
  );
}
