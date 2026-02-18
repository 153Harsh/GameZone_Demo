import { Button } from '@/components/ui/button';
import { Terminal, Gamepad2, MousePointer2 } from 'lucide-react';

export default function HeroSection() {
  const heroImage = "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d2632438-3681-4853-bf10-171d4bbfb8dd.jpg";

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-neonCyan animate-pulse" />
            <span className="text-xs font-semibold text-neonCyan uppercase tracking-widest">
              Now Open: 24/7 Gaming Excellence
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight animate-slide-in">
            Book Your Gaming <br />
            <span className="gradient-text drop-shadow-[0_0_15px_hsla(var(--neon-purple),0.4)]">
              Slot Instantly
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl animate-fade-in delay-200">
            Experience the ultimate gaming sanctuary. High-end PS5, PC, VR, and Multiplayer setups with lightning-fast connectivity and a premium atmosphere.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 animate-fade-in delay-300">
            <Button size="lg" className="h-14 px-10 text-lg bg-neonPurple hover:bg-neonPurple/80 text-white font-bold rounded-xl shadow-[0_0_20px_hsla(var(--neon-purple),0.3)] transition-all transform hover:scale-105 active:scale-95">
              <a href="#booking" className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5" />
                Book Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/10 hover:border-neonCyan hover:bg-neonCyan/5 font-bold rounded-xl transition-all">
              <a href="#pricing" className="flex items-center gap-2">
                View Pricing
              </a>
            </Button>
          </div>

          {/* Quick Stats/Features Tags */}
          <div className="flex flex-wrap gap-8 pt-12 animate-fade-in delay-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonCyan shadow-[0_0_10px_hsla(var(--neon-cyan),0.2)]">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">PS5 Elite</p>
                <p className="text-gray-500 text-xs uppercase tracking-tighter">4K 120FPS</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonPurple shadow-[0_0_10px_hsla(var(--neon-purple),0.2)]">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">RTX 4090 PC</p>
                <p className="text-gray-500 text-xs uppercase tracking-tighter">Liquid Cooled</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonCyan shadow-[0_0_10px_hsla(var(--neon-cyan),0.2)]">
                <MousePointer2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">VR Arena</p>
                <p className="text-gray-500 text-xs uppercase tracking-tighter">Oculus Quest 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
