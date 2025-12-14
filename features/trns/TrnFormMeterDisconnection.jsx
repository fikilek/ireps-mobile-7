import { Octicons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { useDispatch } from "react-redux";
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
import {
  useCreateTrnMutation,
  useUpdateTrnMutation,
} from "../../redux/trnsSlice";
import { capitalizeFirstLetter } from "../../utils/utilsCommon";
import { formSelectOptions, updateFormState } from "../../utils/utilsForms";

const TrnFormMeterDisconnection = (props) => {
  // console.log(
  //   `TrnFormMeterDisconnection ----props`,
  //   JSON.stringify(props, null, 2)
  // );

  const [formSubmit, setFormSubmit] = useState(false);
  // console.log(`TrnFormMeterAudit ----formSubmit`, formSubmit);

  const { meterData, validationSchema } = props;
  // console.log(`TrnFormMeterDisconnection spStores?.length`, spStores?.length);
  // console.log(`TrnFormMeterDisconnection meterData`, meterData);
  // const currentAstState = meterData?.ast?.astData?.astState?.state;
  // console.log(`currentAstState`, currentAstState);
  // console.log(
  //   `TrnFormMeterDisconnection meterData`,
  //   JSON.stringify(meterData, null, 2)
  // );
  // console.log(`TrnFormMeterDisconnection validationSchema`, validationSchema);

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

  const router = useRouter();

  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid, displayName } = user || {};
  // console.log(`uid`, uid);

  // Get user data from users collectin. From this data we will need user sp data. All users belong to a sp.
  // const { data } = useGetUserByIdQuery(uid);
  // console.log(`data`, data);

  // const {
  //   serviceProvider: { id: userSpId, name: userSpName },
  // } = data || {};

  // console.log(`storeOptions`, storeOptions);
  // console.log(
  //   `TrnFormMeterDisconnection storeOptions`,
  //   JSON.stringify(storeOptions, null, 2)
  // );

  const [setSelected] = useState("Access");
  // console.log(`TrnFormMeterDisconnection selected`, selected);

  const [createTrn] = useCreateTrnMutation({
    uid,
    displayName,
  });
  // console.log(`ctmError`, ctmError);
  // console.log(`ctmIsLoading`, ctmIsLoading);
  // console.log(`ctmIsSuccess`, ctmIsSuccess);

  const [updateTrn] = useUpdateTrnMutation({
    uid,
    displayName,
  });

  const [trnState, setTrnState] = useState(meterData?.metadata?.trnState);
  // console.log(`TrnFormMeterDisconnection trnState`, trnState);

  // const [modalVisible, setModalVisible] = useState(false);

  const { media } = meterData || [];

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

      // const trnId = uuid.v4();

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
        // 	`Submitting form data ************************************** submitData?.metadata :  `,
        // 	JSON.stringify(submitData?.metadata, null, 2)
        // );
        // console.log(`values?.metadata?.trnId`, values?.metadata?.trnId);

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

        // Update existing trn inspection data
        if (!formData?.metadata?.newTrn) {
          console.log(`Updating existing Trn with id: ${formData.id}`);
          // console.log(`formData`, formData);
          // Update the existing Trn
          const updateTrnResult = await updateTrn({
            displayName,
            uid,
            trnData: formData,
            id: formData?.metadata?.trnId,
          });
          console.log(
            `UpdateTrnResult for erf [${formData?.erf?.erfNo}] : `,
            JSON.stringify(updateTrnResult, null, 2)
          );

          if (updateTrnResult?.data) {
            // Reset the form
            actions.resetForm();

            router.navigate("trns");

            // display success notice
            Alert.alert(
              `Meter Disconnection Success`,
              `Erf [${formData?.ast?.erf?.erfNo}]: : [${updateTrnResult.data}]`
            );
          }
          if (updateTrnResult?.error) {
            Alert.alert(
              `Meter Disconnection Failure`,
              `Erf [${formData?.ast?.erf?.erfNo}]: [${updateTrnResult.error}]`
            );
          }
        } else {
          // Create a new trn inspection data
          console.log(`Create a new meter Disconnection Trn`);
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
            `createTrnResult for erf [${meterData?.erf?.erfNo}] : `,
            createTrnResult
          );

          if (createTrnResult?.data) {
            // show alert  and go back
            router.navigate("trns");
            // display success notice
            Alert.alert(
              `Meter Disconnection Success`,
              `Erf [${formData?.ast?.erf?.erfNo}]: : [${createTrnResult.data}]`
            );
          }
          if (createTrnResult?.error) {
            // Show Alert only (Do not reroute - user must decide)
            console.log(
              `Error in TrnFormMeterDisconnection`,
              createTrnResult?.error
            );
            Alert.alert(
              `Meter Disconnection Failure`,
              `Error in meter disconnection`
            );
          }
        }
      } catch (error) {
        console.log(`Error submiting form in TrnFormMeterDisconnection`, error);
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
        // console.log(`formik`, formik);
        // console.log(`formik.values`, formik.values);
        // console.log(
        //   `TrnFormMeterCheckOutConfirm_ formik.values?.ast?.astData?.astState`,
        //   JSON.stringify(formik.values?.ast?.astData?.astState, null, 2)
        // );
        // console.log(
        // 	`formik.values.metadata.trnState`,
        // 	formik.values.metadata.trnState
        // );
        // console.log(`formik.dirty`, formik.dirty);
        // console.log(`formik.errors`, formik.errors);

        const mn = formik.values?.ast?.astData?.astNo
          ? formik.values?.ast?.astData?.astNo
          : "N/Av";

        updateFormState(formik, setTrnState);

        return (
          <View style={{ flex: 1 }}>
            <FormHeader
              title={"Disconnection"}
              headerRightRight={
                <DataDisplayComponent
                  data={mn ? mn : "N/Av"}
                  borderBottomWidth={0}
                  fontSize={16}
                />
              }
              headerRightLeft={capitalizeFirstLetter(trnState)}
              isConnected={isConnected}
            />

            <ScrollView style={{ flex: 1 }}>
              <>
                <PageSection
                  hr="Meter Description"
                  hl=""
                  selected={"Meter Description"}
                  setSelected={setSelected}
                  error={Boolean(formik.errors?.ast?.astData?.astNo)}
                >
                  <View style={{ gap: 15 }}>
                    {/* Meter No */}
                    <FormikControl
                      control="formikInput"
                      name={`ast.astData.astNo`}
                      label="meter no"
                      placeHolder="Meter No"
                      icon={<Octicons name="question" size={24} />}
                      // setModalVisible={setModalVisible}
                      readOnly={true}
                    />

                    {/* Media */}
                    <FormikControl
                      control="formikMediaBtn"
                      name={`astData.media.disconnection`}
                      label="disconnection media"
                      placeHolder="Disconnection Media"
                      icon={
                        <Octicons
                          name="question"
                          size={27}
                          onPress={() => handleHelp("astData.media.noAccess")}
                        />
                      }
                      media={media}
                      ml1="asts"
                      mediaCat="meterDisconnection"
                    />
                  </View>
                </PageSection>

                <PageSection
                  hr="Disconnection Data"
                  hl=""
                  selected={"Disconnection Data"}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.metadata?.updatedByUser) ||
                    Boolean(formik.errors?.metadata?.updatedAtDatetime) ||
                    Boolean(formik.errors?.ast?.astData?.astState?.comment)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Checked Out By User */}
                    <FormikControl
                      control="formikInput"
                      name={`metadata.updatedByUser`}
                      label="disconnected by"
                      placeHolder="Disconnected By"
                      icon={<Octicons name="question" size={24} />}
                      readOnly={true}
                    />

                    {/* Checked Out Date/Time */}
                    <FormikControl
                      control="formikDatetime"
                      name={`metadata.updatedAtDatetime`}
                      label="disconnected at time"
                      placeHolder="Disconnected at time"
                      icon={<Octicons name="question" size={24} />}
                      readOnly={true}
                    />

                    {/* CheckIn Comment */}
                    <FormikControl
                      control="formikSelect"
                      name={`ast.astData.astState.comment`}
                      label="comment"
                      placeHolder="Comment"
                      icon={<Octicons name="question" size={24} />}
                      options={formSelectOptions.disconnectionLevelOptions}
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

export default TrnFormMeterDisconnection;
