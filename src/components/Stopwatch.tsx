import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Stopwatch() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  const progress = (time % 60) / 60;

  useEffect(() => {
    let interval: number | undefined;
    if (running) {
      interval = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [running]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-12 w-full max-w-3xl mx-auto">
      {/* Lightened tracker background layer circle */}
      <div className="relative flex items-center justify-center filter drop-shadow-[0_0_40px_rgba(16,185,129,0.35)]">
        <svg className="w-72 h-72 rotate-[-90deg]" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="72" fill="none" stroke="#262626" strokeWidth="7" />
          <circle
            cx="80"
            cy="80"
            r="72"
            fill="none"
            stroke="url(#stopwatchGlow)"
            strokeWidth="7"
            strokeDasharray={2 * Math.PI * 72}
            strokeDashoffset={(1 - progress) * 2 * Math.PI * 72}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
          <defs>
            <linearGradient id="stopwatchGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-mono font-semibold tracking-tight text-white select-none">
            {hours.toString().padStart(2, "0")}
            <span className={running ? "text-emerald-400 animate-pulse mx-0.5" : "text-neutral-500 mx-0.5"}>:</span>
            {minutes.toString().padStart(2, "0")}
            <span className={running ? "text-emerald-400 animate-pulse mx-0.5" : "text-neutral-500 mx-0.5"}>:</span>
            {seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-2">Seconds Progress</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center md:items-start gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
            Stopwatch
          </h1>
          <p className="text-neutral-300 text-sm mt-1.5">Track intervals with micro-precision speedometers.</p>
        </div>

        <div className="flex gap-4 mt-2">
          <button
            onClick={() => {
              setRunning(!running);
              toast.success(running ? "Interval Paused ⏸️" : "Tracker Running ⏳");
            }}
            className={`w-32 py-3.5 rounded-2xl font-bold tracking-wide text-xs uppercase shadow-xl transition-all duration-300 transform active:scale-95 ${
              running 
                ? "bg-neutral-700 hover:bg-neutral-600 text-amber-300 border border-amber-500/40" 
                : "bg-emerald-400 hover:bg-emerald-500 text-neutral-950 shadow-emerald-400/30"
            }`}
          >
            {running ? "Pause" : "Start"}
          </button>
          
          <button
            onClick={() => {
              setRunning(false);
              setTime(0);
              toast.error("Stopwatch Restored 🔄");
            }}
            className="w-32 py-3.5 rounded-2xl font-bold tracking-wide text-xs uppercase bg-neutral-700/50 hover:bg-neutral-600 text-neutral-200 border border-neutral-600 transition-all duration-300 active:scale-95"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
