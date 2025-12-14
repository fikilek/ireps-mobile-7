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
import { formSelectOptions, updateFormState } from "../../utils/utilsForms";

const TrnFormMeterCheckOutConfirm = (props) => {
  // console.log(`TrnFormMeterCheckOutConfirm ----------------------`);
  const { meterData, validationSchema } = props;
  // console.log(`TrnFormMeterCheckOutConfirm props`, props);
  // console.log(`TrnFormMeterCheckOutConfirm meterData`, meterData);
  const currentAstState = meterData?.ast?.astData?.astState?.state;
  // console.log(`currentAstState`, currentAstState);
  // console.log(
  //   `TrnFormMeterCheckOutConfirm meterData`,
  //   JSON.stringify(meterData, null, 2)
  // );
  // console.log(`TrnFormMeterCheckOutConfirm validationSchema`, validationSchema);

  const { sps } = useSps();
  // console.log(`sps`, sps);

  const spOptions = sps?.map((sp) => {
    return {
      key: sp?.id,
      id: sp?.id,
      value: sp?.tradingName,
      label: sp?.tradingName,
    };
  });
  // console.log(`sps`, sps);

  const [setSelected] = useState("Access");
  // console.log(`TrnFormMeterCheckOutConfirm selected`, selected);

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
  // console.log(`TrnFormMeterCheckOutConfirm trnState`, trnState);

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
      // console.log(
      //   `TrnFormMeterCheckOutConfirm_ values *************** :`,
      //   JSON.stringify(values, null, 2)
      // );

      // const state =
      //   values?.ast?.astData?.astState?.comment === "accept"
      //     ? "checkedOut"
      //     : currentAstState;
      // console.log(`submit ast state`, state);

      const trnId = uuid.v4();
      const submitData = {
        ...values,
        metadata: {
          ...values.metadata,
          trnState,
        },
      };

      // console.log(
      //   `TrnFormMeterCheckOutConfirm_ Submitting data  ****************** :`,
      //   JSON.stringify(submitData, null, 2)
      // );

      // Either create a new Trn (CheckOutConfirm) or update an existing one
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
      //   // console.log(
      //   //   `CheckoutConfirm - Meter updateTrnResult: `,
      //   //   updateTrnResult
      //   // );

      //   if (updateTrnResult?.data) {
      //     // show alert  and go back
      //     router.navigate("trns");
      //     // display success notice
      //     Alert.alert(
      //       `CheckoutConfirm - CheckOut Confirm Success:  ${updateTrnResult?.data}`
      //     );
      //   }
      //   if (updateTrnResult?.error) {
      //     // Show Alert only (Do not reroute - ussr must decide)
      //     Alert.alert(
      //       `CheckoutConfirm - CheckOut Confirm Failure `,
      //       updateTrnResult.error
      //     );
      //   }
      // } else {
      console.log(`Create a new meter CheckOut Confirm Trn`);
      // Create a new Trn
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
      // console.log(
      //   `CheckoutConfirm  - New CheckOut Confirm createTrnResult : `,
      //   createTrnResult
      // );

      if (createTrnResult?.data) {
        // show alert  and go back
        router.navigate("trns");
        // display success notice
        Alert.alert(
          `CheckoutConfirm -  New CheckOut Confirm Success`,
          `${createTrnResult?.data}`
        );
      }
      if (createTrnResult?.error) {
        // Show Alert only (Do not reroute - ussr must decide)
        Alert.alert(
          `CheckoutConfirm- New CheckOut Confirm Failure `,
          createTrnResult.error
        );
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
        //   `TrnFormMeterCheckOutConfirm_ formik.values?.ast?.astData?.astState`,
        //   JSON.stringify(formik.values?.ast?.astData?.astState, null, 2)
        // );
        // console.log(
        //   `TrnFormMeterCheckOutConfirm_ formik.values?.metadata?.trnType`,
        //   JSON.stringify(formik.values?.metadata?.trnType, null, 2)
        // );
        // console.log(
        // 	`formik.values.metadata.trnState`,
        // 	formik.values.metadata.trnState
        // );
        // console.log(`formik.dirty`, formik.dirty);
        // console.log(`formik.errors`, formik.errors);

        // const mn = formik.values?.astData?.astNo
        //   ? formik.values?.astData?.astNo
        //   : "Not Available";

        updateFormState(formik, setTrnState);

        return (
          <View style={{ flex: 1 }}>
            <FormHeader
              title={"CheckOut Confirm"}
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
                    Boolean(formik.errors?.ast?.astData?.astNo)
                    // Boolean(formik.errors?.astData?.meter?.type) ||
                    // Boolean(formik.errors?.astData?.astManufacturer) ||
                    // Boolean(formik.errors?.astData?.astName)
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
                      readOnly={true}
                    />

                    {/* Media */}
                    <FormikControl
                      control="formikMediaBtn"
                      name={`astData.media.astCheckOut`}
                      label="checkout media"
                      placeHolder="CheckOut Media"
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
                    Boolean(formik.errors?.metadata?.updatedByUser) ||
                    Boolean(formik.errors?.metadata?.updatedAtDatetime) ||
                    Boolean(formik.errors?.ast?.astData?.astState?.name) ||
                    Boolean(formik.errors?.ast?.astData?.astState?.comment)
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
                      label="checked out time"
                      placeHolder="Checked Out time"
                      icon={<Octicons name="question" size={24} />}
                      readOnly={true}
                    />

                    <FormikControl
                      control="formikInput"
                      name={`ast.astData.astState.name`}
                      label="checkout to sp"
                      placeHolder="Sp Name"
                      // options={spOptions}
                      readOnly={true}
                    />

                    {/* CheckOut Confirm */}
                    <FormikControl
                      control="formikSelectCheckOutConfirm"
                      name={`ast.astData.astState.comment`}
                      label="checkout confirm"
                      placeHolder="CheckOut Confirm"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions.checkOutConfirmOptions}
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

export default TrnFormMeterCheckOutConfirm;
