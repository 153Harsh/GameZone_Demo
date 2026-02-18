import { Badge } from '@/components/ui/badge';

export default function Gallery() {
  const images = [
    { 
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d2632438-3681-4853-bf10-171d4bbfb8dd.jpg", 
      title: "Main Gaming Floor",
      category: "Environment"
    },
    { 
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_c5b1e46d-0a97-4eb9-97b9-627e566ef0f6.jpg", 
      title: "Group Play Session",
      category: "Vibe"
    },
    { 
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_fd1855e5-c7b8-41d9-9bbd-7c5fbdf6c073.jpg", 
      title: "Elite PC Setup",
      category: "Hardware"
    },
    { 
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_eece9d3b-8153-4488-b828-d8e343d38be2.jpg", 
      title: "PS5 Lounge",
      category: "Hardware"
    },
    { 
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_550dcb5a-eaa4-47f5-9f27-6eaa7faeb102.jpg", 
      title: "VR Arena",
      category: "Environment"
    },
    { 
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_abb73132-72dc-4f66-b7af-df0deda766ad.jpg", 
      title: "Racing Sim Cockpit",
      category: "Hardware"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <Badge variant="outline" className="border-neonPurple text-neonPurple uppercase tracking-widest px-4 py-1">
              Visual Vibe
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Tour Our <span className="gradient-text">Gaming Oasis</span>
            </h2>
            <p className="text-gray-400">
              Immerse yourself in our premium gaming environment designed for maximum comfort and peak performance.
            </p>
          </div>
          <div className="hidden md:block pb-2">
            <p className="text-neonCyan text-sm font-bold uppercase tracking-widest">
              No Stock Images • 100% Real Atmosphere
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="group relative h-[350px] rounded-2xl overflow-hidden border border-white/5 cursor-zoom-in"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <Badge className="bg-neonPurple text-white mb-2">{img.category}</Badge>
                <h4 className="text-xl font-bold text-white">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
