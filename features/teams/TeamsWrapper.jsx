import { View } from "react-native";

const TeamsWrapper = (props) => {
  const { children } = props;
  return (
    <View style={{ backgroundColor: "brown", paddingBottom: 70 }}>
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          gap: 5,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default TeamsWrapper;
