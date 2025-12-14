import { Field } from "formik";
import { TextInput, View } from "react-native";

import FormikError from "./FormikError"; // Adjust the import path as necessary

import { capitalizeWords } from "../../../utils/utilsCommon";
import FormikLabel from "./FormikLabel";

const FormikInput = (props) => {
  // console.log(`props @ FormikInput`, props);
  const {
    inputRef,
    label,
    name,
    placeHolder,
    icon,
    readOnly = false,
    ...rest
  } = props;

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          // console.log(`FormikInput meta`, meta);
          // console.log(`FormikInput form.dirty`, form.dirty);
          const { handleBlur } = form;
          // console.log(`_____________________________________________________-`);

          return (
            <View style={{ marginTop: 5 }}>
              <FormikError meta={meta} form={form} fontSize={16} />
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 5,
                  paddingBottom: 1,
                  paddingTop: 1,
                  gap: 10,
                  borderColor: meta.error ? "red" : null,
                  height: 75,
                  alignItems: "center",
                  position: "relative",
                  backgroundColor: readOnly ? "lightgrey" : "transparent",
                }}
              >
                {icon}
                <TextInput
                  style={{
                    fontSize: 16,
                    gap: 20,
                    color: readOnly ? "grey" : "auto",
                  }}
                  placeholder={placeHolder}
                  placeholderTextColor={"lightgrey"}
                  onChangeText={(value) => {
                    if (!readOnly) {
                      if (name === "unitNo" || name === "strNo") {
                        form.setFieldValue(
                          name,
                          value?.trim().toUpperCase().replace(/\s/g, "")
                        );
                      } else {
                        form.setFieldValue(name, capitalizeWords(value));
                      }
                    }
                  }}
                  value={field.value}
                  onBlur={handleBlur(name)}
                  editable={readOnly ? false : true}
                />
                <FormikLabel label={label} />
              </View>
            </View>
          );
        }}
      </Field>
    </>
  );
};

export default FormikInput;
