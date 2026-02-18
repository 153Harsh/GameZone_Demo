import { Github, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background pt-24 border-t border-white/10 relative overflow-hidden">
      {/* Final CTA Section */}
      <div className="container mx-auto px-4 pb-24 text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <Badge variant="outline" className="border-neonPurple text-neonPurple uppercase tracking-widest px-4 py-1">
            Join the Arena
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Ready to <span className="gradient-text">Play?</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-lg italic">
            "Your next gaming session starts here. Don't wait, secure your slot and level up your experience."
          </p>
        </div>
        <Button size="lg" className="h-16 px-14 text-xl bg-neonPurple hover:bg-neonPurple/80 text-white font-black rounded-2xl shadow-[0_0_30px_hsla(var(--neon-purple),0.4)] transition-all hover:scale-110 active:scale-95">
          <a href="#booking">Book Your Slot Now</a>
        </Button>
      </div>

      {/* Main Footer Content */}
      <div className="bg-white/5 border-t border-white/10 pt-16 pb-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
            {/* Logo & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded bg-gradient-to-br from-neonPurple to-neonCyan flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <span className="text-2xl font-black text-white">Game Zone Cafe</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The ultimate premium gaming experience for console and PC enthusiasts. State-of-the-art equipment, zero lag, and a vibrant community of gamers.
              </p>
              <div className="flex gap-4">
                {[Twitter, Instagram, Youtube, Send].map((Icon, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-neonCyan hover:border-neonCyan transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Games', 'Pricing', 'Gallery', 'Location'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-neonCyan transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-neonPurple group-hover:scale-150 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg">Our Services</h4>
              <ul className="space-y-3">
                {['PS5 Station', 'High-End PC', 'VR Gaming', 'Racing Sim', 'Group Bookings'].map((service) => (
                  <li key={service}>
                    <span className="text-gray-400 flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-neonCyan group-hover:scale-150 transition-transform" />
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonCyan group-hover:scale-110 transition-transform">
                    <Send className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">WhatsApp</span>
                    <span className="text-gray-400 text-xs">+1 (234) 567 890</span>
                  </div>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonPurple group-hover:scale-110 transition-transform">
                    <Send className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">Email</span>
                    <span className="text-gray-400 text-xs">play@gamezonecafe.com</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Game Zone Cafe. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
