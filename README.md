# ResumeGenie 🧞‍♂️

An AI-powered resume optimization tool that helps you create tailored, ATS-friendly resumes for better job matches.

![ResumeGenie Screenshot](https://via.placeholder.com/1200x600/8B5CF6/FFFFFF?text=ResumeGenie+-+AI+Resume+Optimization)

## ✨ Features

- **📊 Job Description Analysis** - Analyze job postings to understand requirements
- **📄 Resume Upload & Analysis** - Upload your current resume for detailed analysis
- **💼 LinkedIn Integration** - Enhance with LinkedIn profile data (optional)
- **🤖 AI-Powered Optimization** - Generate tailored resumes optimized for ATS systems
- **👁️ Preview & Export** - Review and download optimized resumes in PDF/DOCX formats
- **🎨 Beautiful Dark UI** - Modern glassmorphism design with purple/pink gradients

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resumegenie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
resumegenie/
├── src/
│   └── main.tsx          # React entry point
├── components/
│   ├── Dashboard.tsx     # Main dashboard
│   ├── JobAnalyzer.tsx   # Job description analysis
│   ├── ResumeUpload.tsx  # Resume upload & analysis
│   ├── LinkedInIntegration.tsx  # LinkedIn integration
│   ├── ResumeOptimizer.tsx      # AI optimization
│   ├── ResumePreview.tsx        # Preview & export
│   ├── Settings.tsx      # User settings
│   ├── Sidebar.tsx       # Navigation sidebar
│   └── ui/              # Reusable UI components
├── services/
│   └── resumeApi.ts     # API service for resume operations
├── styles/
│   └── globals.css      # Global styles & Tailwind config
├── index.html           # HTML entry point
├── package.json         # Dependencies & scripts
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎯 How to Use

### 1. Analyze Job Description
- Paste a job description to understand requirements
- AI extracts key skills, company values, and ATS keywords
- View detailed analysis of what employers are looking for

### 2. Upload Your Resume
- Upload PDF, DOC, or DOCX files
- Get ATS compatibility score and skill analysis
- See improvement suggestions

### 3. LinkedIn Enhancement (Optional)
- Connect your LinkedIn profile
- Extract additional skills, certifications, and courses
- Enhance your resume with professional data

### 4. AI Optimization
- Generate tailored resume optimized for the specific job
- Improve ATS compatibility and keyword density
- Align content with company culture and values

### 5. Preview & Export
- Review your optimized resume
- Download in PDF or DOCX format
- Track improvements and success metrics

## 🔧 Customization

### Theming
The app uses a custom dark theme with purple/pink gradients. Colors can be customized in `/styles/globals.css`:

```css
.dark {
  --background: oklch(0.05 0 0);     /* Ultra dark background */
  --foreground: oklch(0.95 0 0);     /* Light text */
  --card: oklch(0.08 0 0);           /* Card backgrounds */
  /* ... other variables */
}
```

### Components
All components use consistent glassmorphism styling:

```javascript
const glassStyle = {
  backdropFilter: 'blur(20px)',
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
};
```

## 🔮 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite
- **Package Manager**: npm

## 📊 Features in Detail

### Job Analysis
- Extracts job title, company, location, salary
- Identifies required and preferred skills
- Analyzes company values and culture
- Generates ATS-optimized keywords

### Resume Analysis
- Parses PDF/DOC/DOCX files
- Detects skills with confidence scores
- Calculates ATS compatibility score
- Provides actionable improvement suggestions

### AI Optimization
- Tailors content for specific job requirements
- Optimizes keyword density for ATS systems
- Aligns experience descriptions with job needs
- Incorporates company values and culture fit

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for better job application tools
- Designed for job seekers who want to optimize their resumes

---

**ResumeGenie** - Transform your resume with AI-powered optimization! 🚀