import { Text, View } from "react-native";

const TeamsSpSubs = (props) => {
  const { title, subs, totalSubs } = props;
  return (
    <View
      style={{
        borderWidth: 0,
        borderRadius: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "yellow",
          padding: 5,
          borderRadius: 5,
        }}
      >
        <View
          style={
            {
              // backgroundColor: "yellow",
            }
          }
        >
          <Text>{title}</Text>
        </View>
        <Text>{totalSubs}</Text>
      </View>
      {subs}
    </View>
  );
};

export default TeamsSpSubs;
