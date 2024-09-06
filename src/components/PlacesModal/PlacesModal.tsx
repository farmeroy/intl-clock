import {useState} from "react";
import {NominatimPlace} from "../../App";

type PlacesModalProps = {
  places: NominatimPlace[];
  isOpen: boolean;
  handleClose: () => void;
  onSelect: (arg0: NominatimPlace) => Promise<void>;
  onSearchAgain: () => void;
};
const PlacesModal = ({
  places,
  isOpen,
  handleClose,
  onSelect,
  onSearchAgain,
}: PlacesModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async (place: NominatimPlace) => {
    setIsLoading(true);
    await onSelect(place).then();
    setIsLoading(false);
  };

  const handleSearchAgain = () => {
    onSearchAgain();
  }

  return (
    <>
      {isOpen ? (
        <>
          <div
            className="absolute z-50 flex w-screen h-screen bg-black opacity-50"
            onClick={handleClose}
          />
          <dialog
            open={isOpen}
            className="z-50 p-6 mt-16 bg-white border rounded-lg shadow-lg opacity-100 dark:bg-slate-800 min-w-96 border-1"
          >
            <div className="bg-white dark:bg-slate-800 dark:text-white pd-2">
              <ul className="flex flex-col gap-2">
                {places.map((place) => (
                  <li
                    key={place.place_id}
                    className="hover:bg-gray-100 dark:hover:bg-slate-700 duration-300 hover:ease-in-out"
                  >
                    <button
                      disabled={isLoading}
                      className="w-full p-2 border rounded-lg border-1 bg-gray disabled:opacity-2"
                      onClick={() => handleSelect(place)}
                    >
                      {place.display_name}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={handleSearchAgain}>More Results</button>{" "}
                </li>
              </ul>
            </div>
            <button className="absolute top-2 right-2" onClick={handleClose}>
              X
            </button>
          </dialog>
        </>
      ) : null}
    </>
  );
};

export default PlacesModal;
