import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import uuid from "react-native-uuid";

import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useUpdateErfMutation } from "../../redux/erfsSlice";
import { useCreateSpMutation, useUpdateSpMutation } from "../../redux/spsSlice";

import DataDisplayComponent from "../../components/DataDisplayComponent";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import PageSection from "../../components/pageSection/PageSection";
import { useAuth } from "../../context/authContext";
import { formSelectOptions } from "../../utils/utilsForms";

const SpForm = (props) => {
  // console.log(`SpForm ----------------------`);
  const { formData, validationSchema } = props;
  // console.log(`SpForm formData`, JSON.stringify(formData, null, 2));

  // console.log(`SpForm props`, props);
  // console.log(`SpForm formData`, formData);
  // console.log(`SpForm validationSchema`, validationSchema);

  const [selected, setSelected] = useState("");
  // console.log(`TrnFormMeterAudit selected`, selected);

  const router = useRouter();

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName, spId } = user || {};
  // console.log(`MainLayout uid`, uid);
  // console.log(`MainLayout claims`, claims);

  const [
    createSp,
    { isError: ctmError, isLoading: ctmIsLoading, isSuccess: ctmIsSuccess },
  ] = useCreateSpMutation({
    uid,
    displayName,
  });
  // console.log(`ctmError`, ctmError);
  // console.log(`ctmIsLoading`, ctmIsLoading);
  // console.log(`ctmIsSuccess`, ctmIsSuccess);

  const [
    updateSp,
    { isError: utmError, isLoading: utmIsLoading, isSuccess: utmIsSuccess },
  ] = useUpdateSpMutation({
    uid,
    displayName,
  });

  // const [trnState, setTrnState] = useState(formData?.metadata?.trnState);
  // console.log(`trnState ----`, trnState);

  const handleHelp = (helpTopic) => {
    // console.log(`helpTopic`, helpTopic);
    Alert.alert(
      "iREPS Info",
      `This is the help info for this TOPIC: ${helpTopic}`
    );
  };

  const onSubmit = useCallback(
    async (values, actions) => {
      console.log(`onSubmit values`, JSON.stringify(values, null, 2));

      if (values?.metadata?.id) {
        console.log(`Updating existing Sp with id: ${values.metadata.id}`);
        const updateTrnResult = await updateSp({
          displayName,
          uid,
          spData: values,
          id: values.metadata.id,
        });
        // console.log(
        // 	`updateTrnResult for erf [${formData?.erf?.erfNo}] : `,
        // 	updateTrnResult
        // );

        if (updateTrnResult?.data) {
          // show alert  and go back
          router.navigate("admin/sps_");
          // display success notice
          Alert.alert(updateTrnResult?.data);
        }
        if (updateTrnResult?.error) {
          // Show Alert only (Do not reroute - user must decide)
          Alert.alert(updateTrnResult.error);
        }
      } else {
        console.log(`Create a new sp`);
        const spId = uuid.v4();
        console.log(`spId`, spId);
        // Create a new Trn
        const createTrnResult = await createSp({
          displayName,
          uid,
          newSpData: values,
          id: spId,
        });
        console.log(
          `createTrnResult  for sp [${values?.tradingName}] : `,
          createTrnResult
        );

        if (createTrnResult?.data) {
          // show alert  and go back
          router.navigate("admin/sps_");
          // display success notice
          Alert.alert(`${createTrnResult?.data}`);
        }
        if (createTrnResult?.error) {
          // Show Alert only (Do not reroute - ussr must decide)
          Alert.alert(
            `Failed to create new sp [${values?.tradingName}] `,
            createTrnResult.error
          );
        }
      }
    },
    [createSp, updateSp, router, displayName, uid]
  );

  // console.log(`formData?.spName`, formData?.spName);
  return (
    <Formik
      initialValues={formData}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount={true}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize={true}
    >
      {(formik) => {
        // console.log(`formik ------------------------------`);
        // console.log(`formik?.values`, formik?.values);
        // console.log(`formik?.values`, JSON.stringify(formik?.values, null, 2));

        // console.log(`formik.dirty`, formik.dirty);
        // console.log(`formik.errors`, formik.errors);

        const tradingName = formik.values?.tradingName
          ? formik.values?.tradingName
          : "Not Available";

        return (
          <View style={{ flex: 1 }}>
            <FormHeader
              title={"Sp Form"}
              headerRightRight={
                <DataDisplayComponent
                  label={"Serv/Prov"}
                  data={tradingName ? tradingName : " - "}
                  borderBottomWidth={0}
                  fontSize={18}
                />
              }
            />

            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  // gap: 10,
                  // margin: 20,
                }}
              >
                {/* Sp Identity Details */}
                <PageSection
                  hr="Identity Details"
                  hl=""
                  selected={"Identity Details"}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.registeredName) ||
                    Boolean(formik.errors?.registeredId) ||
                    Boolean(formik.errors?.tradingName)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Sp Registered Name */}
                    <FormikControl
                      control="formikInput"
                      name={"registeredName"}
                      label="registered name"
                      placeHolder="Registered Name"
                      icon={<Octicons name="question" size={27} />}
                    />
                    {/* Sp Registered Id */}
                    <FormikControl
                      control="formikInput"
                      name={"registeredId"}
                      label="registered id"
                      placeHolder="Registered Id"
                      icon={<Octicons name="question" size={27} />}
                    />
                    {/* Sp Trading Name */}
                    <FormikControl
                      control="formikInput"
                      name={"tradingName"}
                      label="trading name"
                      placeHolder="Trading Name"
                      icon={<Octicons name="question" size={27} />}
                    />
                  </View>
                </PageSection>

                {/* Office Comms */}
                <PageSection
                  hr="Office Contact Details"
                  hl=""
                  selected={"Office Contact Details"}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.officeComms?.phone) ||
                    Boolean(formik.errors?.officeComms?.emailAdr) ||
                    Boolean(formik.errors?.officeComms?.emailAdr)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Office Phone No */}
                    <FormikControl
                      control="formikInput"
                      name={`officeComms.phone`}
                      label="phone"
                      placeHolder="Phone"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* Office Email Adr */}
                    <FormikControl
                      control="formikInput"
                      name={`officeComms.emailAdr`}
                      label="email adr"
                      placeHolder="Email Adr"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* Office WhatsApp */}
                    <FormikControl
                      control="formikInput"
                      name={`officeComms.whatsApp`}
                      label="whatsapp"
                      placeHolder="WhatsApp"
                      icon={<Octicons name="question" size={27} />}
                    />
                  </View>
                </PageSection>

                {/* Address */}
                <PageSection
                  hr="Office Address"
                  hl=""
                  selected={"Office Address"}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.address?.lmMetro) ||
                    Boolean(formik.errors?.address?.town) ||
                    Boolean(formik.errors?.address?.suburbTownship) ||
                    Boolean(formik.errors?.address?.streetAdr?.strNo) ||
                    Boolean(formik.errors?.address?.streetAdr?.strName) ||
                    Boolean(formik.errors?.address?.streetAdr?.strType)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/*Municipality Name */}
                    <FormikControl
                      control="formikInput"
                      name={`address.lmMetro`}
                      label="municipality name"
                      placeHolder="Municipality Name"
                      icon={
                        <Octicons
                          name="question"
                          size={27}
                          onPress={() => handleHelp("address.lmMetro")}
                        />
                      }
                      // options={formSelectOptions.lmMetroOptions}
                    />
                    {/* Town */}
                    <FormikControl
                      control="formikInput"
                      name={`address.town`}
                      label="town"
                      placeHolder="Town"
                      icon={
                        <Octicons
                          name="question"
                          size={27}
                          onPress={() => handleHelp("address.town")}
                        />
                      }
                      // options={formSelectOptions.townOptions}
                    />
                    {/* suburbTownship */}
                    <FormikControl
                      control="formikInput"
                      name={`address.suburbTownship`}
                      label="suburbTownship"
                      placeHolder="suburbTownship"
                      icon={
                        <Octicons
                          name="question"
                          size={27}
                          onPress={() => handleHelp("address.suburbTownship")}
                        />
                      }
                      // options={formSelectOptions.suburbTownshipOptions}
                    />

                    {/* Str No */}
                    <FormikControl
                      control="formikInput"
                      name="address.streetAdr.strNo"
                      label="Street No"
                      placeHolder="Street No"
                      icon={<FontAwesome name="road" size={27} />}
                    />

                    {/* Str Name */}
                    <FormikControl
                      control="formikInput"
                      name="address.streetAdr.strName"
                      label="Street Name"
                      placeHolder="Street Name"
                      icon={<Entypo name="address" size={27} />}
                    />

                    {/* Str Type */}
                    <FormikControl
                      control="formikSelect"
                      name="address.streetAdr.strType"
                      label="Street Type"
                      placeHolder="Street Type"
                      icon={
                        <MaterialCommunityIcons name="form-select" size={27} />
                      }
                      iconColor="gray"
                      options={formSelectOptions.strTypeOptions}
                    />
                  </View>
                </PageSection>

                {/* Sp Contact Person */}
                <PageSection
                  hr="Contact Person"
                  hl=""
                  selected={"Contact Person"}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.contactPerson?.surname) ||
                    Boolean(formik.errors?.contactPerson?.name) ||
                    Boolean(formik.errors?.contactPerson?.emailAdr) ||
                    Boolean(formik.errors?.contactPerson?.cellNo) ||
                    Boolean(formik.errors?.contactPerson?.whatsApp) ||
                    Boolean(formik.errors?.contactPerson?.position)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Surname */}
                    <FormikControl
                      control="formikInput"
                      name={`contactPerson.surname`}
                      label="surname"
                      placeHolder="Surname"
                      icon={<Octicons name="question" size={27} />}
                    />
                    {/* Name */}
                    <FormikControl
                      control="formikInput"
                      name={`contactPerson.name`}
                      label="name"
                      placeHolder="Name"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* Email Adr */}
                    <FormikControl
                      control="formikInput"
                      name={`contactPerson.emailAdr`}
                      label="email dr"
                      placeHolder="Email Adr"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* Cell no */}
                    <FormikControl
                      control="formikInput"
                      name={`contactPerson.cellNo`}
                      label="cellNo"
                      placeHolder="Cell No"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* WhatsApp */}
                    <FormikControl
                      control="formikInput"
                      name={`contactPerson.whatsAppNo`}
                      label="whatsApp no"
                      placeHolder="WhatsApp No"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* Position */}
                    <FormikControl
                      control="formikInput"
                      name={`contactPerson.position`}
                      label="position"
                      placeHolder="Position"
                      icon={<Octicons name="question" size={27} />}
                    />
                  </View>
                </PageSection>
              </View>
            </ScrollView>

            <FormFooter
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
              formik={formik}
              isLoading={ctmIsLoading || utmIsLoading}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default SpForm;
