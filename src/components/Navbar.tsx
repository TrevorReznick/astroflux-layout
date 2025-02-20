
import { useState } from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 glass-card bg-secondary-light/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Openfav</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">How it works</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">Contacts</a>
            <button className="btn-primary">Sign in</button>
          </div>
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">How it works</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Contacts</a>
              <button className="btn-primary w-full">Sign in</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
