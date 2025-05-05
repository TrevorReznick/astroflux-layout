
import { useState, useEffect } from 'react';
import { fetchUserData } from '@/store/linkStore';
import QuickActions from './dashboard/QuickActions';
import LinksSection from './dashboard/LinksSection';
import CollectionsSection from './dashboard/CollectionsSection';
import AddLinkDialog from './AddLinkDialog';
import AddCollectionDialog from './AddCollectionDialog';
import { Star, ListChecks, Mail, Sparkles, FolderPlus, FileSearch, BookOpen } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="glass-card p-6 transition-all duration-300 hover:scale-105">
    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-white/70">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }: { number: number, title: string, description: string }) => (
  <div className="glass-card p-6 transition-all duration-300 hover:scale-105">
    <div className="h-10 w-10 rounded-full bg-primary/30 flex items-center justify-center mb-4 text-xl font-bold">
      {number}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-white/70">{description}</p>
  </div>
);

const Dashboard = () => {
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [addCollectionOpen, setAddCollectionOpen] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      {/* Quick Actions */}
      <QuickActions 
        onAddLink={() => setAddLinkOpen(true)}
        onAddCollection={() => setAddCollectionOpen(true)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Recent Links */}
        <LinksSection />

        {/* Collections */}
        <CollectionsSection />
      </div>

      {/* Services Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What services do we provide?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Star} 
            title="Manage Favorites" 
            description="Organize your favorite resources in one centralized place for easy access."
          />
          <FeatureCard 
            icon={ListChecks} 
            title="Your Saved Lists" 
            description="Create and manage custom lists to categorize your resources."
          />
          <FeatureCard 
            icon={Sparkles} 
            title="AI Proposals" 
            description="Get intelligent suggestions for new resources based on your interests."
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Manage resources effortlessly</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={FolderPlus} 
            title="Create Collections" 
            description="Group related links into collections for better organization."
          />
          <FeatureCard 
            icon={FileSearch} 
            title="Search and Filter" 
            description="Quickly find what you need with powerful search capabilities."
          />
          <FeatureCard 
            icon={Mail} 
            title="Share Resources" 
            description="Easily share your collections with colleagues and friends."
          />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How to use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepCard 
            number={1} 
            title="Add your links" 
            description="Save any useful website you find with a single click."
          />
          <StepCard 
            number={2} 
            title="Organize in collections" 
            description="Create collections to categorize and organize your resources."
          />
          <StepCard 
            number={3} 
            title="Access anywhere" 
            description="Your saved resources are available on any device, anytime."
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
