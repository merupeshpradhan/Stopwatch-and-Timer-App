import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Stopwatch() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  useEffect(() => {
    let interval: number;

    if (running) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
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
      <h1 className="text-4xl font-bold">Stopwatch</h1>
      <p className="text-5xl font-semibold">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      <div className="flex gap-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setRunning(true);
            toast.success("Stopwatch started ⏳");
          }}
        >
          Start
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setRunning(false);
            toast.success("Stopwatch stopped ⏸️");
          }}
        >
          Stop
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setRunning(false);
            setTime(0);
            toast.success("Stopwatch reset 🔄");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
