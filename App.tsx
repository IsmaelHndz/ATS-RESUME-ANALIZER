import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { JobAnalyzer } from "./components/JobAnalyzer";
import { ResumeUpload } from "./components/ResumeUpload";
import { LinkedInIntegration } from "./components/LinkedInIntegration";
import { ResumeOptimizer } from "./components/ResumeOptimizer";
import { ResumePreview } from "./components/ResumePreview";
import { Settings } from "./components/Settings";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [optimizationData, setOptimizationData] = useState({
    jobDescription: null,
    currentResume: null,
    linkedInData: null,
    optimizedResume: null
  });

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard optimizationData={optimizationData} />;
      case "job-analyzer":
        return <JobAnalyzer 
          optimizationData={optimizationData} 
          setOptimizationData={setOptimizationData} 
        />;
      case "resume-upload":
        return <ResumeUpload 
          optimizationData={optimizationData} 
          setOptimizationData={setOptimizationData} 
        />;
      case "linkedin":
        return <LinkedInIntegration 
          optimizationData={optimizationData} 
          setOptimizationData={setOptimizationData} 
        />;
      case "optimizer":
        return <ResumeOptimizer 
          optimizationData={optimizationData} 
          setOptimizationData={setOptimizationData} 
        />;
      case "preview":
        return <ResumePreview 
          optimizationData={optimizationData} 
          setOptimizationData={setOptimizationData} 
        />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard optimizationData={optimizationData} />;
    }
  };

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-15">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/50 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-violet-600/50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-fuchsia-600/50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
      </div>

      {/* Subtle grid texture */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Dark overlay for maximum contrast */}
      <div className="fixed inset-0 bg-black/50"></div>

      <div className="relative z-10 flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
}