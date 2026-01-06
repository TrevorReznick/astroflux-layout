
import { Link } from 'react-router-dom';
import { Home, Link2, Folder, List, FileText, LogIn } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const pages = [
  { path: '/', name: 'Home', icon: Home, description: 'Dashboard principale e panoramica' },
  { path: '/links', name: 'Esplora Links', icon: Link2, description: 'Scopri tutti i link pubblici' },
  { path: '/collections', name: 'Collezioni', icon: Folder, description: 'Visualizza tutte le collezioni' },
  { path: '/lists', name: 'Liste', icon: List, description: 'Esplora le liste disponibili' },
  { path: '/auth', name: 'Autenticazione', icon: LogIn, description: 'Accedi o registrati' },
];

const PagesList = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Mappa del Sito</h1>
          <p className="text-muted-foreground mb-8">Tutte le pagine disponibili su Openfav</p>
          
          <div className="space-y-4">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="flex items-center gap-4 p-4 rounded-xl glass-card hover:bg-white/10 transition-all group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <page.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-foreground">{page.name}</h2>
                  <p className="text-sm text-muted-foreground">{page.description}</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{page.path}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PagesList;
