
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, Home, Link2, Folder, List, Eye, ChevronDown } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserDropdownProps {
  user: any;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const menuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      onClick: () => navigate('/') 
    },
    { 
      icon: Link2, 
      label: 'I miei Link', 
      onClick: () => navigate('/#links') 
    },
    { 
      icon: Folder, 
      label: 'Le mie Collezioni', 
      onClick: () => navigate('/#collections') 
    },
    { 
      icon: List, 
      label: 'Le mie Liste', 
      onClick: () => navigate('/#lists') 
    },
    { 
      icon: Eye, 
      label: 'Esplora Links', 
      onClick: () => navigate('/links') 
    },
    { 
      icon: Settings, 
      label: 'Impostazioni', 
      onClick: () => navigate('/settings') 
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
          {getUserInitials()}
        </div>
        <span className="hidden md:block text-white font-medium">
          {getUserDisplayName()}
        </span>
        <ChevronDown className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-secondary-light border border-white/10 rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                  {getUserInitials()}
                </div>
                <div>
                  <p className="font-medium text-white">{getUserDisplayName()}</p>
                  <p className="text-sm text-white/60">{user?.email}</p>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                >
                  <item.icon className="w-4 h-4 text-white/70" />
                  <span className="text-white/80">{item.label}</span>
                </button>
              ))}
              
              <hr className="border-white/10 my-2" />
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 transition-colors text-left text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;
