
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Navbar = ({ className }: { className?: string }) => {
  return (
    <nav className={cn("w-full bg-[#77BDC6] px-4 py-3 flex items-center justify-between", className)}>
      <div className="flex items-center space-x-8">
        <Link to="/" className="font-bold text-lg tracking-tight">
          RESUME.AI
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/builder" className="text-black hover:text-black/70">
            Resume Builder
          </Link>
          <Link to="/templates" className="text-black hover:text-black/70">
            Templates
          </Link>
          <Link to="/optimizer" className="text-black hover:text-black/70">
            Resume Optimizer
          </Link>
          <Link to="/ats-checker" className="text-black hover:text-black/70">
            ATS Score Checker
          </Link>
        </div>
      </div>
      <Avatar className="cursor-pointer">
        <AvatarFallback className="bg-zinc-800 text-white">U</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
