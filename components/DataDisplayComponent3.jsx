import { Text, View } from "react-native";

const DataDisplayComponent3 = ({
  label,
  data,
  borderBottomWidth = 1,
  fontSize = 14,
  fontWeight = "bold",
}) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          // justifyContent: "center",
          // borderBottomWidth: 1,
          alignItems: "center",
          // padding: 5,
          // width: "90%",
          marginVertical: 2,
        },
        { borderBottomWidth },
      ]}
    >
      <Text style={{ fontSize: fontSize }}>{label} </Text>
      <Text style={{ fontWeight: fontWeight, fontSize: fontSize }}>{data}</Text>
    </View>
  );
};
export default DataDisplayComponent3;
