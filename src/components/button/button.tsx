type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

function Button(props: Props) {
  return <button {...props} />;
}

export default Button;
