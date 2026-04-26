import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useUpdateUserMutation } from "../../../app/services/user";
import { useAppSelector } from "../../../app/store";
import Modal from "../../../components/Modal";
import Button from "../../../components/styled/Button";
import Input from "../../../components/styled/Input";
import StyledModal from "../../../components/styled/Modal";

type Props = {
  uid: number;
  closeModal: () => void;
};

const EditModal = ({ uid, closeModal }: Props) => {
  const [updateUser, { isSuccess, isLoading, error }] = useUpdateUserMutation();
  const user = useAppSelector((store) => store.users.byId[uid]);
  const { t } = useTranslation("setting", { keyPrefix: "bot" });
  const [inputs, setInputs] = useState({
    name: "",
    webhook_url: "",
    password: ""
  });
  const { t: ct } = useTranslation();

  useEffect(() => {
    if (user) {
      setInputs({
        name: user.name || "",
        webhook_url: user.webhook_url || "",
        password: ""
      });
    }
  }, [user]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    const { name = "" } = evt.target.dataset;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateBot = () => {
    if (inputs.name.trim() === "") {
      return;
    }
    const { name, webhook_url, password } = inputs;
    const payload: { id: number; name: string; webhook_url?: string; password?: string } = {
      id: uid,
      name,
      webhook_url: webhook_url.trim() === "" ? undefined : webhook_url
    };
    if (password.trim() !== "") {
      payload.password = password;
    }
    updateUser(payload);
  };

  useEffect(() => {
    if (error) {
      switch (error.status) {
        case 406:
          toast.error("Invalid Webhook URL!");
          break;
        case 409:
          toast.error("Name conflict with existed username, try the proposed name below.");
          setInputs((prev) => ({ ...prev, name: `${prev.name}-bot` }));
          break;
        default:
          break;
      }
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Update Bot Successfully!");
      closeModal();
    }
  }, [isSuccess, closeModal]);

  const { name, webhook_url, password } = inputs;

  return (
    <Modal id="modal-modal">
      <StyledModal
        title={t("edit_title")}
        description={t("edit_desc")}
        buttons={
          <>
            <Button className="cancel" onClick={closeModal}>
              {ct("action.cancel")}
            </Button>
            <Button disabled={!inputs.name || isLoading} onClick={handleUpdateBot}>
              {isLoading ? "Updating" : ct("action.done")}
            </Button>
          </>
        }
      >
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor={"name"} className="text-sm text-gray-500">
              Name
            </label>
            <Input
              onChange={handleInputChange}
              value={name}
              data-name={"name"}
              placeholder="Please input bot name"
              autoComplete="new-password"
              data-form-type="other"
            ></Input>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor={"password"} className="text-sm text-gray-500">
              Password
            </label>
            <Input
              onChange={handleInputChange}
              value={password}
              data-name={"password"}
              type="password"
              placeholder="Leave empty to keep current password"
              autoComplete="off"
              data-form-type="other"
            ></Input>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label htmlFor={"webhook_url"} className="text-sm text-gray-500">
              Webhook URL (Optional)
            </label>
            <Input
              onChange={handleInputChange}
              value={webhook_url}
              data-name={"webhook_url"}
              type="url"
              placeholder="Please input webhook url"
            ></Input>
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};

export default EditModal;
