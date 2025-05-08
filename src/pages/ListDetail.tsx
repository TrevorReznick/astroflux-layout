
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { fetchListItems, listItems } from '@/store/listStore';
import { useStore } from '@nanostores/react';
import Navbar from '../components/Navbar';
import { Link as LinkIcon, ArrowLeft, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const ListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const $listItems = useStore(listItems);
  const [listDetails, setListDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    const fetchListDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Fetch list details
        const { data: listData, error: listError } = await supabase
          .from('lists_users')
          .select('*')
          .eq('id', id)
          .single();
        
        if (listError) throw listError;
        setListDetails(listData);
        
        // Fetch list items
        await fetchListItems(parseInt(id));
        
        // Fetch resources for those items
        if ($listItems.length > 0) {
          const itemIds = $listItems.map(item => item.id_src);
          const { data: resourcesData, error: resourcesError } = await supabase
            .from('main_table')
            .select('*')
            .in('id', itemIds);
          
          if (resourcesError) throw resourcesError;
          setResources(resourcesData || []);
        }
      } catch (error: any) {
        console.error('Error fetching list details:', error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchListDetails();
  }, [id]);

  const removeItemFromList = async (itemId: number) => {
    try {
      const { error } = await supabase
        .from('lists_items')
        .delete()
        .eq('id', itemId);
      
      if (error) throw error;
      
      // Refresh items
      if (id) {
        await fetchListItems(parseInt(id));
      }
      
      toast.success('Elemento rimosso dalla lista');
    } catch (error: any) {
      toast.error(`Errore durante la rimozione: ${error.message}`);
    }
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

  if (!listDetails) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Lista non trovata</h2>
              <button 
                className="btn-secondary flex items-center gap-2 mx-auto"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4" />
                Torna indietro
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <button 
          className="btn-secondary flex items-center gap-2 mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Torna alle liste
        </button>

        <div className="glass-card p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">{listDetails.name}</h1>
          {listDetails.description && (
            <p className="text-white/70 mb-4">{listDetails.description}</p>
          )}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs ${listDetails.public ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
              {listDetails.public ? 'Pubblica' : 'Privata'}
            </span>
            <span className="text-white/50 text-sm">
              Creata il {new Date(listDetails.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-6">Elementi nella lista</h2>
          
          {$listItems.length === 0 ? (
            <p className="text-white/70 text-center py-8">
              Questa lista non contiene ancora elementi
            </p>
          ) : (
            <div className="space-y-4">
              {$listItems.map((item) => {
                const resource = resources.find((r) => r.id === item.id_src);
                return resource ? (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary-light/20 transition-colors"
                  >
                    <LinkIcon className="w-5 h-5 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-medium">
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:text-primary transition-colors"
                        >
                          {resource.title || resource.name || resource.url}
                        </a>
                      </h3>
                      {resource.description && (
                        <p className="text-sm text-white/70 mt-1">{resource.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItemFromList(item.id)}
                      className="text-white/70 hover:text-white"
                      title="Rimuovi dalla lista"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
