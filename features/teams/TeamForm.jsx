import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import uuid from "react-native-uuid";

import { Octicons } from "@expo/vector-icons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useUpdateErfMutation } from "../../redux/erfsSlice";
import {
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "../../redux/teamsSlice";

import DataDisplayComponent from "../../components/DataDisplayComponent";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import PageSection from "../../components/pageSection/PageSection";
import { useAuth } from "../../context/authContext";
import { useGetUserByIdQuery } from "../../redux/usersSlice";

const TeamForm = (props) => {
  // console.log(`TeamForm ----------------------`);
  const { formData, validationSchema } = props;
  // console.log(`TeamForm formData`, JSON.stringify(formData, null, 2));

  // console.log(`TeamForm props`, props);
  // console.log(`TeamForm formData?.metadata`, formData?.metadata);
  // console.log(
  //   `TeamForm formData?.metadata`,
  //   JSON.stringify(formData?.metadata, null, 2)
  // );
  // console.log(`TeamForm validationSchema`, validationSchema);

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
    createTeam,
    { isError: ctmError, isLoading: ctmIsLoading, isSuccess: ctmIsSuccess },
  ] = useCreateTeamMutation({
    uid,
    displayName,
  });
  // console.log(`ctmError`, ctmError);
  // console.log(`ctmIsLoading`, ctmIsLoading);
  // console.log(`ctmIsSuccess`, ctmIsSuccess);

  const [
    updateTeam,
    { isError: utmError, isLoading: utmIsLoading, isSuccess: utmIsSuccess },
  ] = useUpdateTeamMutation({
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

      if (values?.id) {
        // console.log(`Updating existing Team with id: ${values.metadata.id}`);
        const updateTrnResult = await updateTeam({
          displayName,
          uid,
          teamData: values,
          id: values?.id,
        });
        // console.log(
        //   `updateTrnResult for erf [${formData?.erf?.erfNo}] : `,
        //   updateTrnResult
        // );

        if (updateTrnResult?.data) {
          // show alert  and go back
          router.navigate("admin/teams_");
          // display success notice
          Alert.alert(updateTrnResult?.data);
        }
        if (updateTrnResult?.error) {
          // Show Alert only (Do not reroute - ussr must decide)
          Alert.alert(updateTrnResult.error);
        }
      } else {
        console.log(`Create a new team`);
        // Create a new Trn
        const teamId = uuid.v4();
        // console.log(`teamId`, teamId);
        // console.log(`teamId?.metadata`, teamId?.metadata);

        const createTrnResult = await createTeam({
          displayName,
          uid,
          newTeamData: values,
          id: teamId,
        });
        console.log(
          `createTrnResult  for team [${values?.teamName}] : `,
          createTrnResult
        );

        if (createTrnResult?.data) {
          // show alert  and go back
          router.navigate("admin/teams_");
          // display success notice
          Alert.alert(`${values?.teamName}`, `Team created successfully`);
        }
        if (createTrnResult?.error) {
          // Show Alert only (Do not reroute - ussr must decide)
          Alert.alert(
            `Failed to create new team [${values?.teamName}] `,
            createTrnResult.error
          );
        }
      }
    },
    [createTeam, updateTeam, router, displayName, uid]
  );

  // console.log(`formData?.teamName`, formData?.teamName);
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
        // console.log(`TeamForm formik ------------------------------`);
        // console.log(`TeamForm formik?.values`, formik?.values);
        // console.log(
        //   `TeamForm formik?.values`,
        //   JSON.stringify(formik?.values, null, 2)
        // );

        // console.log(`TeamForm formik.dirty`, formik.dirty);
        // console.log(`TeamForm formik.errors`, formik.errors);

        const teamName = formik.values?.teamName
          ? formik.values?.teamName
          : "N/A";

        return (
          <View style={{ flex: 1 }}>
            <FormHeader
              title={"Team Form"}
              headerRightRight={
                <DataDisplayComponent
                  // label={"Team"}
                  data={teamName ? teamName : " - "}
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
                {/* Team Name */}
                <PageSection
                  hr="Team"
                  hl=""
                  selected={"Team"}
                  setSelected={setSelected}
                  error={Boolean(formik.errors?.teamName)}
                >
                  <View style={{ gap: 15 }}>
                    {/* Team Owner Name */}
                    <FormikControl
                      control="formikInput"
                      name={"teamName"}
                      label="team name"
                      placeHolder="Team Name"
                      icon={<Octicons name="question" size={27} />}
                    />
                  </View>
                </PageSection>

                {/* Team Owner */}
                <PageSection
                  hr="Team Owner"
                  hl=""
                  selected={"Team Owner"}
                  setSelected={setSelected}
                  error={Boolean(formik.errors?.owner?.name)}
                >
                  <View style={{ gap: 15 }}>
                    {/* Team Owner Name */}
                    <FormikControl
                      control="formikInput"
                      name={`teamOwner.name`}
                      label="owner name"
                      placeHolder="Team Owner Name"
                      icon={<Octicons name="question" size={27} />}
                      readOnly={true}
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

export default TeamForm;
