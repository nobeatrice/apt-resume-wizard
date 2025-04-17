
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const ATSChecker = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/editor" className="flex items-center text-zinc-700 mb-6 hover:text-zinc-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Return
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-zinc-800 rounded-lg p-6">
              <div className="text-center mb-4">
                <h2 className="text-white text-lg font-medium mb-2">Score</h2>
                <div className="text-[#77BDC6] text-6xl font-bold mb-2">85%</div>
                <p className="text-white text-sm">Great match!</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white text-base font-medium mb-2">Complied with</h3>
                <div className="bg-zinc-700 rounded p-3 mb-4">
                  <h4 className="text-white text-sm font-medium mb-1">Skills</h4>
                  <p className="text-zinc-300 text-xs">Project Management, UX Design, Adobe Suite etc.</p>
                </div>
                <div className="bg-zinc-700 rounded p-3">
                  <h4 className="text-white text-sm font-medium mb-1">Experience</h4>
                  <p className="text-zinc-300 text-xs">Multiple experience sources</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white text-base font-medium mb-2">Suggestions</h3>
                <div className="bg-zinc-700 rounded p-3">
                  <h4 className="text-white text-sm font-medium mb-1">Skills</h4>
                  <p className="text-zinc-300 text-xs">Add UX skills such as Agility, Collaboration and more!</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white text-base font-medium mb-2">Tips</h3>
                <p className="text-zinc-300 text-xs">Try action words like "led," "Developed" or "Executed" for a stronger impact</p>
              </div>
              
              <Button className="w-full bg-zinc-200 text-zinc-800 hover:bg-zinc-300">
                Download
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-9">
            <div className="bg-zinc-800 rounded-lg p-6">
              <img 
                src="/lovable-uploads/3b52bb20-765d-4ec6-908a-4defa9092f87.png" 
                alt="Resume Preview"
                className="w-full h-auto bg-white shadow-lg rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ATSChecker;
