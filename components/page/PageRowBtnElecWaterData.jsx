import { Text, View } from "react-native";

const PageRowBtnData = (props) => {
  const { data, wmData } = props;
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-even" }}>
      <Text
        style={{
          fontSize: 12,
        }}
      >
        E:{data}
      </Text>
      <Text style={{ fontWeight: "bold" }}> | </Text>
      <Text
        style={{
          fontSize: 12,
        }}
      >
        W:{wmData}
      </Text>
    </View>
  );
};

export default PageRowBtnData;
