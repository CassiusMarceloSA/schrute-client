type Props = {
  label?: string;
  error?: string;
  htmlFor: string;
};

const Label = ({ label, error, htmlFor }: Props) => (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
        !!error ? "text-destructive text-red-500" : ""
      }`}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
  
  export default Label;