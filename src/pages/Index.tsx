import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import { 
  Rocket, Zap, Box, Trophy, Users, ThumbsUp, 
  Monitor, ShoppingBag, Star, Sparkles, FolderPlus, 
  FileSearch, Mail, ListChecks, BookOpen, CheckCircle,
  Download, Chrome, Globe, Play, Circle,
  Code, Server, Cpu, Cloud, Database, Shield
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

const BrowserButton = ({ icon: Icon, name, disabled = false }: { icon: any, name: string, disabled?: boolean }) => (
  <button 
    className={`flex items-center gap-3 px-6 py-3 rounded-lg border transition-all ${
      disabled 
        ? 'border-white/20 bg-white/5 text-white/40 cursor-not-allowed' 
        : 'border-primary/50 bg-primary/10 text-white hover:bg-primary/20 hover:border-primary'
    }`}
    disabled={disabled}
  >
    <Icon className="h-5 w-5" />
    <span>Download for {name}</span>
    {disabled && <span className="text-xs">(Coming Soon)</span>}
  </button>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-primary text-sm uppercase tracking-wide mb-4 animate-fade-in">
              Astroflux, organize Your Workflow, Effortlessly
            </p>
            <h1 className="text-6xl font-bold mb-6 animate-fade-in">
              AI-Powered Workflow Assistant
            </h1>
            <p className="text-xl text-white/80 mb-12 animate-fade-in">
              Streamline your production, amplify your creativity with intelligent link management and workflow recording.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
              <button 
                onClick={() => navigate('/auth')}
                className="btn-primary px-8 py-4 text-lg"
              >
                Get Started
              </button>
              <button 
                onClick={() => document.getElementById('extension')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary px-8 py-4 text-lg"
              >
                Download Extension
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-wide mb-4">Workspaces</p>
            <h2 className="text-4xl font-bold mb-6">What services do we provide?</h2>
            <p className="text-white/70 text-lg max-w-4xl mx-auto">
              We offer a comprehensive suite of tools to streamline your digital workflow and boost productivity.
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
              title="Your Saved Lists" 
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

      {/* Browser Extension Section */}
      <section id="extension" className="py-20 px-6 bg-secondary-light/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-wide mb-4">Browser Extension</p>
            <h2 className="text-4xl font-bold mb-6">Save Links with One Click</h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Install our browser extension to save any webpage instantly. Automatic categorization, smart tagging, and seamless sync across all your devices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <FeatureListItem 
                icon={Download} 
                title="Instant Save" 
                description="Right-click any webpage and save it to your collections with automatic metadata extraction and favicon capture."
              />
              <FeatureListItem 
                icon={Sparkles} 
                title="AI-Powered Categorization" 
                description="Our AI automatically suggests the best collection and tags based on the content of the page you're saving."
              />
              <FeatureListItem 
                icon={Zap} 
                title="Quick Access" 
                description="Search and access your saved links directly from the extension popup without opening the main app."
              />
              
              <div className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Download for your browser:</h3>
                <div className="grid grid-cols-1 gap-3">
                  <BrowserButton icon={Chrome} name="Chrome" />
                  <BrowserButton icon={Globe} name="Firefox" disabled />
                  <BrowserButton icon={Globe} name="Safari" disabled />
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                  alt="Browser extension demo" 
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute top-12 right-12 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Live Demo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Recorder Section */}
      <section id="workflow" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-wide mb-4">Coming Soon</p>
            <h2 className="text-4xl font-bold mb-6">Workflow Recorder</h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Record, analyze, and optimize your digital workflows. Capture your browsing patterns and get AI-powered insights to improve your productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                  alt="Workflow analysis" 
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute top-12 left-12 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  <Circle className="h-3 w-3 fill-current" />
                  Recording
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <FeatureListItem 
                icon={Circle} 
                title="Session Recording" 
                description="Record your browsing sessions to understand how you navigate between different tools and websites during your work."
              />
              <FeatureListItem 
                icon={Sparkles} 
                title="Pattern Analysis" 
                description="AI analyzes your workflow patterns to identify inefficiencies and suggest optimizations for better productivity."
              />
              <FeatureListItem 
                icon={Trophy} 
                title="Productivity Insights" 
                description="Get detailed reports on your digital habits with suggestions for improving focus and eliminating time-wasting activities."
              />
              
              <div className="pt-6">
                <button className="btn-primary px-6 py-3 opacity-50 cursor-not-allowed">
                  <Play className="h-4 w-4 mr-2" />
                  Coming Soon
                </button>
                <p className="text-sm text-white/50 mt-2">Join the waitlist to be notified when available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manage Resources Section */}
      <section className="py-20 px-6 bg-secondary-light/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-wide mb-4">Resource Management</p>
            <h2 className="text-4xl font-bold mb-6">Manage resources effortlessly</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Get a look at how our platform transforms your digital resource management
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
                title="Personalize your work and manage the poor browser bookmarks" 
                description="Create personalized lists and tags for an even more tailored resource management experience. Organize, tag, and find your resources with ease."
              />
              <FeatureListItem 
                icon={Mail} 
                title="Share your resources easily" 
                description="Update and organize your favorite resources directly from the app, ensuring you always have quick access to what matters most."
              />
            </div>
            
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06" 
                  alt="Resource management illustration" 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-wide mb-4">How to use Astroflux?</p>
            <h2 className="text-4xl font-bold mb-6">Simply usage explanation</h2>
            <p className="text-white/70 text-lg">
              Get your workflow optimized by following these simple steps
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
                icon={Download}
                number={2} 
                title="Download browser extension" 
                description="Download our browser extension to save and classify web resources with one click"
              />
              <StepCard 
                icon={ListChecks}
                number={3} 
                title="Customize lists and collections" 
                description="Organize your resources into custom collections and lists right from your Dashboard"
              />
              <StepCard 
                icon={Record}
                number={4} 
                title="Record workflows (Coming Soon)" 
                description="Use our workflow recorder to analyze and optimize your productivity patterns"
              />
              <div className="flex items-start gap-4 pt-4">
                <div className="h-12 w-12 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400">Ready to boost your productivity!</h3>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Workflow optimization" 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 bg-secondary-light/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-wide mb-4">About Us</p>
            <h2 className="text-4xl font-bold mb-6">Built by Passionate Developers</h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Quarter-century of experience meets cutting-edge innovation in digital workflow optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">25 Years of Development</h3>
                    <p className="text-white/60">Passionate about code since the early days</p>
                  </div>
                </div>
                <p className="text-white/70">
                  From the early days of web development to modern cloud architectures, we've witnessed and adapted to every major technological shift. Our passion for clean code and innovative solutions drives everything we build.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Systems Architecture Expert</h3>
                    <p className="text-white/60">25 years of enterprise system management</p>
                  </div>
                </div>
                <p className="text-white/70">
                  Decades of experience managing critical systems for established companies in the tech sector. We understand the importance of reliability, scalability, and security in every solution we create.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Innovation Focus</h3>
                    <p className="text-white/60">Always exploring new technologies</p>
                  </div>
                </div>
                <p className="text-white/70">
                  We stay at the forefront of technology trends, continuously learning and implementing the latest tools and methodologies. From AI integration to modern development frameworks, we embrace innovation while maintaining proven stability.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="glass-card p-8 rounded-2xl text-center">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                  alt="Development workspace" 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-white/70 text-lg">
                  To create tools that genuinely improve how people work with digital resources, combining decades of technical expertise with a deep understanding of user needs.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 text-center">
                  <Cpu className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Performance</h4>
                  <p className="text-sm text-white/60">Optimized for speed</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Security</h4>
                  <p className="text-sm text-white/60">Enterprise-grade</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <Cloud className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Scalability</h4>
                  <p className="text-sm text-white/60">Built to grow</p>
                </div>
                <div className="glass-card p-4 text-center">
                  <Database className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Reliability</h4>
                  <p className="text-sm text-white/60">Always available</p>
                </div>
              </div>
            </div>
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

      {/* Contact Section */}
      <section id="contacts" className="py-20 px-6 bg-secondary-light/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their digital workflow with Astroflux.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/auth')}
              className="btn-primary px-8 py-4 text-lg"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => document.getElementById('extension')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Download Extension
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

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
