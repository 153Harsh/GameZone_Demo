import { useEffect, useState } from 'react';
import { api } from '@/db/api';
import type { Booking, Pricing, BlockedSlot } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Trash2, ShieldAlert, DollarSign, CalendarCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for adding blocked slot
  const [blockDate, setBlockDate] = useState('');
  const [blockTime, setBlockTime] = useState('');
  const [blockConsole, setBlockConsole] = useState('');
  const [blockReason, setBlockReason] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const [bRes, pRes, blRes] = await Promise.all([
      api.getBookings(),
      api.getPricing(),
      api.getBlockedSlots()
    ]);
    if (bRes.data) setBookings(bRes.data);
    if (pRes.data) setPricing(pRes.data);
    if (blRes.data) setBlockedSlots(blRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePriceUpdate = async (id: string, updates: Partial<Pricing>) => {
    const { error } = await api.updatePricing(id, updates);
    if (error) {
      toast.error('Failed to update price');
    } else {
      toast.success('Price updated successfully');
      fetchData();
    }
  };

  const handleBlockSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate || !blockTime || !blockConsole) {
      toast.error('Please fill in all fields to block a slot');
      return;
    }
    const { error } = await api.blockSlot({
      date: blockDate,
      time_slot: blockTime,
      console_type: blockConsole,
      reason: blockReason
    });
    if (error) {
      toast.error('Failed to block slot');
    } else {
      toast.success('Slot blocked successfully');
      setBlockDate('');
      setBlockTime('');
      setBlockReason('');
      fetchData();
    }
  };

  const handleUnblockSlot = async (id: string) => {
    const { error } = await api.unblockSlot(id);
    if (error) {
      toast.error('Failed to unblock slot');
    } else {
      toast.success('Slot unblocked');
      fetchData();
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neonPurple" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-neonPurple rounded-full" />
              Admin Dashboard
            </h1>
            <p className="text-gray-400 font-medium">Manage Game Zone Cafe operations, pricing and availability.</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={fetchData} variant="outline" className="border-white/10">Refresh Data</Button>
          </div>
        </header>

        <Tabs defaultValue="bookings" className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl h-auto flex flex-wrap">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-neonPurple data-[state=active]:text-white py-3 px-6 rounded-lg text-gray-400">
              <CalendarCheck className="w-4 h-4 mr-2" /> Bookings
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-neonCyan data-[state=active]:text-white py-3 px-6 rounded-lg text-gray-400">
              <DollarSign className="w-4 h-4 mr-2" /> Pricing
            </TabsTrigger>
            <TabsTrigger value="blocking" className="data-[state=active]:bg-red-500 data-[state=active]:text-white py-3 px-6 rounded-lg text-gray-400">
              <ShieldAlert className="w-4 h-4 mr-2" /> Block Slots
            </TabsTrigger>
          </TabsList>

          {/* Bookings View */}
          <TabsContent value="bookings">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Bookings</CardTitle>
                <CardDescription className="text-gray-400">Total {bookings.length} bookings recorded.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-white">Time</TableHead>
                      <TableHead className="text-white">Console</TableHead>
                      <TableHead className="text-white">Customer</TableHead>
                      <TableHead className="text-white">Phone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id} className="border-white/5 hover:bg-white/5">
                        <TableCell className="text-gray-300 font-medium">{format(new Date(booking.date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className="text-gray-300">{booking.time_slot}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-neonCyan text-neonCyan">{booking.console_type}</Badge>
                        </TableCell>
                        <TableCell className="text-white font-bold">{booking.customer_name}</TableCell>
                        <TableCell className="text-gray-400">{booking.customer_phone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing View */}
          <TabsContent value="pricing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {pricing.map((p) => (
                <Card key={p.id} className="bg-white/5 border-white/10 overflow-hidden group">
                  <div className="h-1 w-full bg-gradient-to-r from-neonPurple to-neonCyan" />
                  <CardHeader>
                    <CardTitle className="text-white">{p.game_type}</CardTitle>
                    <CardDescription className="text-gray-500">Base Hourly Rates & Weekend Multipliers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-400 text-xs uppercase tracking-tighter">1H Base</Label>
                        <Input 
                          type="number" 
                          defaultValue={p.h1_base} 
                          onBlur={(e) => handlePriceUpdate(p.id, { h1_base: parseFloat(e.target.value) })}
                          className="bg-background border-white/10 text-white h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-400 text-xs uppercase tracking-tighter">3H Base</Label>
                        <Input 
                          type="number" 
                          defaultValue={p.h3_base} 
                          onBlur={(e) => handlePriceUpdate(p.id, { h3_base: parseFloat(e.target.value) })}
                          className="bg-background border-white/10 text-white h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-400 text-xs uppercase tracking-tighter">5H Base</Label>
                        <Input 
                          type="number" 
                          defaultValue={p.h5_base} 
                          onBlur={(e) => handlePriceUpdate(p.id, { h5_base: parseFloat(e.target.value) })}
                          className="bg-background border-white/10 text-white h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-400 text-xs uppercase tracking-tighter">Weekend Multiplier</Label>
                        <Input 
                          type="number" 
                          step="0.1"
                          defaultValue={p.weekend_multiplier} 
                          onBlur={(e) => handlePriceUpdate(p.id, { weekend_multiplier: parseFloat(e.target.value) })}
                          className="bg-background border-white/10 text-white h-10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Block Slots View */}
          <TabsContent value="blocking">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form to block a slot */}
              <Card className="bg-white/5 border-white/10 h-fit">
                <CardHeader>
                  <CardTitle className="text-white">Block New Slot</CardTitle>
                  <CardDescription className="text-gray-400">Prevent bookings for specific times.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBlockSlot} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Date</Label>
                      <Input 
                        type="date" 
                        value={blockDate}
                        onChange={(e) => setBlockDate(e.target.value)}
                        className="bg-background border-white/10 text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Time Slot</Label>
                      <Input 
                        placeholder="e.g. 10:00 AM" 
                        value={blockTime}
                        onChange={(e) => setBlockTime(e.target.value)}
                        className="bg-background border-white/10 text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Console Type</Label>
                      <Input 
                        placeholder="e.g. PS5 Elite Station" 
                        value={blockConsole}
                        onChange={(e) => setBlockConsole(e.target.value)}
                        className="bg-background border-white/10 text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Reason</Label>
                      <Input 
                        placeholder="e.g. Maintenance" 
                        value={blockReason}
                        onChange={(e) => setBlockReason(e.target.value)}
                        className="bg-background border-white/10 text-white" 
                      />
                    </div>
                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold">
                      Block Slot
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* List of blocked slots */}
              <Card className="lg:col-span-2 bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Active Blocks</CardTitle>
                  <CardDescription className="text-gray-400">Manual blocks currently applied.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-white">Time</TableHead>
                        <TableHead className="text-white">Console</TableHead>
                        <TableHead className="text-white">Reason</TableHead>
                        <TableHead className="text-white text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blockedSlots.map((slot) => (
                        <TableRow key={slot.id} className="border-white/5 hover:bg-white/5">
                          <TableCell className="text-gray-300">{format(new Date(slot.date), 'MMM dd')}</TableCell>
                          <TableCell className="text-gray-300">{slot.time_slot}</TableCell>
                          <TableCell className="text-gray-300 font-bold">{slot.console_type}</TableCell>
                          <TableCell className="text-gray-500 italic">{slot.reason || 'No reason'}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleUnblockSlot(slot.id)}
                              className="text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
