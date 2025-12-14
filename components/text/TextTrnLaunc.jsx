import { Text, View } from "react-native";

const TextTrnLaunc = (props) => {
  // console.log(`props`, props);
  const { data } = props;
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {data?.map((text, index) => (
        <Text key={index} style={{ fontSize: 12 }}>
          {text}{" "}
        </Text>
      ))}
    </View>
  );
};

export default TextTrnLaunc;
