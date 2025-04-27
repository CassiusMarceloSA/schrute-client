import { cn } from "@/lib/utils";
import { Trash, Upload } from "lucide-react";
import { Button } from "../shared";
import { Input } from "../ui/input";

type Props = {
  file: File | null;
  handleFile: (file: File | null) => void;
  handleImport: (file: File) => void;
  isImporting: boolean;
};

const FileInput = ({ file, handleFile, handleImport, isImporting }: Props) => {
  return (
    <>
      {!!file ? (
        <div className="flex flex-col items-center w-full h-fit justify-center gap-3">
          <div className="flex items-center w-full h-fit justify-center">
            <p className="text-sm w-full text-center text-neutral-500 border-2 h-10 border-neutral-700 rounded-md p-2 rounded-tr-none rounded-br-none">
              {file.name}
            </p>
            <button
              disabled={isImporting}
              type="button"
              onClick={() => handleFile(null)}
              className={cn(
                "flex h-10 items-center cursor-pointer justify-center gap-2 p-2 rounded-md border-2 border-neutral-700 rounded-tl-none rounded-bl-none transition-all duration-300 hover:bg-red-700/10 hover:border-red-500 hover:text-red-500",
                isImporting &&
                  "opacity-50 cursor-not-allowed pointer-events-none"
              )}
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => handleImport(file)}
            disabled={isImporting}
          >
            {isImporting ? "Importing..." : "Confirm import"}
          </Button>
        </div>
      ) : (
        <label
          className={cn(
            "w-full text-purple-500 cursor-pointer flex items-center justify-center gap-2 h-fit p-8 border-2 border-dashed border-neutral-700 rounded-md  transition-all duration-300 hover:bg-purple-700/10 hover:border-purple-500"
          )}
        >
          <Input
            type="file"
            className="hidden"
            id="file-input"
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
          <Upload />
          Upload file
        </label>
      )}
    </>
  );
};

export default FileInput;
