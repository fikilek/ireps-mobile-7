import FormikDatetime from "./FormikDatetime";
import FormikFieldArray from "./FormikFieldArray";
import FormikInput from "./FormikInput";
import FormikInputAccess from "./FormikInputAccess";
import FormikInputBarCodeScanner from "./FormikInputBarCodeScanner";
import FormikInputEmail from "./FormikInputEmail";
import FormikInputMeterInstall from "./FormikInputMeterInstall";
import FormikMediaBtn from "./FormikMediaBtn";
import FormikRgc from "./FormikRgc";
import FormikSelect from "./FormikSelect";
import FormikSelectCheckOutConfirm from "./FormikSelectCheckOutConfirm";
import FormikSelectMeterAccess from "./FormikSelectMeterAccess";
import FormikSelectMeterAnomaly from "./FormikSelectMeterAnomaly";
import FormikSelectMeterAnomalyDetail from "./FormikSelectMeterAnomalyDetail";
import FormikSelectMeterNaReason from "./FormikSelectMeterNaReason";
import FormikSelectScComment from "./FormikSelectScComment";
import FormikSelectScStatus from "./FormikSelectScStatus";
import FormikSelectSp from "./FormikSelectSp";
import FormikSelectStore from "./FormikSelectStore";

const FormikControl = (props) => {
  // console.log(`props`, props);

  const { control, ...rest } = props;

  switch (control) {
    case "formikInput":
      return <FormikInput {...rest} />;
    case "formikInputMeterInstall":
      return <FormikInputMeterInstall {...rest} />;

    case "formikInputAccess":
      return <FormikInputAccess {...rest} />;

    case "formikInputEmail":
      return <FormikInputEmail {...rest} />;

    case "formikInputBarCodeScanner":
      return <FormikInputBarCodeScanner {...rest} />;

    case "formikSelect":
      return <FormikSelect {...rest} />;

    case "formikSelectCheckOutConfirm":
      return <FormikSelectCheckOutConfirm {...rest} />;

    case "formikSelectSp":
      return <FormikSelectSp {...rest} />;

    case "formikSelectStore":
      return <FormikSelectStore {...rest} />;

    case "formikSelectMeterAccess":
      return <FormikSelectMeterAccess {...rest} />;

    case "formikSelectMeterNaReason":
      return <FormikSelectMeterNaReason {...rest} />;

    case "formikSelectMeterAnomaly":
      return <FormikSelectMeterAnomaly {...rest} />;

    case "formikSelectMeterAnomalyDetail":
      return <FormikSelectMeterAnomalyDetail {...rest} />;

    case "formikSelectScStatus": // Sc - Service Connection
      return <FormikSelectScStatus {...rest} />;

    case "formikSelectScComment":
      return <FormikSelectScComment {...rest} />;

    case "formikRgc":
      return <FormikRgc {...rest} />;

    case "formikMediaBtn":
      return <FormikMediaBtn {...rest} />;

    case "formikFieldArray":
      return <FormikFieldArray {...rest} />;

    case "formikDatetime":
      return <FormikDatetime {...rest} />;

    default:
      return null;
  }
};

export default FormikControl;
