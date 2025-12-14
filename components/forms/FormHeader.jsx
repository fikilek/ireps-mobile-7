import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

const FormHeader = (props) => {
  const { title, headerRightLeft, headerRightRight, isConnected } = props;
  return (
    <View style={{ flexDirection: "row", backgroundColor: "yellow" }}>
      {/* Network Status */}
      <View
        style={{
          backgroundColor: isConnected ? "#4fff78ff" : "#ff9ea6ff",
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          // height: 50,
          padding: 5,
        }}
      >
        <Feather
          name={isConnected ? "wifi" : "wifi-off"}
          size={24}
          color="black"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 50,
          // width: "100%",
          flex: 1,
          alignItems: "center",
          backgroundColor: "lightgrey",
          paddingHorizontal: 5,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
        <Text style={{ fontSize: 16 }}>{headerRightLeft}</Text>
        <Text style={{ fontSize: 16, color: "blue" }}>{headerRightRight}</Text>
      </View>
    </View>
  );
};

export default FormHeader;
