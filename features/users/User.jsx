import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { CustomDropdown } from "../../components/customDropdown/CustomDropdown";
import DisplayBox from "../../components/DisplayBox";
import { useAuth } from "../../context/authContext";
import { useSps } from "../../hooks/useSps";
import { useUpdateUserMutation } from "../../redux/usersSlice";
import { formSelectOptions } from "../../utils/utilsForms";

const User = (props) => {
  // console.log(`User props`, JSON.stringify(props, null, 2));

  const [updateUser] = useUpdateUserMutation({
    uid,
    displayName,
  });

  const { sps } = useSps();
  // console.log(`sps`, sps);

  const spOptions = sps?.map((sp) => {
    return {
      key: sp?.id,
      id: sp?.id,
      value: sp?.tradingName,
      label: sp?.tradingName,
    };
  });

  const [show, setshow] = useState(false);

  const toggleView = () => {
    setshow((prev) => (prev = !show));
  };

  const { userData } = props;
  // console.log(`userData`, userData);

  const router = useRouter();

  const {
    email,
    surname,
    name,
    phoneNumber,
    serviceProvider,
    status,
    id,
    workbase,
    workbases,
  } = userData;

  const { id: spId, name: spName } = serviceProvider || {};

  const { user } = useAuth();
  // console.log(`user`, user);

  const { displayName, uid } = user || {};
  // console.log(`uid`, uid);
  // console.log(`useErfs claims`, claims);

  const handleUserStatusChange = (value) => {
    // console.log(
    //   "handleUserStatusChange - Selected value?.value:",
    //   value?.value
    // );
    // console.log("handleUserStatusChange - userData:", userData);
    // console.log("handleUserStatusChange - displayName:", displayName);
    // console.log("handleUserStatusChange - uid:", uid);

    // update user status
    // TODO: Write a cloud function that will update auth on user write
    const updateUserResult = updateUser({
      displayName,
      id: id,
      userData: {
        ...userData,
        status: value?.value,
      },
    });
    // console.log(`updateUserResult`, updateUserResult);

    if (updateUserResult?.data) {
      Alert.alert(`User status update`, updateUserResult?.data);
    }
    if (updateUserResult?.error) {
      Alert.alert(`User status failure`, updateUserResult.error);
    }
  };

  const handleSpChange = async (value) => {
    // console.log("handleUserStatusChange - Selected value:", value);
    // console.log("handleUserStatusChange - userData:", userData);
    // console.log("handleUserStatusChange - displayName:", displayName);
    // console.log("handleUserStatusChange - uid:", uid);

    // update user status
    // TODO: Write a cloud function that will update auth on user write
    const updateUserResult = await updateUser({
      displayName,
      id: id,
      userData: {
        ...userData,
        serviceProvider: {
          ...userData.serviceProvider,
          id: value?.id,
          name: value?.value,
        },
      },
    });
    // console.log(`updateUserResult`, updateUserResult);

    if (updateUserResult?.data) {
      Alert.alert(`User status update`, updateUserResult?.data);
    }
    if (updateUserResult?.error) {
      Alert.alert(`User status failure`, updateUserResult.error);
    }
    // console.log(`Finished updting user - new value is : [${value?.value}]`);
    router.navigate("admin/users_");
  };

  // const editWorkbase = (value) => {
  //   // console.log(
  //   //   "handleWorkbaseChange - Selected value?.value:",
  //   //   value?.value
  //   // );
  //   // console.log("handleWorkbaseChange - userData:", userData);
  //   // console.log("handleWorkbaseChange - displayName:", displayName);
  //   // console.log("handleWorkbaseChange - uid:", uid);

  //   // update user status
  //   // TODO: Write a cloud function that will update auth on user write
  //   const updateUserResult = updateUser({
  //     displayName,
  //     id: id,
  //     userData: {
  //       ...userData,
  //       workbase: value?.value,
  //     },
  //   });
  //   console.log(`updateUserResult`, updateUserResult);

  //   if (updateUserResult?.data) {
  //     Alert.alert(`User workbase update`, updateUserResult?.data);
  //   }
  //   if (updateUserResult?.error) {
  //     Alert.alert(`User workbase failure`, updateUserResult.error);
  //   }
  // };

  return (
    <View
      style={{
        padding: 5,
        margin: 5,
        gap: 5,
        borderWidth: 1,
        borderLeftColor: spId ? null : "red",
        borderLeftWidth: spId ? 1 : 6,
      }}
    >
      {/* Email, phone number */}
      <View style={{ flexDirection: "row", flex: 1, gap: 5 }}>
        <DisplayBox title={"email"} data={email} />
        {/* TODO: protect the menu for aloowed users only */}
        <CustomDropdown
          options={formSelectOptions.spStatusOptions}
          onValueChange={handleUserStatusChange}
          // placeholder="Choose"
          initialValue={{
            label: status,
            value: status,
          }}
        />
        {!show ? (
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

      {show && (
        <>
          {/* Surname Name PhoneNumber */}
          <View style={{ flexDirection: "row", flex: 1, gap: 5 }}>
            <DisplayBox title={"Surname"} data={surname} />
            <DisplayBox title={"Name"} data={name} />
            <DisplayBox title={"Phone Number"} data={phoneNumber} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            {/* Service Provider (company) the user belongs to */}
            <DisplayBox
              title={"Service Provider"}
              data={
                <CustomDropdown
                  options={spOptions}
                  onValueChange={handleSpChange}
                  initialValue={{
                    label: serviceProvider?.name,
                    value: serviceProvider?.name,
                  }}
                  borderWidth={0}
                />
              }
            />

            {/* Workbase (municipality) active for the user */}
            {/* User choose a workbase from the available workbases */}
            <DisplayBox title={"workbase"} data={workbase} />
          </View>

          {/* Workbases (municipalities the user is allowed access to) */}
          {/* User is allocated these workbases by the manager role */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
                width: "90%",
                borderRadius: 5,
              }}
            >
              <DisplayBox
                title={"workbases"}
                data={
                  <>
                    {workbases?.map((wb, index) => {
                      return <Text key={index}>{`"${wb}"   `}</Text>;
                    })}
                  </>
                }
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "lightgrey",
                padding: 5,
              }}
            >
              <AntDesign
                name="edit"
                size={20}
                color="indigo"
                onPress={toggleView}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default User;
