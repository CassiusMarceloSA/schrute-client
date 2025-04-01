import { Button as LibButton, ButtonProps } from "@/components/ui/button";

function Button(props: ButtonProps) {
  return <LibButton {...props} type={props.type || "button"} />;
}

export default Button;
