import React, { useState, useEffect } from 'react';
import { 
  Target,
  Upload,
  Linkedin,
  Wand2,
  Eye,
  Download,
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  FileText,
  BarChart3,
  Users,
  Zap
} from 'lucide-react';

interface DashboardProps {
  optimizationData: any;
}

export function Dashboard({ optimizationData }: DashboardProps) {
  const [stats, setStats] = useState({
    totalOptimizations: 12,
    successRate: 94,
    avgImprovement: 34,
    timesSaved: 8
  });

  // Ultra-dark glassmorphism styles
  const glassStyle = {
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
  };

  const cardGlassStyle = {
    backdropFilter: 'blur(24px)',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7)'
  };

  const workflowSteps = [
    {
      id: 'job-analyzer',
      title: 'Analyze Job',
      description: 'Paste job description to understand requirements',
      icon: Target,
      completed: !!optimizationData.jobDescription,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'resume-upload',
      title: 'Upload Resume',
      description: 'Upload your current resume for analysis',
      icon: Upload,
      completed: !!optimizationData.currentResume,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Boost',
      description: 'Enhance with LinkedIn profile data (optional)',
      icon: Linkedin,
      completed: !!optimizationData.linkedInData,
      color: 'from-blue-600 to-blue-400',
      optional: true
    },
    {
      id: 'optimizer',
      title: 'AI Optimization',
      description: 'Generate tailored, ATS-friendly resume',
      icon: Wand2,
      completed: !!optimizationData.optimizedResume,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'preview',
      title: 'Preview & Export',
      description: 'Review and download your optimized resume',
      icon: Eye,
      completed: false,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const nextStep = workflowSteps.find(step => !step.completed && !step.optional) || workflowSteps.find(step => !step.completed);

  const recentOptimizations = [
    {
      job: 'Senior Frontend Developer - TechCorp',
      improvement: '+42%',
      date: '2 hours ago',
      status: 'completed'
    },
    {
      job: 'Full Stack Engineer - StartupXYZ',
      improvement: '+38%',
      date: '1 day ago',
      status: 'completed'
    },
    {
      job: 'React Developer - WebAgency',
      improvement: '+45%',
      date: '3 days ago',
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to ResumeGenie
          </h1>
          <p className="text-gray-500 mt-2">Transform your resume with AI-powered optimization for better job matches.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-gradient-to-r from-purple-500/15 to-pink-500/15 text-purple-300 border border-purple-500/20">
            <Sparkles className="w-4 h-4" />
            <span>AI Powered</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" style={glassStyle}>
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center text-emerald-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+12</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl text-gray-100">{stats.totalOptimizations}</h3>
            <p className="text-sm text-gray-500 mt-1">Resumes Optimized</p>
          </div>
        </div>

        <div className="rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" style={glassStyle}>
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center text-emerald-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+8%</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl text-gray-100">{stats.successRate}%</h3>
            <p className="text-sm text-gray-500 mt-1">Success Rate</p>
          </div>
        </div>

        <div className="rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" style={glassStyle}>
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center text-emerald-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+5%</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl text-gray-100">+{stats.avgImprovement}%</h3>
            <p className="text-sm text-gray-500 mt-1">Avg. Improvement</p>
          </div>
        </div>

        <div className="rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" style={glassStyle}>
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center text-blue-400">
              <Zap className="w-4 h-4 mr-1" />
              <span className="text-sm">Fast</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl text-gray-100">{stats.timesSaved}h</h3>
            <p className="text-sm text-gray-500 mt-1">Time Saved</p>
          </div>
        </div>
      </div>

      {/* Workflow Progress */}
      <div className="rounded-2xl p-6 shadow-xl" style={cardGlassStyle}>
        <h2 className="text-2xl text-gray-100 mb-6">Optimization Workflow</h2>
        <div className="space-y-4">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const isNext = nextStep?.id === step.id;
            
            return (
              <div key={step.id} className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                step.completed 
                  ? 'bg-green-500/8 border-green-500/20' 
                  : isNext 
                    ? 'bg-purple-500/8 border-purple-500/20 ring-2 ring-purple-500/15' 
                    : 'bg-white/[0.01] border-white/[0.05]'
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                  step.completed 
                    ? 'bg-green-500' 
                    : isNext 
                      ? `bg-gradient-to-br ${step.color}` 
                      : 'bg-gray-700'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Icon className="w-6 h-6 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-lg ${step.completed ? 'text-green-300' : isNext ? 'text-purple-300' : 'text-gray-500'}`}>
                      {step.title}
                    </h3>
                    {step.optional && (
                      <span className="px-2 py-1 bg-blue-500/15 text-blue-300 rounded text-xs">Optional</span>
                    )}
                  </div>
                  <p className={`text-sm ${step.completed ? 'text-green-200/70' : isNext ? 'text-purple-200/70' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {step.completed && (
                    <span className="text-sm text-green-400">Completed</span>
                  )}
                  {isNext && (
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                      <span>Start</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity & Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Optimizations */}
        <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
          <h3 className="text-lg text-gray-100 mb-4">Recent Optimizations</h3>
          <div className="space-y-3">
            {recentOptimizations.map((opt, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                <div>
                  <h4 className="text-gray-200 text-sm truncate max-w-48">{opt.job}</h4>
                  <p className="text-xs text-gray-500">{opt.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-sm">{opt.improvement}</span>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips & Insights */}
        <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
          <h3 className="text-lg text-gray-100 mb-4">Optimization Tips</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-purple-500/8 border border-purple-500/15 rounded-xl">
              <Sparkles className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <h4 className="text-purple-300 text-sm mb-1">Use Keywords</h4>
                <p className="text-xs text-purple-200/70">Include relevant keywords from the job description to pass ATS filters.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-blue-500/8 border border-blue-500/15 rounded-xl">
              <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-blue-300 text-sm mb-1">Quantify Results</h4>
                <p className="text-xs text-blue-200/70">Add numbers and metrics to showcase your impact and achievements.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-500/8 border border-green-500/15 rounded-xl">
              <Target className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="text-green-300 text-sm mb-1">Tailor Content</h4>
                <p className="text-xs text-green-200/70">Customize your resume for each job application to improve match rates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started CTA */}
      {!optimizationData.jobDescription && (
        <div className="rounded-2xl p-8 shadow-xl text-center bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/20" style={cardGlassStyle}>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl text-gray-100 mb-2">Ready to Optimize Your Resume?</h3>
          <p className="text-gray-500 mb-6">Start by analyzing a job description to understand what employers are looking for.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex items-center gap-2 mx-auto">
            <Target className="w-5 h-5" />
            <span>Analyze Job Description</span>
          </button>
        </div>
      )}
    </div>
  );
}