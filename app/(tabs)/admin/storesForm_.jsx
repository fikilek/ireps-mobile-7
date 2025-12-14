import { useLocalSearchParams } from "expo-router";
import PageWrapper from "../../../components/page/PageWrapper.jsx";
import StoresForm from "../../../features/stores/StoresForm.jsx";
import { useStores } from "../../../hooks/useStores.js";

const StoresForm_ = () => {
  const { storesNewFormData, storesValidationSchema } = useStores();
  // console.log(`StoresForm_ storesNewFormData`, storesNewFormData);
  // console.log(`StoresForm_ storesValidationSchema`, storesValidationSchema);

  const { storesData } = useLocalSearchParams();
  // console.log(`StoresForm_ storesData`, JSON.stringify(storesData, null, 2));
  // console.log(`StoresForm_ typeof newStore`, typeof newStore);
  // console.log(`StoresForm_ newStore`, newStore);

  // const parsedNewStore = newStore;
  // console.log(`StoresForm_ parsedNewStore`, parsedNewStore);

  let formData = {};
  if (storesData === undefined) {
    // console.log(`new nnnnnnnnnnnnnnnnnnnnn`);
    formData = { ...storesNewFormData };
  } else {
    // console.log(`existing eeeeeeeeeeeeeeeeeee`);
    formData = { ...JSON.parse(storesData) };
  }

  // console.log(`StoresForm_ formData`, JSON.stringify(formData, null, 2));
  return (
    <PageWrapper>
      <StoresForm
        formData={formData}
        validationSchema={storesValidationSchema}
      />
    </PageWrapper>
  );
};

export default StoresForm_;
