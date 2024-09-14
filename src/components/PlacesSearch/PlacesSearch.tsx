import { FormEvent, useState } from "react";
import PlacesModal from "../PlacesModal/PlacesModal";
import { NominatimPlace } from "../../App";

interface PlacesSearchProps {
  onSelectPlace: (arg0: NominatimPlace, timezone: string) => void;
}

export default function PlacesSearch({ onSelectPlace }: PlacesSearchProps) {
  const [places, setPlaces] = useState<NominatimPlace[]>([]);
  const [search, setSearch] = useState("");

  const handleSearchAgain = () => {
    const placeIds = places.map((place) => place.place_id).join(",");
    getPlacesHandler(`&exclude_place_ids=${placeIds}`);
  };

  const onSubmitSearch = (e: FormEvent) => {
    e.preventDefault();
    getPlacesHandler();
  };

  const getPlacesHandler = async (params = "") => {
    const url = `https://nominatim.openstreetmap.org/search?q=${search}&format=jsonv2${params}`;
    try {
      const results = await fetch(url);
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
        `${import.meta.env.VITE_TIME_ZONE_URL}/?lat=${place.lat}&lon=${place.lon}`
      );
      if (res.ok) {
        const { timezone } = await res.json();
        onSelectPlace(place, timezone);
        setPlaces([]);
        setSearch("");
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const showPlaces = places.length > 0;

  return (
    <>
      <PlacesModal
        places={places}
        isOpen={showPlaces}
        handleClose={() => setPlaces([])}
        onSelect={getTimeZone}
        onSearchAgain={handleSearchAgain}
      />
      <div className="p-4 mx-auto text-center">
        <h1 className="text-lg dark:text-white">International Clock</h1>
        <form onSubmit={onSubmitSearch}>
          <input
            placeholder="Search for a location..."
            value={search}
            className="p-2 m-1 border rounded-lg border-1 hover:border-black duration-300 focus:ease-in-out focus:outline focus:outline-black focus:outline-1"
            name="place-search"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="p-2 m-1 border rounded-lg dark:text-white border-1 hover:border-black dark:hover:border-slate-200 focus:outline duration-300 focus:ease-in-out focus:outline-black focus:outline-1">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
