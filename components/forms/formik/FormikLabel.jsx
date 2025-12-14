import { Text } from "react-native";

const FormikLabel = (props) => {
  const { label, top = -22, right = 10 } = props;
  return (
    <Text
      style={{
        position: "absolute",
        top: top,
        right: right,
        backgroundColor: "yellow",
        paddingHorizontal: 5,
        fontSize: 20,
        padding: 2,
        borderRadius: 5,
      }}
    >
      {label}
    </Text>
  );
};

export default FormikLabel;
