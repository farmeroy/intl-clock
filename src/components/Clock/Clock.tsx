import { NominatimPlace } from "../../App";
import AnalogClock from "../AnalogClock/AnalogClock";
import { useTime } from "../../contexts/useTimeProvider";

const Clock = ({
  place,
  timeZone,
  onClose,
}: {
  place: NominatimPlace;
  timeZone: string;
  onClose: () => void;
}) => {
  const { currentTime } = useTime();

  return (
    <div className="relative p-4 m-2 border rounded-lg shadow-md dark:text-white w-96 border-1">
      <div className="p-2">
        <div>
          <p className="font-bold text-lg truncate ...">{place.display_name}</p>
          <p className="text-sm">{timeZone}</p>
        </div>
        <div>
          <AnalogClock timeZone={timeZone} time={currentTime} />
        </div>
        <div className="flex flex-col items-center justify-around">
          <p className="text-xl">
            {new Date(currentTime).toLocaleTimeString("en-US", {
              timeZone,
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-sm">
            {new Date(currentTime).toLocaleDateString("en-US", {
              timeZone,
              month: "long",
              year: "numeric",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <button className="absolute top-2 right-2" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Clock;
