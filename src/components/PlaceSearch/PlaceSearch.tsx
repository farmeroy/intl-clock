import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { useState } from "react";

const PlaceSearch = ({  places, onSelect }) => {
  const [selected, setSelected] = useState(1);
  return (
    <Field>
      <Label>Find a Place</Label>
      <Combobox value={selected} onChange={setSelected} onClose={onSelect}>
        <ComboboxInput
          displayValue={(person) => person?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxOptions anchor="bottom" className="border empty:invisible">
          {places.map((place) => (
            <ComboboxOption
              key={place.place_id}
              value={place}
              className="data-[focus]:bg-blue-100"
            >
              {place.name}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
};

export default PlaceSearch;
