import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MenuOption } from "./MenuOption"; // Assuming MenuOption is in the same directory

export const DropdownList = ({ visible, onClose, options, onSelect }) => {
  const renderItem = ({ item }) => (
    <MenuOption
      onSelect={() => {
        onSelect(item);
        onClose();
      }}
    >
      <Text>{item.label}</Text>
    </MenuOption>
  );

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.dropdownContainer}>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item, index) => index?.toString()}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Dim background
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    maxHeight: 200, // Example max height
    width: "80%", // Example width
    // Add positioning styles if needed (e.g., top, left)
  },
});
