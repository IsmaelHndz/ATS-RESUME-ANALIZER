import React, { useState, useRef } from 'react';
import { 
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Star,
  TrendingUp,
  Target,
  Users,
  Sparkles,
  ArrowRight,
  Linkedin,
  RefreshCw
} from 'lucide-react';
import { resumeApi } from '../services/resumeApi';

interface ResumeUploadProps {
  optimizationData: any;
  setOptimizationData: (data: any) => void;
}

export function ResumeUpload({ optimizationData, setOptimizationData }: ResumeUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(optimizationData.currentResume?.file || null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(optimizationData.currentResume?.analysis || null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Dark glassmorphism styles
  const glassStyle = {
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    
    if (!(fileType === 'application/pdf' || 
          fileName.endsWith('.pdf') || 
          fileName.endsWith('.doc') || 
          fileName.endsWith('.docx') ||
          fileType === 'application/msword' ||
          fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setError('Please upload only PDF, DOC, or DOCX files.');
      return;
    }

    setError('');
    setUploadedFile(file);
    
    // Auto-analyze the resume
    await analyzeResume(file);
  };

  const analyzeResume = async (file) => {
    setIsAnalyzing(true);
    
    try {
      const resumeAnalysis = await resumeApi.analyzeResume(file);
      
      // Add job match if we have job description
      if (optimizationData.jobDescription) {
        resumeAnalysis.jobMatch = calculateJobMatch(resumeAnalysis);
      }
      
      setAnalysis(resumeAnalysis);
      setOptimizationData({
        ...optimizationData,
        currentResume: {
          file: file,
          analysis: resumeAnalysis
        }
      });
    } catch (error) {
      console.error('Resume analysis failed:', error);
      setError('Resume analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const calculateJobMatch = (resumeAnalysis) => {
    if (!optimizationData.jobDescription) return null;

    const jobSkills = optimizationData.jobDescription.analysis.skills.map(s => s.name.toLowerCase());
    const resumeSkills = resumeAnalysis.skills.map(s => s.name.toLowerCase());
    
    const matchingSkills = jobSkills.filter(skill => 
      resumeSkills.some(rSkill => rSkill.includes(skill) || skill.includes(rSkill))
    );

    const matchPercentage = Math.floor((matchingSkills.length / jobSkills.length) * 100);
    
    return {
      percentage: matchPercentage,
      matchingSkills: matchingSkills.length,
      totalRequired: jobSkills.length,
      missingSkills: jobSkills.filter(skill => 
        !resumeSkills.some(rSkill => rSkill.includes(skill) || skill.includes(rSkill))
      )
    };
  };

  const removeFile = () => {
    setUploadedFile(null);
    setAnalysis(null);
    setOptimizationData({
      ...optimizationData,
      currentResume: null
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const fileUploadAreaStyle = {
    background: dragActive 
      ? 'linear-gradient(145deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))'
      : 'linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
    border: `2px dashed ${dragActive ? 'rgba(139, 92, 246, 0.8)' : 'rgba(139, 92, 246, 0.4)'}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: dragActive ? 'scale(1.02)' : 'scale(1)',
    boxShadow: dragActive ? '0 16px 48px rgba(139, 92, 246, 0.3)' : '0 8px 24px rgba(139, 92, 246, 0.2)',
    backdropFilter: 'blur(20px)'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Upload Your Resume
          </h1>
          <p className="text-gray-500 mt-1">Upload your current resume to analyze and optimize it for the job.</p>
        </div>
        
        {!optimizationData.jobDescription && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-yellow-500/15 text-yellow-300 border border-yellow-500/20">
            <AlertCircle className="w-4 h-4" />
            <span>Analyze job description first for better results</span>
          </div>
        )}
      </div>

      {!uploadedFile ? (
        /* File Upload Area */
        <div 
          className={`rounded-2xl p-8 text-center cursor-pointer relative overflow-hidden ${
            dragActive ? 'scale-102' : ''
          }`}
          style={fileUploadAreaStyle}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h3 className="text-xl text-gray-200 mb-2">
                {dragActive ? 'Drop your resume here' : 'Upload Your Resume'}
              </h3>
              <p className="text-gray-500 mb-4">
                Drag & drop your resume file here, or click to browse
              </p>
              <p className="text-sm text-gray-600">
                Supports PDF, DOC, and DOCX files • Max 10MB
              </p>
            </div>
            
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              Choose File
            </button>
          </div>
        </div>
      ) : (
        /* File Analysis */
        <div className="space-y-6">
          {/* Uploaded File Info */}
          <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-gray-100">{uploadedFile.name}</h3>
                  <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isAnalyzing ? (
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Analyzing...</span>
                  </div>
                ) : analysis ? (
                  <span className="px-3 py-1 bg-green-500/15 text-green-300 border border-green-500/20 rounded-full text-sm">
                    ✓ Analyzed
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-yellow-500/15 text-yellow-300 border border-yellow-500/20 rounded-full text-sm">
                    Pending
                  </span>
                )}
                <button 
                  onClick={removeFile}
                  className="p-2 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {analysis && (
            <>
              {/* Analysis Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className={`text-2xl ${getScoreColor(analysis.atsScore)}`}>
                    {analysis.atsScore}%
                  </div>
                  <p className="text-sm text-gray-500">ATS Compatibility</p>
                </div>

                {analysis.jobMatch && (
                  <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className={`text-2xl ${getScoreColor(analysis.jobMatch.percentage)}`}>
                      {analysis.jobMatch.percentage}%
                    </div>
                    <p className="text-sm text-gray-500">Job Match</p>
                  </div>
                )}

                <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-2xl text-gray-100">{analysis.skills.length}</div>
                  <p className="text-sm text-gray-500">Skills Detected</p>
                </div>
              </div>

              {/* Resume Skills */}
              <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                <h3 className="text-lg text-gray-100 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Detected Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                      <div>
                        <span className="text-gray-200">{skill.name}</span>
                        <div className="text-xs text-gray-500">{skill.category}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-gray-600 rounded-full">
                          <div 
                            className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            style={{ width: `${skill.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 w-6">{skill.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
                <h3 className="text-lg text-gray-100 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Improvement Suggestions
                </h3>
                <div className="space-y-3">
                  {analysis.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-purple-500/8 border border-purple-500/15 rounded-xl">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <span className="text-purple-200/70 text-sm">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl p-6 shadow-xl bg-blue-500/8 border border-blue-500/15" style={glassStyle}>
                  <div className="flex items-center gap-3 mb-4">
                    <Linkedin className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg text-blue-300">Enhance with LinkedIn</h3>
                  </div>
                  <p className="text-blue-200/70 text-sm mb-4">
                    Connect your LinkedIn to find additional skills, courses, and experiences to strengthen your resume.
                  </p>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <span>Connect LinkedIn</span>
                  </button>
                </div>

                <div className="rounded-2xl p-6 shadow-xl bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/20" style={glassStyle}>
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <h3 className="text-lg text-purple-300">AI Optimization</h3>
                  </div>
                  <p className="text-purple-200/70 text-sm mb-4">
                    Ready to create an optimized version of your resume tailored for this specific job.
                  </p>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Optimize Resume</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/15 border border-red-500/20 rounded-xl text-red-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
          <button 
            onClick={() => setError('')}
            className="ml-auto p-1 hover:bg-red-500/30 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}