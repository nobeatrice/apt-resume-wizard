
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 mb-4">
              Land your<br />Dream Job
            </h1>
            <p className="text-lg text-zinc-600 mb-6">
              with a Resume that has been tailored<br />
              and optimized for your needs.
            </p>
            <p className="text-base text-zinc-600 mb-8">
              Build a resume from scratch or improve your<br />
              existing one faster, smarter, and job-ready.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-zinc-800 hover:bg-zinc-700">
                <Link to="/builder">Build a new Resume</Link>
              </Button>
              <Button asChild variant="outline" className="border-zinc-800 text-zinc-800 hover:bg-zinc-100">
                <Link to="/optimizer">Import Resume</Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="/lovable-uploads/295e8ddf-f8de-4113-a0f3-a3e4bf6a4d55.png" 
              alt="Person with resume" 
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Build from Scratch Section */}
      <section className="py-12 bg-[#F2F3F9]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <img 
              src="/lovable-uploads/92139e9e-a43a-4199-b83e-dfd285a1411c.png" 
              alt="Building blocks" 
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mb-4">
              Build from Scratch
            </h2>
            <p className="text-lg text-zinc-600 mb-6">
              Be able to generate a resume as per<br />
              your requirements, with direct assistance<br />
              from AI.
            </p>
            <Button asChild className="bg-zinc-800 hover:bg-zinc-700">
              <Link to="/builder">Build a new Resume</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Optimize Resume Section */}
      <section className="py-12 bg-[#F2F3F9]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <img 
              src="/lovable-uploads/0a3d5ba9-5a92-4ea4-8dad-cf79bdf7860d.png" 
              alt="Person optimizing resume" 
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 mb-4">
              Optimize Resume
            </h2>
            <p className="text-lg text-zinc-600 mb-6">
              Provide an existing resume of yours, allowing<br />
              us to improve with your changes.
            </p>
            <Button asChild className="bg-zinc-800 hover:bg-zinc-700">
              <Link to="/optimizer">Import Resume</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#F2F3F9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 mb-4">
              Create standout resumes effortlessly with expert templates, AI-<br />
              driven suggestions, and a seamless editing experience because your<br />
              next opportunity starts here!
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
            {/* Feature 1 */}
            <div className="bg-[#77BDC6] rounded-lg p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-zinc-800">Real-time Optimization</h3>
                  <p className="text-zinc-700">
                    Whenever you resume with relevant job descriptions by suggesting the right keywords for better ranking.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#77BDC6] rounded-lg p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                    <path d="M12 2v4"></path>
                    <path d="m4.93 4.93 2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="m4.93 19.07 2.83-2.83"></path>
                    <path d="M12 18v4"></path>
                    <path d="m19.07 19.07-2.83-2.83"></path>
                    <path d="M18 12h4"></path>
                    <path d="m19.07 4.93-2.83 2.83"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-zinc-800">Effortless & Time-Saving</h3>
                  <p className="text-zinc-700">
                    Quickly generate or refine a resume without spending hours searching and editing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
            {/* Feature 3 */}
            <div className="bg-[#77BDC6] rounded-lg p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-zinc-800">Professional Templates</h3>
                  <p className="text-zinc-700">
                    Access well-structured resume templates approved by HR experts worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#77BDC6] rounded-lg p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-zinc-800">Personalized Suggestions</h3>
                  <p className="text-zinc-700">
                    Get AI-driven content recommendations tailored to your industry, experience, and job role.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="bg-[#77BDC6] rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-start">
              <div className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-zinc-800">ATS Compatibility Assurance</h3>
                <p className="text-zinc-700">
                  Ensure your resume is optimized to pass applicant tracking systems, increasing your chances of getting an interview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
