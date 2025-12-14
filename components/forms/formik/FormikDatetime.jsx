import { Field } from "formik";
import { Text, TextInput, View } from "react-native";

import FormikError from "./FormikError"; // Adjust the import path as necessary

import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

const FormikDatetime = (props) => {
  // console.log(`props @ FormikDatetime`, props);
  const { label, name, placeHolder, icon, readOnly = false, ...rest } = props;

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          const { handleBlur } = form;
          // console.log(`FormikDatetime ----field?.value`, field?.value);
          if (!field?.value) return;

          const timestamp = new Timestamp(
            field.value?.seconds,
            field.value?.nanoseconds
          );
          // console.log(`FormikDatetime ----timestamp`, timestamp);

          const newDate = timestamp?.toDate();
          if (!newDate) return;

          const datetime = format(newDate, "yyyy MMM dd");
          if (!datetime) return;

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
                  borderColor: meta.error && form.dirty ? "red" : null,
                  height: 75,
                  alignItems: "center",
                  position: "relative",
                  backgroundColor: readOnly ? "lightgrey" : "auto",
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
                  value={datetime}
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
          );
        }}
      </Field>
    </>
  );
};

export default FormikDatetime;
