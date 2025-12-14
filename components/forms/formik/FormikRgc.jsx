import { Field } from "formik";
import { Text, TextInput, View } from "react-native";
import FormikError from "./FormikError"; // Adjust the import path as necessary

import { capitalizeWords } from "../../../utils/utilsCommon";

const FormikRgc = (props) => {
  // console.log(`props @ FormikRgc`, props);
  const { inputRef, label, name, placeHolder, icon, ...rest } = props;

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          const { handleBlur } = form;
          // console.log(`_____________________________________________________-`);

          return (
            <View style={{ height: 70, marginTop: 5, marginBottom: 30 }}>
              <FormikError meta={meta} form={form} fontSize={18} />
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 5,
                  paddingBottom: 1,
                  paddingTop: 1,
                  gap: 10,
                  borderColor: meta.error && form.dirty ? "red" : null,
                  height: 75,
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {icon}
                {/* TODO: Inset Reverse Geocoding Component */}
                <TextInput
                  style={{ fontSize: 20, gap: 20 }}
                  className="flex-1 text-neutral-700"
                  placeholder={placeHolder}
                  onChangeText={(value) => {
                    if (name === "unitNo" || name === "strNo") {
                      form.setFieldValue(
                        name,
                        value?.trim().toUpperCase().replace(/\s/g, "")
                      );
                    } else {
                      form.setFieldValue(name, capitalizeWords(value));
                    }
                  }}
                  value={field.value}
                  onBlur={handleBlur(name)}
                />
                <Text
                  style={{
                    position: "absolute",
                    top: -15,
                    right: 10,
                    backgroundColor: "yellow",
                    paddingHorizontal: 5,
                    fontSize: 20,
                    padding: 2,
                    borderRadius: 5,
                  }}
                >
                  {label}
                </Text>
              </View>
            </View>
          );
        }}
      </Field>
    </>
  );
};

export default FormikRgc;
