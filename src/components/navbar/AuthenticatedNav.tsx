
import UserDropdown from './UserDropdown';
import { ThemeToggle } from '../ThemeToggle';

interface AuthenticatedNavProps {
  user: any;
}

const AuthenticatedNav = ({ user }: AuthenticatedNavProps) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="/" className="text-white/80 hover:text-white transition-colors">Dashboard</a>
        <a href="/links" className="text-white/80 hover:text-white transition-colors">Esplora Links</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a>
        <a href="#" className="text-white/80 hover:text-white transition-colors">Contacts</a>
        <ThemeToggle />
        <UserDropdown user={user} />
      </div>
    </>
  );
};

export default AuthenticatedNav;
