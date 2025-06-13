
import { useState, useEffect } from 'react';
import { Folder, ArrowLeft, Edit, Trash2, Plus } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { userLists, loading, fetchUserLists, deleteList, UserList } from '@/store/listStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import RandomLinksDisplay from '../components/RandomLinksDisplay';

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="glass-card p-6 border-l-4 border-l-green-500">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Folder className="w-5 h-5 text-green-400" />
                  </div>
                  <h1 className="text-3xl font-bold">Tutte le tue liste</h1>
                </div>
                <button 
                  className="btn-primary flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/')}
                >
                  <Plus className="w-4 h-4" />
                  Nuova lista
                </button>
              </div>
              
              {$loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse h-24 bg-secondary-light/20 rounded-lg" />
                  ))}
                </div>
              ) : $userLists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {$userLists.map((list) => (
                    <div
                      key={list.id}
                      className="glass-card p-4 hover:bg-green-500/10 transition-colors cursor-pointer border-l-2 border-l-green-400"
                      onClick={() => handleViewList(list)}
                    >
                      <div className="flex items-start gap-3">
                        <Folder className="w-6 h-6 mt-0.5 text-green-400" />
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{list.name}</h3>
                          {list.description && (
                            <p className="text-sm text-white/70 mt-1">{list.description}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${list.public ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {list.public ? 'Pubblica' : 'Privata'}
                            </span>
                            <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                              Lista
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // TODO: Implement edit functionality
                            }}
                            className="text-white/70 hover:text-green-400"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteList(list.id, e)}
                            className="text-white/70 hover:text-red-400"
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
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Folder className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-white/70 text-lg">Nessuna lista creata ancora</p>
                  <p className="text-white/50 text-sm mt-2">Inizia creando la tua prima lista dalla dashboard</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-card p-4 border-l-4 border-l-green-500">
              <RandomLinksDisplay sectionType="lists" count={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLists;
