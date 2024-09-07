import React, { useEffect, useRef } from 'react';

interface ClockProps {
  size?: number;
  color?: string;
  time: number;
  timeZone: string;
}

const AnalogClock: React.FC<ClockProps> = ({ size = 200, color = 'black', time, timeZone }) => {
  const secondHandRef = useRef<SVGLineElement>(null);
  const minuteHandRef = useRef<SVGLineElement>(null);
  const hourHandRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const date = new Date(time);
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      });
      const [{ value: hours }, , { value: minutes }, , { value: seconds }] = formatter.formatToParts(date);
      
      const hoursNum = parseInt(hours);
      const minutesNum = parseInt(minutes);
      const secondsNum = parseInt(seconds);

      const secondDegrees = (secondsNum / 60) * 360;
      const minuteDegrees = ((minutesNum + secondsNum / 60) / 60) * 360;
      const hourDegrees = ((hoursNum % 12 + minutesNum / 60) / 12) * 360;

      if (secondHandRef.current) {
        secondHandRef.current.setAttribute('transform', `rotate(${secondDegrees} ${size / 2} ${size / 2})`);
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.setAttribute('transform', `rotate(${minuteDegrees} ${size / 2} ${size / 2})`);
      }
      if (hourHandRef.current) {
        hourHandRef.current.setAttribute('transform', `rotate(${hourDegrees} ${size / 2} ${size / 2})`);
      }
    };

    updateClock();
  }, [time, timeZone, size]);

  const center = size / 2;
  const strokeWidth = size / 100;

  const hourMarkers = Array.from({ length: 12 }, (_, index) => {
    const angle = (index * 30);
    return (
      <line
        key={`hour-${index}`}
        x1={center}
        y1={strokeWidth * 5}
        x2={center}
        y2={strokeWidth * 15}
        stroke={color}
        strokeWidth={strokeWidth}
        transform={`rotate(${angle} ${center} ${center})`}
      />
    );
  });

  const minuteMarkers = Array.from({ length: 60 }, (_, index) => {
    if (index % 5 === 0) return null; // Skip positions where hour markers are
    const angle = (index * 6);
    return (
      <line
        key={`minute-${index}`}
        x1={center}
        y1={strokeWidth * 5}
        x2={center}
        y2={strokeWidth * 10}
        stroke={color}
        strokeWidth={strokeWidth / 5}
        transform={`rotate(${angle} ${center} ${center})`}
      />
    );
  });

  return (
    <div className='flex justify-center'>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={center} cy={center} r={center - strokeWidth} fill="white" stroke={color} strokeWidth={strokeWidth} />
      
      {hourMarkers}
      {minuteMarkers}
      
      <g id="hands">
        <line
          ref={hourHandRef}
          x1={center}
          y1={center}
          x2={center}
          y2={center * 0.5}
          stroke={color}
          strokeWidth={strokeWidth * 2}
          strokeLinecap="round"
        />
        <line
          ref={minuteHandRef}
          x1={center}
          y1={center}
          x2={center}
          y2={center * 0.3}
          stroke={color}
          strokeWidth={strokeWidth * 1.5}
          strokeLinecap="round"
        />
        <line
          ref={secondHandRef}
          x1={center}
          y1={center}
          x2={center}
          y2={center * 0.2}
          stroke={color}
          strokeWidth={strokeWidth * 0.5}
          strokeLinecap="round"
        />
        {/* Center dot */}
        <circle cx={center} cy={center} r={strokeWidth * 1.5} fill={color} />
      </g>
    </svg>
</div>
  );
};

export default AnalogClock;
