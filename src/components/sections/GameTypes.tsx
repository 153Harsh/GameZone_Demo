import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gamepad, Monitor, Glasses, Car } from 'lucide-react';

export default function GameTypes() {
  const games = [
    {
      title: 'PS5 Stations',
      icon: <Gamepad className="w-6 h-6" />,
      price: '$5 / hour',
      description: 'Experience the latest next-gen titles on massive 4K OLED screens with DualSense technology.',
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_eece9d3b-8153-4488-b828-d8e343d38be2.jpg",
      color: 'neonPurple'
    },
    {
      title: 'High-End PCs',
      icon: <Monitor className="w-6 h-6" />,
      price: '$7 / hour',
      description: 'Powered by RTX 4090 and Intel i9, with 360Hz pro-gaming monitors for ultimate competitive play.',
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_fd1855e5-c7b8-41d9-9bbd-7c5fbdf6c073.jpg",
      color: 'neonCyan'
    },
    {
      title: 'VR Arena',
      icon: <Glasses className="w-6 h-6" />,
      price: '$10 / hour',
      description: 'Step into another world with our wireless Meta Quest 3 and Valve Index VR setups.',
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_550dcb5a-eaa4-47f5-9f27-6eaa7faeb102.jpg",
      color: 'neonPurple'
    },
    {
      title: 'Racing Simulators',
      icon: <Car className="w-6 h-6" />,
      price: '$12 / hour',
      description: 'Feel every turn with direct-drive steering wheels and hydraulic motion pedal setups.',
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_abb73132-72dc-4f66-b7af-df0deda766ad.jpg",
      color: 'neonCyan'
    }
  ];

  return (
    <section id="games" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-neonCyan text-neonCyan uppercase tracking-widest px-4 py-1">
            Explore Arenas
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Choose Your <span className="gradient-text">Battlefield</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From casual console gaming to elite competitive PC rigs and immersive VR, we have the perfect setup for every gamer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game, index) => (
            <Card 
              key={index} 
              className="group bg-white/5 border-white/10 overflow-hidden hover:border-neonPurple/50 transition-all duration-500 hover:-translate-y-2 relative"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-neonCyan hover:bg-neonCyan/80 text-background font-bold shadow-lg">
                    {game.price}
                  </Badge>
                </div>
              </div>
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-3 text-neonPurple mb-2 group-hover:scale-110 transition-transform">
                  {game.icon}
                  <CardTitle className="text-xl text-white font-bold">{game.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-400 text-sm leading-relaxed">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neonPurple/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
