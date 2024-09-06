import React, { createContext, useState, useEffect } from 'react';

export interface TimeContextType {
  currentTime: number;
}

export const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const TimeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimeContext.Provider value={{ currentTime }}>
      {children}
    </TimeContext.Provider>
  );
};
