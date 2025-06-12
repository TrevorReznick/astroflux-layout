
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';

const UnauthenticatedNav = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="/" className="text-white/80 hover:text-white transition-colors">Home</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors">Features</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors">How it works</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors">Contacts</a>
        <ThemeToggle />
        <button onClick={() => navigate('/auth')} className="btn-primary">
          Sign In
        </button>
      </div>
    </>
  );
};

export default UnauthenticatedNav;
