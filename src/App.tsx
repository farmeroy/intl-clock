import { FormEvent, useState } from "react";
import Clock from "./components/Clock/Clock";
import PlacesModal from "./components/PlacesModal/PlacesModal";

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
  const [places, setPlaces] = useState<NominatimPlace[]>([]);
  const [search, setSearch] = useState("");

  const [clocks, setClocks] = useState<Clock[]>([]);

  const handleSearchAgain = () => {
    const placeIds = places.map((place) => place.place_id).join(", ");
    getPlacesHandler(`&exclude_place_ids=${placeIds}`);
  };

  const onSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    getPlacesHandler();
  };
  const getPlacesHandler = async (params = "") => {
    try {
      const results = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${search}&format=jsonv2${params}`
      );
      if (results.ok) {
        setPlaces(await results.json());
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const getTimeZone = async (place: NominatimPlace) => {
    try {
      const res = await fetch(
        `http://localhost:9000?lat=${place.lat}&lon=${place.lon}`
      );
      if (res.ok) {
        const { timezone } = await res.json();
        setClocks((clocks) => [...clocks, { place, timeZone: timezone }]);
        setPlaces([]);
      }
    } catch (error) {
      console.error({ error });
    }
  };
  const showPlaces = places.length > 0;
  return (
    <div className="mx-auto text-center">
      <PlacesModal
        places={places}
        isOpen={showPlaces}
        handleClose={() => setPlaces([])}
        handleSelect={getTimeZone}
        handleSearchAgain={handleSearchAgain}
      />
      <h1>International Clock</h1>
      <form onSubmit={onSubmitSearch}>
        <input
          placeholder="Search for a location..."
          value={search}
            className="p-1 m-1 border border-1 rounded-md"
            name="place-search"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
        <button>Search</button>
      </form>
      <div className="flex flex-wrap justify-center">
      {clocks.map(({ place, timeZone }) => (
        <Clock
          place={place}
          timeZone={timeZone}
          onClose={() =>
            setClocks((clocks) =>
              clocks.filter((clock) => clock.place.place_id != place.place_id)
            )
          }
        />
      ))}</div>
    </div>
  );
}

export default App;
