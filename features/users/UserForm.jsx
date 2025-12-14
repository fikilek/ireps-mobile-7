import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { Octicons } from "@expo/vector-icons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useUpdateErfMutation } from "../../redux/erfsSlice";
import { useUpdateUserMutation } from "../../redux/usersSlice";

import DataDiuserlayComponent from "../../components/DataDisplayComponent";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import PageSection from "../../components/pageSection/PageSection";
import { useAuth } from "../../context/authContext";

const UserForm = (props) => {
  // console.log(`UserForm ----------------------`);
  const { formData, validationSchema } = props;
  // console.log(`UserForm formData`, JSON.stringify(formData, null, 2));

  // console.log(`UserForm props`, props);
  // console.log(`UserForm formData`, formData);
  // console.log(`UserForm validationSchema`, validationSchema);

  const [selected, setSelected] = useState("");
  // console.log(`TrnFormMeterAudit selected`, selected);

  const router = useRouter();

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName } = user || {};
  // console.log(`MainLayout uid`, uid);
  // console.log(`MainLayout claims`, claims);

  const [updateUser, { isError, isLoading, isSuccess }] = useUpdateUserMutation(
    {
      uid,
      displayName,
    }
  );

  // const [trnState, setTrnState] = useState(formData?.metadata?.trnState);
  // console.log(`trnState ----`, trnState);

  const handleHelp = (helpTopic) => {
    // console.log(`helpTopic`, helpTopic);
    Alert.alert(
      "iREPS Info",
      `This is the help info for this TOPIC: ${helpTopic}`
    );
  };

  const onSubmit = useCallback(
    async (values, actions) => {
      // console.log(`onSubmit values`, JSON.stringify(values, null, 2));

      // console.log(`Updating existing User with id: ${uid}`);
      const updateTrnResult = await updateUser({
        displayName,
        uid,
        userData: values,
        id: uid,
      });
      // console.log(
      // 	`updateTrnResult for erf [${formData?.erf?.erfNo}] : `,
      // 	updateTrnResult
      // );

      if (updateTrnResult?.data) {
        // show alert  and go back
        router.navigate("admin/users_");
        // diuserlay success notice
        Alert.alert(updateTrnResult?.data);
      }
      if (updateTrnResult?.error) {
        // Show Alert only (Do not reroute - user must decide)
        Alert.alert(updateTrnResult.error);
      }
    },
    [updateUser, router, displayName, uid]
  );

  // console.log(`formData?.userName`, formData?.userName);
  return (
    <Formik
      initialValues={formData}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount={true}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize={true}
    >
      {(formik) => {
        // console.log(`formik ------------------------------`);
        // console.log(`formik?.values`, formik?.values);
        // console.log(`formik?.values`, JSON.stringify(formik?.values, null, 2));

        console.log(`formik.dirty`, formik.dirty);
        console.log(`formik.errors`, formik.errors);

        return (
          <View style={{ flex: 1 }}>
            <FormHeader
              title={"User Form"}
              headerRightRight={
                <DataDiuserlayComponent
                  label={""}
                  data={""}
                  borderBottomWidth={0}
                  fontSize={18}
                />
              }
            />

            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  // gap: 10,
                  // margin: 20,
                }}
              >
                <PageSection
                  hr="User Details"
                  hl=""
                  selected={"User Details"}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.surname) ||
                    Boolean(formik.errors?.name) ||
                    Boolean(formik.errors?.email) ||
                    Boolean(formik.errors?.phoneNumber)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* User Registered Name */}
                    <FormikControl
                      control="formikInput"
                      name={"surname"}
                      label="surname"
                      placeHolder="Surname"
                      icon={<Octicons name="question" size={27} />}
                    />
                    <FormikControl
                      control="formikInput"
                      name={"name"}
                      label="name"
                      placeHolder="Name"
                      icon={<Octicons name="question" size={27} />}
                    />
                    {/* User Registered Id */}
                    <FormikControl
                      control="formikInputEmail"
                      name={"email"}
                      label="emaild"
                      placeHolder="Email"
                      icon={<Octicons name="question" size={27} />}
                    />
                    {/* User Trading Name */}
                    <FormikControl
                      control="formikInput"
                      name={"phoneNumber"}
                      label="phone number"
                      placeHolder="Phone Number"
                      icon={<Octicons name="question" size={27} />}
                    />
                  </View>
                </PageSection>
              </View>
            </ScrollView>

            <FormFooter
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
              formik={formik}
              isLoading={isLoading}
              trnState={true}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default UserForm;
