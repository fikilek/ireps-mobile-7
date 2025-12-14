import { Text, View } from "react-native";

const HeaderLeft = (props) => {
  console.log(` `);
  console.log(` `);
  console.log(`HeaderLeft ----props`, props);

  const { title } = props;

  console.log(` `);
  console.log(` `);

  return (
    <View>
      <Text style={{ fontSize: 18 }}>{title}</Text>
    </View>
  );
};

export default HeaderLeft;
