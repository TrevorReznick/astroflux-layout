
import { useState, useEffect } from 'react';
import { fetchUserData } from '@/store/linkStore';
import { fetchUserLists, UserList } from '@/store/listStore';
import QuickActions from './dashboard/QuickActions';
import LinksSection from './dashboard/LinksSection';
import CollectionsSection from './dashboard/CollectionsSection';
import ListsSection from './dashboard/ListsSection';
import AddLinkDialog from './AddLinkDialog';
import AddCollectionDialog from './AddCollectionDialog';
import ListDialog from './ListDialog';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [addCollectionOpen, setAddCollectionOpen] = useState(false);
  const [listDialogOpen, setListDialogOpen] = useState(false);
  const [editingList, setEditingList] = useState<UserList | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchUserLists();
  }, []);

  const handleCreateList = () => {
    setEditingList(null);
    setListDialogOpen(true);
  };

  const handleEditList = (list: UserList) => {
    setEditingList(list);
    setListDialogOpen(true);
  };

  const handleViewList = (list: UserList) => {
    navigate(`/list/${list.id}`);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      {/* Quick Actions */}
      <QuickActions 
        onAddLink={() => setAddLinkOpen(true)}
        onAddCollection={() => setAddCollectionOpen(true)}
        onAddList={handleCreateList}
      />

      {/* Dialogs */}
      <AddLinkDialog 
        open={addLinkOpen} 
        onOpenChange={setAddLinkOpen}
        onSuccess={() => fetchUserData()}
      />
      <AddCollectionDialog 
        open={addCollectionOpen}
        onOpenChange={setAddCollectionOpen}
        onSuccess={() => fetchUserData()}
      />
      <ListDialog 
        open={listDialogOpen}
        onOpenChange={setListDialogOpen}
        onSuccess={() => fetchUserLists()}
        editingList={editingList}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Recent Links */}
        <LinksSection />

        {/* Collections */}
        <CollectionsSection />

        {/* Lists */}
        <ListsSection 
          onCreateList={handleCreateList}
          onEditList={handleEditList}
          onViewList={handleViewList}
        />
      </div>
    </div>
  );
};

export default Dashboard;
