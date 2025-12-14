import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import uuid from "react-native-uuid";

// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useUpdateErfMutation } from "../../redux/erfsSlice";
import { useCreateTrnMutation } from "../../redux/trnsSlice";

import { Octicons } from "@expo/vector-icons";
import { Formik } from "formik";
import DataDisplayComponent from "../../components/DataDisplayComponent";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import BarCodeScannerModal from "../../components/modals/BarCodeScannerModal";
import PageSection from "../../components/pageSection/PageSection";
import { useAuth } from "../../context/authContext";
import { capitalizeFirstLetter } from "../../utils/utilsCommon";
import { formSelectOptions, updateFormState } from "../../utils/utilsForms";

const TrnFormGrv = (props) => {
  console.log(`TrnFormGrv running----------------------`);
  const { meterData, validationSchema } = props;
  // console.log(`TrnFormGrv props`, props);
  // console.log(`TrnFormGrv meterData`, meterData);

  // console.log(`TrnFormGrv meterData`, JSON.stringify(meterData, null, 2));
  // console.log(`TrnFormGrv validationSchema`, validationSchema);
  const [setSelected] = useState("Access");
  // console.log(`TrnFormGrv selected`, selected);

  const router = useRouter();

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName } = user || {};
  // console.log(`MainLayout uid`, uid);
  // console.log(`MainLayout claims`, claims);

  const [
    createTrn,
    { isError: ctmError, isLoading: ctmIsLoading, isSuccess: ctmIsSuccess },
  ] = useCreateTrnMutation({
    uid,
    displayName,
  });
  // console.log(`ctmError`, ctmError);
  // console.log(`ctmIsLoading`, ctmIsLoading);
  // console.log(`ctmIsSuccess`, ctmIsSuccess);

  // const [updateTrn, { isLoading: utmIsLoading }] = useUpdateTrnMutation({
  //   uid,
  //   displayName,
  // });

  const [trnState, setTrnState] = useState(meterData?.metadata?.trnState);
  // console.log(`TrnFormGrv trnState`, trnState);

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
      // console.log(`values`, values);
      const trnId = uuid.v4();
      const submitData = {
        ...values,
        metadata: {
          ...values.metadata,
          trnState,
        },
      };
      // console.log(
      //   `TrnFormGrv_ Submitting form data ************************************** submitData :`,
      //   JSON.stringify(submitData, null, 2)
      // );

      // Either create a new Trn (Grv) or update an existing one

      // if (values?.metadata?.trnId) {
      //   console.log(`Updating existing Trn with id: ${values.metadata.trnId}`);
      //   // console.log(`submitData`, submitData);
      //   // Update the existing Trn
      //   const updateTrnResult = await updateTrn({
      //     displayName,
      //     uid,
      //     trnData: submitData,
      //     id: values.metadata.trnId,
      //   });
      //   console.log(`Grv - Meter updateTrnResult: `, updateTrnResult);

      //   if (updateTrnResult?.data) {
      //     // show alert  and go back
      //     router.navigate("trns");
      //     // display success notice
      //     Alert.alert(`Grv - Meter Update Success:  ${updateTrnResult?.data}`);
      //   }
      //   if (updateTrnResult?.error) {
      //     // Show Alert only (Do not reroute - ussr must decide)
      //     Alert.alert(`Grv - Meter Update Failure `, updateTrnResult.error);
      //   }
      // } else {
      console.log(`Create a new meter Grv Trn`);
      const createTrnResult = await createTrn({
        displayName,
        uid,
        trnData: {
          ...submitData,
          metadata: {
            ...submitData.metadata,
            trnId,
          },
        },
        id: trnId,
      });
      // console.log(`Grv  - New Meter createTrnResult : `, createTrnResult);

      if (createTrnResult?.data) {
        // show alert  and go back
        router.navigate("admin/stores_");
        // display success notice
        Alert.alert(
          `Grv -  New Meter Creation Success`,
          `${createTrnResult?.data}`
        );
      }
      if (createTrnResult?.error) {
        // Show Alert only (Do not reroute - ussr must decide)
        Alert.alert(`Grv- New Meter Creation Failure `, createTrnResult.error);
        // }
      }
    },
    [createTrn, trnState, meterData, ctmError, ctmIsSuccess, router]
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
        //   `TrnFormGrv_ formik.values`,
        //   JSON.stringify(formik.values, null, 2)
        // );
        // console.log(
        //   `formik.values.metadata.trnState`,
        //   formik.values.metadata.trnState
        // );
        // console.log(`formik.dirty`, formik.dirty);
        // console.log(`formik.errors`, formik.errors);

        const mn = formik.values?.ast?.astData?.astNo
          ? formik.values?.ast?.astData?.astNo
          : "Not Available";

        updateFormState(formik, setTrnState);

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
              headerRightLeft={capitalizeFirstLetter(
                formik.values.metadata.trnState
              )}
            />

            <ScrollView style={{ flex: 1 }}>
              <>
                <PageSection
                  hr="Meter Description"
                  hl=""
                  selected={"Meter Description"}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.ast?.astData?.astNo) ||
                    Boolean(formik.errors?.ast?.astData?.meter?.phase) ||
                    Boolean(formik.errors?.ast?.astData?.meter?.type) ||
                    Boolean(formik.errors?.ast?.astData?.astManufacturer) ||
                    Boolean(formik.errors?.ast?.astData?.astName)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Meter No */}
                    <FormikControl
                      control="formikInputBarCodeScanner"
                      name={`ast.astData.astNo`}
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
                      name={`ast.astData.meter.phase`}
                      label="meter phase"
                      placeHolder="Choose Phase Meter"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions.meterPhaseOptions}
                    />

                    {/* Meter Type */}
                    <FormikControl
                      control="formikSelect"
                      name={`ast.astData.meter.type`}
                      label="meter type"
                      placeHolder="Choose  Meter Type"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions.meterTypeOptions}
                    />

                    {/* Meter Manufacture / Brand */}
                    <FormikControl
                      control="formikInput"
                      name={`ast.astData.astManufacturer`}
                      label="manufacture"
                      placeHolder="Type Manufacture"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions.meterManufactureOptions}
                    />

                    {/* Product Name */}
                    <FormikControl
                      control="formikInput"
                      name={`ast.astData.astName`}
                      label="product name"
                      placeHolder="Type Product Name"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions.meterProductNameOptions}
                    />
                  </View>
                </PageSection>
              </>
            </ScrollView>

            {formik.values.metadata.trnState === "submitted" ? (
              ""
            ) : (
              <FormFooter
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
                formik={formik}
                // isLoading={ctmIsLoading || utmIsLoading}
                isLoading={ctmIsLoading}
                trnState={trnState}
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

export default TrnFormGrv;
