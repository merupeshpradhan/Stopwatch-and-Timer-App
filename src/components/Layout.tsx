import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />

      <Navbar />

      <main className="flex-1 w-full mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
