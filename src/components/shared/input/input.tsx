import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  asTextArea?: boolean;
  rows?: number;
  ref?: React.RefObject<HTMLInputElement | null>;
};

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col justify-center items-start gap-1">
    {children}
  </div>
);

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const baseClasses =
    "flex items-center gap-2 min-h-9 text-neutral-50 w-full rounded-md border border-neutral-700  bg-transparent px-3 py-1 text-base shadow-sm transition-colors";

  return <div className={cn(baseClasses, className)}>{children}</div>;
};

export const Field = ({
  name,
  className,
  asTextArea,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & Props) => {
  const commonClasses =
    "w-full outline-0 placeholder:text-neutral-500 placeholder:text-sm bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";

  if (asTextArea) {
    const textAreaProps =
      props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    const textAreaClasses = "resize-none scrollbar-hide";
    return (
      <textarea
        className={cn(commonClasses, textAreaClasses, className)}
        id={name}
        name={name}
        rows={3}
        {...textAreaProps}
      />
    );
  }

  return (
    <input
      className={cn(commonClasses, className)}
      id={name}
      name={name}
      {...props}
    />
  );
};
