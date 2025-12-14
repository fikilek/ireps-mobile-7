import { useLocalSearchParams } from "expo-router";
import PageWrapper from "../../../components/page/PageWrapper.jsx";
import SpForm from "../../../features/serviceProviders/SpForm.jsx";
import { useSps } from "../../../hooks/useSps.js";

const SpForm_ = () => {
  const { spsNewFormData, spsValidationSchema } = useSps();
  // console.log(`SpForm spsNewFormData`, spsNewFormData);
  // console.log(`SpForm spsValidationSchema`, spsValidationSchema);

  const { spData, newSp } = useLocalSearchParams();
  // console.log(`SpForm spData`, JSON.stringify(spData, null, 2));
  // console.log(`SpForm typeof newSp`, typeof newSp);
  // console.log(`SpForm newSp`, newSp);

  // const parsedSpData = JSON.parse(spData);
  // console.log(`SpForm parsedSpData`, parsedSpData);

  const parsedNewSp = JSON.parse(newSp);
  // console.log(`SpForm parsedNewSp`, parsedNewSp);

  let formData = {};
  if (parsedNewSp) {
    // console.log(`new nnnnnnnnnnnnnnnnnnnnnn`);
    formData = { ...spsNewFormData };
  } else {
    // console.log(`existing eeeeeeeeeeeeeeeeeee`);
    formData = JSON.parse(spData);
  }

  // console.log(`spForm formData`, JSON.stringify(formData, null, 2));
  return (
    <PageWrapper>
      <SpForm formData={formData} validationSchema={spsValidationSchema} />
    </PageWrapper>
  );
};

export default SpForm_;
