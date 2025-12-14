import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const FormDropDownPicker = (props) => {
  const {
    options,
    setActive,
    setActiveName,
    dataRef,
    hasMoreRef,
    setPage,
    pageRef,
    selectedItem,
    placeholder,
    searchPlaceHolder,
  } = props;
  // console.log(`FormDropDownPicker options`, options);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(options);

  useEffect(() => {
    // console.log(`FormDropDownPicker value`, value);
    const selected = options?.find((option) => option?.value === value);
    // console.log(`FormDropDownPicker selected`, selected?.erf);

    dataRef.current = [];
    hasMoreRef.current = true;
    setPage((prev) => (prev = 1));
    pageRef.current = 1;

    setActive((prev) => (prev = [selected?.item]));
    setActiveName((prev) => (prev = selectedItem));
  }, [
    value,
    options,
    setActive,
    setActiveName,
    dataRef,
    hasMoreRef,
    pageRef,
    setPage,
    selectedItem,
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      searchable={true}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceHolder}
    />
  );
};

export default FormDropDownPicker;
