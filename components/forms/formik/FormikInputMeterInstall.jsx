import { AntDesign, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Field } from "formik";
import { TextInput, View } from "react-native";
import FormikError from "./FormikError"; // Adjust the import path as necessary

import { useState } from "react";
import { useAuth } from "../../../context/authContext";
// import { useGetAstsByAstStateQuery } from "../../../redux/astsSlice";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";
import { capitalizeWords } from "../../../utils/utilsCommon";
import BarCodeScanner from "../../BarCodeScanner";
import ModalGeneric from "../../modals/ModalGeneric";
import FormDropPickerGeneric from "../FormDropPickerGeneric";
import FormikLabel from "./FormikLabel";

const FormikInputMeterInstall = (props) => {
  // console.log(`props @ FormikInputMeterInstall`, props);
  const {
    inputRef,
    label,
    name,
    placeHolder,
    icon,
    readOnly = false,
    ...rest
  } = props;

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);
  const { uid } = user || {};
  // console.log(`0...`);
  // console.log(`0...`);
  // console.log(`0...`);
  // console.log(`1... FormikInputMeterInstall uid`, uid);
  const { data } = useGetUserByIdQuery(uid);

  const { serviceProvider } = data || {};
  const { id: spId, name: spName } = serviceProvider || {};
  // console.log(`2... FormikInputMeterInstall spId`, spId);
  // console.log(`3... FormikInputMeterInstall spName`, spName);
  // console.log(`fde86e77-ba53-4d64-90f8-6aeeff23ef12`);

  // const {
  //   data: asts,
  //   isLoading,
  //   isError,
  //   isFetching,
  // } = useGetAstsByAstStateQuery({ spId });

  // TODO: restore asts
  const asts = [];

  // console.log(`4... FormikInputMeterInstall asts.length`, asts?.length);

  const [modalMsVisible, setModalMsVisible] = useState(false);
  const [modalBarcodeVisible, setModalBarcodeVisible] = useState(false);

  const options = [];
  asts?.forEach((ast, index) => {
    // console.log(`astNo`, ast?.astData?.astNo);
    const { state, id: astStateId } = ast?.astData?.astState || "";

    if (state === "checkedOut" && spId === astStateId) {
      // console.log(`state ----------------index ----`, index);
      // console.log(`state ----------------`);
      // console.log(`state ----------------`);
      // console.log(`state`, state);
      // console.log(`spId`, spId);
      // console.log(`astStateId`, astStateId);

      const { astData } = ast || {};
      const { astNo, astState } = astData || {};
      const { name } = astState || {};

      // console.log(`astNo`, astNo);

      options.push({
        label: `${astNo ? astNo : "N/Av"} - Sp Name:${name ? name : "N/Av"} `,
        value: ast?.astData?.astId ? ast?.astData?.astId : "N/Av",
        item: ast,
      });
    }
  });

  // console.log(
  //   `TrnFormMeterInstallation options`,
  //   JSON.stringify(options, null, 2)
  // );
  // console.log(`options?.length`, options?.length);

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`props @ Field`, props);
          const { field, form, meta } = props;
          const { handleBlur } = form;
          // console.log(`_____________________________________________________-`);
          // console.log(`meta?.error`, meta?.error);
          // console.log(`touched`, touched);
          // console.log(`field`, field);
          // console.log(`meta`, meta);
          // console.log(
          //   `TrnFormMeterInstallation form`,
          //   JSON.stringify(form, null, 2)
          // );

          return (
            <View style={{ height: 70, marginTop: 5, marginBottom: 30 }}>
              <FormikError meta={meta} form={form} fontSize={18} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 5,
                  paddingBottom: 1,
                  paddingTop: 1,
                  gap: 10,
                  borderColor:
                    meta.error && form.dirty
                      ? "red"
                      : readOnly
                      ? "grey"
                      : "auto",
                  height: 75,
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                    position: "relative",
                  }}
                >
                  {icon}
                  <TextInput
                    style={{
                      fontSize: 16,
                      gap: 20,
                      color: readOnly ? "grey" : "auto",
                    }}
                    className="flex-1 text-neutral-700"
                    placeholder={placeHolder}
                    onChangeText={(value) => {
                      if (!readOnly) {
                        if (name === "unitNo" || name === "strNo") {
                          form.setFieldValue(
                            name,
                            value?.trim().toUpperCase().replace(/\s/g, "")
                          );
                        } else {
                          form.setFieldValue(name, capitalizeWords(value));
                        }
                      }
                    }}
                    value={field.value}
                    onBlur={handleBlur(name)}
                    editable={readOnly ? false : true}
                  />
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: -50,
                    left: 0,
                    backgroundColor: "brown",
                    width: "104%",
                    // height: 100,
                    zIndex: 100,
                    borderRadius: 10,
                  }}
                ></View>

                <View style={{ flexDirection: "row", gap: 5 }}>
                  {meta?.value && (
                    <MaterialIcons
                      name="clear"
                      size={30}
                      color="black"
                      style={{
                        borderWidth: 1,
                        borderColor: "black",
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: "white",
                      }}
                      onPress={() => {
                        // Handle barcode scanning here
                        // console.log("Meter No Reset Pressed");
                        form.setFieldValue(name, "");
                      }}
                    />
                  )}

                  <Octicons
                    name="search"
                    size={30}
                    color="black"
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                      padding: 5,
                      backgroundColor: "white",
                    }}
                    onPress={() => {
                      setModalMsVisible(true);
                    }}
                  />

                  <AntDesign
                    name="barcode"
                    size={30}
                    color="black"
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                      padding: 5,
                      backgroundColor: "white",
                    }}
                    onPress={() => {
                      setModalBarcodeVisible(true);
                    }}
                  />
                </View>

                <FormikLabel label={label} />
              </View>
              <ModalGeneric
                modalVisible={modalMsVisible}
                setModalVisible={setModalMsVisible}
                title={"Meter Search"}
                formik={form}
              >
                <FormDropPickerGeneric
                  options={options}
                  // setActive={setActiveAsts}
                  // setActiveName={setActiveAstsName}
                  setModalVisible={setModalMsVisible}
                  formik={form}
                  name={name}
                  selectedItem={"selectedAst"}
                  placeholder={"Meter Search"}
                  searchPlaceHolder={"Type Ast No"}
                />
              </ModalGeneric>
              <ModalGeneric
                modalVisible={modalBarcodeVisible}
                setModalVisible={setModalBarcodeVisible}
                title={"Meter Search"}
                formik={form}
              >
                <BarCodeScanner
                  formik={form}
                  name={name}
                  setModalVisible={setModalBarcodeVisible}
                />
              </ModalGeneric>
            </View>
          );
        }}
      </Field>
    </>
  );
};

export default FormikInputMeterInstall;
