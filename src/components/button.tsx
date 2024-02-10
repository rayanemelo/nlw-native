import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = {
  children: ReactNode;
};

function Button({ children, ...rest }: Props & TouchableOpacityProps) {
  return (
    <TouchableOpacity
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children }: Props) {
  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
}

function ButtonIcon({ children }: Props) {
  return children;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export {Button} 