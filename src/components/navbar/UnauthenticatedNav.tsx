
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';

const UnauthenticatedNav = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <button 
          onClick={() => scrollToSection('home')} 
          className="text-white/80 hover:text-white transition-colors"
        >
          Home
        </button>
        <button 
          onClick={() => scrollToSection('features')} 
          className="text-white/80 hover:text-white transition-colors"
        >
          Features
        </button>
        <button 
          onClick={() => scrollToSection('how-to-use')} 
          className="text-white/80 hover:text-white transition-colors"
        >
          How it works
        </button>
        <button 
          onClick={() => scrollToSection('about')} 
          className="text-white/80 hover:text-white transition-colors"
        >
          About Us
        </button>
        <button 
          onClick={() => scrollToSection('contacts')} 
          className="text-white/80 hover:text-white transition-colors"
        >
          Contacts
        </button>
        <button 
          onClick={() => navigate('/pages')} 
          className="text-white/80 hover:text-white transition-colors"
        >
          Pagine
        </button>
        <ThemeToggle />
        <button onClick={() => navigate('/auth')} className="btn-primary">
          Sign In
        </button>
      </div>
    </>
  );
};

export default UnauthenticatedNav;
