import { FormEvent, useState } from "react";
type Coords = {
  lat: number;
  lon: number;
};

type NominatimPlace = {
  name: string;
  display_name: string;
  lat: number;
  lon: number;
};

function App() {
  const [places, setPlaces] = useState<NominatimPlace[]>([]);
  const [search, setSearch] = useState("");
  const [timeZone, setTimeZone] = useState("");
  console.log({ places });
  const getPlacesHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const results = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${search}&format=jsonv2`
      );
      if (results.ok) {
        setPlaces(await results.json());
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const getTimeZone = async (coords: Coords) => {
    try {
      const res = await fetch(
        `http://localhost:9000?lat=${coords.lat}&lon=${coords.lon}`,
        {
          mode: "cors",
          credentials: "same-origin",
        }
      );
      if (res.ok) {
        const { timezone } = await res.json();
        setTimeZone(timezone);
        setPlaces([]);
      }
    } catch (error) {
      console.error({ error });
    }
  };
  return (
    <>
      <h1>International Clock</h1>
      <form onSubmit={getPlacesHandler}>
        <label>
          Search location
          <input
            name="place-search"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </form>
      <div>
        <ul className="absolute bg-white border w-96 border-1">
          {places.map((place) => (
            <li>
              <button
                onClick={() => getTimeZone({ lat: place.lat, lon: place.lon })}
              >
                {place.display_name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>{timeZone}</div>
    </>
  );
}

export default App;
