import { Star, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Reviews() {
  const reviews = [
    {
      name: "Alex Johnson",
      avatar: "AJ",
      rating: 5,
      date: "2 weeks ago",
      text: "Best gaming cafe in the city! The PS5 setups are incredibly smooth and the 4K screens make a huge difference. Highly recommend!",
      source: "Google Reviews"
    },
    {
      name: "Sarah Chen",
      avatar: "SC",
      rating: 5,
      date: "1 month ago",
      text: "The PC rigs are insane. I got 300+ FPS in Warzone. Atmosphere is chill and the staff is very helpful. Will be back for sure!",
      source: "Google Reviews"
    },
    {
      name: "Marcus Wade",
      avatar: "MW",
      rating: 4,
      date: "3 days ago",
      text: "Amazing VR experience! Tried the racing simulators too and it felt so real. Great place for a group of friends.",
      source: "Google Reviews"
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-white/5 border-y border-white/10 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-neonCyan text-neonCyan uppercase px-4 py-1">
            Community Love
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            What <span className="gradient-text">Gamers Say</span>
          </h2>
          <p className="text-gray-400">Join our community of over 5,000+ happy players.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-background border-white/10 relative group overflow-hidden hover:border-neonPurple/50 transition-all duration-300">
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-neonPurple/5 blur-[40px] rounded-full transition-all duration-500 group-hover:bg-neonPurple/10" />
              
              <CardContent className="pt-8 px-8 pb-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-neonCyan text-neonCyan shadow-[0_0_5px_hsla(var(--neon-cyan),0.4)]' : 'text-white/10'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">{review.source}</span>
                </div>

                <p className="text-gray-300 italic leading-relaxed text-lg">"{review.text}"</p>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <Avatar className="w-12 h-12 border border-neonPurple/30">
                    <AvatarFallback className="bg-white/10 text-white font-bold">{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h4 className="text-white font-bold">{review.name}</h4>
                    <span className="text-gray-500 text-xs">{review.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
