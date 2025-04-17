
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Builder = () => {
  const [jobDescription, setJobDescription] = useState("");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 mb-2">
                Let's Match
              </h1>
              <p className="text-xl text-zinc-700 mb-4">
                your Resume to the Perfect Job
              </p>
            </div>
            <img 
              src="/lovable-uploads/44097972-08b9-4fe8-9d2a-6df3c245accd.png" 
              alt="AI assistant with magnifying glass" 
              className="w-40 h-auto hidden md:block"
            />
          </div>
          
          <p className="text-lg text-zinc-600 mb-8">
            Paste the job description and type down your role —<br />
            we'll analyze the key skills and qualifications.
          </p>
          
          <div className="bg-zinc-800 rounded-lg p-6">
            <Textarea
              className="min-h-[200px] bg-white text-zinc-800 border-0 mb-4 placeholder:text-zinc-400"
              placeholder="Paste the description or tell us about the role you're applying for..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            
            <div className="flex justify-end">
              <Button 
                asChild
                variant="secondary"
                className="px-8"
                disabled={!jobDescription.trim()}
              >
                <Link to="/templates">Continue</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Builder;
