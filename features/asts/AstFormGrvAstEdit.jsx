import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import DataDisplayComponent from "../../components/DataDisplayComponent";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import BarCodeScannerModal from "../../components/modals/BarCodeScannerModal";
import PageSection from "../../components/pageSection/PageSection";
import { useAuth } from "../../context/authContext";
import { useUpdateAstMutation } from "../../redux/astsSlice";
import { formSelectOptions } from "../../utils/utilsForms";

const AstFormGrvAstEdit = (props) => {
  // console.log(`AstFormGrvAstEdit ----------------------`);
  const { meterData, validationSchema } = props;
  // console.log(`AstFormGrvAstEdit meterData`, JSON.stringify(meterData, null, 2));
  // console.log(`AstFormGrvAstEdit validationSchema`, validationSchema);

  const router = useRouter();

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName } = user || {};
  // console.log(`MainLayout uid`, uid);

  const [updateAst, { isLoading }] = useUpdateAstMutation({
    uid,
    displayName,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const { media } = meterData || [];

  const handleHelp = (helpTopic) => {
    // console.log(`helpTopic`, helpTopic);
    Alert.alert(
      "iREPS Info",
      `This is the help info for this TOPIC: ${helpTopic}`
    );
  };

  const onSubmit = useCallback(
    async (values, actions) => {
      console.log(
        `AstFormGrvAstEdit_ Submitting form data ************************************** values :`,
        JSON.stringify(values, null, 2)
      );
      console.log(
        `Updating existing Gev Ast with id: ${values.metadata.trnId}`
      );
      const updateAstResult = await updateAst({
        displayName,
        uid,
        id: values.id,
        astData: values,
        astNo: values?.astData?.astNo,
      });
      console.log(`Grv - Meter updateAstResult: `, updateAstResult);

      if (updateAstResult?.data) {
        // show alert  and go back
        router.navigate("asts");
        // display success notice
        Alert.alert(`Grv - Meter Update Success`, `${updateAstResult?.data}`);
      }
      if (updateAstResult?.error) {
        // Show Alert only (Do not reroute - ussr must decide)
        Alert.alert(`Grv - Meter Update Failure `, updateAstResult.error);
      }
    },
    [updateAst, displayName, router, uid]
  );

  return (
    <Formik
      initialValues={meterData}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount={true}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize={true}
    >
      {(formik) => {
        // console.log(`formik ------------------------------`);
        // console.log(`formik`, formik);
        // console.log(`formik.values`, formik.values);
        // console.log(
        //   `AstFormGrvAstEdit_ formik.values`,
        //   JSON.stringify(formik.values, null, 2)
        // );
        // console.log(
        // 	`formik.values.metadata.trnState`,
        // 	formik.values.metadata.trnState
        // );
        // console.log(`formik.dirty`, formik.dirty);
        // console.log(`formik.errors`, formik.errors);

        const mn = formik.values?.astData?.astNo
          ? formik.values?.astData?.astNo
          : "Not Available";

        return (
          <View style={{ flex: 1 }}>
            <FormHeader
              title={"Grv"}
              headerRightRight={
                <DataDisplayComponent
                  // label={"Mn"}
                  data={mn ? mn : " - "}
                  borderBottomWidth={0}
                  fontSize={20}
                />
              }
            />

            <ScrollView style={{ flex: 1 }}>
              <>
                <PageSection
                  hr="Meter Description"
                  hl=""
                  selected={"Meter Description"}
                  // setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.astData?.astNo) ||
                    Boolean(formik.errors?.astData?.meter?.phase) ||
                    Boolean(formik.errors?.astData?.meter?.type) ||
                    Boolean(formik.errors?.astData?.astManufacturer) ||
                    Boolean(formik.errors?.astData?.astName)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Meter No */}
                    <FormikControl
                      control="formikInputBarCodeScanner"
                      name={`astData.astNo`}
                      label="meter no"
                      placeHolder="Meter No"
                      icon={<Octicons name="question" size={24} />}
                      setModalVisible={setModalVisible}
                    />

                    <FormikControl
                      control="formikMediaBtn"
                      name={`astData.media.astNo`}
                      label="meter no media"
                      placeHolder="Meter No Media"
                      icon={<Octicons name="question" size={24} />}
                      media={media}
                      ml1="asts"
                    />

                    {/* Meter Phase */}
                    <FormikControl
                      control="formikSelect"
                      name={`astData.meter.phase`}
                      label="meter phase"
                      placeHolder="Phase Meter"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions.meterPhaseOptions}
                    />

                    {/* Meter Type */}
                    <FormikControl
                      control="formikSelect"
                      name={`astData.meter.type`}
                      label="meter type"
                      placeHolder="Meter Type"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions.meterTypeOptions}
                    />

                    {/* Meter Manufacture / Brand */}
                    <FormikControl
                      control="formikInput"
                      name={`astData.astManufacturer`}
                      label="manufacture"
                      placeHolder="manufacture"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions.meterManufactureOptions}
                    />

                    {/* Product Name */}
                    <FormikControl
                      control="formikInput"
                      name={`astData.astName`}
                      label="product name"
                      placeHolder="Product Name"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions.meterProductNameOptions}
                    />
                  </View>
                </PageSection>
              </>
            </ScrollView>

            {formik.values?.metadata?.trnState === "submitted" ? (
              ""
            ) : (
              <FormFooter
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
                formik={formik}
                // isLoading={ctmIsLoading || utmIsLoading}
                isLoading={isLoading}
              />
            )}

            <BarCodeScannerModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              formik={formik}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default AstFormGrvAstEdit;
