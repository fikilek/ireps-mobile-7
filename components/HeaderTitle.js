import { useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const HeaderTitle = (props) => {
  console.log(` `);
  console.log(` `);
  console.log(`HeaderTitle ----props`, props);

  const { erfType } = useGlobalSearchParams();
  // console.log(`HeaderTitle ----erfType`, erfType);

  if (erfType === null || typeof erfType === "undefined") {
    console.log(`HeaderTitle ----There is no erfType - return`);
    return;
  }

  console.log(` `);
  console.log(` `);

  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          fontSize: 18,
          paddingLeft: 20,
          color: "blue",
          fontWeight: "bold",
        }}
      >
        {erfType}
      </Text>
    </View>
  );
};

export default HeaderTitle;
