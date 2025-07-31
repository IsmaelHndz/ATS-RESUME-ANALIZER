import React from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  Upload, 
  Linkedin, 
  Wand2, 
  Eye,
  Settings,
  Sparkles,
  Target,
  CheckCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'from-purple-500 to-pink-500' },
    { id: 'job-analyzer', label: 'Job Analysis', icon: Target, color: 'from-blue-500 to-purple-500' },
    { id: 'resume-upload', label: 'Upload Resume', icon: Upload, color: 'from-green-500 to-teal-500' },
    { id: 'linkedin', label: 'LinkedIn Boost', icon: Linkedin, color: 'from-blue-600 to-blue-400' },
    { id: 'optimizer', label: 'AI Optimizer', icon: Wand2, color: 'from-purple-500 to-pink-500' },
    { id: 'preview', label: 'Preview & Export', icon: Eye, color: 'from-orange-500 to-red-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-gray-500 to-gray-400' },
  ];

  // Ultra-dark glassmorphism styles
  const glassStyle = {
    backdropFilter: 'blur(24px)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7)'
  };

  return (
    <aside className="w-64 shadow-2xl" style={glassStyle}>
      {/* Header */}
      <div className="p-6 border-b border-white/[0.05]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg text-gray-100">ResumeGenie</h1>
            <p className="text-xs text-gray-500">AI-Powered Optimization</p>
          </div>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="p-4 border-b border-white/[0.05]">
        <div className="text-sm text-gray-500 mb-2">Optimization Progress</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3 h-3 text-green-400" />
            <span className="text-gray-300">Job Analysis</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 border border-gray-600 rounded-full"></div>
            <span className="text-gray-600">Resume Upload</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 border border-gray-600 rounded-full"></div>
            <span className="text-gray-600">AI Optimization</span>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                isActive
                  ? `bg-gradient-to-r ${item.color} text-white transform translate-x-1 shadow-lg`
                  : 'text-gray-400 hover:bg-white/[0.02] hover:translate-x-1 hover:text-gray-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      {/* AI Status */}
      <div className="p-4 mt-auto">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-gradient-to-r from-purple-500/15 to-pink-500/15 text-purple-300 border border-purple-500/20">
          <Sparkles className="w-4 h-4" />
          <span>AI Ready</span>
        </div>
      </div>
    </aside>
  );
}