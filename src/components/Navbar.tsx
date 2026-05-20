import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <header className="w-full max-w-5xl mx-auto px-4 pt-6 relative z-20">
      <nav className="flex items-center justify-between backdrop-blur-md bg-neutral-800/40 border border-neutral-700/40 px-6 py-4 rounded-3xl shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
          <span className="font-bold tracking-widest text-xs text-neutral-300 uppercase">Chronos Engine</span>
        </div>
        
        {/* Brightened the wrapper capsule background */}
        <div className="flex gap-1.5 bg-neutral-900/80 p-1 rounded-2xl border border-neutral-700/50">
          <Link
            to="/"
            className={`text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300 ${
              location.pathname === "/" 
                ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-300 border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.3)]" 
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            Stopwatch
          </Link>
          <Link
            to="/timer"
            className={`text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300 ${
              location.pathname === "/timer" 
                ? "bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border border-amber-400/40 shadow-[0_0_25px_rgba(245,158,11,0.3)]" 
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            }`}
          >
            Timer
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
