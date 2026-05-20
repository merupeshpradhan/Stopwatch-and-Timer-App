import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-center gap-6 bg-black/80 text-white py-4 shadow-lg">
      <Link to="/" className="hover:text-green-400 transition duration-300">
        Stopwatch
      </Link>
      <Link to="/timer" className="hover:text-yellow-400 transition duration-300">
        Timer
      </Link>
    </nav>
  );
}

export default Navbar;
