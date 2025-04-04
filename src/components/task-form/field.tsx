import { Input } from "../shared";

type Props = {
  label: string;
  name: string;
  error?: string;
  asTextArea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Field = ({ label, error, ...props }: Props) => {
  return (
    <Input.Wrapper>
      <Input.Label label={label} htmlFor={props.name} />
      <Input.Container>
        <Input.Field {...props} />
      </Input.Container>
      <Input.Error error={error} />
    </Input.Wrapper>
  );
};

export default Field;
