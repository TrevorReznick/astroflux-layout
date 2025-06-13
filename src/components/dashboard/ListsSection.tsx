
import { Folder, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userLists, loading, fetchUserLists, deleteList, UserList } from '@/store/listStore';
import { toast } from "sonner";
import { Link } from 'react-router-dom';

interface ListsSectionProps {
  onCreateList: () => void;
  onEditList: (list: UserList) => void;
  onViewList: (list: UserList) => void;
}

const ListsSection = ({ onCreateList, onEditList, onViewList }: ListsSectionProps) => {
  const $userLists = useStore(userLists);
  const $loading = useStore(loading);
  
  useEffect(() => {
    fetchUserLists();
  }, []);

  const handleDeleteList = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Sei sicuro di voler eliminare questa lista?')) {
      const result = await deleteList(id);
      if (result.success) {
        toast.success('Lista eliminata con successo');
      } else {
        toast.error(`Errore durante l'eliminazione: ${result.error}`);
      }
    }
  };

  const displayedLists = $userLists.slice(0, 4);

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Le tue liste</h2>
        <div className="flex items-center gap-2">
          {$userLists.length > 4 && (
            <Link 
              to="/lists" 
              className="text-primary hover:text-primary/80 text-sm flex items-center gap-1 mr-2"
            >
              Visualizza tutto
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
          <button 
            className="btn-primary inline-flex items-center gap-2 text-sm py-1 px-3"
            onClick={onCreateList}
          >
            <Plus className="w-4 h-4" />
            Nuova lista
          </button>
        </div>
      </div>
      
      {$loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-secondary-light/20 rounded" />
          ))}
        </div>
      ) : displayedLists.length > 0 ? (
        <div className="space-y-4">
          {displayedLists.map((list) => (
            <div
              key={list.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary-light/20 transition-colors cursor-pointer"
              onClick={() => onViewList(list)}
            >
              <Folder className="w-5 h-5 mt-0.5 text-primary" />
              <div className="flex-1">
                <h3 className="font-medium">{list.name}</h3>
                {list.description && (
                  <p className="text-sm text-white/70 mt-1">{list.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditList(list);
                  }}
                  className="text-white/70 hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDeleteList(list.id, e)}
                  className="text-white/70 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/70">Nessuna lista creata</p>
      )}
    </div>
  );
};

export default ListsSection;
