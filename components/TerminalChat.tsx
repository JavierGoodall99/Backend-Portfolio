import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal as TerminalIcon, Minimize2, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const TerminalChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Saidi AI Assistant v1.0.4 initialized.\nAsk me anything about his tech stack or experience.', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(history, userMsg.text);
      
      setMessages(prev => [...prev, {
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Error: Connection refused. Check API status.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 p-4 rounded-full shadow-2xl border border-terminal-green/30 backdrop-blur-sm transition-all duration-300
          ${isOpen ? 'bg-transparent opacity-0 pointer-events-none' : 'bg-terminal-dark/80 text-terminal-green'}
        `}
      >
        <TerminalIcon size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-8 right-4 left-4 md:left-auto md:right-8 md:w-[450px] h-[500px] z-50 flex flex-col rounded-lg overflow-hidden border border-terminal-border shadow-2xl font-mono text-sm bg-black/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-terminal-border/20 border-b border-terminal-border select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-terminal-gray text-xs">user@saidi-portfolio:~</span>
              </div>
              <div className="flex items-center gap-2 text-terminal-gray">
                 <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded p-3 ${
                    msg.role === 'user' 
                      ? 'bg-terminal-border/50 text-white border border-terminal-border' 
                      : 'text-terminal-green'
                  }`}>
                    {msg.role === 'model' && <span className="mr-2 opacity-50 select-none">{'>'}</span>}
                    <span className="whitespace-pre-wrap">{msg.text}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1 text-terminal-green pl-2">
                  <span className="w-1.5 h-1.5 bg-terminal-green animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-terminal-green animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-terminal-green animate-bounce delay-200" />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-terminal-border bg-black/50">
              <div className="flex items-center gap-2">
                <span className="text-terminal-green animate-pulse">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Execute command..."
                  autoFocus
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-terminal-gray/50 font-mono"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="text-terminal-gray hover:text-terminal-green disabled:opacity-30 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
