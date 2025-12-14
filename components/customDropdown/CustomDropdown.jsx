import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { DropdownList } from "./DropdownList";
import { MenuTrigger } from "./MenuTrigger";

export const CustomDropdown = (props) => {
  // console.log(`props`, props);
  const {
    options,
    onValueChange,
    placeholder,
    initialValue,
    flex = 0,
    borderWidth,
  } = props;
  // console.log(`CustomDropdown ---------------------------------`);
  // console.log(`options`, options);
  // console.log(`CustomDropdown initialValue`, initialValue);
  // console.log(`CustomDropdown data`, data);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [selectedValue, setSelectedValue] = useState(initialValue);
  // console.log(`CustomDropdown selectedValue`, selectedValue);

  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  const handleSelect = (value) => {
    console.log(`handleSelect value`, value);
    Alert.alert(" ", `"${value?.value}" selected`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("OK Pressed");
          setSelectedValue(value?.value);
          onValueChange(value);
        },
      },
    ]);
  };

  return (
    <View style={{ flex: flex }}>
      <MenuTrigger
        onPress={() => setDropdownVisible(true)}
        borderWidth={borderWidth}
      >
        <Text style={styles.selectedText}>
          {selectedValue?.label
            ? selectedValue?.label
            : placeholder || "choose"}
        </Text>
        {!isDropdownVisible ? (
          <AntDesign
            name="caret-down"
            size={20}
            color="indigo"
            // onPress={toggleView}
            // style={{ padding: 3, borderWidth: 1 }}
          />
        ) : (
          <AntDesign
            name="caretup"
            size={20}
            color="indigo"
            // onPress={toggleView}
            // style={{ padding: 3, borderWidth: 1 }}
          />
        )}
      </MenuTrigger>

      <DropdownList
        visible={isDropdownVisible}
        onClose={() => setDropdownVisible(false)}
        options={options}
        onSelect={handleSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectedText: {
    // Styling for the displayed selected value
    fontSize: 14,
  },
});
