import whatsappLogo from "@assets/logo_1763308610856.png";

export function WhatsAppButton() {
  const phoneNumber = "919709707311"; // India country code + number
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      data-testid="button-whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp Icon with Glow Effect */}
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse"></div>
        
        {/* Icon Container */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-green-500/50">
          <img
            src={whatsappLogo}
            alt="WhatsApp"
            className="w-full h-full rounded-full"
          />
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
          Chat with us on WhatsApp
          <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-slate-900"></div>
        </div>
      </div>
    </a>
  );
}
