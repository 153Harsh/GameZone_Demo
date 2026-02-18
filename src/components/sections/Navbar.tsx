import { useState } from 'react';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/#' },
    { name: 'Games', href: '/#games' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Location', href: '/#location' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-neonPurple to-neonCyan flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonPurple to-neonCyan">
            Game Zone Cafe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neonCyan transition-all group-hover:w-full" />
            </a>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/10 hover:bg-white/5">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-neonPurple text-white font-bold">
                        {user.email?.[0].toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background border-white/10" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{user.email?.split('@')[0]}</p>
                      <p className="text-xs leading-none text-gray-400">{profile?.role.toUpperCase()}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {profile?.role === 'admin' && (
                    <DropdownMenuItem asChild className="text-white hover:bg-neonCyan/20 focus:bg-neonCyan/20 cursor-pointer">
                      <Link to="/admin" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
            <Button className="bg-neonPurple hover:bg-neonPurple/80 text-white font-semibold">
              <a href="/#booking">Book Now</a>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l border-white/10 w-[300px]">
              <div className="flex flex-col gap-6 mt-10">
                {user && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-2">
                    <p className="text-white font-bold">{user.email?.split('@')[0]}</p>
                    <p className="text-xs text-gray-400">{profile?.role.toUpperCase()}</p>
                    {profile?.role === 'admin' && (
                      <Link to="/admin" className="text-neonCyan text-sm font-bold flex items-center mt-2" onClick={() => setIsOpen(false)}>
                        <Shield className="w-4 h-4 mr-1" /> Admin Dashboard
                      </Link>
                    )}
                  </div>
                )}
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gray-300 hover:text-neonCyan transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                {!user ? (
                  <Button variant="outline" className="w-full border-white/10" asChild>
                    <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                  </Button>
                ) : (
                  <Button variant="ghost" className="w-full text-red-400 border border-red-500/10" onClick={handleSignOut}>
                    Log Out
                  </Button>
                )}
                <Button className="w-full bg-neonPurple hover:bg-neonPurple/80 text-white font-semibold mt-4" asChild>
                  <a href="/#booking" onClick={() => setIsOpen(false)}>Book Your Slot</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
