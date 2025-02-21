
import { useState, useEffect } from 'react';
import { Plus, Folder, Link as LinkIcon, Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Link {
  id: string;
  title: string;
  url: string;
  description: string | null;
  created_at: string;
}

interface Collection {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
}

const Dashboard = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch recent links
      const { data: linksData, error: linksError } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (linksError) throw linksError;

      // Fetch collections
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('collections')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (collectionsError) throw collectionsError;

      setLinks(linksData || []);
      setCollections(collectionsData || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Link
        </button>
        <button className="btn-secondary flex items-center gap-2">
          <Folder className="w-4 h-4" />
          New Collection
        </button>
        <div className="flex-grow">
          <div className="relative max-w-md ml-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="search"
              placeholder="Search links and collections..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-white/10 focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Links */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Links</h2>
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-secondary-light/20 rounded" />
              ))}
            </div>
          ) : links.length > 0 ? (
            <div className="space-y-4">
              {links.map((link) => (
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

        {/* Collections */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Your Collections</h2>
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-secondary-light/20 rounded" />
              ))}
            </div>
          ) : collections.length > 0 ? (
            <div className="space-y-4">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary-light/20 transition-colors cursor-pointer"
                >
                  <Folder className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">{collection.name}</h3>
                    {collection.description && (
                      <p className="text-sm text-white/70 mt-1">{collection.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/70">No collections created yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
