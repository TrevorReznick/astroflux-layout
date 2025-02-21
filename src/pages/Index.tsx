
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import { Rocket, Zap, Box, Trophy, Users, ThumbsUp, Monitor, ShoppingBag } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="feature-card animate-fade-in">
    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
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
            AI-Powered Workflow Assistant
          </h1>
          <p className="text-xl text-white/80 mb-8 animate-fade-in">
            Streamline your production, amplify your creativity.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Download</button>
          </div>
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-20 px-6 bg-secondary-light/20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What we offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Zap}
            title="Strong empathy"
            description="Understand and connect with your audience effectively"
          />
          <FeatureCard
            icon={Box}
            title="Effortless updates"
            description="Keep your content fresh with seamless updates"
          />
          <FeatureCard
            icon={Trophy}
            title="Conquer the best"
            description="Stay ahead of the competition with cutting-edge tools"
          />
          <FeatureCard
            icon={Users}
            title="Designing for people"
            description="Create experiences that users love"
          />
          <FeatureCard
            icon={ThumbsUp}
            title="Simple and affordable"
            description="Get premium features at accessible prices"
          />
          <FeatureCard
            icon={Monitor}
            title="Get freelance work"
            description="Connect with potential clients easily"
          />
          <FeatureCard
            icon={ShoppingBag}
            title="Sell your goods"
            description="Set up your online store effortlessly"
          />
          <FeatureCard
            icon={Rocket}
            title="Launch faster"
            description="Accelerate your project deployment"
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
