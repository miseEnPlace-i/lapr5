import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import TextArea from "../TextArea";
import { useListDeviceModule } from "./module";

const ListDevices: React.FC = () => {
  const navigate = useNavigate();
  const {
    devices,
    codeInputRef,
    handleSave,
    modelCodeInputRef,
    nicknameInputRef,
    descriptionInputRef,
    serialNumberInputRef,
  } = useListDeviceModule();

  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);

  async function handleSaveClick() {
    try {
      await handleSave();

      swal("Success", "Devices saved successfully", "success");
      setIsDeviceModalVisible(false);
    } catch (err: unknown) {
      console.error(err);
      swal(
        "Error",
        "An error occurred. Check the console for details.",
        "error"
      );
    }
  }

  const ANIMATION_DELAY = 0.1;

  console.log(devices);

  return (
    <div className="mr-12 mt-8 flex flex-col justify-between gap-y-6 text-left text-lg">
      {devices.map((device, i) => (
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: ANIMATION_DELAY * i }}
          key={device.code}
          onClick={() => navigate(`/devices/robots/${device.code}`)}
          className="flex w-full items-center gap-x-10 bg-slate-200 px-12 py-8"
        >
          <h2 className="text-6xl font-bold">{device.code}</h2>
          <div className="flex flex-col">
            <h3 className="text-left text-2xl font-bold">{device.modelCode}</h3>
            <div className="text-left text-sm text-slate-600">
              {device.nickname}
              {device.serialNumber && (
                <span>&nbsp;&middot; {device.serialNumber}</span>
              )}
            </div>
          </div>
        </motion.button>
      ))}
      <motion.button
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: devices.length * ANIMATION_DELAY,
        }}
        onClick={() => setIsDeviceModalVisible(true)}
        className="flex w-full items-center justify-center bg-secondary px-12 py-4 text-center text-5xl font-bold"
      >
        +
      </motion.button>

      <Modal
        setIsVisible={setIsDeviceModalVisible}
        isVisible={isDeviceModalVisible}
        title="Create Building"
      >
        <div className="flex h-full flex-col justify-between gap-y-4">
          <div className="flex w-full flex-col gap-y-4">
            <Input
              className="w-full"
              placeholder="Code"
              inputRef={codeInputRef}
            />
            <Input
              className="w-full"
              placeholder="Model Code"
              inputRef={modelCodeInputRef}
            />
            <Input
              className="w-full"
              placeholder="Nickname"
              inputRef={nicknameInputRef}
            />
            <Input
              className="w-full"
              placeholder="Serial Number"
              inputRef={serialNumberInputRef}
            />
            <TextArea
              className="w-full"
              placeholder="Description"
              inputRef={descriptionInputRef}
            />
          </div>
          <Button name="save" onClick={handleSaveClick} type="confirm">
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ListDevices;