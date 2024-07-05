import { useEffect, useState } from "react";
import { NominatimPlace } from "../../App";

const Clock = ({
  place,
  timeZone,
  onClose,
}: {
  place: NominatimPlace;
  timeZone: string;
  onClose: () => void;
}) => {
  const [time, setTime] = useState(Date.now());
  const incrementNow = () => setTime(Date.now());

  useEffect(() => {
    const tick = setInterval(incrementNow, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className="relative p-4 m-2 border rounded-lg shadow-md w-96 border-1">
      <div className="p-2">
      <div>
        <p className="font-bold text-lg truncate ...">{place.display_name}</p>
        <p className="text-sm">{timeZone}</p>
      </div>
      <div className="flex flex-col items-center justify-around">
        <p className="text-xl">{new Date(time).toLocaleTimeString("en-US", {timeZone})}</p>
        <p className="text-sm">{new Date(time).toLocaleDateString("en-US", {timeZone})}</p>
      </div></div>
      <button className="absolute top-2 right-2" onClick={onClose}>X</button>
    </div>
  );
};

export default Clock;
