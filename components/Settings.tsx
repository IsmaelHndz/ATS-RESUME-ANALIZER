import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Download,
  Trash2,
  Moon,
  Sun,
  Globe,
  Mail
} from 'lucide-react';

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  // Ultra-dark glassmorphism styles
  const glassStyle = {
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-500 mt-1">Manage your account preferences and application settings.</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg text-gray-100">Profile Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input
                type="email"
                defaultValue="john.doe@email.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg text-gray-100">Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Email Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-gray-400" /> : <Sun className="w-5 h-5 text-gray-400" />}
                <span className="text-gray-300">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-purple-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Language</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="en" className="bg-gray-800">English</option>
                <option value="es" className="bg-gray-800">Spanish</option>
                <option value="fr" className="bg-gray-800">French</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-green-400" />
            <h3 className="text-lg text-gray-100">Privacy & Security</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors text-left">
              Change Password
            </button>
            
            <button className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors text-left">
              Two-Factor Authentication
            </button>
            
            <button className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors text-left">
              Privacy Settings
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg text-gray-100">Data Management</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full p-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-300 hover:bg-blue-500/30 transition-colors text-left">
              Export My Data
            </button>
            
            <button className="w-full p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 hover:bg-red-500/30 transition-colors text-left flex items-center gap-3">
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="rounded-2xl p-6 shadow-xl" style={glassStyle}>
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg text-gray-100">Support</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors">
            Help Center
          </button>
          
          <button className="p-4 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors">
            Contact Support
          </button>
          
          <button className="p-4 bg-white/5 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors">
            Send Feedback
          </button>
        </div>
      </div>
    </div>
  );
}