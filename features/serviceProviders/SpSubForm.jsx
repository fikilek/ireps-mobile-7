import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { Octicons } from "@expo/vector-icons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useUpdateErfMutation } from "../../redux/erfsSlice";
import { useUpdateSpMutation } from "../../redux/spsSlice";

import DataDisplayComponent from "../../components/DataDisplayComponent";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import PageSection from "../../components/pageSection/PageSection";
import { useAuth } from "../../context/authContext";

const SpSubform = (props) => {
  // console.log(`SpSubform ----------------------`);
  const { formData, id, sps } = props;
  // console.log(`SpSubform formData`, JSON.stringify(formData, null, 2));

  // console.log(`SpSubform props`, props);
  // console.log(`SpSubform (sp data) formData`, formData);
  // console.log(`SpSubform validationSchema`, validationSchema);

  const [selected, setSelected] = useState("");
  // console.log(`TrnFormMeterAudit selected`, selected);

  const router = useRouter();

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName, spId } = user || {};
  // console.log(`MainLayout uid`, uid);
  // console.log(`MainLayout claims`, claims);

  const [updateSp, { isError, isLoading, isSuccess }] = useUpdateSpMutation({
    uid,
    displayName,
  });

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

      // console.log(`Updating existing Sp with id: ${values.metadata.id}`);
      const updateTrnResult = await updateSp({
        displayName,
        uid,
        spData: values,
        id: id,
      });
      // console.log(
      // 	`updateTrnResult for erf [${formData?.erf?.erfNo}] : `,
      // 	updateTrnResult
      // );

      if (updateTrnResult?.data) {
        // show alert  and go back
        router.navigate("admin/sps_");
        // display success notice
        Alert.alert(updateTrnResult?.data);
      }
      if (updateTrnResult?.error) {
        // Show Alert only (Do not reroute - user must decide)
        Alert.alert(updateTrnResult.error);
      }
    },
    [updateSp, router, displayName, uid]
  );

  // console.log(`formData?.spName`, formData?.spName);
  return (
    <Formik
      initialValues={formData}
      onSubmit={onSubmit}
      validateOnMount={true}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize={true}
    >
      {(formik) => {
        // console.log(`formik ------------------------------`);
        // console.log(`formik?.values`, formik?.values);
        // console.log(`formik?.values`, JSON.stringify(formik?.values, null, 2));

        // console.log(`formik.dirty`, formik.dirty);
        // console.log(`formik.errors`, formik.errors);

        return (
          <View style={{ flex: 1 }}>
            <FormHeader
              title={"Sp Subcontractor Form"}
              headerRightRight={
                <DataDisplayComponent
                  label={"Serv/Prov"}
                  data={formData?.length}
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
                {/* Sp Identity Details */}
                <PageSection
                  hr={`${formData?.tradingName} sub contractor(s)`}
                  hl=""
                  selected={`${formData?.tradingName} sub contractor(s)`}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.registeredName) ||
                    Boolean(formik.errors?.registeredId) ||
                    Boolean(formik.errors?.tradingName)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Sp Registered Name */}
                    <FormikControl
                      control="formikFieldArray"
                      name={"subContractors"}
                      label="subcontractors"
                      placeHolder="Subcontractors"
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
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default SpSubform;
