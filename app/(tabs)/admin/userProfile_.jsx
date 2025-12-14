import { ActivityIndicator, Text, View } from "react-native";
import { useAuth } from "../../../context/authContext";
import UserProfile from "../../../features/users/UserProfile";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";
import { styles } from "../../../utils/utilsGlobalStyles";

const UserProfile_ = () => {
  const { user } = useAuth();
  // console.log(`user`, user);
  // console.log(`UserProfile_ user`, JSON.stringify(user, null, 2));

  const { uid } = user || {};
  // console.log(`UserProfile_ displayName`, displayName);
  // console.log(`UserProfile_ uid`, uid);
  // console.log(`UserProfile_ useErfs claims`, claims);

  // const { workbase } = claims || {};
  // console.log(`UserProfile_ workbase`, workbase);

  const { data, error, isLoading, isFetching } = useGetUserByIdQuery(uid);
  // console.log(`UserProfile_ data`, JSON.stringify(data, null, 2));

  // console.log(`UserProfile_ data`, data);
  // console.log(`UserProfile_ error`, error);
  // console.log(`UserProfile_ isLoading`, isLoading);

  // const userData = getUserById(uid);
  // console.log(`UserProfile_ userData`, userData);

  if (error) {
    return (
      <View style={styles.containerCenter}>
        <Text
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          Error in fetching Trns
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
  return <UserProfile userData={data} id={uid} />;
};

export default UserProfile_;
