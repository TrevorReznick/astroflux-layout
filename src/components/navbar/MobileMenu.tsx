
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Link2, Folder, List, Eye, Settings } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ThemeToggle } from '../ThemeToggle';

interface MobileMenuProps {
  user: any;
  isOpen: boolean;
}

const MobileMenu = ({ user, isOpen }: MobileMenuProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/auth');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || 
           user?.user_metadata?.name || 
           user?.email?.split('@')[0] || 
           'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden pt-4 bg-secondary-light border-t border-white/10">
      {user ? (
        <div className="flex flex-col space-y-4 p-4">
          {/* User Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              {getUserInitials()}
            </div>
            <div>
              <p className="font-medium text-white">{getUserDisplayName()}</p>
              <p className="text-sm text-white/60">{user?.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left">
              <Home className="w-4 h-4 text-white/70" />
              <span className="text-white/80">Dashboard</span>
            </button>
            <button onClick={() => navigate('/links')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left">
              <Eye className="w-4 h-4 text-white/70" />
              <span className="text-white/80">Esplora Links</span>
            </button>
            <button onClick={() => navigate('/#collections')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left">
              <Folder className="w-4 h-4 text-white/70" />
              <span className="text-white/80">Le mie Collezioni</span>
            </button>
            <button onClick={() => navigate('/#lists')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left">
              <List className="w-4 h-4 text-white/70" />
              <span className="text-white/80">Le mie Liste</span>
            </button>
            <button onClick={() => navigate('/settings')} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left">
              <Settings className="w-4 h-4 text-white/70" />
              <span className="text-white/80">Impostazioni</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="flex justify-center py-2">
            <ThemeToggle />
          </div>

          <hr className="border-white/10" />

          <button onClick={handleSignOut} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 transition-colors text-left text-red-400">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-4 p-4">
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-white/80 hover:text-white transition-colors text-left"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="text-white/80 hover:text-white transition-colors text-left"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-to-use')} 
            className="text-white/80 hover:text-white transition-colors text-left"
          >
            How it works
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-white/80 hover:text-white transition-colors text-left"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('contacts')} 
            className="text-white/80 hover:text-white transition-colors text-left"
          >
            Contacts
          </button>
          
          {/* Theme Toggle */}
          <div className="flex justify-center py-2">
            <ThemeToggle />
          </div>
          
          <button onClick={() => navigate('/auth')} className="btn-primary w-full">
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
