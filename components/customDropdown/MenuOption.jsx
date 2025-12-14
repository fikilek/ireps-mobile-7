import { StyleSheet, TouchableOpacity } from "react-native";

export const MenuOption = ({ onSelect, children }) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.option}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    // Add your styling for each option here
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
