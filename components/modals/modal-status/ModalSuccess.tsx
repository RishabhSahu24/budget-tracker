import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";

// Define prop types
interface ModalSuccessProps {
  title: string;
  description: string;
  imageSrc?: string;
  buttonTitle?: string;
  onClick?: any;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({
  title,
  description,
  imageSrc = "/success.svg",
  buttonTitle = "Okay",
  onClick,
}) => {
  return (
    <>
      <div className="flex flex-col items-center text-center gap-3">
        <Image src={imageSrc} alt="success" width={68} height={68} priority />
        <DialogTitle className="font-heading text-lg leading-6">
          {title}
        </DialogTitle>
        <DialogDescription className="text-sm font-semibold text-gray-600 leading-4">
          {description}
        </DialogDescription>
      </div>

      <DialogClose>
        <Button variant={"default"} fullWidth={true} onClick={onClick}>
          {buttonTitle}
        </Button>
      </DialogClose>
    </>
  );
};

export default ModalSuccess;
