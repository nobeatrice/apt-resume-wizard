
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";

type FilterType = "Professional" | "Modern" | "Creative" | "Simple";

const templates = [
  { id: 1, name: "Alice Doe", description: "Clean Professional Template", image: "/lovable-uploads/19293f23-549c-4274-8ca1-2ff01112e9a4.png", categories: ["Professional", "Modern"] },
  { id: 2, name: "Template Name", description: "Template Description", image: "/lovable-uploads/19293f23-549c-4274-8ca1-2ff01112e9a4.png", categories: ["Professional"] },
  { id: 3, name: "Template Name", description: "Template Description", image: "/lovable-uploads/19293f23-549c-4274-8ca1-2ff01112e9a4.png", categories: ["Creative"] },
  { id: 4, name: "Template Name", description: "Template Description", image: "/lovable-uploads/19293f23-549c-4274-8ca1-2ff01112e9a4.png", categories: ["Simple", "Modern"] },
  { id: 5, name: "Template Name", description: "Template Description", image: "/lovable-uploads/19293f23-549c-4274-8ca1-2ff01112e9a4.png", categories: ["Professional", "Simple"] },
  { id: 6, name: "Template Name", description: "Template Description", image: "/lovable-uploads/19293f23-549c-4274-8ca1-2ff01112e9a4.png", categories: ["Creative", "Modern"] },
];

const Templates = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  
  const filteredTemplates = activeFilter
    ? templates.filter(template => template.categories.includes(activeFilter))
    : templates;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Link to="/builder" className="flex items-center text-zinc-700 mb-6 hover:text-zinc-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Return to Prompt
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 mb-4">
              Pick a style that stands out
            </h1>
            <p className="text-xl text-zinc-600">
              Professional, modern, creative — find the look that fits best, of all our templates.
            </p>
          </div>
          
          <div className="bg-zinc-800 rounded-lg p-8">
            <div className="flex items-center mb-6">
              <span className="font-medium text-white mr-4">Filters</span>
              <div className="flex flex-wrap gap-2">
                {(['Professional', 'Modern', 'Creative', 'Simple'] as FilterType[]).map((filter) => (
                  <Badge 
                    key={filter}
                    className={`cursor-pointer px-4 py-1 text-sm rounded-full ${
                      activeFilter === filter 
                        ? 'bg-[#77BDC6] text-zinc-800 hover:bg-[#67ADB7]' 
                        : 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300'
                    }`}
                    onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                <div key={template.id} className="bg-zinc-700 rounded-lg overflow-hidden">
                  <div className="bg-white p-2 border border-zinc-200">
                    <img src={template.image} alt={template.name} className="w-full h-auto" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium">{template.name}</h3>
                    <p className="text-zinc-300 text-sm">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button asChild className="bg-zinc-800 hover:bg-zinc-700 px-6">
              <Link to="/editor" className="flex items-center">
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Templates;
