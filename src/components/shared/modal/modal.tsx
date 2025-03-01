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
  open: boolean;
  updateOpen: (open: boolean) => void;
};

export function Modal(props: Props) {
  return (
    <Dialog onOpenChange={props.updateOpen} open={props.open}>
      <DialogTrigger asChild>
        <Button variant="outline">{props.buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}

export { DialogClose , DialogFooter };