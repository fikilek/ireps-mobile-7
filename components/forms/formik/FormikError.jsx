import { Text } from "react-native";

const FormikError = (props) => {
  const { meta, form, fontSize = 12 } = props;
  return (
    <Text style={{ color: "red", fontSize }}>
      {meta.error ? meta.error : null}
    </Text>
  );
};

export default FormikError;
