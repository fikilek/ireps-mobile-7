import { Text, View } from "react-native";

const TeamsSpUsers = (props) => {
  const { title, users, spUsers } = props;
  return (
    <View
      style={{
        // backgroundColor: "yellow",
        borderWidth: 2,
        borderColor: "lightgrey",
        borderRadius: 5,
      }}
    >
      <View
        style={{
          backgroundColor: "yellow",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
          padding: 5,
          borderRadius: 5,
        }}
      >
        <Text>{title}</Text>
        <Text>{spUsers}</Text>
      </View>
      {users}
    </View>
  );
};

export default TeamsSpUsers;
