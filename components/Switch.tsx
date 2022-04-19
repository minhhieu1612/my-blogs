const Switch = ({
  stateSwitch,
  onSwitch,
}: {
  stateSwitch: boolean;
  onSwitch: Function;
}) => {
  return (
    <div
      className={`relative border-2 ${
        stateSwitch
          ? "border-primary-800 bg-primary-800"
          : "border-black bg-black"
      } w-11 h-6 cursor-pointer`}
      style={{ padding: "2px" }}
      onClick={() => onSwitch()}
    >
      <div
        className={`transition-all duration-75 h-4 bg-white w-2 ${
          stateSwitch ? "translate-x-7" : ""
        }`}
      />
      <div
        className={`absolute top-1/2 -translate-y-1/2 text-xs font-bold text-white ${
          stateSwitch ? "left-1" : "right-1"
        }`}
      >
        {stateSwitch ? "ON" : "OFF"}
      </div>
    </div>
  );
};

export default Switch;
