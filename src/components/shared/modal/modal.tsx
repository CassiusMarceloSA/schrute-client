import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  title: string;
  description: React.ReactNode;
  buttonContent?: React.ReactNode;
  open: boolean;
  updateOpen: (open: boolean) => void;
  className?: string;
};

export function Modal(props: Props) {
  const ButtonContent = props.buttonContent;
  return (
    <Dialog onOpenChange={props.updateOpen} open={props.open}>
      {ButtonContent && <DialogTrigger asChild>{ButtonContent}</DialogTrigger>}
      <DialogContent
        className={cn(
          "sm:max-w-md text-neutral-300 bg-neutral-800 border-neutral-700",
          props.className
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-neutral-300">{props.title}</DialogTitle>
          <DialogDescription className="text-neutral-400">
            {props.description}
          </DialogDescription>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}

export { DialogClose, DialogFooter };
