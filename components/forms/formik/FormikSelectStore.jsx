import { Picker } from "@react-native-picker/picker";
import { Field } from "formik";
import { View } from "react-native";
import FormikError from "./FormikError";
import FormikLabel from "./FormikLabel";

const FormikSelectStore = (props) => {
  // console.log(`FormikSelectStore`, props);
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
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          // console.log(`Field - form - meta---------------------------------`);
          const { handleBlur, validateField, setFieldValue } = form;
          // console.log(`name`, name);
          // console.log(`errors`, errors);
          // console.log(`touched`, touched);
          // console.log(`meta`, meta);

          const onValueChange = (value, index) => {
            setFieldValue(name, value);
            // console.log(`FormikSelectStore name`, name);
            // console.log(`FormikSelectStore value`, value);
            // console.log(`FormikSelectStore index`, index);
            // console.log(`FormikSelectStore options`, options);

            // select store id
            const store = options.find((option) => option?.value === value);
            // console.log(`FormikSelectStore sp`, sp);

            setFieldValue("ast.astData.astState.id", store?.id);
            validateField("ast.astData.astState.id");

            const state = name === "choose" ? "" : "stores";
            setFieldValue("ast.astData.astState.state", state);
            validateField("ast.astData.astState.state");
          };

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
                  backgroundColor: readOnly ? "lightgrey" : "auto",
                }}
              >
                {icon}
                <Picker
                  selectedValue={field.value}
                  onValueChange={onValueChange}
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

export default FormikSelectStore;
