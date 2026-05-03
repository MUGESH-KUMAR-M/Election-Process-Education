import { useState, useRef, useEffect, useMemo } from 'react';
import { Send, User, Bot, Loader2, Key, XCircle, AlertTriangle } from 'lucide-react';
import { useGemini } from '../hooks/useGemini';
import { validateGeminiAPIKey, validateUserInput } from '../utils/validation';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hello! I'm VoteWise AI. I can help you understand any part of the election process. What would you like to know?" }
  ]);
  const [validationError, setValidationError] = useState(null);
  
  const { sendMessage, loading, error } = useGemini(apiKey);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSaveKey = () => {
    const validation = validateGeminiAPIKey(apiKey);
    
    if (!validation.isValid) {
      setValidationError(validation.error);
      return;
    }
    
    localStorage.setItem('gemini_api_key', apiKey.trim());
    setShowKeyInput(false);
    setValidationError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Validate user input
    const validation = validateUserInput(input);
    if (!validation.isValid) {
      setValidationError(validation.error);
      return;
    }

    const userMessage = { role: 'user', text: validation.sanitized };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setValidationError(null);

    // Limit history to last 10 messages to optimize token usage and context
    const historyLimit = 10;
    const history = messages.slice(-historyLimit).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await sendMessage(validation.sanitized, history);
    if (response) {
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    }
  };

  // Memoize rendered messages for performance
  const renderedMessages = useMemo(() => (
    messages.map((m, i) => (
      <motion.div 
        key={i} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className={`flex gap-3 md:gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
      >
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-surface border border-white/10'}`}>
          {m.role === 'user' ? <User size={16} className="md:w-5 md:h-5" /> : <Bot size={16} className="md:w-5 md:h-5 text-primary" />}
        </div>
        <div className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-primary text-white rounded-tr-md' : 'bg-surface text-slate-200 border border-white/10 rounded-tl-md'}`}>
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">{m.text}</p>
        </div>
      </motion.div>
    ))
  ), [messages]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-12rem)] min-h-[500px]">
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-outfit font-semibold">AI Election Assistant</h2>
        <button 
          onClick={() => setShowKeyInput(true)}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-white/5 self-start sm:self-auto"
        >
          <Key size={14} /> {apiKey ? 'Update API Key' : 'Setup API Key'}
        </button>
      </div>

      <AnimatePresence>
        {showKeyInput && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass-card mb-4 overflow-hidden border-amber-500/20 bg-amber-500/5"
          >
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="text-amber-400 mt-0.5 flex-shrink-0" size={16} />
              <p className="text-sm text-slate-300">
                A Gemini API Key is required for the assistant. 
                Get one from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline underline-offset-2">Google AI Studio</a>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste API Key here..."
                aria-label="Google Gemini API Key"
                className="flex-grow bg-slate-900/50 border border-white/20 rounded-xl px-4 py-3 focus:border-amber-400 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-500"
              />
              <button onClick={handleSaveKey} className="btn btn-primary whitespace-nowrap">Save Key</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow glass-card mb-4 overflow-hidden flex flex-col min-h-0">
        <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Bot size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">Welcome to VoteWise AI</h3>
              <p className="text-slate-400 max-w-md">Ask me anything about the election process. I'm here to help you understand democracy!</p>
            </div>
          ) : (
            renderedMessages
          )}
          {loading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 md:gap-4"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 bg-surface border border-white/10">
                <Bot size={16} className="md:w-5 md:h-5 text-primary" />
              </div>
              <div className="bg-surface p-3 md:p-4 rounded-2xl rounded-tl-md border border-white/10 flex items-center gap-2 shadow-sm">
                <Loader2 className="animate-spin text-primary" size={16} />
                <span className="text-slate-400 text-sm">Thinking...</span>
              </div>
            </motion.div>
          )}
          {validationError && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-center text-sm mx-auto max-w-md"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <XCircle size={16} />
                <span className="font-medium">Validation Error</span>
              </div>
              {validationError}
            </motion.div>
          )}
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-center text-sm mx-auto max-w-md"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <XCircle size={16} />
                <span className="font-medium">Assistant Error</span>
              </div>
              {error}
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative flex-shrink-0">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={apiKey ? "Ask about the election process..." : "Please setup API key first"}
            disabled={!apiKey || loading}
            aria-label="Ask the AI assistant a question"
            className="w-full bg-slate-800/50 border border-white/20 rounded-2xl px-4 md:px-6 py-3 md:py-4 pr-12 md:pr-16 focus:border-primary focus:bg-slate-800 outline-none transition-all shadow-xl placeholder:text-slate-500 text-sm md:text-base disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim() || !apiKey}
            aria-label="Send message"
            className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl hover:bg-primary-hover active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Send size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">Process information is powered by Gemini AI</p>
      </form>
    </div>
  );
};

export default AIAssistant;
