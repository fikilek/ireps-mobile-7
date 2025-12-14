import { useLocalSearchParams } from "expo-router";
import PageWrapper from "../../../components/page/PageWrapper";
import SpSubform from "../../../features/serviceProviders/SpSubForm";

const SpSubForm_ = () => {
  // const { storesNewFormData, storesValidationSchema } = useStores();
  // console.log(`SpSubForm_ storesNewFormData`, storesNewFormData);
  // console.log(`SpSubForm_ storesValidationSchema`, storesValidationSchema);

  // const { sps } = useSps();
  // console.log(`sps`, sps);

  const { spData } = useLocalSearchParams();

  const parsedSpData = JSON.parse(spData);
  // console.log(`SpSubForm_ parsedSpData`, JSON.stringify(parsedSpData, null, 2));

  const { id, subContractors } = parsedSpData;
  // console.log(
  //   `SpSubForm_ subcontractors`,
  //   JSON.stringify(subContractors, null, 2)
  // );
  // console.log(`id`, id);

  // remove sps that are already in spData
  let filteredSps = [...subContractors];

  return (
    <PageWrapper>
      <SpSubform formData={parsedSpData} id={id} sps={filteredSps} />
    </PageWrapper>
  );
};

export default SpSubForm_;
