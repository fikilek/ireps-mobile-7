import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { object, string } from "yup";
import { useUpdateErfMutation } from "../../redux/erfsSlice";

import { useRouter } from "expo-router";
import FormFooter from "../../components/forms/FormFooter";
import FormikControl from "../../components/forms/formik/FormikControl";
import MediaAppCapture from "../../components/media/MediaAppCapture";
import MediaAppViewer from "../../components/media/MediaAppViewer";
import ModalGeneric from "../../components/modals/ModalGeneric";
import { useAuth } from "../../context/authContext";
import { useMediaContext } from "../../context/MediaContext";
import useStorage from "../../hooks/useStorage";

const strTypeOptions = [
  { key: "Select", value: "Select" },
  { key: "Street", value: "Street" },
  { key: "Road", value: "Road" },
  { key: "Lane", value: "Lane" },
  { key: "Drive", value: "Drive" },
];

let strAdrSchema = object().shape({
  strNo: string().trim().required("Required"),
  strName: string().trim().required("Required"),
  strType: string()
    .trim()
    .required("Required")
    .notOneOf(["Select", ""], "Required"),
});

const ErfFormAdrForm = ({ erf, title }) => {
  // console.log(`erf`, erf);
  console.log(` `);
  console.log(` `);
  console.log(`ErfFormAdrForm ----START START`);
  console.log(`ErfFormAdrForm ----START START`);

  console.log(`ErfFormAdrForm ----erf?.erfNo`, erf?.erfNo);

  const [formSubmit, setFormSubmit] = useState(false);
  console.log(`ErfFormAdrForm ----formSubmit`, formSubmit);

  // const netInfo = useNetInfo();
  // console.log(
  //   `ErfFormAdrForm ----netInfo`,
  //   JSON.stringify(netInfo, null, 2)
  // );

  // const { isConnected, isInternetReachable } = netInfo;
  // console.log(`ErfFormAdrForm ----isConnected`, isConnected);
  // console.log(`ErfFormAdrForm ----isInternetReachable`, isInternetReachable);

  // This is used to send form data to local storage in the event that there is a no network and internet
  // at form data submission time. Local storage is managed by rtk query 'offlineSlice'.
  // const dispatch = useDispatch();
  // console.log(`ErfFormAdrForm ----dispatch`, dispatch);

  // Check if user has has a workbase
  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName, claims } = user || {};
  // console.log(`MainLayout uid`, uid);

  const { workbase } = claims || {};
  // console.log(`MainLayout workbase`, workbase);

  const router = useRouter();

  const { address, id: erfId, erfNo, media, metadata } = erf;
  // console.log(`ErfFormAdrForm ----address:`, address);
  // console.log(`ErfFormAdrForm ----media:`, media);

  // All media in iREPS forms is managed through a media array. This is an array that is part of the form data object.
  // An iREPS form that has media involved will always have a media array.
  // The media array is made of array elelemts called media objects.
  // Each media object has three main properties - (1)metadata , (2)downloadUrl and (3)filePath.
  // In iREPS, every kind of media (images, audio and videos) is cuptured through a component called 'MediaAppCapture'.
  // MediaAppCapture is made available via a modal.
  // The 'useMediaContext' hook is then used to control the opening and closure of 'MediaAppCapture'
  const { mediaData, updateMediaData, initValue } = useMediaContext();
  // console.log(`ErfFormAdrForm ----mediaData`, mediaData);
  // console.log(`ErfFormAdrForm ----updateMediaData`, updateMediaData);
  // console.log(`ErfFormAdrForm ----initValue`, initValue);

  const { modalMediaViewer, modalMediaCapture } = mediaData || false;
  // console.log(`ErfFormAdrForm ----modalMediaViewer`, modalMediaViewer);
  // console.log(`ErfFormAdrForm ----modalMediaCapture`, modalMediaCapture);

  useEffect(() => {
    updateMediaData({
      data: erf, // Either erf or ast or trn
      irepsKeyItem: "erf",
    });
    return () => updateMediaData(initValue);
  }, [erf, initValue]);

  const {
    street,
    streetAdr,
    country,
    province,
    dm,
    lmMetro,
    town,
    ward,
    // suburbTownship,
    systemAdr,
  } = address;
  // console.log(`street`, street);

  const [updateErf] = useUpdateErfMutation({
    lmMetro: workbase,
    uid: uid,
    displayName: displayName,
  });
  // console.log(`updateErf`, updateErf);

  // const isErfFake = erf?.erfNo?.slice(0, 2) === "FE";
  // console.log(`isErfFake`, isErfFake);

  // const erfType = isErfFake ? "Fake" : "Formal";
  // console.log(`erfType`, erfType);

  const [str] = useState(street);
  // console.log(`streetAdr`, streetAdr);

  const [id] = useState(erfId);
  // console.log(`id`, id);
  const [strNo] = useState(streetAdr?.strNo || "");
  // console.log(`strNo`, strNo);
  const [strName] = useState(streetAdr?.strName || "");
  // console.log(`strName`, strName);
  const [strType] = useState(streetAdr?.strType || "");
  // console.log(`strType`, strType);

  const { manageUpload } = useStorage();

  const onSubmit = async (values, actions) => {
    console.log(`  `);
    console.log(`  `);
    console.log(
      `ErfFormAdrForm ----START START START submittimng ErfFormAdrForm `
    );
    console.log(
      `ErfFormAdrForm ----START START START submittimng ErfFormAdrForm `
    );
    console.log(
      `ErfFormAdrForm ----onSubmit values`,
      JSON.stringify(values, null, 2)
    );

    try {
      setFormSubmit(true);
      // if (!isConnected && isInternetReachable) {
      //   // Offline - save locally
      //   console.log(
      //     `ErfFormAdrForm ----Device offine - isConnecred: `,
      //     isConnected
      //   );
      //   dispatch(addPendingForm({ id: erfId, data: values }));
      //   router.navigate("erfs");
      //   Alert.alert("Device offline", "Form data saved locally");
      //   return;
      // }

      // check if there is media array
      const { media: testMedia } = values;
      console.log(`ErfFormAdrForm ----testMedia`, testMedia);
      console.log(`ErfFormAdrForm ----testMedia?.length`, testMedia?.length);

      let formData = { ...values };
      if (testMedia && testMedia?.length > 0) {
        console.log(
          `ErfFormAdrForm ----There is a media array - go get url(s)`
        );
        formData = await manageUpload(values, "erf");
        console.log(`ErfFormAdrForm ----formData`, formData);
      }

      const { strNo, strName, strType, media } = formData || {};
      console.log(`ErfFormAdrForm ----media`, media);

      const address = {
        streetAdr: {
          strNo: strNo || "",
          strName: strName || "",
          strType: strType || "",
        },
        street: `${strNo} ${strName} ${strType}`,
      };
      console.log(`ErfFormAdrForm ----address`, address);

      // Call method (updateErf) to update the erf address
      const erfUpdateResult = await updateErf({
        erfNo: erfNo,
        displayName: "displayName",
        uid: "uid",
        erfData: {
          address,
          media: media || [],
        },
        id: erfId,
      });
      console.log(`ErfFormAdrForm ----erfUpdateResult`, erfUpdateResult);

      // Check if erf update is successful
      if (erfUpdateResult.data) {
        // Reset the form
        actions.resetForm();

        // Redirect to erfs page
        router.replace("/(tabs)/erfs");

        // display success notice
        Alert.alert("Erf Update Success", erfUpdateResult.data);
      } else if (erfUpdateResult?.error) {
        Alert.alert("Erf Update Failure", erfUpdateResult.error);
      }
    } catch (error) {
      console.log(
        `ErfFormAdrForm ----Error submiting form in ErfFormAdrForm`,
        error
      );
    } finally {
      setFormSubmit(false);

      console.log(`ErfFormAdrForm ----END END END submittimng ErfFormAdrForm `);
      console.log(`ErfFormAdrForm ----END END END submittimng ErfFormAdrForm `);
      console.log(`  `);
      console.log(`  `);
    }
  };

  console.log(`ErfFormAdrForm ----END END`);
  console.log(`ErfFormAdrForm ----END END`);
  console.log(` `);
  console.log(` `);

  return (
    <Formik
      initialValues={{
        id,
        strNo,
        strName,
        strType,
        metadata: {
          irepsKeyItem: "erf",
        },
        media,
      }}
      onSubmit={onSubmit}
      validationSchema={strAdrSchema}
      enableReinitialize={true}
    >
      {(formik) => {
        // console.log(
        //   `ErfFormAdrForm ----formik.values`,
        //   JSON.stringify(formik.values, null, 2)
        // );

        // console.log(
        //   `ErfFormAdrForm ----formik.errors`,
        //   JSON.stringify(formik.errors, null, 2)
        // );

        return (
          <View style={{ flex: 1 }}>
            {/* <FormHeader
              title={title}
              headerRightRight={erfType}
              headerRightLeft="Erf Type"
              isConnected={isConnected}
            /> */}

            <ScrollView style={{ flex: 1 }}>
              <View style={{ flex: 1, margin: 20 }}>
                {/* Google adr - systemAdr */}
                <View
                  style={{
                    backgroundColor: "cornsilk",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {systemAdr}
                  </Text>
                </View>
                {/* Old street ( Existing Street Adr ) - str */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    // borderTopWidth: 1,
                    // borderBottomWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      // fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    {str}
                  </Text>
                </View>

                {/* New str adr data */}
                <View
                  style={{
                    flex: 5,
                    alignItems: "center",
                  }}
                >
                  {/* Erf NON CHANGEABLE data from erfs collection */}
                  <View
                    style={{
                      backgroundColor: "cornsilk",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        // fontSize: 20,
                        textAlign: "center",
                        flexDirection: "row",
                        borderBottomWidth: 1,
                      }}
                    >
                      {`${country ? country : "Country"} - ${
                        province ? province : "??"
                      } - ${dm ? dm : "Dm"} -${
                        lmMetro ? lmMetro : "Lm/Metro"
                      } -${town ? town : "Town"} - ward: ${
                        ward ? ward : "Ward No"
                      }`}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {`${
                        formik.values?.strNo ? formik.values?.strNo : "Str No"
                      } - ${
                        formik.values?.strName
                          ? formik.values?.strName
                          : "Str Name"
                      } - ${
                        formik.values?.strType &&
                        formik.values?.strType !== "Select"
                          ? formik.values?.strType
                          : "Str Type"
                      }`}
                    </Text>
                  </View>
                </View>

                {/* Erf Form */}
                <View style={{ gap: 40 }}>
                  {/* Str No */}
                  <FormikControl
                    control="formikInput"
                    name="strNo"
                    label="Street No"
                    placeHolder="Street No"
                    icon={<FontAwesome name="road" size={27} />}
                  />

                  {/* Str Name */}
                  <FormikControl
                    control="formikInput"
                    name="strName"
                    label="Street Name"
                    placeHolder="Street Name"
                    icon={<Entypo name="address" size={27} />}
                  />

                  {/* Str Type */}
                  <FormikControl
                    control="formikSelect"
                    name="strType"
                    label="Street Type"
                    placeHolder="Street Type"
                    icon={
                      <MaterialCommunityIcons name="form-select" size={27} />
                    }
                    iconColor="gray"
                    options={strTypeOptions}
                  />

                  <FormikControl
                    control="formikMediaBtn"
                    name={`media.customerAdr`}
                    label="customer adr media"
                    placeHolder="Customer Adr Media"
                    icon={
                      <Octicons
                        name="question"
                        size={24}
                        // onPress={() => handleHelp("astData.media.noAccess")}
                      />
                    }
                    media={media}
                    ml1="erfs"
                    mediaCat="customerAdr"
                  />
                </View>
              </View>
            </ScrollView>

            <FormFooter
              erf={erf}
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
              formik={formik}
              isLoading={formik.isSubmitting}
            />
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

export default ErfFormAdrForm;
