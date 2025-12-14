import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";

import { useState } from "react";
import { CustomDropdown } from "../../components/customDropdown/CustomDropdown";
import DisplayBox from "../../components/DisplayBox";
import { useAuth } from "../../context/authContext";
import { useSps } from "../../hooks/useSps";
import { useUpdateSpMutation } from "../../redux/spsSlice";
import { formSelectOptions } from "../../utils/utilsForms";

const ServiceProvider = (props) => {
  // console.log(`ServiceProvider props`, JSON.stringify(props, null, 2));

  const { sps } = useSps();
  // console.log(`sps`, sps);

  const { sp } = props;
  // console.log(`sp.tradingName`, sp.tradingName);
  // console.log(
  //   `ServiceProvider sp?.status`,
  //   JSON.stringify(sp?.status, null, 2)
  // );

  const {
    id,
    registeredName,
    registeredId,
    tradingName,
    address: {
      streetAdr: { strNo, strName, strType },
      town,
      lmMetro,
      suburbTownship,
    },
    status,
    contactPersons,
    officeComms: { phone, emailAdr, whatsApp },
    // clients,
    subContractors,
  } = sp;
  // console.log(`--`);
  // console.log(`--`);
  // console.log(`--`);
  // console.log(`--`);
  // console.log(`sp - tradingName ----------------------`, tradingName);
  // console.log(`sp - id ----------------------`, id);

  const clients = [];
  sps?.map((sp) => {
    // destructure the subContractors
    // console.log(`Checking in sub :`, sp?.tradingName);
    const { subContractors } = sp;
    // console.log(`subContractors for sub ${sp?.tradingName}`, subContractors);
    // Get id of the current sp
    const spId = id;
    // Irterarte through subs and check for id match

    subContractors?.forEach((sub) => {
      if (sub.id === spId) {
        clients?.push({
          id: sp?.id,
          name: sp?.tradingName,
        });
      }
    });
    // console.log(`clients`, clients);
  });

  const strAdr = `${strNo} ${strName} ${strType}`;

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName } = user || {};
  // console.log(`MainLayout uid`, uid);
  // console.log(`MainLayout claims`, claims);

  const [updateSp, { isError: isLoading, isSuccess }] = useUpdateSpMutation({
    uid,
    displayName,
  });

  // State to show/hide sp detail
  const [show, setshow] = useState(true);
  const toggleView = () => {
    setshow((prev) => (prev = !show));
  };

  const router = useRouter();

  // const { user } = useAuth();

  const editSp = () => {
    // console.log(`Edit sp`);
    router.navigate({
      pathname: `/admin/spForm_`,
      params: {
        spData: JSON.stringify(sp),
        newSp: JSON.stringify(false),
      },
    });
  };

  const addSubcontractor = () => {
    // console.log(`Add Subcontractor`);
    router.navigate({
      pathname: `/admin/spSubForm_`,
      params: {
        spData: JSON.stringify(sp),
      },
    });
  };

  const deleteSp = () => {
    console.log(`Delete sp`);
  };

  const showOnMap = () => {
    console.log(`Show Sp adr on map`);
  };

  const handleSpStatusChange = async (value) => {
    // console.log("handleSpStatusChange - Selected value?.value:", value?.value);

    // update sp status

    const updateTrnResult = await updateSp({
      displayName,
      uid,
      spData: {
        ...sp,
        status: value?.value,
      },
      id: id,
    });

    if (updateTrnResult?.data) {
      Alert.alert(updateTrnResult?.data);
    }
    if (updateTrnResult?.error) {
      Alert.alert(updateTrnResult.error);
    }
  };

  return (
    <View style={{ padding: 5, margin: 5, gap: 5, borderWidth: 1 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", gap: 2 }}>
        <View style={{ flexDirection: "row", flex: 1, gap: 4 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "lightgrey",
              padding: 5,
            }}
          >
            <MaterialIcons
              name="edit"
              size={20}
              color="indigo"
              onPress={editSp}
              style={{ padding: 0 }}
            />
          </View>

          <DisplayBox
            title={"Trading Name"}
            data={tradingName}
            bckColor="lightblue"
          />
          {/* <DisplayBox title={"Status"} data={status} bckColor="lightblue" /> */}
          <CustomDropdown
            options={formSelectOptions.spStatusOptions}
            onValueChange={handleSpStatusChange}
            // placeholder="Choose"
            initialValue={{
              label: status,
              value: status,
            }}
            data={tradingName}
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "lightgrey",
              padding: 5,
            }}
          >
            <MaterialIcons
              name="delete"
              size={20}
              color="indigo"
              onPress={deleteSp}
              // style={{ padding: 3, borderWidth: 1 }}
            />
          </View>

          {show ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightgrey",
                padding: 5,
              }}
            >
              <AntDesign
                name="caret-down"
                size={20}
                color="indigo"
                onPress={toggleView}
                // style={{ padding: 3, borderWidth: 1 }}
              />
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightgrey",
                padding: 5,
              }}
            >
              <AntDesign
                name="caretup"
                size={20}
                color="indigo"
                onPress={toggleView}
                // style={{ padding: 3, borderWidth: 1 }}
              />
            </View>
          )}
        </View>
      </View>

      {/* ServiceProvider Detail  */}
      <View>
        {!show && (
          <View>
            <View style={{ gap: 2 }}>
              {/* Sp particulars */}
              <View style={{ flexDirection: "row", gap: 2 }}>
                <DisplayBox title={"Reg Name"} data={registeredName} />
                <DisplayBox title={"Reg Id No"} data={registeredId} />
              </View>

              {/* Address */}
              <View style={{ gap: 2 }}>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <DisplayBox title={"Municipality"} data={lmMetro} />
                  <DisplayBox title={"Town"} data={town} />
                  <DisplayBox title={"Suburb/Tship"} data={suburbTownship} />
                </View>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <DisplayBox title={"Street Adr"} data={strAdr} />
                  <FontAwesome5
                    name="map-marked-alt"
                    size={24}
                    color="black"
                    onPress={showOnMap}
                    style={{ padding: 3, borderWidth: 1 }}
                  />
                </View>
              </View>

              {/* Office Comms */}
              <View style={{ flexDirection: "row", gap: 2 }}>
                <DisplayBox title={"Phone"} data={phone} />
                <DisplayBox title={"Email"} data={emailAdr} />
                <DisplayBox title={"WhatsApp"} data={whatsApp} />
              </View>

              {/* Contact Persons */}
              <View>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <DisplayBox
                    title={"Surname"}
                    data={contactPersons?.surname}
                  />
                  <DisplayBox title={"Name"} data={contactPersons?.name} />
                  <DisplayBox title={"Cell No"} data={contactPersons?.cellNo} />
                </View>
                <View style={{ flexDirection: "row", gap: 2 }}>
                  <DisplayBox
                    title={"Email Adr"}
                    data={contactPersons?.emailAdr}
                  />
                  <DisplayBox
                    title={"WhatsApp No"}
                    data={contactPersons?.whatsAppNo}
                  />
                  <DisplayBox
                    title={"position"}
                    data={contactPersons?.position}
                  />
                </View>
              </View>

              {/* Clients - Filter all sps for where your id shows - done dynamically on render
              for RSTE this will be Municipallities/workbases
              for Lefu this will be RSTE
              for Thato this will be RSTE
               */}

              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // padding: 5,
                  }}
                >
                  <Text>Clients</Text>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "lightgrey",
                      padding: 5,
                    }}
                  >
                    {/* <MaterialIcons
                      name="add"
                      size={20}
                      color="indigo"
                      onPress={addSubcontractor}
                    /> */}
                  </View>
                  <Text>total: {clients?.length}</Text>
                </View>

                {clients?.map((client) => {
                  return (
                    <View key={client.id} style={{ marginTop: 5 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 5,
                          backgroundColor: "lightgrey",
                        }}
                      >
                        <Text>{client.name}</Text>
                        <Text>{" --- "}</Text>
                        <Text>Users: 3</Text>
                      </View>
                    </View>
                  );
                })}
              </View>

              {/* Subcontractors - These are set by the sp - this will be an array of sp objects on the sp.
              for RSTE these will be Lefu, Thato , etc 
              for Lefu
              */}
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // padding: 5,
                  }}
                >
                  <Text>Subcontrators</Text>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "lightgrey",
                      padding: 5,
                    }}
                  >
                    <MaterialIcons
                      name="add"
                      size={20}
                      color="indigo"
                      onPress={addSubcontractor}
                    />
                  </View>
                  <Text>total: {subContractors?.length}</Text>
                </View>
                {subContractors?.map((sub) => {
                  return (
                    <View key={sub.id} style={{ marginTop: 5 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 5,
                          backgroundColor: "lightgrey",
                        }}
                      >
                        <Text>{sub.name}</Text>
                        <Text>{" --- "}</Text>

                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "lightgrey",
                            padding: 5,
                          }}
                        >
                          <MaterialIcons
                            name="delete"
                            size={20}
                            color="indigo"
                            onPress={deleteSp}
                          />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default ServiceProvider;
