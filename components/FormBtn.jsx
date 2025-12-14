import { TouchableOpacity } from "react-native";

const FormBtn = (props) => {
  const { children, isLoading, onPress, bgdColor = "blue" } = props;
  const bgndColor = isLoading ? "lightblue" : bgdColor;
  return (
    <TouchableOpacity
      style={[
        {
          height: 50,
          width: 100,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        },
        { backgroundColor: bgndColor },
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      {children}
    </TouchableOpacity>
  );
};

export default FormBtn;
