import { Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu";

export const CustomMenuItem = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Text style={{ fontSize: 17 }}>{text}</Text>
        {icon}
      </View>
    </MenuOption>
  );
};
