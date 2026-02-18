import { MapPin, Clock, Phone, Mail, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LocationInfo() {
  const mapKey = 'AIzaSyB_LJOYJL-84SMuxNB7LtRGhxEQLjswvy0';
  const address = '123 Gamer Avenue, Neon City, NY 10001';

  return (
    <section id="location" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-neonCyan/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Info Side */}
          <div className="w-full lg:w-1/2 space-y-12 animate-slide-in">
            <div className="space-y-4">
              <Badge variant="outline" className="border-neonCyan text-neonCyan uppercase tracking-widest px-4 py-1">
                Find Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Visit Our <span className="gradient-text">Gaming HQ</span>
              </h2>
              <p className="text-gray-400 max-w-lg">
                Located in the heart of the city, we are easily accessible and provide the best gaming vibe for both solo and group sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonCyan shrink-0 shadow-[0_0_10px_hsla(var(--neon-cyan),0.2)]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold">Address</h4>
                    <p className="text-gray-400 text-sm">{address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonPurple shrink-0 shadow-[0_0_10px_hsla(var(--neon-purple),0.2)]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold">Operating Hours</h4>
                    <p className="text-gray-400 text-sm">Mon-Sun: 24 Hours / 7 Days</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonCyan shrink-0 shadow-[0_0_10px_hsla(var(--neon-cyan),0.2)]">
                    <Car className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold">Parking Information</h4>
                    <p className="text-gray-400 text-sm">Free secure parking available for all visitors.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neonPurple shrink-0 shadow-[0_0_10px_hsla(var(--neon-purple),0.2)]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold">Contact Us</h4>
                    <p className="text-gray-400 text-sm">+1 (234) 567 890</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4">
              <h4 className="text-white font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neonCyan" />
                Quick Message
              </h4>
              <p className="text-gray-400 text-sm">
                Have questions about our setups or group bookings? Send us a message on WhatsApp and we'll get back to you instantly!
              </p>
            </div>
          </div>

          {/* Map Side */}
          <div className="w-full lg:w-1/2 animate-fade-in delay-300">
            <Card className="bg-white/5 border-white/10 overflow-hidden shadow-2xl h-[450px] relative group">
              <div className="absolute inset-0 bg-neonCyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${encodeURIComponent(address)}&language=en&region=cn`}
                allowFullScreen
                title="Google Maps Location"
                className="relative z-10 filter grayscale contrast-125 opacity-80"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
