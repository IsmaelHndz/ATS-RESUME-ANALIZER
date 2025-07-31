import React, { useState } from 'react';
import { 
  Eye,
  Download,
  FileText,
  Share,
  Edit,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

interface ResumePreviewProps {
  optimizationData: any;
  setOptimizationData: (data: any) => void;
}

export function ResumePreview({ optimizationData, setOptimizationData }: ResumePreviewProps) {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'docx'>('pdf');

  // Ultra-dark glassmorphism styles
  const glassStyle = {
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
  };

  const downloadResume = async () => {
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Downloading resume as ${selectedFormat}`);
  };

  const shareResume = () => {
    navigator.clipboard.writeText(window.location.href);
    // Could integrate with sharing APIs
  };

  const hasOptimizedResume = optimizationData.optimizedResume;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Resume Preview & Export
          </h1>
          <p className="text-gray-500 mt-1">Review your optimized resume and download in your preferred format.</p>
        </div>
      </div>

      {!hasOptimizedResume ? (
        /* No Optimized Resume */
        <div className="rounded-2xl p-8 shadow-xl text-center" style={glassStyle}>
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl text-gray-100 mb-4">No Optimized Resume Available</h2>
          <p className="text-gray-500 mb-6">
            Complete the optimization process to preview and download your tailored resume.
          </p>
          
          <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex items-center gap-2 mx-auto">
            <TrendingUp className="w-5 h-5" />
            <span>Start Optimization</span>
          </button>
        </div>
      ) : (
        /* Resume Preview */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl p-4 shadow-xl" style={glassStyle}>
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-100 text-sm">ATS Score</span>
                </div>
                <div className="text-2xl text-yellow-400">
                  {optimizationData.optimizedResume.atsScore}%
                </div>
              </div>
              
              <div className="rounded-2xl p-4 shadow-xl" style={glassStyle}>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-gray-100 text-sm">Improvement</span>
                </div>
                <div className="text-2xl text-green-400">
                  +{optimizationData.optimizedResume.atsScore - (optimizationData.optimizedResume.originalScore || 70)}
                </div>
              </div>
              
              <div className="rounded-2xl p-4 shadow-xl" style={glassStyle}>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-100 text-sm">Match</span>
                </div>
                <div className="text-2xl text-blue-400">98%</div>
              </div>
            </div>

            {/* Resume Content Preview */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-gray-100">Resume Preview</h3>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 max-h-96 overflow-y-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                  {optimizationData.optimizedResume.content}
                </pre>
              </div>
            </div>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            {/* Download Options */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4">Download Options</h3>
              
              <div className="space-y-3 mb-4">
                <button
                  onClick={() => setSelectedFormat('pdf')}
                  className={`w-full p-3 rounded-xl border transition-all ${
                    selectedFormat === 'pdf'
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                      : 'bg-white/[0.02] border-white/10 text-gray-400 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-sm">PDF Format</div>
                      <div className="text-xs opacity-70">Best for applications</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setSelectedFormat('docx')}
                  className={`w-full p-3 rounded-xl border transition-all ${
                    selectedFormat === 'docx'
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                      : 'bg-white/[0.02] border-white/10 text-gray-400 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-sm">Word Format</div>
                      <div className="text-xs opacity-70">Editable document</div>
                    </div>
                  </div>
                </button>
              </div>
              
              <button
                onClick={downloadResume}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Share Options */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4">Share Resume</h3>
              
              <button
                onClick={shareResume}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Share className="w-5 h-5" />
                <span>Copy Link</span>
              </button>
            </div>

            {/* Improvements Summary */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4">Key Improvements</h3>
              
              <div className="space-y-2">
                {optimizationData.optimizedResume.improvements.slice(0, 4).map((improvement, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="rounded-2xl p-6 shadow-xl bg-gradient-to-r from-green-500/15 to-emerald-500/15 border border-green-500/20" style={glassStyle}>
              <h3 className="text-green-300 mb-3">Next Steps</h3>
              <div className="space-y-2 text-sm text-green-200/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  <span>Proofread your optimized resume</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  <span>Customize cover letter</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  <span>Submit application</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}