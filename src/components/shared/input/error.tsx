import { CircleAlert } from "lucide-react";

type Props = {
  error?: string;
};

const Error = ({ error }: Props) =>
  error ? (
    <p className="text-[0.8rem] font-medium text-destructive text-red-500 flex gap-1 items-center">
      <CircleAlert size={14} />
      {error}
    </p>
  ) : null;

export default Error;
