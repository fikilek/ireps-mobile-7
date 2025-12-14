import { Text, View } from "react-native";

const PageRowBtnData = ({ data, state, title }) => {
  return (
    <View
      style={{
        width: "100%",
        fontSize: 12,
        backgroundColor:
          title === "state" && state === "disconnected" ? "orange" : "white",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          // backgroundColor:
          //   title === "state" && state === "disconnected" ? "orange" : "",
          // color: "white",
          textAlign: "center",
        }}
      >
        {data}
      </Text>
    </View>
  );
};

export default PageRowBtnData;
