import React, { useState } from 'react';
import { Heart, Send, Phone, MessageCircle, Mail, Instagram, Check } from 'lucide-react';
import { sendEmailViaFormspree } from '../utils/emailService';

interface FormData {
  userName: string;
  userPhone: string;
  userGender: string;
  loverName: string;
  loverGender: string;
  message: string;
  contactMethod: string;
  contactDetails: string;
}

interface ConfessionFormProps {
  onSubmit: (data: FormData) => void;
  onAdminAccess: () => void;
}

const ConfessionForm: React.FC<ConfessionFormProps> = ({ onSubmit, onAdminAccess }) => {
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    userPhone: '',
    userGender: '',
    loverName: '',
    loverGender: '',
    message: '',
    contactMethod: '',
    contactDetails: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email to admin
      await sendEmailViaFormspree({
        senderName: formData.userName,
        senderPhone: formData.userPhone,
        senderGender: formData.userGender,
        loverName: formData.loverName,
        loverGender: formData.loverGender,
        message: formData.message,
        contactMethod: formData.contactMethod,
        contactDetails: formData.contactDetails
      });

      console.log('Email sent successfully to gokulsrg3@gmail.com');

      // Save to localStorage for admin panel
      const submissionData = {
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date().toISOString()
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('loveSubmissions') || '[]');
      existingSubmissions.push(submissionData);
      localStorage.setItem('loveSubmissions', JSON.stringify(existingSubmissions));
      
      onSubmit(formData);
      
    } catch (error) {
      console.error('Error sending love message:', error);
      
      // Save locally even if email fails, but show error
      const submissionData = {
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date().toISOString()
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('loveSubmissions') || '[]');
      existingSubmissions.push(submissionData);
      localStorage.setItem('loveSubmissions', JSON.stringify(existingSubmissions));
      
      alert('Your message was saved locally, but we couldn\'t send the email notification. Please contact the admin directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getContactIcon = (method: string) => {
    switch (method) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      default: return null;
    }
  };

  const getContactPlaceholder = (method: string) => {
    switch (method) {
      case 'call': return 'Enter phone number for call';
      case 'whatsapp': return 'Enter WhatsApp number';
      case 'email': return 'Enter email address';
      case 'instagram': return 'Enter Instagram handle';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <Heart className="h-12 w-12 text-pink-500 fill-current mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Your Heart</h2>
          <p className="text-gray-600">உங்கள் காதலை பகிருங்கள் • Let love find its way</p>
          
          {/* Admin Access Button */}
          <button
            type="button"
            onClick={onAdminAccess}
            className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Admin Panel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Details Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
              About You
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.userPhone}
                  onChange={(e) => handleInputChange('userPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="+91 9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Gender</label>
                <select
                  required
                  value={formData.userGender}
                  onChange={(e) => handleInputChange('userGender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lover Details Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
              About Your Love
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Their Name</label>
                <input
                  type="text"
                  required
                  value={formData.loverName}
                  onChange={(e) => handleInputChange('loverName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter their name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Their Gender</label>
                <select
                  required
                  value={formData.loverGender}
                  onChange={(e) => handleInputChange('loverGender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
              Your Message
            </h3>
            <textarea
              required
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Write your heartfelt message here... Express what you've always wanted to say."
            />
          </div>

          {/* Contact Method Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
              How to Reach Them
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { value: 'call', label: 'Phone Call', icon: Phone },
                { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                { value: 'email', label: 'Email', icon: Mail },
                { value: 'instagram', label: 'Instagram', icon: Instagram }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleInputChange('contactMethod', value)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                    formData.contactMethod === value
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
            {formData.contactMethod && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Details
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {getContactIcon(formData.contactMethod)}
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.contactDetails}
                    onChange={(e) => handleInputChange('contactDetails', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder={getContactPlaceholder(formData.contactMethod)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Sending Your Love...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send My Love Message</span>
                  </>
                )}
              </div>
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Your message will be delivered with care and anonymity
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfessionForm;