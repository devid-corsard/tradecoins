import React from "react";

type Props = {
  name: string;
  value: string;
};

const InputItem = (props: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`change: ${e.currentTarget.value}`);
  };
  return (
    <div className="flex flex-col">
      <p className="text-xs text-left ml-1 text-gray-500">{props.name}</p>
      <input
        className="w-28 h-8 rounded-sm p-1 border-solid border m-1"
        type="number"
        defaultValue={props.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputItem;
