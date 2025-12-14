import DataDetailWrapper from "../../components/DataDetailWrapper";
import DataDisplayComponent from "../../components/DataDisplayComponent";

const ErfSgData = (props) => {
  // console.log(`ErfSgData props`, props);
  const { prclKey, erfNo } = props || {};

  return (
    <DataDetailWrapper>
      {/* SG Parcel Key */}
      <DataDisplayComponent
        label={"Parcel Key"}
        data={prclKey ? prclKey : "Not Available"}
      />
      {/* Ef No */}
      <DataDisplayComponent label={"Erf No"} data={erfNo} />
    </DataDetailWrapper>
  );
  // }
};

export default ErfSgData;
