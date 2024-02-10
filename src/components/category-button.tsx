import { clsx } from "clsx";
import { Text, Pressable, PressableProps } from "react-native";

type Props = PressableProps & {
  title: string;
  isSelected?: boolean;
};

export function CategoryButton({ title, isSelected, ...rest }: Props) {
  return (
    <Pressable
      className={clsx(
        "bg-slate-800 px-4 justify-center rounded-md h-10 border-2",
        isSelected ? "border-lime-300" : "border-slate-800"
      )}
      {...rest}
    >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  );
}
