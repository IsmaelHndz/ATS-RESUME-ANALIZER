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
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  };

  const analyzeJob = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis data
    const mockAnalysis = {
      title: extractJobTitle(jobDescription),
      company: extractCompany(jobDescription),
      location: extractLocation(jobDescription),
      salary: extractSalary(jobDescription),
      skills: extractSkills(jobDescription),
      requirements: extractRequirements(jobDescription),
      keyResponsibilities: extractResponsibilities(jobDescription),
      companyValues: extractCompanyValues(jobDescription),
      atsKeywords: extractAtsKeywords(jobDescription),
      matchScore: Math.floor(Math.random() * 30) + 70 // 70-100%
    };

    setAnalysis(mockAnalysis);
    setOptimizationData({
      ...optimizationData,
      jobDescription: {
        raw: jobDescription,
        analysis: mockAnalysis,
        url: jobUrl
      }
    });

    setIsAnalyzing(false);
  };

  const extractJobTitle = (text) => {
    const titlePatterns = [
      /position:\s*([^\n]+)/i,
      /role:\s*([^\n]+)/i,
      /job title:\s*([^\n]+)/i,
      /^([A-Z][A-Za-z\s]+(?:Developer|Engineer|Manager|Analyst|Designer|Specialist))/m
    ];
    
    for (const pattern of titlePatterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
    return 'Software Developer';
  };

  const extractCompany = (text) => {
    const companyPatterns = [
      /company:\s*([^\n]+)/i,
      /at\s+([A-Z][A-Za-z\s]+(?:Inc|LLC|Corp|Company|Technologies|Solutions))/i,
      /join\s+([A-Z][A-Za-z\s]+)/i
    ];
    
    for (const pattern of companyPatterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
    return 'TechCorp Solutions';
  };

  const extractLocation = (text) => {
    const locationPatterns = [
      /location:\s*([^\n]+)/i,
      /based in\s+([A-Za-z\s,]+)/i,
      /(New York|San Francisco|Los Angeles|Seattle|Austin|Boston|Remote)/i
    ];
    
    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
    return 'Remote';
  };

  const extractSalary = (text) => {
    const salaryPatterns = [
      /salary:\s*([^\n]+)/i,
      /\$([0-9,]+(?:\s*-\s*\$?[0-9,]+)?)/i,
      /([0-9]+k?\s*-\s*[0-9]+k?)/i
    ];
    
    for (const pattern of salaryPatterns) {
      const match = text.match(pattern);
      if (match) return match[1].trim();
    }
    return '$80,000 - $120,000';
  };

  const extractSkills = (text) => {
    const commonSkills = [
      'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes',
      'SQL', 'MongoDB', 'Git', 'Agile', 'Scrum', 'REST APIs', 'GraphQL', 'Redux', 'Vue.js',
      'Angular', 'Express.js', 'PostgreSQL', 'Redis', 'Jenkins', 'CI/CD', 'TDD', 'Microservices'
    ];
    
    const foundSkills = commonSkills.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    );

    // Add some additional skills based on context
    if (text.toLowerCase().includes('frontend') || text.toLowerCase().includes('front-end')) {
      foundSkills.push('HTML', 'CSS', 'Responsive Design', 'Web Performance');
    }
    if (text.toLowerCase().includes('backend') || text.toLowerCase().includes('back-end')) {
      foundSkills.push('Database Design', 'API Development', 'Server Management');
    }

    return foundSkills.slice(0, 12).map((skill, index) => ({
      name: skill,
      importance: Math.floor(Math.random() * 40) + 60, // 60-100%
      category: categorizeSkill(skill)
    }));
  };

  const categorizeSkill = (skill) => {
    const categories = {
      'Programming Languages': ['JavaScript', 'Python', 'TypeScript', 'HTML', 'CSS'],
      'Frameworks': ['React', 'Vue.js', 'Angular', 'Express.js', 'Redux'],
      'Databases': ['SQL', 'MongoDB', 'PostgreSQL', 'Redis'],
      'DevOps': ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD'],
      'Methodologies': ['Agile', 'Scrum', 'TDD', 'Microservices']
    };

    for (const [category, skills] of Object.entries(categories)) {
      if (skills.includes(skill)) return category;
    }
    return 'Other';
  };

  const extractRequirements = (text) => {
    const requirements = [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of software development experience',
      'Strong problem-solving and analytical skills',
      'Experience with modern web technologies',
      'Excellent communication skills',
      'Ability to work in a fast-paced environment'
    ];

    // Filter based on text content
    return requirements.slice(0, Math.floor(Math.random() * 3) + 3);
  };

  const extractResponsibilities = (text) => {
    const responsibilities = [
      'Develop and maintain web applications',
      'Collaborate with cross-functional teams',
      'Write clean, maintainable code',
      'Participate in code reviews',
      'Troubleshoot and debug applications',
      'Stay updated with industry trends'
    ];

    return responsibilities.slice(0, Math.floor(Math.random() * 2) + 4);
  };

  const extractCompanyValues = (text) => {
    const values = [
      'Innovation and creativity',
      'Collaborative team environment',
      'Work-life balance',
      'Continuous learning',
      'Customer-first approach',
      'Diversity and inclusion'
    ];

    return values.slice(0, Math.floor(Math.random() * 2) + 3);
  };

  const extractAtsKeywords = (text) => {
    const keywords = text.toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3)
      .filter(word => !['the', 'and', 'for', 'with', 'you', 'will', 'are', 'this', 'that', 'have', 'from'].includes(word))
      .slice(0, 20);

    return [...new Set(keywords)];
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
          <p className="text-gray-400 mt-1">Analyze job requirements to understand what employers want.</p>
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
            <h3 className="text-lg text-gray-200 mb-4">Job Posting URL (Optional)</h3>
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
            <p className="text-xs text-gray-500 mt-2">
              We'll automatically extract the job description (coming soon)
            </p>
          </div>

          {/* Job Description Input */}
          <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-gray-200">Job Description</h3>
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
              <div className="text-sm text-gray-500">
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
          <div className="rounded-2xl p-6 shadow-xl bg-blue-500/10 border border-blue-500/20" style={glassStyle}>
            <h3 className="text-lg text-blue-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Pro Tips for Better Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-200 text-sm mb-1">Include Complete Text</h4>
                  <p className="text-xs text-blue-300">Copy the entire job posting for comprehensive analysis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-200 text-sm mb-1">Company Information</h4>
                  <p className="text-xs text-blue-300">Include company values and culture details</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-200 text-sm mb-1">Requirements Section</h4>
                  <p className="text-xs text-blue-300">Ensure all skill requirements are included</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-200 text-sm mb-1">Job Responsibilities</h4>
                  <p className="text-xs text-blue-300">Include day-to-day responsibilities and tasks</p>
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
                <h2 className="text-2xl text-gray-200 mb-2">{analysis.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{analysis.company}</span>
                  <span>•</span>
                  <span>{analysis.location}</span>
                  <span>•</span>
                  <span>{analysis.salary}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-emerald-400">{analysis.matchScore}%</div>
                <div className="text-sm text-gray-400">ATS Match Score</div>
              </div>
            </div>

            {/* Next Step */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-purple-300 mb-1">Ready for the next step?</h3>
                  <p className="text-sm text-purple-200">Upload your current resume to see how it matches</p>
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
              <h3 className="text-lg text-gray-200 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Required Skills
              </h3>
              <div className="space-y-3">
                {analysis.skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                    <div>
                      <span className="text-gray-200">{skill.name}</span>
                      <div className="text-xs text-gray-400">{skill.category}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-600 rounded-full">
                        <div 
                          className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${skill.importance}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 w-8">{skill.importance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Requirements */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-200 mb-4 flex items-center gap-2">
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
              <h3 className="text-lg text-gray-200 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Company Values
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.companyValues.map((value, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full text-sm"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>

            {/* ATS Keywords */}
            <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
              <h3 className="text-lg text-gray-200 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                ATS Keywords
              </h3>
              <div className="flex flex-wrap gap-1">
                {analysis.atsKeywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded text-xs"
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