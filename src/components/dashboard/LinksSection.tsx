
import { Link as LinkIcon, ExternalLink } from 'lucide-react';
import { links, loading } from '@/store/linkStore';
import { useStore } from '@nanostores/react';
import { Link } from 'react-router-dom';

const LinksSection = () => {
  const $links = useStore(links);
  const $loading = useStore(loading);

  const displayedLinks = $links.slice(0, 4);

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Links</h2>
        {$links.length > 4 && (
          <Link 
            to="/links" 
            className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
          >
            Visualizza tutto
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
      {$loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-secondary-light/20 rounded" />
          ))}
        </div>
      ) : displayedLinks.length > 0 ? (
        <div className="space-y-4">
          {displayedLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary-light/20 transition-colors"
            >
              <LinkIcon className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <h3 className="font-medium">{link.title}</h3>
                {link.description && (
                  <p className="text-sm text-white/70 mt-1">{link.description}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-white/70">No links added yet</p>
      )}
    </div>
  );
};

export default LinksSection;
