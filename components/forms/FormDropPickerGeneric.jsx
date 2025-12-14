import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const FormDropPickerGeneric = (props) => {
  const {
    options,
    formik,
    name,
    setModalVisible,
    selectedItem,
    placeholder,
    searchPlaceHolder,
  } = props;
  // console.log(`FormDropPickerGeneric options?.length`, options?.length);
  // console.log(`FormDropPickerGeneric name`, name);

  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(null);
  // console.log(`FormDropPickerGeneric value`, value);

  const [items, setItems] = useState(options);
  // console.log(`FormDropPickerGeneric items`, items)

  useEffect(() => {
    // console.log(`FormDropPickerGeneric value`, value);
    const selected = options?.find((option) => option?.value === value);
    // console.log(`FormDropPickerGeneric selected astNo : `, selected);
    // console.log(
    //   `FormDropPickerGeneric selected`,
    //   JSON.stringify(selected, null, 2)
    // );
    // setActive((prev) => (prev = [selected?.item]));
    if (value) {
      setModalVisible(false);
    }
    formik.setFieldValue(name, selected?.item?.astData?.astNo);
    formik.validateField(name);

    formik.setFieldValue("ast.astData.astId", selected?.item?.astData?.astId);
    formik.validateField("ast.astData.astId");

    formik.setFieldValue(
      "ast.astData.astName",
      selected?.item?.astData?.astName
    );
    formik.validateField("ast.astData.astName");

    formik.setFieldValue(
      "ast.astData.astManufacturer",
      selected?.item?.astData?.astManufacturer
    );
    formik.validateField("ast.astData.astManufacturer");
  }, [value]);

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
      listMode="MODAL"
    />
  );
};

export default FormDropPickerGeneric;
