import React, { useState } from 'react';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import ConfessionForm from './components/ConfessionForm';
import SuccessPage from './components/SuccessPage';
import AdminPanel from './components/AdminPanel';

type AppState = 'login' | 'form' | 'success' | 'admin';

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

function App() {
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleLogin = () => {
    setCurrentState('form');
  };

  const handleFormSubmit = (data: FormData) => {
    setSubmittedData(data);
    setCurrentState('success');
  };

  const handleNewMessage = () => {
    setCurrentState('form');
    setSubmittedData(null);
  };

  const handleAdminAccess = () => {
    setCurrentState('admin');
  };

  const handleBackFromAdmin = () => {
    setCurrentState('form');
  };

  return (
    <div className="min-h-screen">
      {currentState !== 'login' && currentState !== 'admin' && <Header />}
      
      {currentState === 'login' && <LoginPage onLogin={handleLogin} />}
      
      {currentState === 'form' && <ConfessionForm onSubmit={handleFormSubmit} onAdminAccess={handleAdminAccess} />}
      
      {currentState === 'success' && <SuccessPage onNewMessage={handleNewMessage} />}
      
      {currentState === 'admin' && <AdminPanel onBack={handleBackFromAdmin} />}
    </div>
  );
}

export default App;