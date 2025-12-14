import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useUpdateErfMutation } from "../../redux/erfsSlice";

import { object, string } from "yup";
import FormFooter from "../../components/forms/FormFooter";
import FormHeader from "../../components/forms/FormHeader";
import FormikControl from "../../components/forms/formik/FormikControl";
import { useAuth } from "../../context/authContext";

let scSchema = object().shape({
  services: object().shape({
    electricity: object().shape({
      comment: string().notRequired("Required"),
      supplyErfNo: string().trim().required("Required"),
    }),
  }),
});

const ErfFormServiceConnectionElec = ({ erf, title }) => {
  // console.log(`erf`, erf);
  // console.log(`TrnFormMeterInstallation erf`, JSON.stringify(erf, null, 2));

  // Check if user has has a workbase
  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName, claims } = user || {};
  // console.log(`MainLayout uid`, uid);

  const { workbase } = claims || {};
  // console.log(`MainLayout workbase`, workbase);

  const router = useRouter();

  const { services, erfNo, id } = erf;
  // console.log(`services`, services);
  // console.log(`erfNo`, erfNo);
  // console.log(`id`, id);

  const { electricity, water } = services || {};

  const { comment, supplyErfNo } = electricity || {};

  const initialValues = {
    services: {
      electricity: {
        comment: comment ? comment : "",
        supplyErfNo: supplyErfNo ? supplyErfNo : erfNo,
      },
    },
  };

  const [actionPending, setActionPending] = useState(false);

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

  const onSubmit = async (values, actions) => {
    console.log(`Update erf with`, values);
    // Set pending update to true
    setActionPending(true);

    // Call method (updateErf) to update the erf address
    const erfUpdateResult = await updateErf({
      erfNo: erfNo,
      displayName: displayName,
      uid: uid,
      id: id,
      erfData: values,
    });
    console.log(`erfUpdateResult`, erfUpdateResult);

    // Check if erf update is successful
    if (erfUpdateResult.data) {
      // set pending update to false
      setActionPending(false);
      // Reset the form
      actions.resetForm();
      // Redirect to erfs page
      router.navigate("/erfs");
      // display success notice
      Alert.alert("Erf Update Success", erfUpdateResult.data);
    } else {
      // set pending to false
      setActionPending(false);
      Alert.alert("Erf Update Failure", erfUpdateResult.error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={scSchema}
      initialTouched={{
        "services.electricity.supplyErfNo": true,
      }}
      enableReinitialize={true}
    >
      {(formik) => {
        // console.log(`formik.values`, formik.values);
        // console.log(`formik.errors`, formik.errors);
        // console.log(`formik.dirty`, formik.dirty);

        return (
          <View style={{ flex: 1 }}>
            <FormHeader
              title={title}
              headerRightRight={"Erf Type"}
              headerRightLeft=""
            />

            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  // backgroundColor: "lightgrey",
                }}
              >
                {/* Erf Form - Service Connection - Electricity */}
                <View
                  style={{
                    gap: 10,
                    margin: 10,
                    padding: 10,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 20 }}>
                      Electicity Supply point
                    </Text>
                  </View>
                  <View style={{ gap: 20 }}>
                    <FormikControl
                      control="formikInput"
                      name="services.electricity.supplyErfNo"
                      label="suppy erf No"
                      placeHolder="Supply Erf No"
                      icon={
                        <FontAwesome6 name="house" size={27} color="black" />
                      }
                      iconColor="gray"
                    />

                    <FormikControl
                      control="formikInput"
                      name="services.electricity.comment"
                      label="comment"
                      placeHolder="Comment"
                      icon={
                        <MaterialCommunityIcons
                          name="comment-text-outline"
                          size={27}
                          color="black"
                        />
                      }
                    />
                  </View>
                </View>

                <View
                  style={{
                    margin: 10,
                    padding: 5,
                    backgroundColor: "azure",
                    alignItems: "center",
                    height: 500,
                  }}
                >
                  {/* TODO: Implement map sunctionality for the ervice point */}
                  <Text>Map for user to select [Electricity] supply point</Text>
                </View>
              </View>
            </ScrollView>

            <FormFooter
              erf={erf}
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
              formik={formik}
              isLoading={actionPending}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default ErfFormServiceConnectionElec;
