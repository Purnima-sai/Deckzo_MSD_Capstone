import { Toaster } from "@/components/ui/toaster";
import { Toaster"@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import StudyModes from "./pages/StudyModes";
import Testimonials from "./pages/Testimonials";
import StudyBlogs from "./pages/StudyBlogs";
import Contact from "./pages/Contact";
import PomodoroTimer from "./pages/study/PomodoroTimer";
import CornellNotes from "./pages/study/CornellNotes";
import QuizMaker from "./pages/study/QuizMaker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="features" element={<Features />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="study-modes" element={<StudyModes />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="study-blogs" element={<StudyBlogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="study/pomodoro" element={<PomodoroTimer />} />
            <Route path="study/cornell-notes" element={<CornellNotes />} />
            <Route path="study/quiz" element={<QuizMaker />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
