import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, View } from "react-native";
import BtnText from "./BtnText";
import FormBtn from "./FormBtn";
import LoadingIndicatorWrapper from "./LoadingIndicatorWrapper";

const FormSubmitBtn = (props) => {
  const { isLoading, onSubmit, formik } = props;

  // Disable the submit btn if the form has been touched and there are errors
  const { isValid, dirty } = formik;
  // console.log(`isValid`, isValid);
  // console.log(`dirty`, dirty);
  const btnBckgColor = isValid && dirty ? "green" : "orange"; //Btn background color

  return (
    <View>
      {isValid && dirty ? (
        isLoading ? (
          <LoadingIndicatorWrapper>
            <ActivityIndicator size="large" color="black" />
          </LoadingIndicatorWrapper>
        ) : (
          <FormBtn
            isLoading={isLoading}
            onPress={onSubmit}
            bgdColor={btnBckgColor}
          >
            <BtnText title={"Submit"} />
          </FormBtn>
        )
      ) : (
        <FormBtn bgdColor={btnBckgColor}>
          <FontAwesome name="hand-stop-o" size={24} color="white" />
        </FormBtn>
      )}
    </View>
  );
};

export default FormSubmitBtn;
