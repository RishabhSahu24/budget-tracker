import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";

// Define prop types
interface ModalFailedProps {
  title: string;
  description: string;
  imageSrc?: string;
  buttonTitle?: string;
}

const ModalFailed: React.FC<ModalFailedProps> = ({
  title,
  description,
  imageSrc = "/invalid.svg",
  buttonTitle = "Okay",
}) => {
  return (
    <>
      <div className="flex flex-col items-center text-center gap-3">
        <Image src={imageSrc} alt="failed" width={68} height={68} priority />
        <DialogTitle className="font-heading text-lg leading-6">
          {title}
        </DialogTitle>
        <DialogDescription className="text-sm font-semibold text-gray-600 leading-4">
          {description}
        </DialogDescription>
      </div>

      <DialogClose asChild>
        <Button variant={"default"} fullWidth={true}>
          {buttonTitle}
        </Button>
      </DialogClose>
    </>
  );
};

export default ModalFailed;
