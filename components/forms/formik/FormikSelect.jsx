import { Picker } from "@react-native-picker/picker";
import { Field } from "formik";
import { View } from "react-native";
import FormikError from "./FormikError";
import FormikLabel from "./FormikLabel";

const FormikSelect = (props) => {
  // console.log(`FormikSelect`, props);
  const {
    inputRef,
    label,
    name,
    placeHolder,
    options,
    icon,
    readOnly = false,
    ...rest
  } = props;
  // console.log(`name`, name);
  // console.log(`typeof name`, typeof name);

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`FormikSelect ----props`, props);

          const { field, form, meta } = props;
          // console.log(`FormikSelect ----field`, field);
          // console.log(`FormikSelect ----form`, form);
          // console.log(`FormikSelect ----meta`, meta);

          const { handleBlur, validateField, setFieldValue } = form;

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
                  borderColor: meta.error ? "red" : null,
                  position: "relative",
                  backgroundColor: readOnly ? "lightgrey" : "auto",
                }}
              >
                {icon}
                <Picker
                  selectedValue={field.value}
                  onValueChange={(value, index) => {
                    setFieldValue(name, value);
                    // if field name is 'propertyType.type' then clear 'propertyType.unitName' and 'propertyType.unitNo'
                    console.log(`name`, name);
                    if (name === "type") {
                      setFieldValue("unitName", "");
                      validateField("unitName");
                      setFieldValue("unitNo", "");
                      validateField("unitNo");
                    }
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

export default FormikSelect;
