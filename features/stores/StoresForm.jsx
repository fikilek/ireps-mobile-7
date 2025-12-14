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
import {
  useCreateStoreMutation,
  useUpdateStoreMutation,
} from "../../redux/storesSlice";

import DataDisplayComponent from "../../components/DataDisplayComponent";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import PageSection from "../../components/pageSection/PageSection";
import { useAuth } from "../../context/authContext";
import { useGetUserByIdQuery } from "../../redux/usersSlice";
import { formSelectOptions } from "../../utils/utilsForms";

const StoresForm = (props) => {
  // console.log(`StoresForm ----------------------`);
  const { formData, validationSchema } = props;
  // console.log(`StoresForm formData`, JSON.stringify(formData, null, 2));

  // console.log(`StoresForm props`, props);
  // console.log(`StoresForm formData?.metadata`, formData?.metadata);
  // console.log(
  //   `StoresForm formData?.metadata`,
  //   JSON.stringify(formData?.metadata, null, 2)
  // );
  // console.log(`StoresForm validationSchema`, validationSchema);

  const [selected, setSelected] = useState("");
  // console.log(`TrnFormMeterAudit selected`, selected);

  const router = useRouter();

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName } = user || {};
  // console.log(`MainLayout uid`, uid);
  // console.log(`MainLayout claims`, claims);
  const { data } = useGetUserByIdQuery(uid);

  const { serviceProvider, workbases, workbase } = data || {};

  const { id: spId, name: spName } = serviceProvider || {};

  const [
    createStore,
    { isError: ctmError, isLoading: ctmIsLoading, isSuccess: ctmIsSuccess },
  ] = useCreateStoreMutation({
    uid,
    displayName,
  });
  // console.log(`ctmError`, ctmError);
  // console.log(`ctmIsLoading`, ctmIsLoading);
  // console.log(`ctmIsSuccess`, ctmIsSuccess);

  const [
    updateStore,
    { isError: utmError, isLoading: utmIsLoading, isSuccess: utmIsSuccess },
  ] = useUpdateStoreMutation({
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
      // console.log(`onSubmit values`, JSON.stringify(values, null, 2));
      const storeId = uuid.v4();
      // console.log(`storeId`, storeId);
      // console.log(`storeId?.metadata`, storeId?.metadata);

      if (values?.metadata?.id) {
        // console.log(`Updating existing Store with id: ${values.metadata.id}`);
        const updateTrnResult = await updateStore({
          displayName,
          uid,
          storeData: values,
          id: values.metadata.id,
        });
        // console.log(
        //   `updateTrnResult for erf [${formData?.erf?.erfNo}] : `,
        //   updateTrnResult
        // );

        if (updateTrnResult?.data) {
          // show alert  and go back
          router.navigate("admin/stores_");
          // display success notice
          Alert.alert(updateTrnResult?.data);
        }
        if (updateTrnResult?.error) {
          // Show Alert only (Do not reroute - ussr must decide)
          Alert.alert(updateTrnResult.error);
        }
      } else {
        // console.log(`Create a new store`);
        // Create a new Trn
        const createTrnResult = await createStore({
          displayName,
          uid,
          newStoreData: {
            ...values,
            owner: {
              ...values.owner,
              id: spId, //TODO: this should be spId. It must come from user credentials.
              name: spName,
              type: "sp", // ['sp','workbase']
            },
          },
          id: storeId,
        });
        // console.log(
        //   `createTrnResult  for store [${values?.storeName}] : `,
        //   createTrnResult
        // );

        if (createTrnResult?.data) {
          // show alert  and go back
          router.navigate("admin/stores_");
          // display success notice
          Alert.alert(`New [${values?.storeName}] Store created successfully`);
        }
        if (createTrnResult?.error) {
          // Show Alert only (Do not reroute - ussr must decide)
          Alert.alert(
            `Failed to create new store [${values?.storeName}] `,
            createTrnResult.error
          );
        }
      }
    },
    [createStore, updateStore, router, displayName, uid]
  );

  // console.log(`formData?.storeName`, formData?.storeName);
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
        // console.log(`StoresForm formik ------------------------------`);
        // console.log(`StoresForm formik?.values`, formik?.values);
        // console.log(`StoresForm formik?.values`, JSON.stringify(formik?.values, null, 2));

        // console.log(`StoresForm formik.dirty`, formik.dirty);
        console.log(`StoresForm formik.errors`, formik.errors);

        const storeName = formik.values?.name
          ? formik.values?.name
          : "Not Available";

        return (
          <View style={{ flex: 1 }}>
            <FormHeader
              title={"Store Form"}
              headerRightRight={
                <DataDisplayComponent
                  label={"Store"}
                  data={storeName ? storeName : " - "}
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
                {/* Store Name */}
                <PageSection
                  hr="Store Name"
                  hl=""
                  selected={"Store Name"}
                  setSelected={setSelected}
                  error={Boolean(formik.errors?.storeName)}
                >
                  <View style={{ gap: 15 }}>
                    {/* Store Owner Name */}
                    <FormikControl
                      control="formikInput"
                      name={"storeName"}
                      label="Store Name"
                      placeHolder="Store Name"
                      icon={<Octicons name="question" size={27} />}
                    />
                  </View>
                </PageSection>

                {/* Store Owner */}
                <PageSection
                  hr="Store Owner"
                  hl=""
                  selected={"Store Owner"}
                  setSelected={setSelected}
                  error={Boolean(formik.errors?.owner?.name)}
                >
                  <View style={{ gap: 15 }}>
                    {/* Store Owner Name */}
                    <FormikControl
                      control="formikInput"
                      name={`owner.name`}
                      label="owner name"
                      placeHolder="Owner Name"
                      icon={<Octicons name="question" size={27} />}
                      readOnly={true}
                    />
                  </View>
                </PageSection>

                {/* Office */}
                <PageSection
                  hr="Store Office"
                  hl=""
                  selected={"Store Office"}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.office?.phone) ||
                    Boolean(formik.errors?.office?.emailAdr)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Office Phone No */}
                    <FormikControl
                      control="formikInput"
                      name={`office.phone`}
                      label="office phone"
                      placeHolder="Office Phone"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* Office Email Adr */}
                    <FormikControl
                      control="formikInput"
                      name={`office.emailAdr`}
                      label="email adr"
                      placeHolder="Email Adr"
                      icon={<Octicons name="question" size={27} />}
                    />
                  </View>
                </PageSection>

                {/* Address */}
                <PageSection
                  hr="Store Address"
                  hl=""
                  selected={"Store Address"}
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
                      control="formikSelect"
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
                      control="formikSelect"
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
                      control="formikSelect"
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

                {/* Store Contacts */}
                <PageSection
                  hr="Store Contact Person(s)"
                  hl=""
                  selected={"Store Contact Person(s)"}
                  setSelected={setSelected}
                  error={
                    Boolean(formik.errors?.contacts?.surname) ||
                    Boolean(formik.errors?.contacts?.name) ||
                    Boolean(formik.errors?.contacts?.emailAdr) ||
                    Boolean(formik.errors?.contacts?.cellNo) ||
                    Boolean(formik.errors?.contacts?.whatsApp) ||
                    Boolean(formik.errors?.contacts?.position)
                  }
                >
                  <View style={{ gap: 15 }}>
                    {/* Surname */}
                    <FormikControl
                      control="formikInput"
                      name={`contacts.surname`}
                      label="surname"
                      placeHolder="Surname"
                      icon={<Octicons name="question" size={27} />}
                    />
                    {/* Name */}
                    <FormikControl
                      control="formikInput"
                      name={`contacts.name`}
                      label="name"
                      placeHolder="Name"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* Email Adr */}
                    <FormikControl
                      control="formikInput"
                      name={`contacts.emailAdr`}
                      label="email dr"
                      placeHolder="Email Adr"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* Cell no */}
                    <FormikControl
                      control="formikInput"
                      name={`contacts.cellNo`}
                      label="cellNo"
                      placeHolder="Cell No"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* WhatsApp */}
                    <FormikControl
                      control="formikInput"
                      name={`contacts.whatsAppNo`}
                      label="whatsApp No"
                      placeHolder="WhatsApp No"
                      icon={<Octicons name="question" size={27} />}
                    />

                    {/* Position */}
                    <FormikControl
                      control="formikInput"
                      name={`contacts.position`}
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
              trnState={"valid"}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default StoresForm;
