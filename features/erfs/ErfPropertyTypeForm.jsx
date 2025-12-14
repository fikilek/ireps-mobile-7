import { FontAwesome5, FontAwesome6, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { object, string } from "yup";

import { useNetInfo } from "@react-native-community/netinfo";
import { useDispatch } from "react-redux";
import FormFooter from "../../components/forms/FormFooter";
import FormikControl from "../../components/forms/formik/FormikControl";
import MediaAppCapture from "../../components/media/MediaAppCapture";
import MediaAppViewer from "../../components/media/MediaAppViewer";
import ModalGeneric from "../../components/modals/ModalGeneric";
import { useAuth } from "../../context/authContext";
import { useMediaContext } from "../../context/MediaContext";
import useStorage from "../../hooks/useStorage";
import { useUpdateErfMutation } from "../../redux/erfsSlice";
import { addPendingForm } from "../../redux/offlineSlice";

export const propTypeOptions = [
  {
    key: "Select",
    value: "Select",
    label: "",
    showUnitName: "no",
    showUnitNo: "no",
  },
  {
    key: "Residential (t/ship)",
    value: "Residential (t/ship)",
    label: "Residential (t/ship)",
    showUnitName: "no",
    showUnitNo: "no",
  },
  {
    key: "Residential (suburb)",
    value: "Residential (suburb)",
    label: "Residential (suburb)",
    showUnitName: "no",
    showUnitNo: "no",
  },
  {
    key: "Flats",
    value: "Flats",
    label: "Flats",
    showUnitName: "yes",
    showUnitNo: "yes",
  },
  {
    key: "Townhouses",
    value: "Townhouses",
    label: "Townhouses",
    showUnitName: "yes",
    showUnitNo: "yes",
  },
  {
    key: "Commercial",
    value: "Commercial",
    label: "Business",
    showUnitName: "yes",
    showUnitNo: "no",
  },
  {
    key: "Industrial",
    value: "Industrial",
    label: "Business",
    showUnitName: "yes",
    showUnitNo: "no",
  },
  {
    key: "Government",
    value: "Government",
    label: "Government",
    showUnitName: "yes",
    showUnitNo: "no",
  },
  {
    key: "Hospital",
    value: "Hospital",
    label: "Hospital",
    showUnitName: "yes",
    showUnitNo: "no",
  },
  {
    key: "Municipality",
    value: "Municipality",
    label: "Municipality",
    showUnitName: "yes",
    showUnitNo: "no",
  },
  {
    key: "School",
    value: "School",
    label: "School",
    showUnitName: "yes",
    showUnitNo: "no",
  },
  {
    key: "Church",
    value: "Church",
    label: "Church",
    showUnitName: "yes",
    showUnitNo: "no",
  },
  {
    key: "Vacant Stand",
    value: "Vacant Stand",
    label: "Vacant Stand",
    showUnitName: "no",
    showUnitNo: "no",
  },
];

let strAdrSchema = object().shape({
  type: string()
    .trim()
    .required("Required")
    .notOneOf(["Select", ""], "Required"),
  unitName: string()
    .trim()
    .when("type", (type, schema) => {
      // console.log(`type`, type);

      // get the selected type
      const selectedType = type[0];
      // console.log(`selectedType`, selectedType);

      // get the corresponding 'showUnitNo'
      const showUnitName = propTypeOptions.find(
        (proType) => proType?.key === selectedType
      )?.["showUnitName"];

      if (showUnitName === "yes") {
        return schema?.required("required");
      }
      if (showUnitName === "no") {
        return schema.notRequired();
      } else return schema;
    }),
  unitNo: string()
    .trim()
    .when("type", (type, schema) => {
      // console.log(`type`, type);

      // get the selected type
      const selectedType = type[0];
      // console.log(`selectedType`, selectedType);

      // get the corresponding 'showUnitNo'
      const showUnitNo = propTypeOptions.find(
        (proType) => proType?.key === selectedType
      )?.["showUnitNo"];

      if (showUnitNo === "yes") {
        return schema?.required("required");
      }
      if (showUnitNo === "no") {
        return schema.notRequired();
      } else return schema;
    }),
});

const ErfPropertyTypeForm = ({ erf, title }) => {
  console.log(`ErfPropertyTypeForm ----erf`, JSON.stringify(erf, null, 2));
  // console.log(`ErfPropertyTypeForm ----title`, title);

  const [formSubmit, setFormSubmit] = useState(false);
  console.log(`TrnFormMeterAudit ----formSubmit`, formSubmit);

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
  // console.log(`ErfPropertyTypeForm ----dispatch`, dispatch);

  // Check if user has has a workbase
  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName, claims } = user || {};
  // console.log(`MainLayout uid`, uid);

  const { workbase } = claims || {};
  // console.log(`MainLayout workbase`, workbase);

  const router = useRouter();

  const { address, propertyType, id: erfId, erfNo, media } = erf;

  const { mediaData, updateMediaData, initValue } = useMediaContext();

  const { modalMediaViewer, modalMediaCapture } = mediaData || false;
  // console.log(`ErfPropertyTypeForm ----modalMediaViewer`, modalMediaViewer);
  // console.log(`ErfPropertyTypeForm ----modalMediaCapture`, modalMediaCapture);

  useEffect(() => {
    updateMediaData({
      data: erf, // Either erf or ast or trn
      irepsKeyItem: "erf",
    });
    return () => updateMediaData(initValue);
  }, [erf, initValue]);

  const {
    streetAdr,
    country,
    province,
    dm,
    lmMetro,
    town,
    ward,
    suburbTownship,
    systemAdr,
  } = address;
  // console.log(`street`, street);

  const { type, unitName, unitNo } = propertyType || {};

  const [updateErf] = useUpdateErfMutation({
    lmMetro: workbase,
    uid: uid,
    displayName: displayName,
  });
  // console.log(`updateErf`, updateErf);

  const isErfFake = erf?.erfNo?.slice(0, 2) === "FE";
  // console.log(`isErfFake`, isErfFake);

  const erfType = isErfFake ? "Fake" : "Formal";
  // console.log(`erfType`, erfType);

  const strNo = streetAdr?.strNo || "";
  const strName = streetAdr?.strName || "";
  const strType = streetAdr?.strType || "";

  const { manageUpload } = useStorage();

  const onSubmit = async (values, actions) => {
    console.log(`  `);
    console.log(`  `);
    console.log(
      `ErfPropertyTypeForm ----START START START submittimng ErfPropertyTypeForm `
    );
    console.log(
      `ErfPropertyTypeForm ----START START START submittimng ErfPropertyTypeForm `
    );
    console.log(
      `ErfPropertyTypeForm ----onSubmit values`,
      JSON.stringify(values, null, 2)
    );

    try {
      setFormSubmit(true);
      if (!isConnected && isInternetReachable) {
        // Offline - save locally
        console.log(
          `ErfPropertyTypeForm ----Device offine - isConnecred: `,
          isConnected
        );
        dispatch(addPendingForm({ id: erfId, data: values }));
        router.navigate("erfs");
        Alert.alert("Device offline", "Form data saved locally");
        return;
      }

      // check if there is media array
      const { media: testMedia } = values;
      console.log(`ErfPropertyTypeForm ----testMediaedia`, testMedia);

      let formData = { ...values };
      if (testMedia && testMedia?.length > 0) {
        console.log(
          `ErfPropertyTypeForm ----THERE IS MEDIA ARRAY - run manageUpload)`
        );
        formData = await manageUpload(values, "erf");
        console.log(`ErfPropertyTypeForm ----formData`, formData);
      } else {
        console.log(
          `ErfPropertyTypeForm ----THERE IS NO MEDIA ARRAY - DID NOT run manageUpload)`
        );
      }

      const { type, unitName, unitNo, media } = formData || {};
      console.log(`ErfPropertyTypeForm ----media`, media);

      const propertyType = {
        type: type || "",
        unitName: unitName || "",
        unitNo: unitNo || "",
      };
      console.log(`ErfPropertyTypeForm ----propertyType`, propertyType);

      // Call method (updateErf) to update the erf address
      const erfUpdateResult = await updateErf({
        erfNo: erfNo,
        displayName: "displayName",
        uid: "uid",
        erfData: {
          propertyType,
          media: media || [],
        },
        id: erfId,
      });
      console.log(`ErfPropertyTypeForm ----erfUpdateResult`, erfUpdateResult);

      // Check if erf update is successful
      if (erfUpdateResult.data) {
        // Reset the form
        actions.resetForm();

        // console.log(`AFTER updateTrn ----isSbmitting`, isSubmiting);

        // Redirect to erfs page
        router.replace("/(tabs)/erfs");

        // display success notice
        Alert.alert("Erf Update Success", erfUpdateResult.data);
      } else if (erfUpdateResult?.error) {
        Alert.alert("Erf Update Failure", erfUpdateResult.error);
      }
    } catch (error) {
      console.log(`Error submiting form in ErfFormAdrForm`, error);
    } finally {
      setFormSubmit(false);

      console.log(
        `ErfPropertyTypeForm ----END END END submittimng ErfPropertyTypeForm `
      );
      console.log(
        `ErfPropertyTypeForm ----END END END submittimng ErfPropertyTypeForm `
      );
      console.log(`  `);
      console.log(`  `);
    }
  };

  return (
    <Formik
      initialValues={{
        id: erfId,
        type: type || "",
        unitName: unitName || "",
        unitNo: unitNo || "",
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
        // console.log(`formik.values`, formik.values);

        // console.log(`formik?.isSubmitting`, formik?.isSubmitting);
        // setIsSubmitting(formik?.isSubmitting);

        // console.log(
        //   `ErfPropertyTypeForm formik.values`,
        //   JSON.stringify(formik.values, null, 2)
        // );

        // console.log(`formik.errors`, formik.errors);

        const type = formik.values?.type || "";
        const unitName = formik.values?.unitName || "";
        const unitNo = formik.values?.unitNo || "";

        // const uName = `${propTypeOptions.find((proType) => proType.key === formik.values.type)?.type} Name`

        const showUnitName = propTypeOptions.find(
          (propType) => propType?.key === type
        )?.showUnitName;

        const showUnitNo = propTypeOptions.find(
          (propType) => propType?.key === type
        )?.showUnitNo;

        return (
          <View style={{ flex: 1, position: "relative" }}>
            {/* <FormHeader
              title={title}
              headerRightRight={erfType}
              headerRightLeft="Erf Type"
              isConnected={isConnected}
            /> */}

            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  gap: 10,
                  margin: 20,
                }}
              >
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

                {/* streetAdr data */}
                <View
                  style={{
                    flex: 5,
                    alignItems: "center",
                  }}
                >
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
                        flexDirection: "row",
                        borderBottomWidth: 1,
                      }}
                    >
                      {`${strNo ? strNo : "Str No"} - ${
                        strName ? strName : "Str Name"
                      } - ${strType ? strType : "Str Type"}    `}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {formik.values.type === "Select" ||
                      formik.values.type === undefined ||
                      formik.values.type === null ||
                      formik.values.type === ""
                        ? ``
                        : `${formik.values.type}${
                            showUnitName === "yes" ? ` ${unitName}` : ""
                          }${showUnitNo === "yes" ? ` ${unitNo}` : ""}`}
                    </Text>
                  </View>
                </View>

                {/* Erf Form */}
                <View style={{ gap: 15 }}>
                  {/* Property Type */}
                  <FormikControl
                    control="formikSelect"
                    name="type"
                    label="Property Type"
                    placeHolder="Property Type"
                    icon={<FontAwesome5 name="house-user" size={27} />}
                    options={propTypeOptions}
                  />

                  {/* Unit Name */}
                  {formik.values?.type === "Select" ||
                  formik.values?.type === undefined ||
                  formik.values?.type === null ||
                  formik.values?.type === "" ||
                  propTypeOptions.find(
                    (proType) => proType.key === formik.values?.type
                  )?.["showUnitName"] === "no" ? (
                    ""
                  ) : (
                    <FormikControl
                      control="formikInput"
                      name="unitName"
                      label={`${
                        propTypeOptions.find(
                          (proType) => proType.key === formik.values?.type
                        )?.["label"]
                      } Name`}
                      placeHolder={`${
                        propTypeOptions.find(
                          (proType) => proType.key === formik.values?.type
                        )?.["label"]
                      } Name`}
                      icon={<FontAwesome6 name="house" size={27} />}
                    />
                  )}

                  {/* Unit No */}
                  {formik.values.type === "Select" ||
                  formik.values.type === undefined ||
                  formik.values.type === null ||
                  formik.values.type === "" ||
                  propTypeOptions.find(
                    (proType) => proType.key === formik.values.type
                  )?.["showUnitNo"] === "no" ? (
                    ""
                  ) : (
                    <FormikControl
                      control="formikInput"
                      name="unitNo"
                      label="Unit No"
                      placeHolder="Unit No"
                      icon={<Octicons name="number" size={27} />}
                    />
                  )}

                  <FormikControl
                    control="formikMediaBtn"
                    name={`media.propertyType`}
                    label="property type media"
                    placeHolder="Property Type Media"
                    icon={
                      <Octicons
                        name="question"
                        size={24}
                        // onPress={() => handleHelp("astData.media.noAccess")}
                      />
                    }
                    media={media}
                    ml1="erfs"
                    mediaCat="propertyType"
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

export default ErfPropertyTypeForm;
