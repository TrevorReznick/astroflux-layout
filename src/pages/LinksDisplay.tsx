
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import Navbar from '../components/Navbar';
import { Search, ExternalLink, Calendar, Tag } from 'lucide-react';

interface Link {
  id: number;
  title: string;
  name: string;
  url: string;
  description: string;
  image: string;
  icon: string;
  logo: string;
  screenshot_img: string;
}

const LinksDisplay = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('main_table')
        .select('*')
        .limit(20);

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLinks = links.filter(link =>
    link.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageSrc = (link: Link) => {
    return link.screenshot_img || link.image || link.logo || link.icon || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80';
  };

  const getLinkTitle = (link: Link) => {
    return link.title || link.name || 'Untitled Link';
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Esplora i Link</h1>
          <p className="text-white/70 text-lg">Scopri le migliori risorse organizzate per te</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="search"
              placeholder="Cerca link..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-white/10 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLinks.map((link) => (
            <div key={link.id} className="glass-card overflow-hidden hover:scale-105 transition-transform duration-200">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageSrc(link)}
                  alt={getLinkTitle(link)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {getLinkTitle(link)}
                </h3>
                
                {link.description && (
                  <p className="text-white/70 text-sm mb-3 line-clamp-3">
                    {link.description}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">
                    <Tag className="w-3 h-3" />
                    Website
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Recente</span>
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Visita →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLinks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">
              {searchTerm ? 'Nessun link trovato per la tua ricerca' : 'Nessun link disponibile'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinksDisplay;
