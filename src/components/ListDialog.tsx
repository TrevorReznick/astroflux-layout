
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { createList, updateList, UserList } from "@/store/listStore";

interface ListDialogProps { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  editingList?: UserList | null;
}

const ListDialog = ({ open, onOpenChange, onSuccess, editingList = null }: ListDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    public: false
  });

  useEffect(() => {
    if (editingList) {
      setFormData({
        name: editingList.name,
        description: editingList.description || '',
        public: editingList.public
      });
    } else {
      setFormData({
        name: '',
        description: '',
        public: false
      });
    }
  }, [editingList, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      
      if (editingList) {
        result = await updateList(editingList.id, formData);
        if (!result.success) {
          throw new Error(result.error);
        }
        toast.success('Lista aggiornata con successo');
      } else {
        result = await createList(formData);
        if (!result.success) {
          throw new Error(result.error);
        }
        toast.success('Lista creata con successo');
      }
      
      onSuccess();
      onOpenChange(false);
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
          <DialogTitle>
            {editingList ? 'Modifica Lista' : 'Crea Nuova Lista'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nome
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 rounded-lg bg-secondary-light border border-white/10 focus:border-primary focus:outline-none"
              placeholder="Inserisci il nome della lista"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Descrizione (opzionale)
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 rounded-lg bg-secondary-light border border-white/10 focus:border-primary focus:outline-none"
              placeholder="Inserisci la descrizione della lista"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_public"
              type="checkbox"
              checked={formData.public}
              onChange={(e) => setFormData(prev => ({ ...prev, public: e.target.checked }))}
              className="rounded border-white/10 bg-secondary-light"
            />
            <label htmlFor="is_public" className="text-sm font-medium">
              Rendi questa lista pubblica
            </label>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <DialogClose asChild>
              <button
                type="button"
                className="btn-secondary"
              >
                Annulla
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 
                (editingList ? 'Aggiornamento...' : 'Creazione...') : 
                (editingList ? 'Aggiorna Lista' : 'Crea Lista')
              }
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListDialog;
