import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Timer() {
  const [input, setInput] = useState<string>("");
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  const progress = totalSeconds > 0 ? time / totalSeconds : 0;

  useEffect(() => {
    let interval: number | undefined;
    if (running && time > 0) {
      interval = window.setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            setRunning(false);
            setTotalSeconds(0);
            toast("Time Parameters Expired! ⏰", { icon: '🔔', duration: 5000 });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [running, time]);

  const handleSetTimer = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(input, 10);
    if (isNaN(parsed) || parsed <= 0) {
      toast.error("Enter operational seconds count");
      return;
    }
    setTime(parsed);
    setTotalSeconds(parsed);
    setInput("");
    toast.success(`Timer set for ${parsed}s 🎯`);
  };

  return (
    <div className="flex flex-col md:flex-row-reverse items-center justify-around gap-12 w-full max-w-3xl mx-auto">
      {/* Lightened tracker background layer circle */}
      <div className="relative flex items-center justify-center filter drop-shadow-[0_0_40px_rgba(245,158,11,0.3)]">
        <svg className="w-72 h-72 rotate-[-90deg]" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="72" fill="none" stroke="#262626" strokeWidth="7" />
          <circle
            cx="80"
            cy="80"
            r="72"
            fill="none"
            stroke="url(#timerGlow)"
            strokeWidth="7"
            strokeDasharray={2 * Math.PI * 72}
            strokeDashoffset={totalSeconds > 0 ? (1 - progress) * 2 * Math.PI * 72 : 0}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
          <defs>
            <linearGradient id="timerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-mono font-semibold tracking-tight text-white select-none">
            {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-2">Remaining</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center md:items-start gap-6 w-full max-w-xs">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400">
            Timer
          </h1>
          <p className="text-neutral-300 text-sm mt-1.5">Establish downward asynchronous counter thresholds.</p>
        </div>

        <form onSubmit={handleSetTimer} className="flex gap-2 w-full">
          <input
            type="number"
            value={input}
            placeholder="Seconds (e.g. 90)"
            className="w-full bg-neutral-900/90 border border-neutral-700 rounded-xl px-4 py-3 outline-none text-xs text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-500/20 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={(e) => setInput(e.target.value)}
            disabled={running}
          />
          <button
            type="submit"
            disabled={running}
            className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 disabled:opacity-20 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider text-neutral-200 transition"
          >
            Apply
          </button>
        </form>

        <div className="flex gap-3 w-full">
          <button
            onClick={() => {
              if (time <= 0) return toast.error("Provide operational metrics before firing trigger");
              setRunning(!running);
            }}
            className={`flex-1 py-3.5 rounded-xl font-bold tracking-wide text-xs uppercase transition-all duration-200 transform active:scale-95 ${
              running 
                ? "bg-neutral-700 text-amber-300 border border-amber-500/30" 
                : "bg-amber-400 hover:bg-amber-500 text-neutral-950 shadow-lg shadow-amber-400/20"
            }`}
          >
            {running ? "Pause" : "Start"}
          </button>
          
          <button
            onClick={() => {
              setRunning(false);
              setTime(0);
              setTotalSeconds(0);
              toast.error("Timer Purged 🔄");
            }}
            className="flex-1 py-3.5 rounded-xl font-bold tracking-wide text-xs uppercase bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 transition active:scale-95"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
