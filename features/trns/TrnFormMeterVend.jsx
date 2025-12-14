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
import { useGetUserByIdQuery } from "../../redux/usersSlice";
import { capitalizeFirstLetter } from "../../utils/utilsCommon";
import { formSelectOptions, updateFormState } from "../../utils/utilsForms";

const TrnFormMeterVend = (props) => {
  console.log(`TrnFormMeterVend ----------------------`);
  const { meterData, validationSchema } = props;
  // console.log(`TrnFormMeterVend props`, props);
  // console.log(`TrnFormMeterVend meterData`, meterData);

  // console.log(
  //   `TrnFormMeterVend meterData`,
  //   JSON.stringify(meterData, null, 2)
  // );
  // console.log(`TrnFormMeterVend validationSchema`, validationSchema);

  const { sps } = useSps();
  // console.log(`sps`, sps);

  const [setSelected] = useState("Access");
  // console.log(`TrnFormMeterVend selected`, selected);

  const router = useRouter();

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName } = user || {};
  // console.log(`MainLayout uid`, uid);
  // console.log(`MainLayout claims`, claims);

  // Get user data from users collectin. From this data we will need user sp data. All users belong to a sp.
  const { data } = useGetUserByIdQuery(uid);
  // console.log(`data`, data);

  const {
    serviceProvider: { id: userSpId, name: userSpName },
  } = data || {};

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
  // console.log(`TrnFormMeterVend trnState`, trnState);

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
        router.navigate("asts");
        // display success notice
        Alert.alert(
          `Vending Succesfull`,
          `Meter Number: ${values?.ast?.astData?.astNo} - R${values?.vending?.amount}.`
        );
      }
      if (createTrnResult?.error) {
        // Show Alert only (Do not reroute - ussr must decide)
        Alert.alert(`Vending Failure `, createTrnResult.error);
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
        //   `TrnFormMeterVend_ formik`,
        //   JSON.stringify(formik, null, 2)
        // );
        // console.log(
        //   `TrnFormMeterVend_ formik?.values?.ast?.astData?.astState`,
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
              title={"Ast Found"}
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
                  hr="Vending Meter"
                  hl=""
                  selected={"Vending Meter"}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.ast?.astData?.astNo) ||
                    Boolean(formik.errors?.vending?.amount)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Meter No */}
                    <FormikControl
                      control="formikInput"
                      name={`ast.astData.astNo`}
                      label="meter no"
                      placeHolder="Meter No"
                      icon={<Octicons name="question" size={24} />}
                      setModalVisible={setModalVisible}
                      readOnly={true}
                    />
                    <FormikControl
                      control="formikInput"
                      name={`vending.amount`}
                      label="vending amount"
                      placeHolder="Vending Amount"
                      icon={<Octicons name="question" size={24} />}
                    />
                  </View>
                </PageSection>

                <PageSection
                  hr="Vending Data"
                  hl=""
                  selected={"Vending Data"}
                  setSelected={setSelected}
                  error={
                    Boolean(
                      formik.errors?.ast?.astData?.metadata?.updatedByUser
                    ) ||
                    Boolean(
                      formik.errors?.ast?.astData?.metadata?.updatedAtDatetime
                    ) ||
                    Boolean(formik.errors?.vending?.comment)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Checked Out By User */}
                    <FormikControl
                      control="formikInput"
                      name={`metadata.updatedByUser`}
                      label="user details"
                      placeHolder="User Details"
                      icon={<Octicons name="question" size={24} />}
                      readOnly={true}
                    />

                    {/* Checked Out Date/Time */}
                    <FormikControl
                      control="formikDatetime"
                      name={`metadata.updatedAtDatetime`}
                      label="vending time"
                      placeHolder="Vending Time"
                      icon={<Octicons name="question" size={24} />}
                      readOnly={true}
                    />

                    {/* CkeckOut comment */}
                    <FormikControl
                      control="formikSelect"
                      name={`vending.comment`}
                      label="vending comment"
                      placeHolder="Vending Comment"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions?.vendingOptions}
                    />

                    <FormikControl
                      control="formikMediaBtn"
                      name={`astData.media.vending`}
                      label="vending media"
                      placeHolder="Vending Media"
                      icon={<Octicons name="question" size={24} />}
                      media={media}
                      ml1="asts"
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

export default TrnFormMeterVend;
