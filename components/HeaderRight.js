import { useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const HeaderRight = (props) => {
  console.log(` `);
  console.log(` `);
  console.log(`HeaderRight ----props`, props);

  const params = useGlobalSearchParams();
  // console.log(`HeaderRight ----params`, params);

  if (
    params === null ||
    params === undefined ||
    typeof params === "undefined" ||
    Object.keys(params).length === 0
  ) {
    console.log(`HeaderRight ----There is no params - return`);
    return;
  }

  const { erf } = params;
  // console.log(`HeaderRight ----erf`, erf);

  const parsedErf = JSON.parse(erf);
  // console.log(`HeaderRight ----parsedErf`, parsedErf);

  const { erfNo } = parsedErf;

  console.log(` `);
  console.log(` `);

  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 18, paddingLeft: 20 }}>Erf:</Text>
      <Text style={{ fontSize: 18, color: "blue", fontWeight: "bold" }}>
        {erfNo}
      </Text>
    </View>
  );
};

export default HeaderRight;
