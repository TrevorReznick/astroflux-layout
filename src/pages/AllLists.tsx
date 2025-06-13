
import { useState, useEffect } from 'react';
import { Folder, ArrowLeft, Edit, Trash2, Plus } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { userLists, loading, fetchUserLists, deleteList, UserList } from '@/store/listStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';

const AllLists = () => {
  const $userLists = useStore(userLists);
  const $loading = useStore(loading);
  const navigate = useNavigate();

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

  const handleViewList = (list: UserList) => {
    navigate(`/list/${list.id}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <button 
          className="btn-secondary flex items-center gap-2 mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Torna alla dashboard
        </button>

        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Tutte le tue liste</h1>
            <button 
              className="btn-primary flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              <Plus className="w-4 h-4" />
              Nuova lista
            </button>
          </div>
          
          {$loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse h-24 bg-secondary-light/20 rounded-lg" />
              ))}
            </div>
          ) : $userLists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {$userLists.map((list) => (
                <div
                  key={list.id}
                  className="glass-card p-4 hover:bg-secondary-light/20 transition-colors cursor-pointer"
                  onClick={() => handleViewList(list)}
                >
                  <div className="flex items-start gap-3">
                    <Folder className="w-6 h-6 mt-0.5 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{list.name}</h3>
                      {list.description && (
                        <p className="text-sm text-white/70 mt-1">{list.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${list.public ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {list.public ? 'Pubblica' : 'Privata'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement edit functionality
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Folder className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-lg">Nessuna lista creata ancora</p>
              <p className="text-white/50 text-sm mt-2">Inizia creando la tua prima lista dalla dashboard</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllLists;
