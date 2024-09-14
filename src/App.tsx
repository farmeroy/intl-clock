import { useEffect, useState } from "react";
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

const RUHR_CLOCKS_STORAGE = "rhur_clocks_storage";

function App() {
  const [clocks, setClocks] = useState<Clock[]>([]);
  useEffect(() => {
    let clocksStorage = [];
    const maybeClocksStorage = localStorage?.getItem(RUHR_CLOCKS_STORAGE);
    if (maybeClocksStorage) {
      clocksStorage = JSON.parse(maybeClocksStorage);
    }
    setClocks(clocksStorage);
  }, []);

  const updateClocksStorage = (newClocks: Clock[]) => {
    localStorage.setItem(RUHR_CLOCKS_STORAGE, JSON.stringify(newClocks));
  };

  const addClock = (place: NominatimPlace, timezone: string) => {
    // return early if we already have a clock with that id
    if (clocks.find((clock) => clock.place.place_id == place.place_id)) {
      return;
    }
    const newClocks = [...clocks, { place, timeZone: timezone }];
    updateClocksStorage(newClocks);
    setClocks(newClocks);
  };

  const removeClock = (place: NominatimPlace) => {
    const newClocks = clocks.filter(
      (clock) => clock.place.place_id != place.place_id
    );
    updateClocksStorage(newClocks);
    setClocks(newClocks);
  };

  return (
    <TimeProvider>
      <div className="w-screen h-screen dark:bg-slate-800">
        <PlacesSearch onSelectPlace={addClock} />
        <div className="flex flex-wrap justify-center">
          {clocks.map(({ place, timeZone }) => (
            <Clock
              key={place.place_id}
              place={place}
              timeZone={timeZone}
              onClose={() => removeClock(place)}
            />
          ))}
        </div>
      </div>
    </TimeProvider>
  );
}

export default App;
