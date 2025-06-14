
import { Heart, Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-light/50 border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Openfav</h3>
            <p className="text-white/70">
              Organizza i tuoi link preferiti in modo semplice ed efficace
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Links Utili</h4>
            <div className="space-y-2">
              <a href="/" className="block text-white/70 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="/links" className="block text-white/70 hover:text-white transition-colors">
                Esplora Links
              </a>
              <a href="/collections" className="block text-white/70 hover:text-white transition-colors">
                Collezioni
              </a>
              <a href="/lists" className="block text-white/70 hover:text-white transition-colors">
                Liste
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contatti</h4>
            <div className="flex space-x-4">
              <a href="mailto:info@openfav.com" className="text-white/70 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" /> by a passionate developer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
