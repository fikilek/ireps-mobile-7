import { Picker } from "@react-native-picker/picker";
import { Field } from "formik";
import { View } from "react-native";
import FormikError from "./FormikError";
import FormikLabel from "./FormikLabel";

const FormikSelectMeterAccess = (props) => {
  // console.log(`FormikSelectMeterAccess`, props);
  const { inputRef, label, name, placeHolder, options, icon, ...rest } = props;

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          const { handleBlur, validateField } = form;

          return (
            <View style={{ marginTop: 5 }}>
              <FormikError meta={meta} form={form} fontSize={18} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 10,
                  gap: 10,
                  borderColor: meta.error && form.dirty ? "red" : null,
                  position: "relative",
                }}
              >
                {icon}
                <Picker
                  selectedValue={field.value}
                  onValueChange={(value, index) => {
                    // console.log(`FormikSelectMeterAccess name`, name);
                    // console.log(`FormikSelectMeterAccess value`, value);
                    form.setFieldValue(name, value);
                    validateField(name);
                    // Everytime 'meterAceess' changes, noAccessReason must be reset.
                    form.setFieldValue("access.noAccessReason", "");
                    validateField("access.noAccessReason");
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#f9f9f9",
                    color: "black",
                  }}
                  onBlur={handleBlur(name)}
                >
                  {options?.map((option) => {
                    // console.log(`option`, option);
                    return (
                      <Picker.Item
                        key={option.key}
                        label={option.value}
                        value={option.value}
                      />
                    );
                  })}
                </Picker>
                <FormikLabel label={label} />
              </View>
            </View>
          );
        }}
      </Field>
    </>
  );
};

export default FormikSelectMeterAccess;
