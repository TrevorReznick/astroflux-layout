
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ListDetail from "./pages/ListDetail";
import LinksDisplay from "./pages/LinksDisplay";
import AllCollections from "./pages/AllCollections";
import AllLists from "./pages/AllLists";
import PagesList from "./pages/PagesList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/links" element={<LinksDisplay />} />
          <Route path="/collections" element={<AllCollections />} />
          <Route path="/lists" element={<AllLists />} />
          <Route path="/list/:id" element={<ListDetail />} />
          <Route path="/pages" element={<PagesList />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
