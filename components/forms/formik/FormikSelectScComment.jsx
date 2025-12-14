import { Picker } from "@react-native-picker/picker";
import { Field } from "formik";
import { Text, View } from "react-native";
import FormikError from "./FormikError";

const FormikSelectScComment = (props) => {
  // console.log(`FormikSelectScComment`);
  const { inputRef, label, name, placeHolder, options, icon, ...rest } = props;

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props Field`, props);
          const { field, form, meta } = props;
          // console.log(`Field - form - meta---------------------------------`);
          // console.log(
          // 	`FormikSelectScComment props`,
          // 	JSON.stringify(props, null, 2)
          // );
          const { handleBlur, values, validateField } = form;
          // console.log(`name`, name);
          // console.log(`errors`, errors);
          // console.log(`touched`, touched);
          // console.log(`meta`, meta);
          // console.log(`values`, values);
          const sc = values?.ast?.serviceConnection?.status;
          // console.log(`sc --------------------------`, sc);
          // console.log(
          //   `typeof options --------------------------`,
          //   typeof options
          // );
          // console.log(
          //   `FormikSelectScComment options`,
          //   JSON.stringify(options, null, 2)
          // );
          const scOptions = options?.find((item) => item.key === sc)?.["value"];
          // console.log(`scOptions`, scOptions);
          // setScOptions((prev) => {
          // 	return [...prev, ...options];
          // });

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
                    // console.log(`FormikSelectScComment name`, name);
                    // console.log(`FormikSelectScComment value`, value);
                    form.setFieldValue(name, value);
                    validateField(name);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#f9f9f9",
                    color: "black",
                  }}
                  onBlur={handleBlur(name)}
                >
                  {scOptions?.map((option) => {
                    return (
                      <Picker.Item
                        key={option.key}
                        label={option.value}
                        value={option.value}
                      />
                    );
                  })}
                </Picker>
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

export default FormikSelectScComment;
