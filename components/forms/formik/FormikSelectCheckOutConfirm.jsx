import { Picker } from "@react-native-picker/picker";
import { Field, useFormikContext } from "formik";
import { View } from "react-native";
import FormikError from "./FormikError";
import FormikLabel from "./FormikLabel";

const FormikSelectCheckOutConfirm = (props) => {
  // console.log(`FormikSelectCheckOutConfirm`, props);
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
  const { previous } = initialValues?.ast?.astData?.astState;

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
                  onValueChange={(value, index) => {
                    // comment value will be one of ['choose','accept','reject']
                    setFieldValue(name, value);
                    console.log(`name`, name);
                    if (value === "accept" || value === "choose") {
                      // set metadata.trnType to 'checkIn'
                      setFieldValue("metadata.trnType", "checkOutConfirm");
                      validateField("metadata.trnType");

                      // set ast.astData.astState.state to 'stores'
                      setFieldValue("ast.astData.astState.state", "checkedOut");
                      validateField("ast.astData.astState.state");

                      // set ast.astData.astState.id to values?.ast.astData.astState.id
                      setFieldValue(
                        "ast.astData.astState.id",
                        initialValues?.ast?.astData?.astState?.id
                      );
                      validateField("ast.astData.astState.id");

                      // set ast.astData.astState.name to values?.ast.astData.astState.name
                      setFieldValue(
                        "ast.astData.astState.name",
                        initialValues?.ast?.astData?.astState?.name
                      );
                      validateField("ast.astData.astState.name");
                    }

                    if (value === "reject") {
                      // set metadata.trnType to 'checkIn'
                      setFieldValue("metadata.trnType", "checkIn");
                      validateField("metadata.trnType");

                      // set ast.astData.astState.state to 'stores'
                      setFieldValue(
                        "ast.astData.astState.state",
                        previous?.state
                      );
                      validateField("ast.astData.astState.state");

                      // set ast.astData.astState.id to id of the previous store id
                      setFieldValue("ast.astData.astState.id", previous?.id);
                      validateField("ast.astData.astState.id");

                      // set ast.astData.astState.name to name previous store name
                      setFieldValue(
                        "ast.astData.astState.name",
                        previous?.name
                      );
                      validateField("ast.astData.astState.name");
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

export default FormikSelectCheckOutConfirm;
