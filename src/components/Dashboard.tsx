import { useState, useEffect } from 'react';
import { Plus, Folder, Link as LinkIcon, Search, Briefcase, Code2, User, FolderKanban } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

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

interface ResourceType {
  resource_id: number;
  name: string;
  description: string;
}

interface FunctionType {
  function_id: number;
  name: string;
  description: string;
}

interface ContextType {
  context_id: number;
  name: string;
  description: string;
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
    description: '',
    context_id: '',
    resource_id: '',
    function_id: ''
  });

  const [contexts, setContexts] = useState<ContextType[]>([]);
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
  const [functionTypes, setFunctionTypes] = useState<FunctionType[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      // Fetch contexts (environments)
      const { data: contextData } = await supabase
        .from('context_types')
        .select('*');
      
      // Fetch resource types
      const { data: resourceData } = await supabase
        .from('resource_types')
        .select('*');
      
      // Fetch function types
      const { data: functionData } = await supabase
        .from('function_types')
        .select('*');

      if (contextData) setContexts(contextData);
      if (resourceData) setResourceTypes(resourceData);
      if (functionData) setFunctionTypes(functionData);
    };

    fetchTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First insert the link
      const { data: linkData, error: linkError } = await supabase
        .from('links')
        .insert([{
          title: formData.title,
          url: formData.url,
          description: formData.description,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (linkError) throw linkError;

      // Then create the classification if context/resource/function are selected
      if (formData.context_id || formData.resource_id || formData.function_id) {
        const classificationData: {
          site_id: number;
          context_id?: number | null;
          resource_id?: number | null;
          function_id?: number | null;
        } = {
          site_id: Number(linkData.id),
          ...(formData.context_id && { context_id: Number(formData.context_id) }),
          ...(formData.resource_id && { resource_id: Number(formData.resource_id) }),
          ...(formData.function_id && { function_id: Number(formData.function_id) })
        };

        const { error: classError } = await supabase
          .from('site_classifications')
          .insert(classificationData);

        if (classError) throw classError;
      }

      toast.success('Link added successfully');
      onSuccess();
      onOpenChange(false);
      setFormData({ 
        title: '', 
        url: '', 
        description: '',
        context_id: '',
        resource_id: '',
        function_id: ''
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-secondary sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
        </DialogHeader>
        
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
            <label htmlFor="context_id" className="block text-sm font-medium mb-1">
              Environment
            </label>
            <select
              id="context_id"
              value={formData.context_id}
              onChange={(e) => setFormData(prev => ({ ...prev, context_id: e.target.value }))}
              className="w-full p-2 rounded-lg bg-secondary-light border border-white/10 focus:border-primary focus:outline-none"
            >
              <option value="">Select environment</option>
              {contexts.map((context) => (
                <option key={context.context_id} value={context.context_id}>
                  {context.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="resource_id" className="block text-sm font-medium mb-1">
              Resource Type
            </label>
            <select
              id="resource_id"
              value={formData.resource_id}
              onChange={(e) => setFormData(prev => ({ ...prev, resource_id: e.target.value }))}
              className="w-full p-2 rounded-lg bg-secondary-light border border-white/10 focus:border-primary focus:outline-none"
            >
              <option value="">Select resource type</option>
              {resourceTypes.map((type) => (
                <option key={type.resource_id} value={type.resource_id}>
                  {type.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="function_id" className="block text-sm font-medium mb-1">
              Function Type
            </label>
            <select
              id="function_id"
              value={formData.function_id}
              onChange={(e) => setFormData(prev => ({ ...prev, function_id: e.target.value }))}
              className="w-full p-2 rounded-lg bg-secondary-light border border-white/10 focus:border-primary focus:outline-none"
            >
              <option value="">Select function type</option>
              {functionTypes.map((type) => (
                <option key={type.function_id} value={type.function_id}>
                  {type.description}
                </option>
              ))}
            </select>
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
            <DialogClose asChild>
              <button
                type="button"
                className="btn-secondary"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Adding...' : 'Add Link'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AddCollectionDialog = ({ open, onOpenChange, onSuccess }: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_public: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('collections').insert([{
        ...formData,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }]);

      if (error) throw error;

      toast.success('Collection created successfully');
      onSuccess();
      onOpenChange(false);
      setFormData({ name: '', description: '', is_public: false });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-secondary sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 rounded-lg bg-secondary-light border border-white/10 focus:border-primary focus:outline-none"
              placeholder="Enter collection name"
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
              placeholder="Enter collection description"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_public"
              type="checkbox"
              checked={formData.is_public}
              onChange={(e) => setFormData(prev => ({ ...prev, is_public: e.target.checked }))}
              className="rounded border-white/10 bg-secondary-light"
            />
            <label htmlFor="is_public" className="text-sm font-medium">
              Make this collection public
            </label>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <DialogClose asChild>
              <button
                type="button"
                className="btn-secondary"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Creating...' : 'Create Collection'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Dashboard = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [addCollectionOpen, setAddCollectionOpen] = useState(false);

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
        <button 
          className="btn-secondary flex items-center gap-2"
          onClick={() => setAddCollectionOpen(true)}
        >
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

      {/* Dialogs */}
      <AddLinkDialog 
        open={addLinkOpen} 
        onOpenChange={setAddLinkOpen}
        onSuccess={fetchUserData}
      />
      <AddCollectionDialog 
        open={addCollectionOpen}
        onOpenChange={setAddCollectionOpen}
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
