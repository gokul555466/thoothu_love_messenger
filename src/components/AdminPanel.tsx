import React, { useState, useEffect } from 'react';
import { Eye, Heart, Phone, Mail, MessageCircle, Instagram, Calendar, User, Download } from 'lucide-react';

interface FormSubmission {
  id: string;
  userName: string;
  userPhone: string;
  userGender: string;
  loverName: string;
  loverGender: string;
  message: string;
  contactMethod: string;
  contactDetails: string;
  timestamp: string;
}

interface AdminPanelProps {
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);

  useEffect(() => {
    // Load submissions from localStorage
    const savedSubmissions = localStorage.getItem('loveSubmissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  const getContactIcon = (method: string) => {
    switch (method) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = ['Timestamp', 'Sender Name', 'Sender Phone', 'Sender Gender', 'Lover Name', 'Lover Gender', 'Message', 'Contact Method', 'Contact Details'];
    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [
        sub.timestamp,
        sub.userName,
        sub.userPhone,
        sub.userGender,
        sub.loverName,
        sub.loverGender,
        `"${sub.message.replace(/"/g, '""')}"`,
        sub.contactMethod,
        sub.contactDetails
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `love-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all submission data? This cannot be undone.')) {
      localStorage.removeItem('loveSubmissions');
      setSubmissions([]);
      setSelectedSubmission(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-pink-500 fill-current" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                <p className="text-gray-600">View all love message submissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={exportToCSV}
                disabled={submissions.length === 0}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={clearAllData}
                disabled={submissions.length === 0}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Clear All</span>
              </button>
              <button
                onClick={onBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to App
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
              </div>
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Messages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.filter(sub => 
                    new Date(sub.timestamp).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Most Used Contact</p>
                <p className="text-2xl font-bold text-gray-900">
                  {submissions.length > 0 ? 
                    Object.entries(
                      submissions.reduce((acc, sub) => {
                        acc[sub.contactMethod] = (acc[sub.contactMethod] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
                    : 'N/A'
                  }
                </p>
              </div>
              <User className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Submissions Yet</h3>
            <p className="text-gray-500">Love messages will appear here once users start submitting the form.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submissions List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Submissions</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedSubmission?.id === submission.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-pink-500 fill-current" />
                        <span className="font-medium text-gray-800">
                          {submission.userName} → {submission.loverName}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(submission.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        {getContactIcon(submission.contactMethod)}
                        <span className="capitalize">{submission.contactMethod}</span>
                      </div>
                      <span>•</span>
                      <span>{submission.message.substring(0, 50)}...</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed View */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {selectedSubmission ? 'Message Details' : 'Select a Message'}
              </h2>
              
              {selectedSubmission ? (
                <div className="space-y-6">
                  {/* Sender Details */}
                  <div className="bg-pink-50 rounded-lg p-4">
                    <h3 className="font-semibold text-pink-800 mb-3">Sender Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedSubmission.userName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedSubmission.userPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium capitalize">{selectedSubmission.userGender}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recipient Details */}
                  <div className="bg-rose-50 rounded-lg p-4">
                    <h3 className="font-semibold text-rose-800 mb-3">Recipient Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedSubmission.loverName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium capitalize">{selectedSubmission.loverGender}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 mb-3">Love Message</h3>
                    <p className="text-gray-700 italic leading-relaxed">
                      "{selectedSubmission.message}"
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Method:</span>
                        <div className="flex items-center space-x-2">
                          {getContactIcon(selectedSubmission.contactMethod)}
                          <span className="font-medium capitalize">{selectedSubmission.contactMethod}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Details:</span>
                        <span className="font-medium">{selectedSubmission.contactDetails}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submitted:</span>
                      <span className="font-medium">{formatDate(selectedSubmission.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Click on a submission to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;