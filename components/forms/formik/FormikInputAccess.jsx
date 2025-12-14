import { Field } from "formik";
import { Text, TextInput, View } from "react-native";

import FormikError from "./FormikError"; // Adjust the import path as necessary

const FormikInputAccess = (props) => {
  // console.log(`props @ FormikInputAccess`, props);
  const { label, name, placeHolder, icon, readOnly = false, ...rest } = props;

  const onChangeText = (field, form) => (field, value) => {
    if (!readOnly) {
      const { dirty, isValid, values } = form;
      // console.log(`updateFormState dirty`, dirty);
      // console.log(`updateFormState isValid`, isValid);
      // console.log(
      //   `updateFormState values.metadata.trnState`,
      //   values.metadata.trnState
      // );

      const newState =
        isValid && dirty && field.name.value === "yes"
          ? "valid"
          : values?.metadata?.trnState;
      // console.log(`newState`, newState);

      form.setFieldValue("metadata.trnState", newState);
    }
  };

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          console.log(`updateFormState field`, field);

          const { handleBlur } = form;

          return (
            <View style={{ marginTop: 5, position: "relative" }}>
              <View
                style={{
                  position: readOnly ? "absolute" : "relative",
                  top: readOnly ? 1000 : 0,
                }}
              >
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
                    borderColor: meta.error && form.dirty ? "red" : null,
                    height: 75,
                    alignItems: "center",
                    position: "relative",
                    backgroundColor: readOnly ? "lightgrey" : "transparent",
                    color: readOnly ? "grey" : "auot",
                  }}
                >
                  {icon}
                  <TextInput
                    style={{
                      fontSize: 20,
                      gap: 20,
                      color: readOnly ? "grey" : "auto",
                    }}
                    className="flex-1 text-neutral-700"
                    placeholder={placeHolder}
                    onChangeText={(fiend, form) => onChangeText(field, form)}
                    value={field.value}
                    onBlur={handleBlur(name)}
                    editable={readOnly ? false : true}
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
            </View>
          );
        }}
      </Field>
    </>
  );
};

export default FormikInputAccess;
