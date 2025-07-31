// Resume Optimization API Service
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
}

interface Skill {
  name: string;
  confidence: number;
  category: string;
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface ResumeAnalysis {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  skills: Skill[];
  education: Education[];
  atsScore: number;
  improvements: string[];
  jobMatch?: JobMatchAnalysis;
}

interface JobMatchAnalysis {
  percentage: number;
  matchingSkills: number;
  totalRequired: number;
  missingSkills: string[];
}

interface JobDescription {
  raw: string;
  analysis: JobAnalysis;
  url?: string;
}

interface JobAnalysis {
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: Array<{
    name: string;
    importance: number;
    category: string;
  }>;
  requirements: string[];
  keyResponsibilities: string[];
  companyValues: string[];
  atsKeywords: string[];
  matchScore: number;
}

interface ResumeData {
  file: File;
  analysis: ResumeAnalysis;
}

interface LinkedInData {
  profile: any;
  additionalSkills: string[];
  courses: string[];
  certifications: string[];
}

interface OptimizedResume {
  content: string;
  improvements: string[];
  atsScore: number;
  format: 'pdf' | 'docx';
}

class ResumeOptimizationService {
  private mockDelay = (ms: number): Promise<void> => 
    new Promise(resolve => setTimeout(resolve, ms));

  async analyzeJobDescription(text: string): Promise<JobAnalysis> {
    await this.mockDelay(2000);
    
    // Mock job analysis - in real app this would use AI/NLP
    return {
      title: this.extractJobTitle(text),
      company: this.extractCompany(text),
      location: this.extractLocation(text),
      salary: this.extractSalary(text),
      skills: this.extractSkills(text),
      requirements: this.extractRequirements(text),
      keyResponsibilities: this.extractResponsibilities(text),
      companyValues: this.extractCompanyValues(text),
      atsKeywords: this.extractAtsKeywords(text),
      matchScore: Math.floor(Math.random() * 30) + 70
    };
  }

  async analyzeResume(file: File): Promise<ResumeAnalysis> {
    await this.mockDelay(3000);
    
    // Mock resume analysis
    return {
      personalInfo: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe'
      },
      summary: 'Experienced full-stack developer with 5+ years of experience in modern web technologies.',
      experience: [
        {
          title: 'Senior Software Engineer',
          company: 'Tech Solutions Inc.',
          duration: '2021 - Present',
          description: 'Led development of multiple web applications using React and Node.js'
        },
        {
          title: 'Software Developer',
          company: 'StartupXYZ',
          duration: '2019 - 2021',
          description: 'Developed full-stack applications and improved system performance by 40%'
        }
      ],
      skills: [
        { name: 'JavaScript', confidence: 95, category: 'Programming' },
        { name: 'React', confidence: 90, category: 'Frontend' },
        { name: 'Node.js', confidence: 85, category: 'Backend' },
        { name: 'Python', confidence: 80, category: 'Programming' },
        { name: 'AWS', confidence: 75, category: 'Cloud' },
        { name: 'Docker', confidence: 70, category: 'DevOps' }
      ],
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          school: 'University of California',
          year: '2019'
        }
      ],
      atsScore: Math.floor(Math.random() * 20) + 70,
      improvements: [
        'Add more quantified achievements',
        'Include relevant keywords from job description',
        'Optimize for ATS scanning',
        'Strengthen professional summary'
      ]
    };
  }

  async optimizeResume(
    resumeAnalysis: ResumeAnalysis,
    jobAnalysis: JobAnalysis,
    linkedInData?: LinkedInData
  ): Promise<OptimizedResume> {
    await this.mockDelay(4000);
    
    // Mock optimization process
    return {
      content: this.generateOptimizedContent(resumeAnalysis, jobAnalysis, linkedInData),
      improvements: [
        'Added relevant keywords from job description',
        'Strengthened professional summary',
        'Quantified achievements with metrics',
        'Optimized for ATS compatibility',
        ...(linkedInData ? ['Incorporated LinkedIn skills and certifications'] : [])
      ],
      atsScore: Math.min(resumeAnalysis.atsScore + Math.floor(Math.random() * 25) + 10, 98),
      format: 'pdf'
    };
  }

  async extractLinkedInData(accessToken: string): Promise<LinkedInData> {
    await this.mockDelay(2000);
    
    // Mock LinkedIn data extraction
    return {
      profile: {
        name: 'John Doe',
        headline: 'Senior Software Engineer',
        summary: 'Passionate developer with expertise in modern web technologies...'
      },
      additionalSkills: ['GraphQL', 'Kubernetes', 'Terraform', 'TypeScript'],
      courses: [
        'AWS Certified Solutions Architect',
        'Advanced React Patterns',
        'Machine Learning Fundamentals'
      ],
      certifications: [
        'AWS Solutions Architect - Associate',
        'Google Cloud Professional Developer'
      ]
    };
  }

  private extractJobTitle(text: string): string {
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
  }

  private extractCompany(text: string): string {
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
  }

  private extractLocation(text: string): string {
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
  }

  private extractSalary(text: string): string {
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
  }

  private extractSkills(text: string): Array<{name: string; importance: number; category: string}> {
    const commonSkills = [
      'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes',
      'SQL', 'MongoDB', 'Git', 'Agile', 'Scrum', 'REST APIs', 'GraphQL', 'Redux', 'Vue.js',
      'Angular', 'Express.js', 'PostgreSQL', 'Redis', 'Jenkins', 'CI/CD', 'TDD', 'Microservices'
    ];
    
    const foundSkills = commonSkills.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    );

    return foundSkills.slice(0, 12).map((skill) => ({
      name: skill,
      importance: Math.floor(Math.random() * 40) + 60,
      category: this.categorizeSkill(skill)
    }));
  }

  private categorizeSkill(skill: string): string {
    const categories = {
      'Programming Languages': ['JavaScript', 'Python', 'TypeScript'],
      'Frameworks': ['React', 'Vue.js', 'Angular', 'Express.js', 'Redux'],
      'Databases': ['SQL', 'MongoDB', 'PostgreSQL', 'Redis'],
      'DevOps': ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD'],
      'Methodologies': ['Agile', 'Scrum', 'TDD', 'Microservices']
    };

    for (const [category, skills] of Object.entries(categories)) {
      if (skills.includes(skill)) return category;
    }
    return 'Other';
  }

  private extractRequirements(text: string): string[] {
    return [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of software development experience',
      'Strong problem-solving and analytical skills',
      'Experience with modern web technologies',
      'Excellent communication skills',
      'Ability to work in a fast-paced environment'
    ].slice(0, Math.floor(Math.random() * 3) + 3);
  }

  private extractResponsibilities(text: string): string[] {
    return [
      'Develop and maintain web applications',
      'Collaborate with cross-functional teams',
      'Write clean, maintainable code',
      'Participate in code reviews',
      'Troubleshoot and debug applications',
      'Stay updated with industry trends'
    ].slice(0, Math.floor(Math.random() * 2) + 4);
  }

  private extractCompanyValues(text: string): string[] {
    return [
      'Innovation and creativity',
      'Collaborative team environment',
      'Work-life balance',
      'Continuous learning',
      'Customer-first approach',
      'Diversity and inclusion'
    ].slice(0, Math.floor(Math.random() * 2) + 3);
  }

  private extractAtsKeywords(text: string): string[] {
    const keywords = text.toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3)
      .filter(word => !['the', 'and', 'for', 'with', 'you', 'will', 'are', 'this', 'that', 'have', 'from'].includes(word))
      .slice(0, 20);

    return [...new Set(keywords)];
  }

  private generateOptimizedContent(
    resumeAnalysis: ResumeAnalysis,
    jobAnalysis: JobAnalysis,
    linkedInData?: LinkedInData
  ): string {
    // Mock optimized resume content
    return `
OPTIMIZED RESUME FOR ${jobAnalysis.title.toUpperCase()}

${resumeAnalysis.personalInfo.name}
${resumeAnalysis.personalInfo.email} | ${resumeAnalysis.personalInfo.phone}
${resumeAnalysis.personalInfo.location}
${resumeAnalysis.personalInfo.linkedin || ''}

PROFESSIONAL SUMMARY
${resumeAnalysis.summary} Specialized in ${jobAnalysis.skills.slice(0, 3).map(s => s.name).join(', ')} with proven experience in ${jobAnalysis.companyValues.slice(0, 2).join(' and ')}.

CORE COMPETENCIES
${jobAnalysis.skills.map(skill => skill.name).join(' • ')}
${linkedInData ? linkedInData.additionalSkills.join(' • ') : ''}

PROFESSIONAL EXPERIENCE
${resumeAnalysis.experience.map(exp => `
${exp.title} | ${exp.company}
${exp.duration}
• ${exp.description}
• Achieved measurable results using ${jobAnalysis.skills.slice(0, 2).map(s => s.name).join(' and ')}
`).join('\n')}

EDUCATION
${resumeAnalysis.education.map(edu => `${edu.degree}, ${edu.school} (${edu.year})`).join('\n')}

${linkedInData ? `
CERTIFICATIONS & COURSES
${linkedInData.certifications.join('\n')}
${linkedInData.courses.join('\n')}
` : ''}

KEY ACHIEVEMENTS
• Optimized for ${jobAnalysis.company} culture and values
• Incorporates ${jobAnalysis.atsKeywords.length} relevant ATS keywords
• Tailored for ${jobAnalysis.title} requirements
    `.trim();
  }
}

export const resumeApi = new ResumeOptimizationService();
export type { JobDescription, ResumeData, LinkedInData, OptimizedResume, JobAnalysis, ResumeAnalysis };