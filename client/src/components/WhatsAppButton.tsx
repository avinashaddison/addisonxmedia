import { useState } from "react";
import whatsappLogo from "@assets/logo_1763308610856.png";
import { X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "919142647797";
  
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
    
    setMessage("");
    setIsOpen(false);
  };

  const handlePredefinedMessage = (msg: string) => {
    setMessage(msg);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessage("");
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 ${isOpen ? 'pointer-events-none opacity-0 md:opacity-100 md:pointer-events-auto' : ''}`}
        data-testid="button-whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover-elevate">
          <img
            src={whatsappLogo}
            alt="WhatsApp"
            className="w-full h-full rounded-full"
          />
        </div>
      </button>

      {/* Chat Widget Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-[45] md:hidden pointer-events-auto"
            onClick={handleClose}
            data-testid="whatsapp-backdrop"
          />
          
          {/* Chat Widget */}
          <div 
            className="fixed bottom-4 md:bottom-24 inset-x-4 md:inset-x-auto md:right-6 md:w-96 h-[min(32rem,calc(100vh-6rem))] bg-background dark:bg-card border border-border rounded-2xl shadow-2xl z-[50] animate-in slide-in-from-bottom-4 duration-300 flex flex-col"
            data-testid="whatsapp-chat-widget"
          >
            {/* Header */}
            <div className="bg-green-600 dark:bg-green-700 p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={whatsappLogo}
                  alt="WhatsApp"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-white font-semibold text-lg truncate">AddisonX Media</h3>
                  <p className="text-green-100 text-sm truncate">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors flex-shrink-0"
                data-testid="button-close-whatsapp"
                aria-label="Close chat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-6 bg-gradient-to-b from-green-50/50 to-background dark:from-green-950/20 dark:to-card space-y-4 overflow-y-auto overflow-x-hidden">
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
            <div className="flex-shrink-0 p-4 border-t border-border bg-background dark:bg-card">
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
