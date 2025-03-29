import { CircleAlert } from "lucide-react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
  error?: string;
};

function Textarea({ label, error, rows = 3, ...props }: Props) {
  return (
    <div className="flex flex-col justify-center items-start gap-1">
      <label
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 resize-y ${
          !!error ? "text-destructive text-red-500" : ""
        }`}
        htmlFor={props.name}
      >
        {label}
      </label>
      <textarea
        className="flex min-h-[80px] text-neutral-50 w-full rounded-md border border-neutral-700 placeholder:text-neutral-500 placeholder:text-sm bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        id={props.name}
        rows={rows}
        {...props}
      />
      {error && (
        <p className="text-[0.8rem] font-medium text-destructive text-red-500 flex gap-1 items-center">
          <CircleAlert size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

export default Textarea;
