import { ActivityIndicator, Text, View } from "react-native";
import { useAuth } from "../../../context/authContext";
import UserSettings from "../../../features/users/UserSettings";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";
import { styles } from "../../../utils/utilsGlobalStyles";

const UserSettings_ = () => {
  const { user } = useAuth();
  // console.log(`user`, user);
  // console.log(`UserSettings_ user`, JSON.stringify(user, null, 2));

  const { uid } = user || {};
  // console.log(`UserSettings_ displayName`, displayName);
  // console.log(`UserSettings_ uid`, uid);
  // console.log(`UserSettings_ useErfs claims`, claims);

  // const { workbase } = claims || {};
  // console.log(`UserSettings_ workbase`, workbase);

  const { data, error, isLoading, isFetching } = useGetUserByIdQuery(uid);
  // console.log(`UserSettings_ data`, JSON.stringify(data, null, 2));

  // console.log(`UserSettings_ data`, data);
  // console.log(`UserSettings_ error`, error);
  // console.log(`UserSettings_ isLoading`, isLoading);

  // const userData = getUserById(uid);
  // console.log(`UserSettings_ userData`, userData);

  if (error) {
    return (
      <View style={styles.containerCenter}>
        <Text
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          Error in fetching User Settings
        </Text>
      </View>
    );
  }

  if (isFetching || isLoading) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size="large" style={{ paddingVertical: 20 }} />
      </View>
    );
  }
  return <UserSettings userSettingsData={data} id={uid} />;
};

export default UserSettings_;
