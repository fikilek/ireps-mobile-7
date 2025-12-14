import { View } from "react-native";

const LoadingIndicatorWrapper = (props) => {
  const { children } = props;
  return (
    <View
      style={{
        height: 50,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        color: "blue",
      }}
    >
      {children}
    </View>
  );
};

export default LoadingIndicatorWrapper;
