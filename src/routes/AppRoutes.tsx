import { Route, Routes } from "react-router-dom";
import Stopwatch from "../components/Stopwatch";
import Timer from "../components/Timer";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Stopwatch />} />
      <Route path="/timer" element={<Timer />} />
    </Routes>
  );
}

export default AppRoutes;
