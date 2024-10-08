import React, { createContext, useState, useEffect } from "react";

export interface TimeContextType {
  currentTime: number;
  clockFormat: ClockFormat;
  setClockFormat: React.Dispatch<ClockFormat>;
}

type ClockFormat = "12-Hour" | "24-Hour";

export const TimeContext = createContext<TimeContextType | undefined>(
  undefined
);

export const TimeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [clockFormat, setClockFormat] = useState<ClockFormat>("12-Hour");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimeContext.Provider value={{ currentTime, clockFormat, setClockFormat }}>
      {children}
    </TimeContext.Provider>
  );
};
