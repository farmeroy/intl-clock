import { useEffect, useState } from "react";
import Clock from "./components/Clock/Clock";
import { TimeProvider } from "./contexts/TimeProvider";
import PlacesSearch from "./components/PlacesSearch/PlacesSearch";
import { useTime } from "./contexts/useTimeProvider";
import ClockFormatToggleButton from "./components/ClockFormatToggleButton/ClockFomatToggleButton";

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
      <div className="flex flex-col justify-between">
        <div className="h-full min-h-[90vh]">
          <PlacesSearch onSelectPlace={addClock} />
          <ClockFormatToggleButton />
          {clocks.length > 0 ? (
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
          ) : null}
        </div>
        <div className="w-full h-full text-center">
          <p>
            Look up an place and display the local time there (uses the{" "}
            <a
              target="_blank"
              className="underline"
              href="https://nominatim.org/"
            >
              Nominatim database
            </a>
            ).
          </p>
          <p>
            The time zone is calculated using a ray tracing package called{" "}
            <a
              target="_blank"
              className="underline"
              href="https://crates.io/crates/tzf-rs"
            >
              tzf-rs
            </a>
          </p>
        </div>
      </div>
    </TimeProvider>
  );
}

export default App;
