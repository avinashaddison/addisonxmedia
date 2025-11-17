import { useState } from "react";
import whatsappLogo from "@assets/logo_1763308610856.png";
import { X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "919709707311";
  
  const predefinedMessages = [
    "Hi! I need help with Web Development",
    "I'm interested in Digital Marketing services",
    "I'd like to know about your pricing",
    "Can you help me with SEO?",
  ];

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message || "Hi! I'm interested in your services.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setMessage("");
  };

  const handlePredefinedMessage = (msg: string) => {
    setMessage(msg);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 group"
        data-testid="button-whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse"></div>
          
          {/* Icon Container */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-green-500/50 active:scale-95">
            <img
              src={whatsappLogo}
              alt="WhatsApp"
              className="w-full h-full rounded-full"
            />
          </div>
        </div>

        {/* Tooltip - Hidden on mobile */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
          <div className="bg-slate-900 dark:bg-slate-800 text-white text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
            Chat with us on WhatsApp
            <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-slate-900 dark:border-t-slate-800"></div>
          </div>
        </div>
      </button>

      {/* Chat Widget Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            data-testid="whatsapp-backdrop"
          />
          
          {/* Chat Widget */}
          <div 
            className="fixed bottom-44 right-4 md:bottom-24 md:right-6 w-[calc(100%-2rem)] md:w-96 bg-background dark:bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
            data-testid="whatsapp-chat-widget"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={whatsappLogo}
                  alt="WhatsApp"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg">AddisonX Media</h3>
                  <p className="text-green-100 text-sm">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                data-testid="button-close-whatsapp"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-6 bg-gradient-to-b from-green-50/50 to-background dark:from-green-950/20 dark:to-card space-y-4 max-h-96 overflow-y-auto">
              {/* Welcome Message */}
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-[85%]">
                  <p className="text-sm text-foreground">
                    👋 Hello! Welcome to <span className="font-semibold">AddisonX Media</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    How can we help you today?
                  </p>
                </div>
              </div>

              {/* Quick Reply Options */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium px-2">Quick replies:</p>
                <div className="flex flex-col gap-2">
                  {predefinedMessages.map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => handlePredefinedMessage(msg)}
                      className="text-left text-sm bg-white dark:bg-slate-800 hover:bg-green-50 dark:hover:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3 transition-colors hover-elevate active-elevate-2"
                      data-testid={`button-quick-reply-${index}`}
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-background dark:bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-border rounded-full bg-muted dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  data-testid="input-whatsapp-message"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="rounded-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-lg"
                  data-testid="button-send-whatsapp"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                This will open WhatsApp to continue the conversation
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
