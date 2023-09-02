type Props = {
  name: string;
  value: string;
};
const ViewItem = (props: Props) => {
  return (
    <li>
      <h4>{props.name}</h4>
      <input type="number" disabled value={props.value} />
    </li>
  );
};

export default ViewItem;
