
import { atom } from 'nanostores';
import { supabase } from "@/integrations/supabase/client";

// Definizione delle interfacce
export interface UserList {
  id: number;
  name: string;
  description: string | null;
  public: boolean;
  created_at: string;
  modified_at: string;
}

export interface ListItem {
  id: number;
  id_list: number;
  id_src: number;
}

// Store per le liste e gli elementi
export const userLists = atom<UserList[]>([]);
export const listItems = atom<ListItem[]>([]);
export const loading = atom(true);

// Actions
export async function fetchUserLists() {
  try {
    loading.set(true);
    const { data: listsData, error: listsError } = await supabase
      .from('lists_users')
      .select('*')
      .order('modified_at', { ascending: false });

    if (listsError) throw listsError;
    userLists.set(listsData || []);
    
    return { success: true, data: listsData };
  } catch (error: any) {
    console.error('Error fetching user lists:', error);
    return { success: false, error: error.message };
  } finally {
    loading.set(false);
  }
}

export async function fetchListItems(listId: number) {
  try {
    loading.set(true);
    const { data: itemsData, error: itemsError } = await supabase
      .from('lists_items')
      .select('*')
      .eq('id_list', listId);

    if (itemsError) throw itemsError;
    listItems.set(itemsData || []);
    
    return { success: true, data: itemsData };
  } catch (error: any) {
    console.error('Error fetching list items:', error);
    return { success: false, error: error.message };
  } finally {
    loading.set(false);
  }
}

export async function createList(listData: {
  name: string;
  description: string;
  public: boolean;
}) {
  try {
    const { data: newList, error } = await supabase
      .from('lists_users')
      .insert([{
        ...listData,
        id_user: (await supabase.auth.getUser()).data.user?.id,
        created_at: new Date().toISOString(),
        modified_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    // Aggiorna lo store con la nuova lista
    userLists.set([newList, ...userLists.get()]);
    
    return { success: true, data: newList };
  } catch (error: any) {
    console.error('Error creating list:', error);
    return { success: false, error: error.message };
  }
}

export async function addItemToList(itemData: {
  id_list: number;
  id_src: number;
}) {
  try {
    const { data: newItem, error } = await supabase
      .from('lists_items')
      .insert([itemData])
      .select()
      .single();

    if (error) throw error;

    // Aggiorna lo store con il nuovo elemento
    listItems.set([newItem, ...listItems.get()]);
    
    return { success: true, data: newItem };
  } catch (error: any) {
    console.error('Error adding item to list:', error);
    return { success: false, error: error.message };
  }
}

export async function removeItemFromList(itemId: number) {
  try {
    const { error } = await supabase
      .from('lists_items')
      .delete()
      .eq('id', itemId);

    if (error) throw error;

    // Aggiorna lo store rimuovendo l'elemento
    listItems.set(listItems.get().filter(item => item.id !== itemId));
    
    return { success: true };
  } catch (error: any) {
    console.error('Error removing item from list:', error);
    return { success: false, error: error.message };
  }
}

export async function updateList(listId: number, updates: Partial<UserList>) {
  try {
    const { data: updatedList, error } = await supabase
      .from('lists_users')
      .update({ 
        ...updates, 
        modified_at: new Date().toISOString() 
      })
      .eq('id', listId)
      .select()
      .single();

    if (error) throw error;

    // Aggiorna lo store con la lista modificata
    userLists.set(
      userLists.get().map(list => 
        list.id === listId ? { ...list, ...updatedList } : list
      )
    );
    
    return { success: true, data: updatedList };
  } catch (error: any) {
    console.error('Error updating list:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteList(listId: number) {
  try {
    const { error } = await supabase
      .from('lists_users')
      .delete()
      .eq('id', listId);

    if (error) throw error;

    // Aggiorna lo store rimuovendo la lista
    userLists.set(userLists.get().filter(list => list.id !== listId));
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting list:', error);
    return { success: false, error: error.message };
  }
}
