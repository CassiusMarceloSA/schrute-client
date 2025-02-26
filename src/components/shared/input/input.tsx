import { CircleAlert } from "lucide-react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  error?: string;
};

function Input({ label, error, ...props }: Props) {
  return (
    <div className="flex flex-col justify-center items-start gap-1">
      <label
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          !!error ? "text-destructive text-red-500" : ""
        }`}
        htmlFor={props.name}
      >
        {label}
      </label>
      <input
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        id={props.name}
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

export default Input;
