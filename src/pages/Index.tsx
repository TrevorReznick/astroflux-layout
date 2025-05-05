
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import { 
  Rocket, Zap, Box, Trophy, Users, ThumbsUp, 
  Monitor, ShoppingBag, Star, Sparkles, FolderPlus, 
  FileSearch, Mail, ListChecks, BookOpen
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="feature-card animate-fade-in">
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

const Landing = () => (
  <>
    {/* Hero Section */}
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Organize Your Digital Resources
          </h1>
          <p className="text-xl text-white/80 mb-8 animate-fade-in">
            Save, organize, and access your favorite links from anywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section className="py-20 px-6 bg-secondary-light/20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What services do we provide?</h2>
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
      </div>
    </section>

    {/* Manage Resources Section */}
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Manage resources effortlessly</h2>
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
      </div>
    </section>

    {/* How to Use Section */}
    <section className="py-20 px-6 bg-secondary-light/20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How to use</h2>
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
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What we offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Zap}
            title="Quick Access"
            description="Find all your important links in one place"
          />
          <FeatureCard
            icon={Box}
            title="Smart Collections"
            description="Organize your links into custom collections"
          />
          <FeatureCard
            icon={Trophy}
            title="Best Practices"
            description="Discover the most effective ways to organize"
          />
          <FeatureCard
            icon={Users}
            title="Collaboration"
            description="Share collections with teammates and friends"
          />
          <FeatureCard
            icon={ThumbsUp}
            title="Simple Interface"
            description="Easy-to-use dashboard with intuitive controls"
          />
          <FeatureCard
            icon={Monitor}
            title="Cross-device Access"
            description="Use on any device with your account"
          />
          <FeatureCard
            icon={ShoppingBag}
            title="Resource Management"
            description="Keep all your digital resources organized"
          />
          <FeatureCard
            icon={Rocket}
            title="Productivity Boost"
            description="Save time finding what you need when you need it"
          />
        </div>
      </div>
    </section>
  </>
);

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {!loading && (user ? <Dashboard /> : <Landing />)}
    </div>
  );
};

export default Index;
