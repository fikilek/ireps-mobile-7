import { Text } from "react-native";

const BtnText = (props) => {
  const { title } = props;
  return (
    <Text
      style={{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
      }}
    >
      {title}
    </Text>
  );
};

export default BtnText;
