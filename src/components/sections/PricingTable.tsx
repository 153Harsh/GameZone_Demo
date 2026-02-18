import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PricingTable() {
  const pricingData = [
    { type: 'PS5 Pro Station', h1: '$5', h3: '$12', h5: '$18', best: false },
    { type: 'High-End PC (RTX 4090)', h1: '$7', h3: '$18', h5: '$28', best: true },
    { type: 'VR Arena (Wireless)', h1: '$10', h3: '$25', h5: '$40', best: false },
    { type: 'Racing Simulator (Direct Drive)', h1: '$12', h3: '$30', h5: '$45', best: false },
    { type: 'Multiplayer Arena (Private Room)', h1: '$20', h3: '$50', h5: '$80', best: false },
  ];

  return (
    <section id="pricing" className="py-24 bg-white/5 border-y border-white/10 relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neonPurple/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-neonCyan/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-neonPurple text-neonPurple px-4 py-1">
              Transparent Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              No Hidden <span className="gradient-text">Fees</span>
            </h2>
            <p className="text-gray-400">
              Pick your station and enjoy competitive rates for all your gaming needs.
            </p>
          </div>

          <div className="glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-b border-white/10 hover:bg-transparent">
                  <TableHead className="w-[300px] text-white font-bold h-16 text-lg">Game Type</TableHead>
                  <TableHead className="text-center text-white font-bold h-16 text-lg">1 Hour</TableHead>
                  <TableHead className="text-center text-white font-bold h-16 text-lg">3 Hours</TableHead>
                  <TableHead className="text-center text-white font-bold h-16 text-lg">5 Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricingData.map((row) => (
                  <TableRow 
                    key={row.type} 
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors group ${row.best ? 'bg-neonCyan/5' : ''}`}
                  >
                    <TableCell className="font-medium text-gray-200 py-6">
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neonCyan/50 group-hover:scale-150 transition-transform" />
                        {row.type}
                        {row.best && (
                          <Badge className="ml-2 bg-neonCyan text-background text-[10px] font-bold px-1.5 py-0">POPULAR</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-white font-bold text-lg group-hover:text-neonCyan transition-colors">{row.h1}</TableCell>
                    <TableCell className="text-center text-white font-bold text-lg group-hover:text-neonCyan transition-colors">{row.h3}</TableCell>
                    <TableCell className="text-center text-white font-bold text-lg group-hover:text-neonCyan transition-colors">{row.h5}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center pt-8">
            <Button size="lg" className="bg-neonPurple hover:bg-neonPurple/80 text-white font-bold h-14 px-12 rounded-xl group overflow-hidden relative shadow-[0_0_20px_hsla(var(--neon-purple),0.3)]">
              <a href="#booking" className="relative z-10">Book Your Station Now</a>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
