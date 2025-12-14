import DataDetailWrapper from "../../components/DataDetailWrapper";
import DataDisplayComponent from "../../components/DataDisplayComponent";
import { ListEmptyComponent } from "../../components/ListEmptyComponent";
import { propTypeOptions } from "./ErfPropertyTypeForm";

const ErfPropertyType = (props) => {
  // console.log(`ErfPropertyType props`, props);
  const { propertyType } = props || {};
  const { type, unitName, unitNo } = propertyType || {};

  if (!type || type == null || type === undefined || type === "") {
    return <ListEmptyComponent msg="No Property Type Found" />;
  } else {
    return (
      <DataDetailWrapper>
        <DataDisplayComponent label={"Property Type"} data={type} />
        {unitName && (
          <DataDisplayComponent
            label={`${
              propTypeOptions?.find((item) => item.value === type)?.label
            } Name`}
            data={unitName}
          />
        )}
        {unitNo && <DataDisplayComponent label={"Unit No"} data={unitNo} />}
      </DataDetailWrapper>
    );
  }
};

export default ErfPropertyType;
