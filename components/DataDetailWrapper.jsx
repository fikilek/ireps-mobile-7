import { View } from "react-native";

const DataDetailWrapper = (props) => {
  const { children } = props;
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        backgroundColor: "white",
        shadowColor: "#000",
      }}
    >
      {children}
    </View>
  );
};

export default DataDetailWrapper;
