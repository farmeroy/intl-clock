import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useTime } from "../../contexts/useTimeProvider";

const RadioBtn = ({
  value,
  children,
}: {
  value: string | number;
  children: React.ReactNode;
}) => {
  return (
    <Radio
      value={value}
      className="w-fit p-1 h-fit bg-gray disabled:opacity-2 data-[checked]:bg-white data-[checked]:text-black text-sm"
    >
      {children}
    </Radio>
  );
};

const ClockFormatToggleButton = () => {
  const { clockFormat, setClockFormat } = useTime();
  return (
    <RadioGroup value={clockFormat} onChange={setClockFormat} className="w-fit">
      <Field className="flex w-fit items-center  border rounded-lg hover:cursor-pointer">
        <RadioBtn value="12-Hour">12 Hour Clock</RadioBtn>
        <RadioBtn value="24-Hour">24 Hour Clock</RadioBtn>
      </Field>
    </RadioGroup>
  );
};

export default ClockFormatToggleButton;
