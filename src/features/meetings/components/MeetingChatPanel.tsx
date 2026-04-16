import React, { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Smile } from "lucide-react";
import { useMeetingStore } from "../stores/useMeetingStore";
import { cn } from "@/lib/utils";

export const MeetingChatPanel: React.FC = () => {
  const { messages, viewMode, sendMessage, toggleSidebar } = useMeetingStore();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isDark = viewMode === "grid";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className={cn(
      "w-80 h-full flex flex-col border-l transition-all duration-500 premium-blur z-40",
      isDark ? "bg-neutral-900/80 border-white/5" : "bg-white border-neutral-200"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-primary-500" />
          <h2 className={cn(
            "text-sm font-black uppercase tracking-widest",
            isDark ? "text-white" : "text-neutral-900"
          )}>Chat</h2>
        </div>
        <button 
          onClick={() => toggleSidebar(null)}
          className="p-1.5 rounded-lg hover:bg-white/5 text-neutral-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}>
                {msg.senderName}
              </span>
              <span className="text-[10px] text-neutral-600 font-mono italic">{msg.timestamp}</span>
            </div>
            <div className={cn(
              "p-3 rounded-2xl text-xs leading-relaxed shadow-sm",
              isDark ? "bg-white/5 text-neutral-200" : "bg-neutral-100 text-neutral-800"
            )}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-neutral-950/20">
        <div className={cn(
          "flex items-center gap-2 p-1.5 rounded-2xl border transition-all focus-within:ring-2 focus-within:ring-primary-500/30",
          isDark ? "bg-neutral-800/50 border-white/5" : "bg-neutral-50 border-neutral-200"
        )}>
          <button className="p-2 text-neutral-500 hover:text-primary-500 transition-colors">
            <Smile size={18} />
          </button>
          <input 
            type="text" 
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent border-none focus:ring-0 text-xs text-white placeholder:text-neutral-600 italic"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2.5 rounded-xl bg-primary-600 text-white hover:bg-primary-500 disabled:opacity-50 disabled:grayscale transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
