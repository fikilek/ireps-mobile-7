import { ActivityIndicator, View } from "react-native";

const StartPage = () => {
  console.log(`StartPage ---Index Running`);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="large" color={"black"} />
    </View>
  );
};

export default StartPage;
