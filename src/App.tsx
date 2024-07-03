import { FormEvent, useState } from "react";
type Coords = {
  lat: number;
  lon: number;
};

type NominatimPlace = {
  place_id: number;
  name: string;
  display_name: string;
  lat: number;
  lon: number;
};

const mockPlaces: NominatimPlace[] = [
  {
    place_id: 1,
    name: "sonoma",
    display_name: "Sonoma County",
    lat: 49.99,
    lon: -39.99,
  },
];

function App() {
  const [places, setPlaces] = useState<NominatimPlace[]>([]);
  const [search, setSearch] = useState("");
  const [timeZone, setTimeZone] = useState("");
  console.log({ places });

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

  const getTimeZone = async (coords: Coords) => {
    try {
      const res = await fetch(
        `http://localhost:9000?lat=${coords.lat}&lon=${coords.lon}`,
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
  const showPlaces = places.length > 0;
  return (
    <>
      {showPlaces ? (
        <>
          <div className="absolute flex w-screen h-screen bg-black opacity-50" onClick={() => setPlaces([])} />
          <dialog
            open={showPlaces}
            className="p-4 mt-16 bg-white border min-w-96 border-1"
          >
            <ul>
              {places.map((place) => (
                <li>
                  <button
                    className="w-full p-1 border border-1 rounded-md bg-gray"
                    onClick={() =>
                      getTimeZone({ lat: place.lat, lon: place.lon })
                    }
                  >
                    {place.display_name}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={handleSearchAgain}>Search again</button>
              </li>
            </ul>
          </dialog>
        </>
      ) : null}
      <h1>International Clock</h1>
      <form onSubmit={onSubmitSearch}>
        <label>
          Search location
          <input
            className="p-1 m-1 border border-1 rounded-md"
            name="place-search"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button>Search</button>
      </form>
      <div>{timeZone}</div>
    </>
  );
}

export default App;
