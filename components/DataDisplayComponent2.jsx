import { Text, View } from "react-native";

const DataDisplayComponent2 = (props) => {
  const {
    title,
    data,
    borderColor = "lightgrey",
    fontSize = 18,
    color = "blue",
    fontWeight,
  } = props;
  return (
    <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
      {title && <Text style={{ fontSize, fontWeight: "bold" }}>{title}</Text>}

      <Text
        style={{
          fontSize,
          borderWidth: 1,
          borderRadius: 5,
          // paddingHorizontal: 5,
          borderColor,
          color,
          fontWeight: fontWeight,
        }}
      >
        {data ? data : "N/Av"}
      </Text>
    </View>
  );
};

export default DataDisplayComponent2;
