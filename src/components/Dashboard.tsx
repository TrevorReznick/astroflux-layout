import { useState, useEffect } from 'react';
import { Plus, Folder, Link as LinkIcon, Search, X } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";

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

const AddLinkDialog = ({ open, onOpenChange, onSuccess }: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('links').insert([{
        ...formData,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }]);

      if (error) throw error;

      toast.success('Link added successfully');
      onSuccess();
      onOpenChange(false);
      setFormData({ title: '', url: '', description: '' });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-secondary p-6 rounded-lg w-full max-w-md relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-semibold mb-4">Add New Link</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 rounded-lg bg-secondary-light border border-white/10 focus:border-primary focus:outline-none"
                placeholder="Enter link title"
              />
            </div>
            
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-1">
                URL
              </label>
              <input
                id="url"
                type="url"
                required
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="w-full p-2 rounded-lg bg-secondary-light border border-white/10 focus:border-primary focus:outline-none"
                placeholder="https://example.com"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description (optional)
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 rounded-lg bg-secondary-light border border-white/10 focus:border-primary focus:outline-none"
                placeholder="Enter link description"
                rows={3}
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Adding...' : 'Add Link'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

const Dashboard = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [addLinkOpen, setAddLinkOpen] = useState(false);

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
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => setAddLinkOpen(true)}
        >
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

      {/* Add Link Dialog */}
      <AddLinkDialog 
        open={addLinkOpen} 
        onOpenChange={setAddLinkOpen}
        onSuccess={fetchUserData}
      />

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
