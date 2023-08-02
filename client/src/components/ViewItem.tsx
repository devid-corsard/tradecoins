type Props = {
  name: string;
  value: string;
};
const colorMap = {
  ["Spend:"]: "text-red-500",
  ["Recieved:"]: "text-emerald-500",
  ["Difference:"]: "text-amber-500",
};
const ViewItem = (props: Props) => {
  let spanTextColor = "text-slate-300";
  let spanBgColor = "bg-slate-700";
  spanTextColor = colorMap[props.name as keyof typeof colorMap];
  if (Number(props.value) < 0) spanBgColor = "bg-red-900";

  return (
    <li>
      <h4>{props.name}</h4>
      <input type="number" disabled value={props.value} />
    </li>
  );
};

export default ViewItem;
