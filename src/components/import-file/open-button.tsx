import { Upload } from "lucide-react";
import { Button } from "../ui/button";

const OpenButton = () => {
  return (
    <Button variant="secondary" className="w-full">
      <Upload />
      Import tasks
    </Button>
  );
};

export default OpenButton;
