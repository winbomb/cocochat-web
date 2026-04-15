import { useAppSelector } from "../../app/store";

type Props = {
  uid: number;
};

const Remark = ({ uid }: Props) => {
  const remark = useAppSelector((store) => store.footprint.remarkMap[uid] || "");
  return (
    <div className="flex items-center gap-1 text-white py-2">
      <div className="flex items-center gap-1">
        <span>{remark}</span>
      </div>
    </div>
  );
};

export default Remark;
