import { StyleSheet, TouchableOpacity } from "react-native";

export const MenuTrigger = ({ onPress, children, borderWidth = 1 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.trigger,
        { justifyContent: "space-between", borderWidth: borderWidth },
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trigger: {
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    gap: 5,
  },
});
