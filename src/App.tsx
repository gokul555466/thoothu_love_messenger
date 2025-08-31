import React, { useState } from 'react';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import ConfessionForm from './components/ConfessionForm';
import SuccessPage from './components/SuccessPage';

type AppState = 'login' | 'form' | 'success';

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

  return (
    <div className="min-h-screen">
      {currentState !== 'login' && <Header />}
      
      {currentState === 'login' && <LoginPage onLogin={handleLogin} />}
      
      {currentState === 'form' && <ConfessionForm onSubmit={handleFormSubmit} />}
      
      {currentState === 'success' && <SuccessPage onNewMessage={handleNewMessage} />}
    </div>
  );
}

export default App;