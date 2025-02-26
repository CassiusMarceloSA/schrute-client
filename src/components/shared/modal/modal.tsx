import { Button } from "@/components/ui/button";
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

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onConfirmText: string;
  onConfirm: () => void;
  onCancelText: string;
};

export function Modal(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{props.buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.children}
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              {props.onCancelText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={props.onConfirm}>
              {props.onConfirmText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
