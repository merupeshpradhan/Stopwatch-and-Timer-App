import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    /* Lightened up baseline background color and boosted gradients */
    <div className="min-h-screen bg-neutral-900 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-900/50 via-neutral-900 to-neutral-950 text-neutral-100 flex flex-col antialiased relative overflow-hidden">
      
      {/* Significantly brightened ambient lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-emerald-500/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-400/15 blur-[120px] pointer-events-none" />

      <Toaster 
        toastOptions={{
          className: 'backdrop-blur-md bg-neutral-800/90 text-white border border-neutral-700 rounded-2xl shadow-xl',
        }}
        position="top-right" 
      />
      
      <Navbar />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex items-center justify-center relative z-10">
        {/* Main card box is lightened with a subtle translucent green border ring glow */}
        <div className="w-full backdrop-blur-2xl bg-neutral-800/40 border border-emerald-500/20 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_60px_-15px_rgba(16,185,129,0.25)]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
