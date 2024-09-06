import { useState } from "react";
import Clock from "./components/Clock/Clock";
import { TimeProvider } from "./contexts/TimeProvider";
import PlacesSearch from "./components/PlacesSearch/PlacesSearch";

export type NominatimPlace = {
  place_id: number;
  name: string;
  display_name: string;
  lat: number;
  lon: number;
};

type Clock = {
  place: NominatimPlace;
  timeZone: string;
};

function App() {
  const [clocks, setClocks] = useState<Clock[]>([]);

  const selectPlace = (place: NominatimPlace, timezone: string) => {
    setClocks((clocks) => [...clocks, { place, timeZone: timezone }]);
  };

  return (
    <TimeProvider>
      <div className="w-screen h-screen dark:bg-slate-800">
        <PlacesSearch onSelectPlace={selectPlace} />
        <div className="flex flex-wrap justify-center">
          {clocks.map(({ place, timeZone }) => (
            <Clock
              key={place.place_id}
              place={place}
              timeZone={timeZone}
              onClose={() =>
                setClocks((clocks) =>
                  clocks.filter(
                    (clock) => clock.place.place_id != place.place_id
                  )
                )
              }
            />
          ))}
        </div>
      </div>
    </TimeProvider>
  );
}

export default App;
