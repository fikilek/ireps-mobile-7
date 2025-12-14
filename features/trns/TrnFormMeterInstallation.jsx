import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import uuid from "react-native-uuid";

import { Octicons } from "@expo/vector-icons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useUpdateErfMutation } from "../../redux/erfsSlice";
import {
  useCreateTrnMutation,
  useUpdateTrnMutation,
} from "../../redux/trnsSlice";

import DataDisplayComponent2 from "../../components/DataDisplayComponent2";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import PageSection from "../../components/pageSection/PageSection";
import { useAuth } from "../../context/authContext";
import { capitalizeFirstLetter } from "../../utils/utilsCommon";
import {
  anomalies,
  formSelectOptions,
  updateFormState,
} from "../../utils/utilsForms";
import { getHelpTopic } from "../../utils/utilsHelpTopics";

const TrnFormMeterInstallation = (props) => {
  // console.log(`TrnFormMeterInstallation ----------------------`);
  const { trnData, validationSchema } = props;
  // console.log(`TrnFormMeterInstallation props`, props);
  // console.log(`TrnFormMeterInstallation trnData`, trnData);
  // console.log(`TrnFormMeterInstallation validationSchema`,
  // validationSchema);

  // console.log(
  //   `TrnFormMeterInstallation trnData`,
  //   JSON.stringify(trnData, null, 2)
  // );
  const anomalyOptions = [
    {
      key: "choose",
      value: "choose",
    },
  ];
  Object.keys(anomalies)?.forEach((item) => {
    anomalyOptions.push({
      key: item,
      value: item,
    });
  });

  const [setSelected] = useState("Access");
  // console.log(`TrnFormMeterInstallation selected`, selected);

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

  const [trnState, setTrnState] = useState(trnData?.metadata?.trnState);
  // console.log(`trnState`, trnState);

  // const [modalVisible, setModalVisible] = useState(false);

  const { media } = trnData || [];

  const handleHelp = (header, helpTopic) => {
    // console.log(`helpTopic`, helpTopic);
    const helpTopicTip = getHelpTopic(helpTopic);
    Alert.alert(`iREPS Info - ${header}`, helpTopicTip, [
      {
        text: "Press to learn more...",
        onPress: () => console.log("Press to learn more..."),
        style: "cancel",
      },
      {
        text: "dismiss",
        onPress: () => console.log("Ask me later pressed"),
      },
    ]);
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

      console.log(
        `TrnFormMeterInstallation submitData`,
        JSON.stringify(submitData, null, 2)
      );

      // Either create a new Trn (Installation) or update an existing one

      if (values?.metadata?.trnId) {
        console.log(`Updating existing Trn with id: ${values.metadata.trnId}`);
        // console.log(`submitData`, submitData);
        // Update the existing Trn
        const updateTrnResult = await updateTrn({
          displayName,
          uid,
          trnData: submitData,
          id: values.metadata.trnId,
        });
        // console.log(
        // 	`updateTrnResult for erf [${trnData?.ast?.erf?.erfNo}] : `,
        // 	updateTrnResult
        // );

        if (updateTrnResult?.data) {
          // show alert  and go back
          router.navigate("trns");
          // display success notice
          Alert.alert(
            `Meter Audit ${updateTrnResult?.data} at Erf [${trnData?.ast?.erf?.erfNo}]`
          );
        }
        if (updateTrnResult?.error) {
          // Show Alert only (Do not reroute - ussr must decide)
          Alert.alert(
            `New Meter Audit Failure at Erf [${trnData?.ast?.erf?.erfNo}]`,
            updateTrnResult.error
          );
        }
      } else {
        console.log(`Create a new meter Audit Trn`);
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
                  state: "field",
                  comment: "",
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
        // 	`createTrnResult  for erf [${trnData?.ast?.erf?.erfNo}] : `,
        // 	createTrnResult
        // );

        if (createTrnResult?.data) {
          // show alert  and go back
          router.navigate("trns");
          // display success notice
          Alert.alert(
            `Meter Installation Success`,
            `${createTrnResult?.data} : Erf [${trnData?.ast?.erf?.erfNo}]`
          );
        }
        if (createTrnResult?.error) {
          // Show Alert only (Do not reroute - ussr must decide)
          Alert.alert(`Meter Installation Failure`, `${createTrnResult.error}`);
        }
      }
    },
    [createTrn, trnState, updateTrn, trnData, ctmError, ctmIsSuccess, router]
  );

  return (
    <Formik
      initialValues={trnData}
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

        // console.log(
        //   `TrnFormMeterInstallation formik.values`,
        //   JSON.stringify(formik.values, null, 2)
        // );

        // console.log(`formik.values.access`, formik.values.access);
        // console.log(`formik.dirty`, formik.dirty);
        // console.log(
        //   `TrnFormMeterInstallation formik.errors`,
        //   JSON.stringify(formik.errors, null, 2)
        // );

        updateFormState(formik, setTrnState);

        return (
          <View style={{ flex: 1 }}>
            <FormHeader
              title={
                <DataDisplayComponent2
                  title={""}
                  data={capitalizeFirstLetter("Installation")}
                  fontSize={18}
                  borderColor={"grey"}
                  color="black"
                  fontWeight="bold"
                />
              }
              headerRightLeft={
                <DataDisplayComponent2
                  title={""}
                  data={capitalizeFirstLetter(trnState)}
                  fontSize={18}
                  borderColor={"grey"}
                />
              }
              headerRightRight={
                <DataDisplayComponent2
                  title={"Mn"}
                  data={
                    formik.values?.ast?.astData?.astNo
                      ? formik.values?.ast?.astData?.astNo
                      : "N/Av"
                  }
                  borderBottomWidth={0}
                  fontSize={18}
                  borderColor={"grey"}
                />
              }
            />

            <ScrollView style={{ flex: 1 }}>
              {/* Access */}
              <PageSection
                hr="Access"
                hl=""
                selected={"Access"}
                setSelected={setSelected}
                error={
                  Boolean(formik.errors?.access?.meterAccess) ||
                  Boolean(formik.errors?.access?.noAccessReason)
                  // Boolean(formik.errors?.astData?.media?.noAccess)
                }
              >
                <View style={{ gap: 15 }}>
                  {/* Meter Access */}
                  <FormikControl
                    control="formikSelectMeterAccess"
                    name={`access.meterAccess`}
                    label="meter access"
                    placeHolder="Meter Type"
                    icon={
                      <Octicons
                        name="question"
                        size={24}
                        onPress={() =>
                          handleHelp("Meter Access", "access.meterAccess")
                        }
                      />
                    }
                    options={formSelectOptions.yesNoOptions}
                  />
                  {/* No Access Reason */}
                  {formik.values.access.meterAccess === "no" && (
                    <>
                      <FormikControl
                        control="formikSelectMeterNaReason"
                        name={`access.noAccessReason`}
                        label="no access reason"
                        placeHolder="No Access Reason"
                        icon={
                          <Octicons
                            name="question"
                            size={24}
                            onPress={() => handleHelp("access.noAccessReason")}
                          />
                        }
                        options={formSelectOptions.noAccessOptions}
                      />

                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.noAccess`}
                        label="no access media"
                        placeHolder="No Access Media"
                        icon={
                          <Octicons
                            name="question"
                            size={24}
                            onPress={() => handleHelp("astData.media.noAccess")}
                          />
                        }
                        media={media}
                        ml1="asts"
                        mediaCat="noAccess"
                      />
                    </>
                  )}
                </View>
              </PageSection>

              {formik.values.access.meterAccess === "yes" && (
                <>
                  {/* Description */}
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
                      <FormikControl
                        control="formikInputMeterInstall"
                        name={`ast.astData.astNo`}
                        label="meter no"
                        placeHolder="Meter No"
                        icon={<Octicons name="question" size={24} />}
                        // setModalVisible={setModalVisible}
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

                      <FormikControl
                        control="formikSelect"
                        name={`ast.astData.meter.phase`}
                        label="meter phase"
                        placeHolder="Phase Meter"
                        icon={<Octicons name="question" size={24} />}
                        options={formSelectOptions.meterPhaseOptions}
                      />

                      <FormikControl
                        control="formikSelect"
                        name={`ast.astData.meter.type`}
                        label="meter type"
                        placeHolder="Meter Type"
                        icon={<Octicons name="question" size={24} />}
                        options={formSelectOptions.meterTypeOptions}
                      />

                      <FormikControl
                        control="formikInput"
                        name={`ast.astData.astManufacturer`}
                        label="manufacture"
                        placeHolder="manufacture"
                        icon={<Octicons name="question" size={24} />}
                        options={formSelectOptions.meterManufactureOptions}
                      />

                      <FormikControl
                        control="formikInput"
                        name={`ast.astData.astName`}
                        label="product name"
                        placeHolder="Product Name"
                        icon={<Octicons name="question" size={24} />}
                        options={formSelectOptions.meterProductNameOptions}
                      />
                    </View>
                  </PageSection>

                  {/* Location */}
                  <PageSection
                    hr="Meter Location"
                    hl=""
                    selected={"Meter Location"}
                    setSelected={setSelected}
                    error={
                      Boolean(formik.errors?.ast?.location?.address) ||
                      Boolean(formik.errors?.ast?.location?.gps?.lat) ||
                      Boolean(formik.errors?.ast?.location?.gps?.lng) ||
                      Boolean(formik.errors?.ast?.location?.placement) ||
                      Boolean(formik.errors?.astData?.media?.meterPlacement)
                    }
                  >
                    <View style={{ gap: 15 }}>
                      <FormikControl
                        control="formikRgc"
                        label="meter location address"
                        name={`ast.location.address`}
                        placeholder="Meter Address"
                        icon={<Octicons name="question" size={24} />}
                      />
                      <FormikControl
                        readOnly={true}
                        control="formikInput"
                        label="gps(lat)"
                        name={`ast.location.gps.lat`}
                        placeholder="Meter Address"
                        icon={<Octicons name="question" size={24} />}
                      />
                      <FormikControl
                        readOnly={true}
                        control="formikInput"
                        label="gps(lng)"
                        name={`ast.location.gps.lng`}
                        placeholder="Meter Address"
                        icon={<Octicons name="question" size={24} />}
                      />

                      <FormikControl
                        control="formikSelect"
                        label="Meter Placement"
                        name={`ast.location.placement`}
                        placeholder="Meter Address"
                        options={formSelectOptions.astLocationPlacementOptions}
                        icon={<Octicons name="question" size={24} />}
                      />

                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.meterPlacement`}
                        label="meter Placement media"
                        placeHolder="Meter Placement Media"
                        icon={<Octicons name="question" size={24} />}
                        media={media}
                        ml1="asts"
                      />
                    </View>
                  </PageSection>

                  {/* Anomalies */}
                  <PageSection
                    hr="Meter Anomalies"
                    hl=""
                    selected={"Meter Anomalies"}
                    setSelected={setSelected}
                    error={
                      Boolean(formik.errors?.ast?.anomalies?.anomaly) ||
                      Boolean(formik.errors?.ast?.anomalies?.anomalyDetail) ||
                      Boolean(formik.errors?.astData?.media?.anomaly)
                    }
                  >
                    <View style={{ gap: 15 }}>
                      <FormikControl
                        control="formikSelectMeterAnomaly"
                        label="anomaly"
                        name={`ast.anomalies.anomaly`}
                        icon={<Octicons name="question" size={24} />}
                        options={anomalyOptions}
                        defaultValue={"Meter Ok"}
                      />
                      <FormikControl
                        control="formikSelectMeterAnomalyDetail"
                        label="anomaly detail"
                        name={`ast.anomalies.anomalyDetail`}
                        icon={<Octicons name="question" size={24} />}
                      />

                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.anomaly`}
                        label="meter anomaly media"
                        placeHolder="Meter Anomaly Media"
                        icon={<Octicons name="question" size={24} />}
                        media={media}
                        ml1="asts"
                      />
                    </View>
                  </PageSection>

                  {/* Service Connection */}
                  <PageSection
                    hr="Service Connection"
                    hl=""
                    selected={"Service Connection"}
                    setSelected={setSelected}
                    error={
                      Boolean(formik.errors?.ast?.serviceConnection?.status) ||
                      Boolean(formik.errors?.ast?.serviceConnection?.comment) ||
                      Boolean(
                        formik.errors?.ast?.astData?.media?.serviceConnection
                      ) ||
                      Boolean(
                        formik.errors?.ast?.serviceConnection?.offGridSupply
                      ) ||
                      Boolean(formik.errors?.ast?.astData?.media?.offGridSupply)
                    }
                  >
                    <View style={{ gap: 15 }}>
                      <FormikControl
                        control="formikSelectScStatus"
                        label="sc status"
                        placeHolder="Sc Status"
                        name={`ast.serviceConnection.status`}
                        options={
                          formSelectOptions.serviceConnectionStatusOptions
                        }
                        icon={<Octicons name="question" size={24} />}
                      />
                      <FormikControl
                        control="formikSelectScComment"
                        label="sc comment"
                        placeHolder="Sc Comment"
                        name={`ast.serviceConnection.comment`}
                        options={formSelectOptions.scCommentOptions}
                        icon={<Octicons name="question" size={24} />}
                      />

                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.serviceConnection`}
                        label="sc media"
                        placeHolder="Service Connection Media"
                        icon={<Octicons name="question" size={24} />}
                        media={media}
                        ml1="asts"
                      />

                      <FormikControl
                        control="formikSelect"
                        label="Off Grid Supply?"
                        name={`ast.serviceConnection.offGridSupply`}
                        options={formSelectOptions.yesNoOptions}
                        icon={<Octicons name="question" size={24} />}
                      />

                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.offGridSupply`}
                        label="off grid supply media"
                        placeHolder="Off Grid Supply Media"
                        icon={<Octicons name="question" size={24} />}
                        media={media}
                        ml1="asts"
                      />
                    </View>
                  </PageSection>

                  {/* Keypad */}
                  <PageSection
                    hr="Keypad"
                    hl=""
                    selected={"Keypad"}
                    setSelected={setSelected}
                    error={
                      Boolean(
                        formik.errors?.ast?.astData?.meter?.keypad?.serialNo
                      ) ||
                      Boolean(
                        formik.errors?.ast?.astData?.meter?.keypad?.comment
                      ) ||
                      Boolean(formik.errors?.ast?.astData?.media?.keypad)
                    }
                  >
                    <View style={{ gap: 15 }}>
                      <FormikControl
                        control="formikInput"
                        label="serial no"
                        name={`ast.astData.meter.keypad.serialNo`}
                        icon={<Octicons name="question" size={24} />}
                      />
                      <FormikControl
                        control="formikSelect"
                        label="keypad comment"
                        name={`ast.astData.meter.keypad.comment`}
                        options={formSelectOptions.keypadCommentsOptions}
                        icon={<Octicons name="question" size={24} />}
                      />
                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.keypad`}
                        label="keypad media"
                        placeHolder="Keypad Media"
                        icon={<Octicons name="question" size={24} />}
                        media={media}
                        ml1="asts"
                      />
                    </View>
                  </PageSection>

                  {/* Circuit Breaker */}
                  <PageSection
                    hr="Circuit Breaker"
                    hl=""
                    selected={"Circuit Breaker"}
                    setSelected={setSelected}
                    error={
                      // Boolean(formik.errors?.ast?.astData?.meter?.cb?.isThereCb) ||
                      Boolean(formik.errors?.ast?.astData?.meter?.cb?.size) ||
                      Boolean(
                        formik.errors?.ast?.astData?.meter?.cb?.comment
                      ) ||
                      Boolean(formik.errors?.ast?.astData?.media?.cb)
                    }
                  >
                    <View style={{ gap: 15 }}>
                      <FormikControl
                        control="formikInput"
                        label="size (Amps)"
                        name={`ast.astData.meter.cb.size`}
                        icon={<Octicons name="question" size={24} />}
                      />
                      <FormikControl
                        control="formikSelect"
                        label="cb comment"
                        name={`ast.astData.meter.cb.comment`}
                        options={formSelectOptions.cbCommentsOptions}
                        icon={<Octicons name="question" size={24} />}
                      />
                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.cb`}
                        label="cb media"
                        placeHolder="CB Media"
                        icon={<Octicons name="question" size={24} />}
                        media={media}
                        ml1="asts"
                      />
                    </View>
                  </PageSection>

                  {/* Seal */}
                  <PageSection
                    hr="Seal"
                    hl=""
                    selected={"Seal"}
                    setSelected={setSelected}
                    error={
                      Boolean(formik.errors?.ast?.astData?.meter?.seal?.size) ||
                      Boolean(
                        formik.errors?.ast?.astData?.meter?.seal?.comment
                      ) ||
                      Boolean(formik.errors?.astData?.media?.seal)
                    }
                  >
                    <View style={{ gap: 15 }}>
                      <FormikControl
                        control="formikInput"
                        label="seal number"
                        name={`ast.astData.meter.seal.sealNo`}
                        icon={<Octicons name="question" size={24} />}
                      />
                      <FormikControl
                        control="formikSelect"
                        label="seal comment"
                        name={`ast.astData.meter.seal.comment`}
                        options={formSelectOptions.sealCommentOptions}
                        icon={<Octicons name="question" size={24} />}
                      />
                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.seal`}
                        label="seal media"
                        placeHolder="Seal Media"
                        icon={<Octicons name="question" size={24} />}
                        media={media}
                        ml1="asts"
                      />
                    </View>
                  </PageSection>
                </>
              )}
              {/* </View> */}
            </ScrollView>

            {formik.values.metadata.trnState === "submitted" ? (
              ""
            ) : (
              <FormFooter
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
                formik={formik}
                isLoading={ctmIsLoading || utmIsLoading}
              />
            )}
            {/* <BarCodeScannerModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              formik={formik}
            /> */}
          </View>
        );
      }}
    </Formik>
  );
};

export default TrnFormMeterInstallation;
