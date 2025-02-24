type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  error?: string;
};

function Input({ label, error, ...props }: Props) {
  return (
    <div className="flex flex-col justify-start items-center gap-2">
      <label htmlFor={props.name}>{label}</label>
      <input className="border-zinc-600 p-3" {...props} />
      {error && <p>{error}</p>}
    </div>
  );
}

export default Input;
