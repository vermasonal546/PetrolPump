import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('loginobj');
    if (stored) {
      setLoginData(JSON.parse(stored));
    }
  }, []);

  return (
    <UserContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
