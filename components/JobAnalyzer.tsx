import React, { useState } from 'react';
import { 
  Target,
  Sparkles,
  Upload,
  AlertCircle,
  CheckCircle,
  Wand2,
  BarChart3,
  Users,
  Star,
  ArrowRight,
  Copy,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { resumeApi } from '../services/resumeApi';

interface JobAnalyzerProps {
  optimizationData: any;
  setOptimizationData: (data: any) => void;
}

export function JobAnalyzer({ optimizationData, setOptimizationData }: JobAnalyzerProps) {
  const [jobDescription, setJobDescription] = useState(optimizationData.jobDescription?.raw || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(optimizationData.jobDescription?.analysis || null);
  const [jobUrl, setJobUrl] = useState('');

  // Dark glassmorphism styles
  const glassStyle = {
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
  };

  const analyzeJob = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    
    try {
      const jobAnalysis = await resumeApi.analyzeJobDescription(jobDescription);
      
      setAnalysis(jobAnalysis);
      setOptimizationData({
        ...optimizationData,
        jobDescription: {
          raw: jobDescription,
          analysis: jobAnalysis,
          url: jobUrl
        }
      });
    } catch (error) {
      console.error('Job analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setJobDescription('');
    setAnalysis(null);
    setJobUrl('');
    setOptimizationData({
      ...optimizationData,
      jobDescription: null
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Job Description Analysis
          </h1>
          <p className="text-gray-500 mt-1">Analyze job requirements to understand what employers want.</p>
        </div>
        {analysis && (
          <button 
            onClick={clearAnalysis}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>New Analysis</span>
          </button>
        )}
      </div>

      {!analysis ? (
        /* Input Form */
        <div className="space-y-6">
          {/* Job URL Input */}
          <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
            <h3 className="text-lg text-gray-100 mb-4">Job Posting URL (Optional)</h3>
            <div className="flex gap-4">
              <input
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://company.com/jobs/123"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button 
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors flex items-center gap-2"
                disabled
              >
                <ExternalLink className="w-4 h-4" />
                <span>Auto-Fill</span>
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              We'll automatically extract the job description (coming soon)
            </p>
          </div>

          {/* Job Description Input */}
          <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-gray-100">Job Description</h3>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                <Copy className="w-3 h-3" />
                <span>Paste from clipboard</span>
              </button>
            </div>
            
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here. Include job title, responsibilities, requirements, and company information for best results..."
              className="w-full h-64 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-200 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                {jobDescription.length} characters
              </div>
              <button
                onClick={analyzeJob}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Analyze Job</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl p-6 shadow-xl bg-blue-500/8 border border-blue-500/15" style={glassStyle}>
            <h3 className="text-lg text-blue-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Pro Tips for Better Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-200 text-sm mb-1">Include Complete Text</h4>
                  <p className="text-xs text-blue-300/70">Copy the entire job posting for comprehensive analysis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-200 text-sm mb-1">Company Information</h4>
                  <p className="text-xs text-blue-300/70">Include company values and culture details</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-200 text-sm mb-1">Requirements Section</h4>
                  <p className="text-xs text-blue-300/70">Ensure all skill requirements are included</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-200 text-sm mb-1">Job Responsibilities</h4>
                  <p className="text-xs text-blue-300/70">Include day-to-day responsibilities and tasks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Analysis Results */
        <div className="space-y-6">
          {/* Job Overview */}
          <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl text-gray-100 mb-2">{analysis.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{analysis.company}</span>
                  <span>•</span>
                  <span>{analysis.location}</span>
                  <span>•</span>
                  <span>{analysis.salary}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-emerald-400">{analysis.matchScore}%</div>
                <div className="text-sm text-gray-500">ATS Match Score</div>
              </div>
            </div>

            {/* Next Step */}
            <div className="bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-purple-300 mb-1">Ready for the next step?</h3>
                  <p className="text-sm text-purple-200/70">Upload your current resume to see how it matches</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Skills & Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Required Skills */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Required Skills
              </h3>
              <div className="space-y-3">
                {analysis.skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                    <div>
                      <span className="text-gray-200">{skill.name}</span>
                      <div className="text-xs text-gray-500">{skill.category}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full">
                        <div 
                          className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${skill.importance}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-8">{skill.importance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Requirements */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Key Requirements
              </h3>
              <div className="space-y-2">
                {analysis.requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3 p-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span className="text-gray-300 text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Company Values & ATS Keywords */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Values */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Company Values
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.companyValues.map((value, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-500/15 border border-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* ATS Keywords */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                ATS Keywords
              </h3>
              <div className="flex flex-wrap gap-1">
                {analysis.atsKeywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-purple-500/15 border border-purple-500/20 text-purple-300 rounded text-xs"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}