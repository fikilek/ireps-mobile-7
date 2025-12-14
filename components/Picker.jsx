import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const Picker = (props) => {
  const { title, initItems, astData, setAstData } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(initItems);

  const setAstValue = (value) => {
    if (value) {
      setValue(value);
      if (value === "type" || value === "phase") {
        // update type or phase
        setAstData({
          ...astData,
          meter: {
            ...astData.meter,
            [title]: value,
          },
        });
      } else {
        //update astManufacturer or astName
        setAstData({
          ...astData,
          [title]: value,
        });
      }
    }
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setAstValue}
      setItems={setItems}
    />
  );
};

export default Picker;
