
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, PaintBucket, Type, SquareIcon } from "lucide-react";

const resumeSections = [
  { id: "personal", title: "Personal Information" },
  { id: "experience", title: "Experience" },
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
  { id: "certifications", title: "Certifications" },
];

const Editor = () => {
  const [zoomLevel, setZoomLevel] = useState([80]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/templates" className="flex items-center text-zinc-700 hover:text-zinc-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Return
          </Link>
          
          <Button asChild variant="outline" className="border-zinc-800 text-zinc-800 hover:bg-zinc-100">
            <Link to="/ats-checker" className="flex items-center">
              Review
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="bg-zinc-800 rounded-lg p-6">
          <div className="bg-zinc-700 rounded-lg p-8 mb-6">
            <div className="bg-white mx-auto w-full max-w-2xl h-[500px] overflow-y-auto shadow-lg p-4">
              <img src="/lovable-uploads/16964a2a-dd5a-405d-97b1-a11dae9d582d.png" alt="Resume Preview" className="w-full h-auto" />
            </div>
            
            <div className="flex justify-end mt-4">
              <div className="flex items-center">
                <span className="text-white mr-2">Zoom</span>
                <div className="w-36">
                  <Slider 
                    value={zoomLevel}
                    onValueChange={setZoomLevel}
                    max={100}
                    step={1}
                    className="bg-zinc-600"
                  />
                </div>
                <span className="text-white ml-2">{zoomLevel}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-zinc-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Editor</h3>
                
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <Button variant="outline" className="bg-zinc-600 border-zinc-500 text-white hover:bg-zinc-500">
                    <PaintBucket className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="bg-zinc-600 border-zinc-500 text-white hover:bg-zinc-500">
                    <Type className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="bg-zinc-600 border-zinc-500 text-white hover:bg-zinc-500">
                    <SquareIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="bg-zinc-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Sections</h3>
                
                <div className="space-y-2">
                  {resumeSections.map(section => (
                    <Button 
                      key={section.id} 
                      variant="outline" 
                      className="w-full bg-zinc-600 border-zinc-500 text-white hover:bg-zinc-500 justify-start"
                    >
                      {section.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Editor;
