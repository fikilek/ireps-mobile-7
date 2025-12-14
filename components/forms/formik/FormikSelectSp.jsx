import { Picker } from "@react-native-picker/picker";
import { Field, useFormikContext } from "formik";
import { View } from "react-native";
import FormikError from "./FormikError";
import FormikLabel from "./FormikLabel";

const FormikSelectSp = (props) => {
  // console.log(`FormikSelectSp`, props);
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
  const { initialValues } = useFormikContext();
  const { astState } = initialValues?.ast?.astData;

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
            // console.log(`FormikSelectSp name`, name);
            // console.log(`FormikSelectSp value`, value);
            // console.log(`FormikSelectSp index`, index);
            // console.log(`FormikSelectSp options`, options);

            // select Sp id
            const sp = options.find((option) => option?.value === value);
            // console.log(`FormikSelectSp sp`, sp);

            setFieldValue("ast.astData.astState.id", sp?.id);
            validateField("ast.astData.astState.id");

            const state = name === "choose" ? "" : "checkOutPending";
            setFieldValue("ast.astData.astState.state", state);
            validateField("ast.astData.astState.state");

            // console.log(`astState`, astState);
            // Save previous state
            setFieldValue("ast.astData.astState.previous", astState);
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

export default FormikSelectSp;
