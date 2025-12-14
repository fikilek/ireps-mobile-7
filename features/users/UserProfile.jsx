import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { CustomDropdown } from "../../components/customDropdown/CustomDropdown";
import DisplayBox from "../../components/DisplayBox";
import { useAuth } from "../../context/authContext";
import { useSps } from "../../hooks/useSps";
import { useUpdateUserMutation } from "../../redux/usersSlice";

const UserProfile = (props) => {
  // console.log(`User props`, JSON.stringify(props, null, 2));

  const [updateUser, { isError, isLoading, isSuccess }] = useUpdateUserMutation(
    {
      uid,
      displayName,
    }
  );

  const { sps } = useSps();
  // console.log(`sps`, sps);

  const [show, setshow] = useState(true);

  const toggleView = () => {
    setshow((prev) => (prev = !show));
  };

  const { userData } = props;
  // console.log(`UserProfile userData`, JSON.stringify(userData, null, 2));

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

  const workbaseOptions = workbases?.map((wb) => {
    return {
      key: wb?.id,
      id: wb?.id,
      value: wb,
      label: wb,
    };
  });

  const { user, setUser, updateWorkbase } = useAuth();
  // console.log(`user`, user);
  // console.log(`UserProfile Auth user`, JSON.stringify(user, null, 2));

  const { displayName, uid } = user || {};
  // console.log(`uid`, uid);
  // console.log(`useErfs claims`, claims);

  // const { workbase } = claims || {};
  // console.log(`useErfs workbase`, workbase);

  const editUser = () => {
    // console.log(`Edit user`);
    router.navigate({
      pathname: `/admin/userForm_`,
      params: {
        userData: JSON.stringify({ email, surname, name, phoneNumber }),
        id: JSON.stringify(uid),
      },
    });
  };

  const handleWorkbaseChange = async (value) => {
    // console.log("handleWorkbaseChange - Selected value?.value:", value?.value);
    // console.log("handleWorkbaseChange - userData:", userData);
    // console.log("handleWorkbaseChange - displayName:", displayName);
    // console.log("handleWorkbaseChange - uid:", uid);

    const workbase = value?.value;
    // console.log(`workbase`, workbase);

    // update user status
    // TODO: Write a cloud function that will update auth on user write
    // step 1: update firebase auth workbase
    const wbUpdateResult = await updateWorkbase(workbase);
    // console.log(`wbUpdateResult`, wbUpdateResult);

    // step 2: uppdate firebase firestore users document workbase
    const updateUserResult = updateUser({
      displayName,
      id: id,
      userData: {
        ...userData,
        workbase: value?.value,
      },
    });
    // console.log(`updateUserResult`, updateUserResult);
    // console.log(`updateUserResult`);

    // const user = auth.currentUser;
    // if (user) {
    //   const idToken = await auth.currentUser.getIdTokenResult(true);
    //   console.log(`idToken.claims.roles`, idToken.claims.roles);
    //   setUser({
    //     ...user,
    //     claims: idToken.claims.roles,
    //   });
    // }

    if (updateUserResult?.data) {
      Alert.alert(`User workbase update`, updateUserResult?.data);
    }
    if (updateUserResult?.error) {
      Alert.alert(`User workbase failure`, updateUserResult.error);
    }
  };

  return (
    <View
      style={{
        // flex: 1,
        // width: "96%",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        alignSelf: "flex-end",
        padding: 5,
        margin: 5,
        gap: 5,
        borderWidth: 1,
        borderLeftColor: spId ? null : "red",
        borderLeftWidth: spId ? 1 : 6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "lightgrey",
          padding: 5,
        }}
      >
        <Text>User Profile</Text>
        <Text>
          {surname} {name}
        </Text>
      </View>
      {/* Email, phone number */}
      <View style={{ flexDirection: "row", gap: 5, width: "100%", height: 40 }}>
        <MaterialIcons
          name="edit"
          size={20}
          color="indigo"
          onPress={editUser}
          style={{ padding: 3, borderWidth: 1 }}
        />
        <DisplayBox title={"email"} data={email} />
        <DisplayBox title={"status"} data={status} />
        {/* TODO: protect the menu for aloowed users only */}
        {/* <CustomDropdown
          options={formSelectOptions.spStatusOptions}
          onValueChange={handleUserStatusChange}
          // placeholder="Choose"
          initialValue={{
            label: status,
            value: status,
          }}
        /> */}
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
          <View style={{ flexDirection: "row", gap: 5, height: 40 }}>
            <DisplayBox title={"Surname"} data={surname} />
            <DisplayBox title={"Name"} data={name} />
            <DisplayBox title={"Phone Number"} data={phoneNumber} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
              height: 60,
            }}
          >
            {/* Service Provider (company) the user belongs to */}
            <DisplayBox title={"Service Provider"} data={spName} />

            {/* Workbase (municipality) active for the user */}
            {/* User choose a workbase from the available workbases */}
            {/* <DisplayBox title={"workbase"} data={workbase} /> */}
            <DisplayBox
              title={"workbase"}
              data={
                <CustomDropdown
                  options={workbaseOptions}
                  onValueChange={handleWorkbaseChange}
                  initialValue={{
                    label: workbase,
                    value: workbase,
                  }}
                  borderWidth={0}
                />
              }
            />
          </View>

          {/* Workbases (municipalities the user is allowed access to) */}
          {/* User is allocated these workbases by the manager role */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
              width: "100%",
              height: 120,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
                width: "100%",
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
            {/* <View
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
            </View> */}
          </View>
        </>
      )}
    </View>
  );
};

export default UserProfile;
