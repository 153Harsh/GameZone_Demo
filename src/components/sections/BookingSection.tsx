import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Gamepad2, User, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    timeSlot: '',
    consoleType: '',
    name: '',
    phone: '',
  });

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM',
  ];

  const consoleTypes = [
    'PS5 Elite Station', 'High-End PC Rig', 'VR Arena', 'Racing Simulator', 'Multiplayer Arena'
  ];

  const nextStep = () => {
    if (step === 1 && (!date || !formData.timeSlot)) {
      toast.error('Please select a date and time slot');
      return;
    }
    if (step === 2 && !formData.consoleType) {
      toast.error('Please select a console type');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number');
      return;
    }
    
    // Simulate WhatsApp Message
    const message = `Hello Game Zone Cafe! I'd like to book a ${formData.consoleType} slot on ${date ? format(date, 'PPP') : 'N/A'} at ${formData.timeSlot}. Name: ${formData.name}, Phone: ${formData.phone}.`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    
    toast.success('Booking Successful! Redirecting to WhatsApp for confirmation...');
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setStep(4);
    }, 1500);
  };

  return (
    <section id="booking" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/5 border-white/10 shadow-2xl relative overflow-hidden">
            {/* Step Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 flex">
              <div 
                className="h-full bg-gradient-to-r from-neonPurple to-neonCyan transition-all duration-500" 
                style={{ width: `${(step / 3) * 100}%` }} 
              />
            </div>

            <CardHeader className="text-center pt-10">
              <Badge variant="outline" className="w-fit mx-auto border-neonCyan text-neonCyan mb-4">
                Step {step === 4 ? 3 : step} of 3
              </Badge>
              <CardTitle className="text-3xl font-black text-white">
                {step === 1 && 'Select Date & Time'}
                {step === 2 && 'Choose Your Arena'}
                {step === 3 && 'Enter Your Details'}
                {step === 4 && 'Booking Confirmed!'}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {step === 1 && 'When do you want to play?'}
                {step === 2 && 'Which setup do you prefer?'}
                {step === 3 && 'Almost there! Just a few more details.'}
                {step === 4 && 'Your slot has been reserved. See you soon!'}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6 pb-10 px-8">
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-white flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-neonCyan" /> Select Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 h-12",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-background border-white/10" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="bg-background text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-neonCyan" /> Select Time Slot
                      </Label>
                      <Select 
                        value={formData.timeSlot} 
                        onValueChange={(val) => setFormData({...formData, timeSlot: val})}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-12">
                          <SelectValue placeholder="Choose time" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-white/10 text-white">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time} className="hover:bg-neonCyan/20">
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={nextStep} className="w-full h-12 bg-neonPurple hover:bg-neonPurple/80 text-white font-bold">
                    Next Step
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="grid grid-cols-1 gap-4">
                    {consoleTypes.map((type) => (
                      <div 
                        key={type}
                        onClick={() => setFormData({...formData, consoleType: type})}
                        className={cn(
                          "group p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between",
                          formData.consoleType === type 
                            ? "bg-neonCyan/10 border-neonCyan shadow-[0_0_15px_hsla(var(--neon-cyan),0.2)]" 
                            : "bg-white/5 border-white/10 hover:border-white/30"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                            formData.consoleType === type ? "bg-neonCyan text-background" : "bg-white/10 text-white group-hover:bg-neonCyan group-hover:text-background"
                          )}>
                            <Gamepad2 className="w-6 h-6" />
                          </div>
                          <span className="text-white font-bold">{type}</span>
                        </div>
                        {formData.consoleType === type && (
                          <CheckCircle2 className="w-6 h-6 text-neonCyan" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={prevStep} className="flex-1 h-12 border-white/10 hover:bg-white/5">Back</Button>
                    <Button onClick={nextStep} className="flex-[2] h-12 bg-neonPurple hover:bg-neonPurple/80 text-white font-bold">Continue</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-white flex items-center gap-2">
                        <User className="w-4 h-4 text-neonCyan" /> Full Name
                      </Label>
                      <Input 
                        placeholder="Enter your name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-white/5 border-white/10 text-white focus-visible:ring-neonPurple h-12"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white flex items-center gap-2">
                        <Phone className="w-4 h-4 text-neonCyan" /> Phone Number
                      </Label>
                      <Input 
                        placeholder="e.g. +1 234 567 890" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-white/5 border-white/10 text-white focus-visible:ring-neonPurple h-12"
                      />
                    </div>
                    
                    <div className="p-4 rounded-xl bg-neonPurple/10 border border-neonPurple/30 space-y-2">
                      <p className="text-xs font-bold text-neonPurple uppercase">Booking Summary</p>
                      <p className="text-white text-sm">
                        {formData.consoleType} on <span className="text-neonCyan">{date ? format(date, 'MMM do') : ''}</span> at <span className="text-neonCyan">{formData.timeSlot}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" type="button" onClick={prevStep} className="flex-1 h-12 border-white/10 hover:bg-white/5">Back</Button>
                    <Button type="submit" className="flex-[2] h-12 bg-neonPurple hover:bg-neonPurple/80 text-white font-bold shadow-[0_0_20px_hsla(var(--neon-purple),0.3)]">
                      Confirm & Send WhatsApp
                    </Button>
                  </div>
                </form>
              )}

              {step === 4 && (
                <div className="text-center space-y-8 py-10 animate-fade-in">
                  <div className="w-24 h-24 rounded-full bg-neonCyan/20 border-2 border-neonCyan flex items-center justify-center mx-auto shadow-[0_0_30px_hsla(var(--neon-cyan),0.3)]">
                    <CheckCircle2 className="w-12 h-12 text-neonCyan" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white">All Set! 🚀</h3>
                    <p className="text-gray-400">
                      We've sent your details to our WhatsApp team. You'll receive a confirmation message shortly.
                    </p>
                  </div>
                  <Button onClick={() => setStep(1)} className="bg-white/10 hover:bg-white/20 text-white font-bold px-10 h-12 border border-white/10">
                    Book Another Slot
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
