import React, { useState } from 'react';
import { 
  Linkedin,
  User,
  Award,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Plus,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface LinkedInIntegrationProps {
  optimizationData: any;
  setOptimizationData: (data: any) => void;
}

export function LinkedInIntegration({ optimizationData, setOptimizationData }: LinkedInIntegrationProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Ultra-dark glassmorphism styles
  const glassStyle = {
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
  };

  const connectLinkedIn = async () => {
    setIsConnecting(true);
    // Simulate LinkedIn OAuth flow
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsConnected(true);
    setIsConnecting(false);
    
    // Mock LinkedIn data
    const mockLinkedInData = {
      profile: {
        name: 'John Doe',
        headline: 'Senior Software Engineer',
        summary: 'Passionate developer...'
      },
      additionalSkills: ['GraphQL', 'Kubernetes', 'Terraform'],
      courses: ['AWS Certified Solutions Architect', 'Advanced React Patterns'],
      certifications: ['AWS Solutions Architect - Associate']
    };

    setOptimizationData({
      ...optimizationData,
      linkedInData: mockLinkedInData
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            LinkedIn Integration
          </h1>
          <p className="text-gray-500 mt-1">Enhance your resume with LinkedIn profile data, courses, and certifications.</p>
        </div>
      </div>

      {!isConnected ? (
        /* Connect LinkedIn */
        <div className="rounded-2xl p-8 shadow-xl text-center" style={glassStyle}>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Linkedin className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl text-gray-100 mb-4">Connect Your LinkedIn Profile</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            We'll analyze your LinkedIn profile to find additional skills, courses, and certifications 
            that can strengthen your resume.
          </p>
          
          <button
            onClick={connectLinkedIn}
            disabled={isConnecting}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center gap-2 mx-auto"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Linkedin className="w-5 h-5" />
                <span>Connect LinkedIn</span>
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-600 mt-4">
            We only access your public profile information and never post on your behalf.
          </p>
        </div>
      ) : (
        /* LinkedIn Data */
        <div className="space-y-6">
          {/* Connection Success */}
          <div className="rounded-2xl p-6 shadow-xl bg-green-500/10 border border-green-500/20" style={glassStyle}>
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-lg text-green-300">LinkedIn Connected Successfully!</h3>
                <p className="text-green-200/70">We've extracted additional information from your profile.</p>
              </div>
            </div>
          </div>

          {/* Extracted Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Additional Skills */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                Additional Skills Found
              </h3>
              <div className="space-y-2">
                {['GraphQL', 'Kubernetes', 'Terraform', 'TypeScript'].map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <span className="text-blue-300">{skill}</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Certifications
              </h3>
              <div className="space-y-2">
                {['AWS Solutions Architect - Associate', 'Google Cloud Professional Developer'].map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <span className="text-yellow-300 text-sm">{cert}</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                Completed Courses
              </h3>
              <div className="space-y-2">
                {['Advanced React Patterns', 'Machine Learning Fundamentals', 'System Design Interview'].map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <span className="text-purple-300 text-sm">{course}</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Enhancement */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-100 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-400" />
                Profile Enhancement
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Professional headline added</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Skills section enhanced</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Experience descriptions improved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Step */}
          <div className="rounded-2xl p-6 shadow-xl bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/20" style={glassStyle}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-purple-300 mb-2">LinkedIn data integrated successfully!</h3>
                <p className="text-purple-200/70">Your resume will now include additional skills, certifications, and courses from LinkedIn.</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Optimize Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}