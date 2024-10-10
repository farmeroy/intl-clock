import { useTime } from "../../contexts/useTimeProvider";
import Button from "../Button/Button";

const ClockFormatToggleButton = () => {
  const { clockFormat, toggleClockFormat } = useTime();
  return (
    <Button onClick={() => toggleClockFormat()}>{clockFormat} Clock</Button>
  );
};

export default ClockFormatToggleButton;
