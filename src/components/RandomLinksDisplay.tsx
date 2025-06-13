
import { Link as LinkIcon, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RandomLink {
  id: number;
  title: string;
  url: string;
  description?: string;
}

interface RandomLinksDisplayProps {
  sectionType: 'links' | 'collections' | 'lists';
  itemId?: string | number;
  count?: number;
}

const RandomLinksDisplay = ({ sectionType, itemId, count = 3 }: RandomLinksDisplayProps) => {
  const [randomLinks, setRandomLinks] = useState<RandomLink[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulazione di link casuali - in un'app reale questi verrebbero dal database
  const generateRandomLinks = () => {
    const sampleLinks = [
      { id: 1, title: "MDN Web Docs", url: "https://developer.mozilla.org", description: "Documentazione completa per sviluppatori web" },
      { id: 2, title: "React Documentation", url: "https://react.dev", description: "La guida ufficiale a React" },
      { id: 3, title: "Tailwind CSS", url: "https://tailwindcss.com", description: "Framework CSS utility-first" },
      { id: 4, title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/", description: "Tutto quello che devi sapere su TypeScript" },
      { id: 5, title: "GitHub", url: "https://github.com", description: "Piattaforma di sviluppo collaborativo" },
      { id: 6, title: "Stack Overflow", url: "https://stackoverflow.com", description: "Community di sviluppatori" },
      { id: 7, title: "Vercel", url: "https://vercel.com", description: "Piattaforma per il deployment di applicazioni" },
      { id: 8, title: "Supabase", url: "https://supabase.com", description: "Backend-as-a-Service open source" },
    ];

    const shuffled = [...sampleLinks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setLoading(true);
    // Simula un delay di caricamento
    setTimeout(() => {
      setRandomLinks(generateRandomLinks());
      setLoading(false);
    }, 500);
  }, [sectionType, itemId, count]);

  const getColorClasses = () => {
    switch (sectionType) {
      case 'links':
        return {
          icon: 'text-blue-400',
          hover: 'hover:bg-blue-500/10',
          border: 'border-l-blue-400'
        };
      case 'collections':
        return {
          icon: 'text-purple-400',
          hover: 'hover:bg-purple-500/10',
          border: 'border-l-purple-400'
        };
      case 'lists':
        return {
          icon: 'text-green-400',
          hover: 'hover:bg-green-500/10',
          border: 'border-l-green-400'
        };
      default:
        return {
          icon: 'text-primary',
          hover: 'hover:bg-secondary-light/20',
          border: 'border-l-primary'
        };
    }
  };

  const colors = getColorClasses();

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="animate-pulse h-16 bg-secondary-light/20 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-white/80 mb-3">Link correlati</h3>
      {randomLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-start gap-3 p-3 rounded-lg ${colors.hover} transition-colors border-l-2 ${colors.border}`}
        >
          <LinkIcon className={`w-4 h-4 mt-0.5 ${colors.icon}`} />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm">{link.title}</h4>
            {link.description && (
              <p className="text-xs text-white/60 mt-1 line-clamp-2">{link.description}</p>
            )}
          </div>
          <ExternalLink className={`w-3 h-3 ${colors.icon} opacity-60`} />
        </a>
      ))}
    </div>
  );
};

export default RandomLinksDisplay;
