type Props = {
  name: string;
  value: string;
  color: string;
};

const SpanItem = (props: Props) => {
  return (
    <div className="flex flex-col">
      <p className="text-xs text-left ml-1 text-gray-500">{props.name}</p>
      <span
        className={`w-28 h-8 p-1 m-1 text-left border rounded-sm bg-${props.color}-50`}
      >
        {props.value}
      </span>
    </div>
  );
};

export default SpanItem;
