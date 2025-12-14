import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Field } from "formik";
import { TextInput, View } from "react-native";
import FormikError from "./FormikError"; // Adjust the import path as necessary

import { useState } from "react";
import BarCodeScannerModal from "../../modals/BarCodeScannerModal";
import FormikLabel from "./FormikLabel";

const FormikInputBarCodeScanner = (props) => {
  // console.log(`props @ FormikInputBarCodeScanner`, props);
  const {
    inputRef,
    label,
    name,
    placeHolder,
    icon,
    readOnly = false,
    ...rest
  } = props;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          const { handleBlur } = form;
          // console.log(`_____________________________________________________-`);
          // console.log(`FormikInputBarCodeScanner meta?`, meta?.error);
          // console.log(`touched`, touched);
          // console.log(`field`, field);
          // console.log(`meta`, meta);
          // console.log(`form?.dirty`, form?.dirty);

          return (
            <View style={{ height: 70, marginTop: 5, marginBottom: 30 }}>
              <FormikError meta={meta} form={form} fontSize={18} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 5,
                  paddingBottom: 1,
                  paddingTop: 1,
                  gap: 10,
                  borderColor: meta.error ? "red" : readOnly ? "grey" : null,
                  height: 75,
                  alignItems: "center",
                  position: "relative",
                  backgroundColor: readOnly ? "lightgrey" : "transparent",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
                >
                  {icon}
                  <TextInput
                    style={{
                      fontSize: 16,
                      gap: 20,
                      color: readOnly ? "grey" : "auto",
                    }}
                    className="flex-1 text-neutral-700"
                    placeholder={placeHolder}
                    placeholderTextColor={"lightgrey"}
                    value={field.value}
                    onBlur={handleBlur(name)}
                    // onChangeText={(value) => {
                    //   console.log(`FormikInputBarCodeScanner value`, value);
                    //   form.setFieldValue(name, value);
                    // }}
                    onChangeText={(value) => {
                      if (!readOnly) {
                        form.setFieldValue(name, value);
                      }
                    }}
                    editable={readOnly ? false : true}
                  />
                </View>

                {!readOnly && (
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    {meta?.value && (
                      <MaterialIcons
                        name="clear"
                        size={30}
                        color="black"
                        style={{
                          borderWidth: 1,
                          borderColor: "black",
                          borderRadius: 5,
                          padding: 5,
                          backgroundColor: "white",
                        }}
                        onPress={() => {
                          // Handle barcode scanning here
                          // console.log("Meter No Reset Pressed");
                          form.setFieldValue(name, "");
                        }}
                      />
                    )}

                    <AntDesign
                      name="barcode"
                      size={30}
                      color="black"
                      style={{
                        borderWidth: 1,
                        borderColor: "black",
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: "white",
                      }}
                      onPress={() => {
                        // Open barcode scanner here
                        // console.log("Open barcode scanner here");
                        setModalVisible(true);
                      }}
                    />
                  </View>
                )}
                <FormikLabel label={label} />
              </View>
              <BarCodeScannerModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                formik={form}
                name={name}
              />
            </View>
          );
        }}
      </Field>
    </>
  );
};

export default FormikInputBarCodeScanner;
