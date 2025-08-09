import React from 'react';
import { Heart, CheckCircle, Sparkles } from 'lucide-react';

interface SuccessPageProps {
  onNewMessage: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onNewMessage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Success Animation */}
          <div className="mb-6">
            <div className="relative mx-auto w-20 h-20">
              <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
              <Heart className="w-4 h-4 text-pink-500 fill-current absolute -bottom-1 -left-1 animate-pulse" />
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Message Sent! 💕</h2>
          <p className="text-lg text-green-600 font-medium mb-4">உங்கள் காதல் செய்தி அனுப்பப்பட்டது!</p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-700 leading-relaxed">
              Your heartfelt message has been successfully submitted to our love messengers. 
              We'll carefully review your request and reach out to your special someone 
              through the method you selected.
            </p>
          </div>

          {/* What Happens Next */}
          <div className="text-left mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">What happens next:</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                <p className="text-sm text-gray-600">We'll carefully review your message</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                <p className="text-sm text-gray-600">Our team will reach out respectfully</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                <p className="text-sm text-gray-600">Your message will be delivered with care</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onNewMessage}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Send Another Message
            </button>
            <p className="text-xs text-gray-500">
              Spread more love across Tamil Nadu 💝
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;