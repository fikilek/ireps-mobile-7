import { Field } from "formik";
import { Alert, Text, TextInput, View } from "react-native";

import FormikError from "./FormikError"; // Adjust the import path as necessary

import { getFunctions, httpsCallable } from "firebase/functions";
import { isThereConnectivity } from "../../../utils/utilsConnectivity";

const FormikInputEmail = (props) => {
  // console.log(`props @ FormikInputEmail`, props);
  const { inputRef, label, name, placeHolder, icon, ...rest } = props;

  // This call back method is meant ot make sure that there is no duplicate email in iREPS
  const onChangeText = async (value, form) => {
    console.log(`New email`, value);
    // Check if there is network. This method must not proceed if there is not network

    if (!isThereConnectivity) {
      Alert.alert("No Network Connectivity");
      return;
    }

    // At this point, there is NETWORK CONNECTIVITY, check if the email is NOT in use already

    const functions = getFunctions();
    const checkEmailAvailability = httpsCallable(
      functions,
      "checkEmailAvailability"
    );
    const isEmailAvailale = await checkEmailAvailability(value);
    console.log(`isEmailAvailale`, isEmailAvailale);

    if (!isEmailAvailale) {
      // Email is NOT available
      Alert.alert(`Email "${value}" already in use`, `Try another one`);
      return;
    }
    // trim email, make all characters lower case and remove empty spaces
    form.setFieldValue(name, value?.trim().toLowerCase().replace(/\s/g, ""));
  };

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          const { handleBlur } = form;
          // console.log(`_____________________________________________________-`);

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
                }}
              >
                {icon}
                <TextInput
                  style={{ fontSize: 20, gap: 20 }}
                  className="flex-1 text-neutral-700"
                  placeholder={placeHolder}
                  onChangeText={(value) => onChangeText(value, form)}
                  value={field.value}
                  onBlur={handleBlur(name)}
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

export default FormikInputEmail;
