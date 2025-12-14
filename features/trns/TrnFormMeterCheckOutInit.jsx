import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import uuid from "react-native-uuid";

import { Octicons } from "@expo/vector-icons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useUpdateErfMutation } from "../../redux/erfsSlice";
import BarCodeScannerModal from "../../components/modals/BarCodeScannerModal";
import {
  useCreateTrnMutation,
  useUpdateTrnMutation,
} from "../../redux/trnsSlice";

import DataDisplayComponent from "../../components/DataDisplayComponent";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import PageSection from "../../components/pageSection/PageSection";
import { useAuth } from "../../context/authContext";
import { useSps } from "../../hooks/useSps";
import { capitalizeFirstLetter } from "../../utils/utilsCommon";
import { updateFormState } from "../../utils/utilsForms";

const TrnFormMeterCheckOutInit = (props) => {
  // console.log(`TrnFormMeterCheckOutInit ----------------------`);
  const { meterData, validationSchema } = props;
  // console.log(`TrnFormMeterCheckOutInit props`, props);
  // console.log(`TrnFormMeterCheckOutInit meterData`, meterData);

  // console.log(
  //   `TrnFormMeterCheckOutInit meterData`,
  //   JSON.stringify(meterData, null, 2)
  // );
  // console.log(`TrnFormMeterCheckOutInit validationSchema`, validationSchema);

  const { sps } = useSps();
  // console.log(`sps`, sps);

  const spOptions = [
    {
      key: "choose",
      id: "",
      value: "choose",
      label: "choose",
    },
  ];

  sps?.forEach((sp) => {
    spOptions.push({
      key: sp?.id,
      id: sp?.id,
      value: sp?.tradingName,
      label: sp?.tradingName,
    });
  });
  // console.log(`sps`, sps);

  const [setSelected] = useState("Access");
  // console.log(`TrnFormMeterCheckOutInit selected`, selected);

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

  const [updateTrn, { isLoading: utmIsLoading }] = useUpdateTrnMutation({
    uid,
    displayName,
  });

  const [trnState, setTrnState] = useState(meterData?.metadata?.trnState);
  // console.log(`TrnFormMeterCheckOutInit trnState`, trnState);

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
      const trnId = uuid.v4();
      // console.log(
      //   `onSubmit values  ********** :`,
      //   JSON.stringify(values, null, 2)
      // );

      // Either create a new Trn (CheckOutInit) or update an existing one
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
      //   // console.log(`CheckoutInit - Meter updateTrnResult: `, updateTrnResult);

      //   if (updateTrnResult?.data) {
      //     // show alert  and go back
      //     router.navigate("trns");
      //     // display success notice
      //     Alert.alert(
      //       `CheckoutInit - CheckOut Init Success:  ${updateTrnResult?.data}`
      //     );
      //   }
      //   if (updateTrnResult?.error) {
      //     // Show Alert only (Do not reroute - ussr must decide)
      //     Alert.alert(
      //       `CheckoutInit - CheckOut Init Failure `,
      //       updateTrnResult.error
      //     );
      //   }
      // } else {
      // console.log(`Create a new meter CheckOut Init Trn`);
      // Create a new Trn
      const createTrnResult = await createTrn({
        displayName,
        uid,
        trnData: {
          ...values,
          ast: {
            ...values?.ast,
            astData: {
              ...values?.ast?.astData,
              astState: {
                ...values?.ast?.astData?.astState,
                state: "checkOutPending",
              },
            },
          },
          metadata: {
            ...values?.metadata,
            trnId,
            trnState,
          },
        },
        id: trnId,
      });
      // console.log(
      //   `CheckoutInit  - New CheckOut Init createTrnResult : `,
      //   createTrnResult
      // );

      if (createTrnResult?.data) {
        // show alert  and go back
        router.navigate("admin/storesAstsInSpHands_");
        // display success notice
        Alert.alert(
          `CheckOut Initialised`,
          `CheckOut of Ast [${values?.ast?.astData?.astNo}] to [${values?.ast?.astData?.astState?.name}] in now Pending.`
        );
      }
      if (createTrnResult?.error) {
        // Show Alert only (Do not reroute - ussr must decide)
        Alert.alert(`CheckOut Initialisation Failure `, createTrnResult.error);
        // }
      }
      // }
    },
    [createTrn, updateTrn, trnState, router, displayName, uid]
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
        //   `TrnFormMeterCheckOutInit_ formik`,
        //   JSON.stringify(formik, null, 2)
        // );
        // console.log(
        //   `TrnFormMeterCheckOutInit_ formik?.values?.ast?.astData?.astState`,
        //   JSON.stringify(formik?.values?.ast?.astData?.astState, null, 2)
        // );
        // console.log(
        //   `formik.values.metadata.trnState`,
        //   formik.values?.metadata?.trnState
        // );
        // console.log(`formik.dirty`, formik.dirty);
        // console.log(`formik.errors`, formik.errors);

        updateFormState(formik, setTrnState);

        return (
          <View style={{ flex: 1 }}>
            {/* <FormikValuesObserver /> */}

            <FormHeader
              title={"CheckOut Init"}
              headerRightRight={
                <DataDisplayComponent
                  // label={"Mn"}
                  data={
                    formik.values?.ast?.astData?.astNo
                      ? formik.values?.ast?.astData?.astNo
                      : "Not Available"
                  }
                  borderBottomWidth={0}
                  fontSize={20}
                />
              }
              headerRightLeft={capitalizeFirstLetter(trnState)}
            />

            <ScrollView style={{ flex: 1 }}>
              <>
                <PageSection
                  hr="Meter Description"
                  hl=""
                  selected={"Meter Description"}
                  setSelected={setSelected}
                  error={
                    // Boolean(formik.errors?.access?.meterAccess) ||
                    Boolean(formik.errors?.ast?.astData?.astNo)
                    // Boolean(formik.errors?.astData?.meter?.phase) ||
                    // Boolean(formik.errors?.astData?.meter?.type) ||
                    // Boolean(formik.errors?.astData?.astManufacturer) ||
                    // Boolean(formik.errors?.astData?.astName)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* <FormikControl
                      control="formikInputAccess"
                      name={`access.meterAccess`}
                      label="meter access"
                      placeHolder="Meter Access"
                      icon={<Octicons name="question" size={24} />}
                      readOnly={true}
                    /> */}

                    {/* Meter No */}
                    <FormikControl
                      control="formikInputBarCodeScanner"
                      name={`ast.astData.astNo`}
                      label="meter no"
                      placeHolder="Meter No"
                      icon={<Octicons name="question" size={24} />}
                      setModalVisible={setModalVisible}
                      readOnly={true}
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
                  </View>
                </PageSection>

                <PageSection
                  hr="CheckOut Data"
                  hl=""
                  selected={"CheckOut Data"}
                  setSelected={setSelected}
                  error={
                    Boolean(
                      formik.errors?.ast?.astData?.metadata?.updatedByUser
                    ) ||
                    Boolean(
                      formik.errors?.ast?.astData?.metadata?.updatedAtDatetime
                    ) ||
                    Boolean(formik.errors?.ast?.astData?.astState?.name)
                    // Boolean(formik.errors?ast.astData?.meter?.astCheckOutComment)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Checked Out By User */}
                    <FormikControl
                      control="formikInput"
                      name={`metadata.updatedByUser`}
                      label="checked out by"
                      placeHolder="Checked Out By"
                      icon={<Octicons name="question" size={24} />}
                      readOnly={true}
                    />

                    {/* Checked Out Date/Time */}
                    <FormikControl
                      control="formikDatetime"
                      name={`metadata.updatedAtDatetime`}
                      label="checkout time"
                      placeHolder="Checked Out time"
                      icon={<Octicons name="question" size={24} />}
                      readOnly={true}
                    />

                    <FormikControl
                      control="formikSelectSp"
                      name={`ast.astData.astState.name`}
                      label="checkout to sp"
                      placeHolder="Sp Name"
                      options={spOptions}
                    />

                    {/* CkeckOut comment */}
                    <FormikControl
                      control="formikInput"
                      name={`ast.astData.astState.comment`}
                      label="checkout comment"
                      placeHolder="Enter Comment"
                      icon={<Octicons name="question" size={24} />}
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
                trnState={trnState}
                // isLoading={ctmIsLoading || utmIsLoading}
                isLoading={ctmIsLoading}
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

export default TrnFormMeterCheckOutInit;
