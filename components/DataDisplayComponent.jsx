import { Text, View } from "react-native";

const DataDisplayComponent = ({
  label,
  data,
  borderBottomWidth = 1,
  fontSize = 14,
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
        },
        { borderBottomWidth },
      ]}
    >
      <Text style={{ fontSize: fontSize }}>{label} </Text>
      <Text style={{ fontWeight: "bold", fontSize: fontSize }}>{data}</Text>
    </View>
  );
};
export default DataDisplayComponent;
