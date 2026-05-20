import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Timer() {
  const [input, setInput] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  useEffect(() => {
    let interval: number;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            setRunning(false);
            toast.success("Time's up ⏰");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [running]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
      <h1 className="text-4xl font-bold">Timer</h1>

      <input
        type="number"
        value={input}
        placeholder="Enter second"
        className="border p-2 rounded text-center text-xl"
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setInput(value > 0 ? value : 0);
        }}
      />

      <h2 className="text-5xl font-semibold">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h2>

      <div className="flex gap-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (input <= 0) return;

            setTime(input);
            setRunning(true);
            toast.success("Timer started ⏳");
          }}
        >
          Start
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setRunning(false);
            toast.success("Timer paused ⏸️");
          }}
        >
          Pause
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setRunning(false);
            setTime(0);
            setInput(0);
            toast.success("Timer reset 🔄");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
