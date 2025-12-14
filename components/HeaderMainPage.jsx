import { View } from "react-native";

const HeaderMainPage = (props) => {
  const { children, padding = 5 } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        // backgroundColor: "lightblue",
        alignItems: "center",
        padding: padding,
      }}
    >
      {children}
    </View>
  );
};

export default HeaderMainPage;
