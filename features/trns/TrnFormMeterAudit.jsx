import { useNetInfo } from "@react-native-community/netinfo";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { Octicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useUpdateErfMutation } from "../../redux/erfsSlice";
import {
  useCreateTrnMutation,
  useUpdateTrnMutation,
} from "../../redux/trnsSlice";

import DataDisplayComponent from "../../components/DataDisplayComponent";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import MediaAppCapture from "../../components/media/MediaAppCapture";
import MediaAppViewer from "../../components/media/MediaAppViewer";
import ModalGeneric from "../../components/modals/ModalGeneric";
import PageSection from "../../components/pageSection/PageSection";
import { useAuth } from "../../context/authContext";
import { useMediaContext } from "../../context/MediaContext";
import useStorage from "../../hooks/useStorage";
import { addPendingForm } from "../../redux/offlineSlice";
import { capitalizeFirstLetter } from "../../utils/utilsCommon";
import {
  anomalies,
  formSelectOptions,
  updateFormState,
} from "../../utils/utilsForms";

const TrnFormMeterAudit = (props) => {
  // console.log(`TrnFormMeterAudit ----props`, props);

  const [formSubmit, setFormSubmit] = useState(false);
  // console.log(`TrnFormMeterAudit ----formSubmit`, formSubmit);

  // All form data in iREPS is prepared and finalised before handed over to the form component.
  // In all iREPS forms, form data always come in as 'formData' and 'validation schema'. This is iREPS standard.
  const { meterData, validationSchema } = props;
  // console.log(`TrnFormMeterAudit ----meterData`, meterData);
  // console.log(
  //   `TrnFormMeterAudit ----meterData?.metadata`,
  //   JSON.stringify(meterData?.metadata, null, 2)
  // );

  // 'isConnected' is a value representing wether there is availability of network connectivity  or not while
  // 'isInternetReachable' indicates wether there is internet or not.
  // These values are controlled by NetInfo library.
  // The functionality is housed in a hook 'useNetworkStatus' to allow sharing of the connectivity status.
  // Using this shared approach, all components interested in network and internet availability
  // can use this hook.
  const netInfo = useNetInfo();
  // console.log(
  //   `TrnFormMeterAudit ----netInfo`,
  //   JSON.stringify(netInfo, null, 2)
  // );

  const { isConnected, isInternetReachable } = netInfo;
  // console.log(`TrnFormMeterAudit ----isConnected`, isConnected);
  // console.log(`TrnFormMeterAudit ----isInternetReachable`, isInternetReachable);

  // This is used to send form data to local storage in the event that there is a no network and internet
  // at form data submission time. Local storage is managed by rtk query 'offlineSlice'.
  const dispatch = useDispatch();
  // console.log(`TrnFormMeterAudit ----dispatch`, dispatch);

  // All media in iREPS forms is managed through a media array. This is an array that is part of the form data object.
  // An iREPS form that has media involved will always have a media array.
  // The media array is made of array elelemts called media objects.
  // Each media object has three main properties - (1)metadata , (2)downloadUrl and (3)filePath.
  // In iREPS, every kind of media (images, audio and videos) is cuptured through a component called 'MediaAppCapture'.
  // MediaAppCapture is made available via a modal.
  // The 'useMediaContext' hook is then used to control the opening and closure of 'MediaAppCapture'
  const { mediaData, updateMediaData, initValue } = useMediaContext();
  // console.log(`TrnFormMeterAudit ----mediaData`, mediaData);
  // console.log(`TrnFormMeterAudit ----updateMediaData`, updateMediaData);
  // console.log(`TrnFormMeterAudit ----initValue`, initValue);

  // In any iREPS form, there are two main media components at play. One is 'MediaAppViewer', the other is 'MediaAppCapture'
  // 'MediaAppCapture' is used to capture the media while 'MediaAppViewer' is used to view the media.
  // Both of these component are displayed via a respective modal.
  // The control of when to hide or show these modals in a form is in the mediaContext through 'modlaMediaViewer' and 'modalMediaCapture'
  const { modalMediaViewer, modalMediaCapture } = mediaData;
  // console.log(`TrnFormMeterAudit ----modalMediaViewer`, modalMediaViewer);
  // console.log(`TrnFormMeterAudit ----modalMediaCapture`, modalMediaCapture);

  useEffect(() => {
    updateMediaData({
      data: meterData, // This is form data, Either erf or ast or trn
      irepsKeyItem: "trn",
    });
    return () => updateMediaData(initValue);
  }, [meterData, initValue]);

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
  // console.log(`TrnFormMeterAudit ----selected`, selected);

  const router = useRouter();

  const { user } = useAuth();
  // console.log(`TrnFormMeterAudit ----user`, user);

  const { uid, displayName } = user || {};
  // console.log(`TrnFormMeterAudit ----uid`, uid);
  // console.log(`TrnFormMeterAudit ----displayName`, displayName);

  const [
    createTrn,
    { isError: ctError, isLoading: ctIsLoading, isSuccess: ctIsSuccess },
  ] = useCreateTrnMutation({
    uid,
    displayName,
  });
  // console.log(`ctmError`, ctmError);
  // console.log(`TrnFormMeterAudit ----ctIsLoading`, ctIsLoading);
  // console.log(`TrnFormMeterAudit ----ctmsSuccess`, ctIsSuccess);
  // console.log(`TrnFormMeterAudit ----ctError`, ctError);

  const [
    updateTrn,
    { isError: utError, isLoading: utIsLoading, isSuccess: utIsSuccess },
  ] = useUpdateTrnMutation({
    uid,
    displayName,
  });
  // console.log(`TrnFormMeterAudit ----utIsLoading`, utIsLoading);
  // console.log(`TrnFormMeterAudit ----utIsSuccess`, utIsSuccess);
  // console.log(`TrnFormMeterAudit ----utError`, utError);

  const [trnState, setTrnState] = useState(meterData?.metadata?.trnState);
  // console.log(`TrnFormMeterAudit ----trnState`, trnState);

  const handleHelp = (helpTopic) => {
    // console.log(`helpTopic`, helpTopic);
    Alert.alert(
      "iREPS Info",
      `This is the help info for this TOPIC: ${helpTopic}`
    );
  };

  const { manageUpload } = useStorage();

  const onSubmit = useCallback(
    async (values, actions) => {
      // console.log(`values`, values);
      // console.log(`TrnFormMeterAudit ----actions`, actions);

      try {
        setFormSubmit(true);

        const submitData = {
          ...values,
          metadata: {
            ...values.metadata,
            trnState,
          },
        };
        // console.log(
        //   `Submitting form data ************************************** submitData :  `,
        //   submitData
        // );
        // console.log(
        //   `Submitting form data ************************************** submitData?.metadata :  `,
        //   JSON.stringify(submitData?.metadata, null, 2)
        // );

        // console.log(`TrnFormMeterAudit ----onSubmit isConnected`, isConnected);
        // console.log(`TrnFormMeterAudit ----onSubmit addPendingForm`, addPendingForm);
        if (!isConnected && isInternetReachable) {
          // Offline - save locally
          // console.log(
          //   `TrnFormMeterAudit ----Device offine - isConnecred: `,
          //   isConnected
          // );
          dispatch(
            addPendingForm({ id: values.metadata.trnId, data: submitData })
          );
          router.navigate("erfs");
          Alert.alert("Device offline", "Form data saved locally");
          return;
        }

        const formData = await manageUpload(submitData, "trn");
        console.log(`TrnFormMeterAudit ----formData`, formData);

        // Either create a new Trn (Audit) or update an existing one
        if (!formData?.metadata?.newTrn) {
          console.log(
            `TrnFormMeterAudit ---Updating existing Trn with id: ${formData.metadata.trnId}`
          );
          // console.log(`submitData`, submitData);
          // Update the existing Trn
          const updateTrnResult = await updateTrn({
            displayName,
            uid,
            trnData: formData,
            id: formData.metadata.trnId,
          });
          // console.log(
          // 	`updateTrnResult for erf [${formData?.erf?.erfNo}] : `,
          // 	updateTrnResult
          // );

          if (updateTrnResult?.data) {
            // Reset the form
            actions.resetForm();

            // Redirect to erfs page
            router.navigate("trns");

            // display success notice
            Alert.alert(
              `Meter Audit Success`,
              `Erf [${meterData?.ast?.erf?.erfNo}]: : [${updateTrnResult.data}]`
            );
          } else if (updateTrnResult?.error) {
            Alert.alert(
              `Meter Audit Failure`,
              `Erf [${meterData?.ast?.erf?.erfNo}]: [${updateTrnResult.error}]`
            );
          }
        } else {
          console.log(
            `TrnFormMeterAudit ----Create a new meter Audit Trn with trnId: ${formData.metadata.trnId}`
          );
          // Remove submitData.metadata.newTrn
          // delete submitData?.metadata?.newTrn;
          // Create a new Trn
          const createTrnResult = await createTrn({
            displayName,
            uid,
            trnData: {
              ...formData,
              metadata: {
                ...formData.metadata,
                newTrn: false,
              },
            },
            id: formData?.metadata?.trnId,
          });
          console.log(
            `TrnFormMeterAudit ----createTrnResult  for erf [${formData?.ast?.erf?.erfNo}] : `,
            createTrnResult
          );

          if (createTrnResult?.data) {
            // show alert  and go back
            router.navigate("trns");
            // display success notice
            Alert.alert(
              `Meter Audit Success`,
              `Erf [${submitData?.ast?.erf?.erfNo}]: : [${createTrnResult.data}]`
            );
          }
          if (createTrnResult?.error) {
            // Show Alert only (Do not reroute - ussr must decide)
            Alert.alert(
              `Meter Audit Failure`,
              `Erf [${submitData?.ast?.erf?.erfNo}]: [${createTrnResult.error}]`
            );
          }
        }
      } catch (error) {
        console.log(`Error submiting form in TrnFormMeterAudit`, error);
      } finally {
        setFormSubmit(false);
      }
    },
    [trnState, updateTrn, meterData, router, displayName, uid, createTrn]
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

        // console.log(
        //   `TrnFormMeterAudit formik.values?.media`,
        //   JSON.stringify(formik.values?.media, null, 2)
        // );

        // console.log(
        //   `TrnFormMeterAudit formik.values?.ast?.astData?.astState`,
        //   JSON.stringify(formik.values?.ast?.astData?.astState, null, 2)
        // );

        // console.log(
        //   `TrnFormMeterAudit formik.values?.metadata`,
        //   JSON.stringify(formik.values?.metadata, null, 2)
        // );

        // console.log(`formik.dirty`, formik.dirty);
        // console.log(`formik.errors`, formik.errors);

        const mn = formik.values?.ast?.astData?.astNo
          ? formik.values?.ast?.astData?.astNo
          : "Not Available";

        updateFormState(formik, setTrnState);

        return (
          <View>
            <FormHeader
              title={"Audit"}
              headerRightRight={
                <DataDisplayComponent
                  // label={"Mn"}
                  data={mn ? mn : "N/Av"}
                  borderBottomWidth={0}
                  fontSize={20}
                />
              }
              headerRightLeft={capitalizeFirstLetter(trnState)}
              isConnected={isConnected}
            />

            <ScrollView style={{ marginHorizontal: 2, flex: 1 }}>
              {/* Access */}
              <PageSection
                hr="Access"
                hl=""
                selected={"Access"}
                setSelected={setSelected}
                error={
                  Boolean(formik.errors?.access?.meterAccess) ||
                  Boolean(formik.errors?.access?.noAccessReason) ||
                  Boolean(formik.errors?.astData?.media?.noAccess)
                }
              >
                <View style={{ gap: 15 }}>
                  {/* Meter Access */}
                  <FormikControl
                    control="formikSelectMeterAccess"
                    name={`access.meterAccess`}
                    label="meter access?"
                    placeHolder="Meter Type"
                    icon={
                      <Octicons
                        name="question"
                        size={24}
                        onPress={() => handleHelp("access.meterAccess")}
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
                        // media={media}
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
                      {/* Meter No */}
                      <FormikControl
                        control="formikInputBarCodeScanner"
                        name={`ast.astData.astNo`}
                        label="meter no"
                        placeHolder="Meter No"
                        icon={<Octicons name="question" size={24} />}
                      />

                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.astNo`}
                        label="meter no media"
                        placeHolder="Meter No Media"
                        icon={<Octicons name="question" size={24} />}
                        // media={media}
                        ml1="asts"
                        mediaCat="astNo"
                      />

                      {/* Meter Phase */}
                      <FormikControl
                        control="formikSelect"
                        name={`ast.astData.meter.phase`}
                        label="meter phase"
                        placeHolder="Phase Meter"
                        icon={<Octicons name="question" size={24} />}
                        options={formSelectOptions.meterPhaseOptions}
                      />

                      {/* Meter Type */}
                      <FormikControl
                        control="formikSelect"
                        name={`ast.astData.meter.type`}
                        label="meter type"
                        placeHolder="Meter Type"
                        icon={<Octicons name="question" size={24} />}
                        options={formSelectOptions.meterTypeOptions}
                      />

                      {/* Meter Manufacture / Brand */}
                      <FormikControl
                        control="formikInput"
                        name={`ast.astData.astManufacturer`}
                        label="manufacture"
                        placeHolder="manufacture"
                        icon={<Octicons name="question" size={24} />}
                        options={formSelectOptions.meterManufactureOptions}
                      />

                      {/* Product Name */}
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
                      {/* Meter Google Adr */}
                      <FormikControl
                        control="formikRgc"
                        label="meter location address"
                        name={`ast.location.address`}
                        placeholder="Meter Address"
                        icon={<Octicons name="question" size={24} />}
                      />
                      {/* Meter GPS lat */}
                      <FormikControl
                        readOnly={true}
                        control="formikInput"
                        label="gps(lat)"
                        name={`ast.location.gps.lat`}
                        placeholder="Meter Address"
                        icon={<Octicons name="question" size={24} />}
                      />
                      {/* Meter GPS lng */}
                      <FormikControl
                        readOnly={true}
                        control="formikInput"
                        label="gps(lng)"
                        name={`ast.location.gps.lng`}
                        placeholder="Meter Address"
                        icon={<Octicons name="question" size={24} />}
                      />

                      {/* Meter Placement */}
                      <FormikControl
                        control="formikSelect"
                        label="meter placement"
                        name={`ast.location.placement`}
                        placeholder="Meter Address"
                        options={formSelectOptions.astLocationPlacementOptions}
                        icon={<Octicons name="question" size={24} />}
                      />
                      {/* Meter Placement Media */}
                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.meterPlacement`}
                        label="meter placement media"
                        placeHolder="Meter Placement Media"
                        icon={<Octicons name="question" size={24} />}
                        ml1="asts"
                        mediaCat="meterPlacement"
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
                      {/* Meter Anomalies */}
                      <FormikControl
                        control="formikSelectMeterAnomaly"
                        label="anomaly"
                        name={`ast.anomalies.anomaly`}
                        icon={<Octicons name="question" size={24} />}
                        options={anomalyOptions}
                        defaultValue={"Meter Ok"}
                      />
                      {/* Meter Anomaly Detail */}
                      {formik.values?.ast?.anomalies?.anomaly === "choose" ||
                      formik.values?.ast?.anomalies?.anomaly === "" ||
                      formik.values?.ast?.anomalies?.anomaly === undefined ||
                      formik.values?.ast?.anomalies?.anomaly === null ? (
                        ""
                      ) : (
                        <FormikControl
                          control="formikSelectMeterAnomalyDetail"
                          label="anomaly detail"
                          name={`ast.anomalies.anomalyDetail`}
                          icon={<Octicons name="question" size={27} />}
                        />
                      )}

                      {/* Meter Anomaly Media */}
                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.anomaly`}
                        label="meter anomaly media"
                        placeHolder="Meter Anomaly Media"
                        icon={<Octicons name="question" size={24} />}
                        ml1="asts"
                        mediaCat="anomaly"
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
                      Boolean(
                        formik.errors?.ast?.serviceConnection?.configuration
                      ) ||
                      Boolean(
                        formik.errors?.astData?.media?.serviceConnection
                      ) ||
                      Boolean(
                        formik.errors?.ast?.serviceConnection?.offGridSupply
                      ) ||
                      Boolean(formik.errors?.astData?.media?.offGridSupply)
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

                      {formik.values.ast.serviceConnection.status !==
                        "choose" && (
                        <FormikControl
                          control="formikSelectScComment"
                          label="sc comment"
                          placeHolder="sc comment"
                          name={`ast.serviceConnection.comment`}
                          options={formSelectOptions.scCommentOptions}
                          icon={<Octicons name="question" size={24} />}
                        />
                      )}

                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.serviceConnection`}
                        label="service connection media"
                        placeHolder="Service Connection Media"
                        icon={<Octicons name="question" size={24} />}
                        ml1="asts"
                        mediaCat="serviceConnection"
                      />

                      {/* Off Grid Supply */}
                      <FormikControl
                        control="formikSelect"
                        label="Off Grid Supply?"
                        name={`ast.serviceConnection.offGridSupply`}
                        options={formSelectOptions.yesNoOptions}
                        icon={<Octicons name="question" size={24} />}
                      />

                      {/* Off Grid Supply Media */}
                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.offGridSupply`}
                        label="off grid supply media"
                        placeHolder="Off Grid Supply Media"
                        icon={<Octicons name="question" size={24} />}
                        ml1="asts"
                        mediaCat="offGridSupply"
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
                        placeHolder="serial no"
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
                        ml1="asts"
                        mediaCat="keypad"
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
                      // Boolean(formik.errors?.astData?.meter?.cb?.isThereCb) ||
                      Boolean(formik.errors?.ast?.astData?.meter?.cb?.size) ||
                      Boolean(
                        formik.errors?.ast?.astData?.meter?.cb?.comment
                      ) ||
                      Boolean(formik.errors?.astData?.media?.cb)
                    }
                  >
                    <View style={{ gap: 15 }}>
                      {/* Is there a CB?*/}
                      <FormikControl
                        control="formikInput"
                        label="size (Amps)"
                        name={`ast.astData.meter.cb.size`}
                        placeHolder="Cb Size"
                        icon={<Octicons name="question" size={24} />}
                      />
                      <FormikControl
                        control="formikSelect"
                        label="cb comment"
                        name={`ast.astData.meter.cb.comment`}
                        options={formSelectOptions.cbCommentsOptions}
                        icon={<Octicons name="question" size={24} />}
                      />
                      {/* CB Media */}
                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.cb`}
                        label="cb media"
                        placeHolder="CB Media"
                        icon={<Octicons name="question" size={24} />}
                        ml1="asts"
                        mediaCat="cb"
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
                      // Boolean(
                      // 	formik.errors?.astData?.meter?.seal?.meterSealed
                      // ) ||
                      Boolean(
                        formik.errors?.ast?.astData?.meter?.seal?.sealNo
                      ) ||
                      Boolean(
                        formik.errors?.ast?.astData?.meter?.seal?.comment
                      ) ||
                      Boolean(formik.errors?.astData?.media?.seal)
                    }
                  >
                    <View style={{ gap: 15 }}>
                      {/* Seal number */}
                      <FormikControl
                        control="formikInput"
                        label="seal number"
                        placeHolder="Seal No"
                        name={`ast.astData.meter.seal.sealNo`}
                        icon={<Octicons name="question" size={24} />}
                      />
                      {/* Seal comments */}
                      <FormikControl
                        control="formikSelect"
                        label="seal comment"
                        name={`ast.astData.meter.seal.comment`}
                        options={formSelectOptions.sealCommentOptions}
                        icon={<Octicons name="question" size={24} />}
                      />
                      {/* Seal Media */}
                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.seal`}
                        label="seal media"
                        placeHolder="Seal Media"
                        icon={<Octicons name="question" size={24} />}
                        ml1="asts"
                        mediaCat="sealNo"
                      />
                    </View>
                  </PageSection>

                  {/* Normalisation */}
                  <PageSection
                    hr="Normalisation"
                    hl=""
                    selected={"Normalisation"}
                    setSelected={setSelected}
                    error={
                      Boolean(formik.errors?.ast?.normalisation?.actionTaken) ||
                      Boolean(formik.errors?.ast?.normalisation?.comment) ||
                      Boolean(
                        formik.errors?.ast?.normalisation?.newInstalllation
                      )
                    }
                  >
                    <View style={{ gap: 15 }}>
                      {/* Normalisation Action Taken */}
                      <FormikControl
                        control="formikSelect"
                        label="action taken"
                        name={`ast.normalisation.actionTaken`}
                        placeHolder="Action Taken"
                        options={
                          formSelectOptions.normalisationActionTakenOption
                        }
                        icon={
                          <Octicons
                            name="question"
                            size={27}
                            onPress={() =>
                              handleHelp("normalisation.actionTaken")
                            }
                          />
                        }
                      />

                      <FormikControl
                        control="formikInput"
                        label="normalisation comment"
                        name={`ast.normalisation.comment`}
                        placeHolder="Comment"
                        icon={
                          <Octicons
                            name="question"
                            size={27}
                            onPress={() => handleHelp("normalisation.comment")}
                          />
                        }
                      />

                      {formik.values?.ast?.normalisation?.actionTaken ===
                        "Existing Uninstalled and New Installed" && (
                        <FormikControl
                          control="formikInput"
                          label="new installation"
                          name={`ast.normalisation.newInstallation`}
                          placeHolder="New Installation Mn"
                          icon={
                            <Octicons
                              name="question"
                              size={27}
                              onPress={() =>
                                handleHelp("normalisation.newInstallation")
                              }
                            />
                          }
                        />
                      )}

                      <FormikControl
                        control="formikMediaBtn"
                        name={`astData.media.normalisation`}
                        label="normalisation media"
                        placeHolder="Normalisation Media"
                        icon={
                          <Octicons
                            name="question"
                            size={27}
                            onPress={() => handleHelp("media.normalisation")}
                          />
                        }
                        ml1="asts"
                        mediaCat="normalisation"
                      />
                    </View>
                  </PageSection>
                </>
              )}
            </ScrollView>

            {formik.values.metadata.trnState === "submitted" ? (
              ""
            ) : (
              <FormFooter
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
                formik={formik}
                isLoading={formik.isSubmitting}
              />
            )}

            <ModalGeneric
              modalVisible={modalMediaViewer}
              setModalVisible={() =>
                updateMediaData({
                  modalMediaViewer: false,
                })
              }
            >
              <MediaAppViewer origin={"form"} />
            </ModalGeneric>
            <ModalGeneric
              modalVisible={modalMediaCapture}
              setModalVisible={() =>
                updateMediaData({
                  modalMediaCapture: false,
                })
              }
            >
              <MediaAppCapture />
            </ModalGeneric>
          </View>
        );
      }}
    </Formik>
  );
};

export default TrnFormMeterAudit;
