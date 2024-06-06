import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FC, useState } from "react";

// Define the props for the ImageDialog component
interface ImageDialogProps {
  imageUrl: string;
  imageAlt?: string;
  open: boolean;
  onClose: () => void;
}

// ImageDialog component with TypeScript
export const ImageDialog: FC<ImageDialogProps> = ({
  imageUrl,
  imageAlt,
  open,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((prevZoom) => prevZoom + 0.1);
  const handleZoomOut = () => setZoom((prevZoom) => prevZoom - 0.1);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageAlt || "downloaded-image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog size="xl" open={open} handler={onClose}>
      <DialogBody>
        <div className="relative flex justify-center items-center h-full overflow-auto">
          <img
            src={imageUrl}
            alt={imageAlt}
            style={{
              transform: `scale(${zoom})`,
              transition: "transform 0.3s",
            }}
            className="max-w-full max-h-full"
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          <span>Fechar</span>
        </Button>
        <Button
          variant="text"
          color="blue"
          onClick={handleZoomIn}
          className="mr-1"
        >
          <span>Ampliar</span>
        </Button>
        <Button
          variant="text"
          color="blue"
          onClick={handleZoomOut}
          className="mr-1"
        >
          <span>Diminuir</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleDownload}>
          <span>Baixar</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
