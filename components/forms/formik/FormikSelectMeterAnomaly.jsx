import { Picker } from "@react-native-picker/picker";
import { Field } from "formik";
import { View } from "react-native";
import FormikError from "./FormikError";
import FormikLabel from "./FormikLabel";
// console.log(`anomalies`, anomalies);

const FormikSelectMeterAnomaly = (props) => {
  // console.log(`FormikSelect`, props);
  const { inputRef, label, name, placeHolder, icon, options, ...rest } = props;

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          // console.log(`Field - form - meta---------------------------------`);
          // console.log(
          // 	`FormikSelectMeterAnomaly props`,
          // 	JSON.stringify(props, null, 2)
          // );
          const { errors, touched, handleBlur, validateField } = form;
          // console.log(`name`, name);
          // console.log(`errors`, errors);
          // console.log(`touched`, touched);
          // console.log(`meta`, meta);

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
                }}
              >
                {icon}
                <Picker
                  selectedValue={field.value}
                  onValueChange={(value, index) => {
                    form.setFieldValue(name, value);
                    validateField(name);
                    form.setFieldValue("ast.anomalies.anomalyDetail", "");
                    validateField("ast.anomalies.anomalyDetail");
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

export default FormikSelectMeterAnomaly;
