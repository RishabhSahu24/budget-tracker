import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import Loader from "@/components/Loader";

// Define prop types and defaults
interface ModalProcessingProps {
  loaderSize?: number;
  title: string;
  description: string;
}

const ModalProcessing: React.FC<ModalProcessingProps> = ({
  loaderSize = 64,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <Loader size={loaderSize} />
      <DialogTitle className="font-semibold text-lg leading-6">
        {title}
      </DialogTitle>
      <DialogDescription className="text-secondary-500 text-center">
        {description}
      </DialogDescription>
    </div>
  );
};

export default ModalProcessing;
