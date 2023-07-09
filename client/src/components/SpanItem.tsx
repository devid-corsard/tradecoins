type Props = {
    name: string;
    value: string;
};
const colorMap = {
    ["Spend:"]: "text-red-500",
    ["Recieved:"]: "text-emerald-500",
    ["Difference:"]: "text-amber-500",
};
const SpanItem = (props: Props) => {
    let spanTextColor = "text-slate-300";
    let spanBgColor = "bg-slate-700";
    spanTextColor = colorMap[props.name as keyof typeof colorMap];
    if (Number(props.value) < 0) spanBgColor = "bg-red-900";

    return (
        <div className="flex flex-col">
            <p className="text-xs text-left ml-1 text-slate-500">{props.name}</p>
            <span
                // className={`w-28 h-8 p-1 m-1 text-left border rounded-sm bg-${props.color}-50`}
                className={`h-8 rounded-sm p-1 m-1 ${spanBgColor} ${spanTextColor}`}
            // className={`w-28 h-8 p-1 m-1 text-left border rounded-sm ${spanBgColor}`}
            >
                {props.value}
            </span>
        </div>
    );
};

export default SpanItem;
