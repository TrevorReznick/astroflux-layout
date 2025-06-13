
import { useState, useEffect } from 'react';
import { Folder, ArrowLeft } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { collections, loading, fetchUserData } from '@/store/linkStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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

        <div className="glass-card p-6">
          <h1 className="text-3xl font-bold mb-6">Tutte le tue collezioni</h1>
          
          {$loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse h-24 bg-secondary-light/20 rounded-lg" />
              ))}
            </div>
          ) : $collections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {$collections.map((collection) => (
                <div
                  key={collection.id}
                  className="glass-card p-4 hover:bg-secondary-light/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <Folder className="w-6 h-6 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium text-lg">{collection.name}</h3>
                      {collection.description && (
                        <p className="text-sm text-white/70 mt-1">{collection.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Folder className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-lg">Nessuna collezione creata ancora</p>
              <p className="text-white/50 text-sm mt-2">Inizia creando la tua prima collezione dalla dashboard</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCollections;
