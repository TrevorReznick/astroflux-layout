
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import AuthenticatedNav from './navbar/AuthenticatedNav';
import UnauthenticatedNav from './navbar/UnauthenticatedNav';
import MobileMenu from './navbar/MobileMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed w-full top-0 z-50 glass-card bg-secondary-light/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Openfav</h1>
          </div>
          
          {user ? (
            <AuthenticatedNav user={user} />
          ) : (
            <UnauthenticatedNav />
          )}
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <MobileMenu user={user} isOpen={isOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
