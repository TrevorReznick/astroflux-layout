
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import { 
  Rocket, Zap, Box, Trophy, Users, ThumbsUp, 
  Monitor, ShoppingBag, Star, Sparkles, FolderPlus, 
  FileSearch, Mail, ListChecks, BookOpen, CheckCircle
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

const FeatureListItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex items-start gap-4 mb-8">
    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  </div>
);

const StepCard = ({ icon: Icon, number, title, description }: { icon: any, number: number, title: string, description: string }) => (
  <div className="flex items-start gap-4 mb-6">
    <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">Step {number}: {title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  </div>
);

const Landing = () => (
  <>
    {/* Hero Section */}
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary text-sm uppercase tracking-wide mb-4 animate-fade-in">
            Astroflux, organize Your Workflow, Effortlessly
          </p>
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            AI-Powered Workflow Assistant
          </h1>
          <p className="text-xl text-white/80 mb-12 animate-fade-in">
            Streamline your production, amplify your creativity.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <button className="btn-primary px-8 py-4 text-lg">Get Started</button>
            <button className="btn-secondary px-8 py-4 text-lg">Download</button>
          </div>
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-wide mb-4">Workspaces</p>
          <h2 className="text-4xl font-bold mb-6">What services do we provide?</h2>
          <p className="text-white/70 text-lg max-w-4xl mx-auto">
            We offer a wide range of website templates that suit various industries and purposes such as business, portfolio, e-commerce, blog, etc.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Star} 
            title="Manage Favorites" 
            description="Organize all your resources, from links to hosting accounts, in one easily accessible place."
          />
          <FeatureCard 
            icon={ListChecks} 
            title="Yor Saved Lists" 
            description="Create custom lists for specific projects or areas of interest, keeping everything tidy and efficient."
          />
          <FeatureCard 
            icon={Sparkles} 
            title="AI Proposals" 
            description="Artificial intelligence classifies and suggests relevant resources, helping you discover new tools and optimize your workflow."
          />
        </div>
      </div>
    </section>

    {/* Manage Resources Section with Image */}
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-wide mb-4">What's new in Astroflux</p>
          <h2 className="text-4xl font-bold mb-6">Manage resources effortlessly</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Get a look as our platform works
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <FeatureListItem 
              icon={FolderPlus} 
              title="Stop boring searching something 'i was sure to found here'" 
              description="Stop lose track of important resources. Organize and retrieve them in seconds. Say goodbye to endlessly searching for links"
            />
            <FeatureListItem 
              icon={Sparkles} 
              title="Save time letting AI classify for you" 
              description="Let the AI classify your resources for you, ensuring everything is organized and easy to find"
            />
            <FeatureListItem 
              icon={ListChecks} 
              title="Personalize your work and manage the the poor browser bookmarks management" 
              description="Create personalized lists and tags for an even more tailored resource management experience. Organize, tag, and find your resources with ease."
            />
            <FeatureListItem 
              icon={Mail} 
              title="Share your resource easily" 
              description="Update and organize your favorite resources directly from the app, ensuring you always have quick access to what matters most."
            />
          </div>
          
          <div className="relative">
            <div className="glass-card p-8 rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06" 
                alt="Space illustration" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How to Use Section */}
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-wide mb-4">How to use Astroflux?</p>
          <h2 className="text-4xl font-bold mb-6">Simply usage explanation</h2>
          <p className="text-white/70 text-lg">
            Get you workflow by simply steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <StepCard 
              icon={CheckCircle}
              number={1} 
              title="Create account" 
              description="Create account or use provided social authenticator to log in"
            />
            <StepCard 
              icon={Monitor}
              number={2} 
              title="Download browser extension" 
              description="Download our browser extension to save and classify the web resource with one click"
            />
            <StepCard 
              icon={ListChecks}
              number={3} 
              title="Customize list" 
              description="Since the beginning, you can manage projects, resources, articles, list of tools in your Dashboard"
            />
            <div className="flex items-start gap-4 pt-4">
              <div className="h-12 w-12 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400">Ready!</h3>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="glass-card p-8 rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Workflow illustration" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
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
