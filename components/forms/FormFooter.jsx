import FormResetBtn from "../../components/FormResetBtn";
import FormSubmitBtn from "../../components/FormSubmitBtn";
import FormFooterWrapper from "./FormFooterWrapper";

const FormFooter = (props) => {
  // console.log(`Footer Btn pressed....`);
  const { onSubmit, onReset, isLoading, formik } = props;
  return (
    <FormFooterWrapper>
      <FormResetBtn onReset={onReset} isLoading={isLoading} formik={formik} />
      <FormSubmitBtn
        onSubmit={onSubmit}
        isLoading={isLoading}
        formik={formik}
      />
    </FormFooterWrapper>
  );
};

export default FormFooter;
