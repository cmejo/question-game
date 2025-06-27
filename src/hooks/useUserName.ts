import { useState, useEffect } from 'react';

export const useUserName = () => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const saveUserName = (name: string) => {
    const trimmedName = name.trim();
    setUserName(trimmedName);
    if (trimmedName) {
      localStorage.setItem('user_name', trimmedName);
    } else {
      localStorage.removeItem('user_name');
    }
  };

  return {
    userName,
    saveUserName
  };
};