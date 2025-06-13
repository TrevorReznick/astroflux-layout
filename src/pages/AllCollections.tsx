
import { useState, useEffect } from 'react';
import { Folder, ArrowLeft } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { collections, loading, fetchUserData } from '@/store/linkStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RandomLinksDisplay from '../components/RandomLinksDisplay';

const AllCollections = () => {
  const $collections = useStore(collections);
  const $loading = useStore(loading);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

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
            <div className="glass-card p-6 border-l-4 border-l-purple-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Folder className="w-5 h-5 text-purple-400" />
                </div>
                <h1 className="text-3xl font-bold">Tutte le tue collezioni</h1>
              </div>
              
              {$loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse h-24 bg-secondary-light/20 rounded-lg" />
                  ))}
                </div>
              ) : $collections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {$collections.map((collection) => (
                    <div
                      key={collection.id}
                      className="glass-card p-4 hover:bg-purple-500/10 transition-colors cursor-pointer border-l-2 border-l-purple-400"
                    >
                      <div className="flex items-start gap-3">
                        <Folder className="w-6 h-6 mt-0.5 text-purple-400" />
                        <div>
                          <h3 className="font-medium text-lg">{collection.name}</h3>
                          {collection.description && (
                            <p className="text-sm text-white/70 mt-1">{collection.description}</p>
                          )}
                          <div className="mt-2 flex items-center gap-2">
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                              Collezione
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Folder className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-white/70 text-lg">Nessuna collezione creata ancora</p>
                  <p className="text-white/50 text-sm mt-2">Inizia creando la tua prima collezione dalla dashboard</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-card p-4 border-l-4 border-l-purple-500">
              <RandomLinksDisplay sectionType="collections" count={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCollections;
