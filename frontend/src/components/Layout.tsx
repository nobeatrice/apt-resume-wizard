
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F3F9]">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-[#77BDC6] py-3 text-center">
        <p>&copy; 2025 Resume.ai</p>
      </footer>
    </div>
  );
};
