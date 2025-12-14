import BtnText from "./BtnText";
import FormBtn from "./FormBtn";

const FormResetBtn = (props) => {
  const { isLoading, onReset } = props;
  return (
    <FormBtn isLoading={isLoading} onPress={onReset}>
      <BtnText title={"Reset"} />
    </FormBtn>
  );
};

export default FormResetBtn;
