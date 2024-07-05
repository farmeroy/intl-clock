import {useEffect, useState} from "react";
import { NominatimPlace } from "../../App";

const Clock = ({
  place,
  timeZone,
}: {
  place: NominatimPlace;
  timeZone: string;
  }) => {
  const [time, setTime] = useState(Date.now());
  const incrementNow = () => setTime(Date.now());

  useEffect(() => {
    const tick = setInterval(incrementNow, 1000 );
    return () => clearInterval(tick);
  }, []);

  return (
    <div>
      <div>
        <p>{place.name}</p>
        <p>{place.display_name}</p>
        <p>{timeZone}</p>
        <p>{new Date(time).toLocaleTimeString('en-US', {timeZone})}</p>
      </div>
    </div>
  );
};

export default Clock;
