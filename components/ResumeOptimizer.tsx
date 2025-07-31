import React, { useState } from 'react';
import { 
  Wand2,
  Sparkles,
  CheckCircle,
  TrendingUp,
  FileText,
  Target,
  Clock,
  Zap,
  Download,
  Eye,
  RefreshCw
} from 'lucide-react';

interface ResumeOptimizerProps {
  optimizationData: any;
  setOptimizationData: (data: any) => void;
}

export function ResumeOptimizer({ optimizationData, setOptimizationData }: ResumeOptimizerProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  // Ultra-dark glassmorphism styles
  const glassStyle = {
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
  };

  const startOptimization = async () => {
    setIsOptimizing(true);
    setProgress(0);
    
    // Simulate optimization process
    const stages = [
      { message: 'Analyzing job requirements...', progress: 20 },
      { message: 'Processing resume content...', progress: 40 },
      { message: 'Incorporating LinkedIn data...', progress: 60 },
      { message: 'Optimizing keywords...', progress: 80 },
      { message: 'Finalizing ATS compatibility...', progress: 100 }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProgress(stage.progress);
    }

    // Mock optimized resume data
    const optimizedResume = {
      content: generateOptimizedContent(),
      improvements: [
        'Added 15 relevant keywords from job description',
        'Strengthened professional summary with company values',
        'Quantified achievements with specific metrics',
        'Optimized formatting for ATS compatibility',
        'Incorporated LinkedIn skills and certifications',
        'Tailored experience descriptions for the role'
      ],
      atsScore: Math.min((optimizationData.currentResume?.analysis?.atsScore || 70) + 18, 98),
      originalScore: optimizationData.currentResume?.analysis?.atsScore || 70
    };

    setOptimizationData({
      ...optimizationData,
      optimizedResume
    });

    setOptimizationComplete(true);
    setIsOptimizing(false);
  };

  const generateOptimizedContent = () => {
    return `
OPTIMIZED RESUME FOR ${optimizationData.jobDescription?.analysis?.title || 'TARGET POSITION'}

John Doe
john.doe@email.com | +1 (555) 123-4567 | San Francisco, CA
LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Results-driven Senior Software Engineer with 5+ years of experience developing scalable web applications using React, Node.js, and Python. Proven track record of improving system performance by 40% and leading cross-functional teams. Passionate about innovation, continuous learning, and delivering customer-first solutions.

CORE COMPETENCIES
JavaScript • React • Node.js • Python • TypeScript • AWS • Docker • Kubernetes • GraphQL • PostgreSQL • Git • Agile Development • System Design • Performance Optimization

PROFESSIONAL EXPERIENCE

Senior Software Engineer | Tech Solutions Inc.
2021 - Present
• Led development of 3 high-traffic web applications serving 100K+ daily active users
• Improved application performance by 40% through code optimization and caching strategies
• Mentored team of 4 junior developers, improving code quality scores by 35%
• Collaborated with cross-functional teams to deliver features 20% ahead of schedule
• Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes

Software Developer | StartupXYZ
2019 - 2021
• Developed full-stack applications using React, Node.js, and PostgreSQL
• Built RESTful APIs serving 50+ endpoints with 99.9% uptime
• Contributed to 25% increase in user engagement through UI/UX improvements
• Participated in Agile development process and code reviews

EDUCATION
Bachelor of Science in Computer Science
University of California | 2019

CERTIFICATIONS & ACHIEVEMENTS
• AWS Solutions Architect - Associate (2023)
• Google Cloud Professional Developer (2022)
• Advanced React Patterns - Completed
• System Design Interview Preparation - Completed

KEY ACHIEVEMENTS
• Optimized for modern web development and cloud technologies
• Incorporates 20+ relevant ATS keywords
• Tailored for collaborative team environments
• Emphasizes quantified results and measurable impact
    `.trim();
  };

  const canOptimize = optimizationData.jobDescription && optimizationData.currentResume;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Resume Optimizer
          </h1>
          <p className="text-gray-500 mt-1">Generate a tailored, ATS-optimized resume for your target job.</p>
        </div>
      </div>

      {!canOptimize ? (
        /* Prerequisites */
        <div className="rounded-2xl p-8 shadow-xl text-center" style={glassStyle}>
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl text-gray-100 mb-4">Ready to Optimize?</h2>
          <p className="text-gray-500 mb-6">
            To generate your optimized resume, please complete the following steps:
          </p>
          
          <div className="space-y-3 max-w-md mx-auto">
            <div className={`flex items-center gap-3 p-3 rounded-xl ${
              optimizationData.jobDescription 
                ? 'bg-green-500/10 border border-green-500/20 text-green-300'
                : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-300'
            }`}>
              {optimizationData.jobDescription ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Clock className="w-5 h-5" />
              )}
              <span>Analyze job description</span>
            </div>
            
            <div className={`flex items-center gap-3 p-3 rounded-xl ${
              optimizationData.currentResume 
                ? 'bg-green-500/10 border border-green-500/20 text-green-300'
                : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-300'
            }`}>
              {optimizationData.currentResume ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Clock className="w-5 h-5" />
              )}
              <span>Upload current resume</span>
            </div>
          </div>
        </div>
      ) : !isOptimizing && !optimizationComplete ? (
        /* Ready to Optimize */
        <div className="space-y-6">
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-100">Target Job</h3>
                  <p className="text-sm text-gray-500">{optimizationData.jobDescription.analysis.title}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-100">Current Score</h3>
                  <p className="text-sm text-gray-500">{optimizationData.currentResume.analysis.atsScore}% ATS Compatible</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-100">Enhancement</h3>
                  <p className="text-sm text-gray-500">{optimizationData.linkedInData ? 'With LinkedIn' : 'Resume Only'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Optimization Features */}
          <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
            <h3 className="text-lg text-gray-100 mb-4">Optimization Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'ATS keyword optimization',
                'Job-specific tailoring',
                'Professional summary enhancement',
                'Skills section optimization',
                'Experience quantification',
                'Company culture alignment',
                'Formatting standardization',
                'LinkedIn data integration'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-200 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Start Optimization */}
          <div className="rounded-2xl p-8 shadow-xl text-center bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/20" style={glassStyle}>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl text-gray-100 mb-4">Ready to Optimize Your Resume</h2>
            <p className="text-gray-400 mb-6">
              Our AI will analyze your job target and create a tailored resume optimized for ATS systems and hiring managers.
            </p>
            
            <button
              onClick={startOptimization}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex items-center gap-3 mx-auto text-lg"
            >
              <Sparkles className="w-6 h-6" />
              <span>Start AI Optimization</span>
            </button>
          </div>
        </div>
      ) : isOptimizing ? (
        /* Optimization in Progress */
        <div className="rounded-2xl p-8 shadow-xl text-center" style={glassStyle}>
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wand2 className="w-10 h-10 text-white animate-pulse" />
          </div>
          
          <h2 className="text-2xl text-gray-100 mb-4">Optimizing Your Resume</h2>
          <p className="text-gray-400 mb-6">
            Our AI is analyzing and enhancing your resume for maximum impact...
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">{progress}% Complete</p>
          </div>
        </div>
      ) : (
        /* Optimization Complete */
        <div className="space-y-6">
          {/* Success Message */}
          <div className="rounded-2xl p-6 shadow-xl bg-green-500/10 border border-green-500/20" style={glassStyle}>
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-lg text-green-300">Optimization Complete!</h3>
                <p className="text-green-200/70">Your resume has been successfully optimized for the target position.</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl text-green-400">
                {optimizationData.optimizedResume?.atsScore || 95}%
              </div>
              <p className="text-sm text-gray-400">New ATS Score</p>
              <div className="text-xs text-green-400 mt-1">
                +{(optimizationData.optimizedResume?.atsScore || 95) - (optimizationData.optimizedResume?.originalScore || 70)} improvement
              </div>
            </div>

            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CheckCircle className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-2xl text-gray-100">6</div>
              <p className="text-sm text-gray-400">Improvements Made</p>
            </div>

            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CheckCircle className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl text-gray-100">98%</div>
              <p className="text-sm text-gray-400">Job Match</p>
            </div>
          </div>

          {/* Improvements */}
          <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
            <h3 className="text-lg text-gray-100 mb-4">Improvements Made</h3>
            <div className="space-y-2">
              {(optimizationData.optimizedResume?.improvements || []).map((improvement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-green-200 text-sm">{improvement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex items-center justify-center gap-2">
              <Eye className="w-5 h-5" />
              <span>Preview Resume</span>
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 text-gray-300 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              <span>Re-optimize</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}