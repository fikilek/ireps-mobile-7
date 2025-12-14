import { View } from "react-native";

const FormFooterWrapper = (props) => {
  const { children } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "lightgrey",
        height: 80,
        paddingHorizontal: 20,
      }}
    >
      {children}
    </View>
  );
};

export default FormFooterWrapper;
