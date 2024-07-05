import {NominatimPlace} from "../../App";

type PlacesModalProps = {
  places: NominatimPlace[],
  isOpen: boolean,
  handleClose: () => void,
  handleSelect: (arg0: NominatimPlace) => Promise<void>,
  handleSearchAgain: () => void
}
const PlacesModal = ({
  places,
  isOpen,
  handleClose,
  handleSelect,
  handleSearchAgain,
}: PlacesModalProps) => {
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
            className="z-50 p-6 mt-16 bg-white border rounded-lg shadow-lg opacity-100 min-w-96 border-1"
          >
            <div className="bg-white pd-2">
            <ul className="flex flex-col gap-2">
              {places.map((place) => (
                <li className="hover:bg-gray-100">
                  <button
                    className="w-full p-1 border border-1 rounded-md bg-gray"
                    onClick={() => handleSelect(place)}
                  >
                    {place.display_name}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={handleSearchAgain}>More Results</button> </li>
            </ul></div>
      <button className="absolute top-2 right-2" onClick={handleClose}>X</button>
          </dialog>
        </>
      ) : null}
    </>
  );
};

export default PlacesModal;
