import { Picker } from "@react-native-picker/picker";
import { Field } from "formik";
import { View } from "react-native";
import FormikError from "./FormikError";
import FormikLabel from "./FormikLabel";

const FormikSelectScStatus = (props) => {
  // console.log(`FormikSelectScStatus`, props);
  const { inputRef, label, name, placeHolder, options, icon, ...rest } = props;

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          // console.log(`Field - form - meta---------------------------------`);
          const { handleBlur, validateField, values } = form;
          // console.log(
          //   `FormikSelectScStatus values`,
          //   JSON.stringify(values, null, 2)
          // );
          // console.log(`values`, values);
          const { ast } = values || {};
          const { erf } = ast || {};
          const { erfNo, address } = erf || {};
          // console.log(`erfNo`, erfNo);
          const { lmMetro } = address || {};
          // console.log(`lmMetro`, lmMetro);

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
                    // console.log(`Sc Status Changed`);
                    // console.log(`FormikSelectScStatus name`, name);
                    // console.log(`FormikSelectScStatus value`, value);
                    form.setFieldValue(name, value);
                    validateField(name);
                    // Everytime 'meterAceess' changes, noAccessReason must be reset.
                    form.setFieldValue("ast.serviceConnection.comment", "");
                    validateField("ast.serviceConnection.comment");
                    if (value === "Connected") {
                      // set state to the 'field' and validate
                      form.setFieldValue("ast.astData.astState.state", "field");
                      validateField("ast.astData.astState.state");
                      // set name to the 'LM' name and validate
                      form.setFieldValue("ast.astData.astState.name", lmMetro);
                      validateField("ast.astData.astState.name");
                      // set id to the erfNo and validate
                      form.setFieldValue("ast.astData.astState.id", erfNo);
                      validateField("ast.astData.astState.id");
                    }
                    if (
                      value === "No Service Connection" ||
                      value === "Incomplete Service Point" ||
                      value === "choose"
                    ) {
                      // set state to the 'field' and validate
                      form.setFieldValue("ast.astData.astState.state", "");
                      validateField("ast.astData.astState.state");
                      // set name to the 'LM' name and validate
                      form.setFieldValue("ast.astData.astState.name", "");
                      validateField("ast.astData.astState.name");
                      // set id to the erfNo and validate
                      form.setFieldValue("ast.astData.astState.id", "");
                      validateField("ast.astData.astState.id");
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

export default FormikSelectScStatus;
