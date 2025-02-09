import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Image } from "@heroui/react";
interface CustomLoaderProps {
  isLoading: boolean;
}

const CustomLoader = ({ isLoading }: CustomLoaderProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, []);
  return (
    <div>
      {isLoading && (
        <Modal
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="flex justify-center items-center p-10">
                  <Image
                    src={"/loader.gif"}
                    alt={"loader"}
                    className="w-[200px] h-[200px]"
                    width={500}
                    height={300}
                  />
                  <h2 className="text-2xl font-bold text-primary text-center">
                    Please Wait... <br />
                    Story Generating...
                  </h2>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default CustomLoader;
