import { useState } from "react";

import IconEdit from "@/assets/icons/edit.svg";
import { useAppSelector } from "../../../app/store";
import EditModal from "./EditModal";

type Props = {
  uid: number;
};

const NameEdit = ({ uid }: Props) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const user = useAppSelector((store) => store.users.byId[uid]);

  const toggleEditModalVisible = () => {
    setEditModalVisible((prev) => !prev);
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-gray-900 dark:text-gray-100">{user?.name ?? ""}</span>
      <button type="button" title="edit" onClick={toggleEditModalVisible}>
        <IconEdit className="fill-gray-500 !w-5 !h-5" />
      </button>
      {editModalVisible && <EditModal uid={uid} closeModal={toggleEditModalVisible} />}
    </div>
  );
};

export default NameEdit;
