import DataDetailWrapper from "../../components/DataDetailWrapper";
import DataDisplayComponent from "../../components/DataDisplayComponent"; // <-- Update the path as needed

const AstData = (props) => {
  const { astData } = props;
  const {
    // astNo,
    astManufacturer,
    astName,
    astState: { state },
    meter: {
      cb: { size, comment: cbComment },
      seal: { sealNo, comment: sealComment },
    },
  } = astData || {};
  return (
    <DataDetailWrapper>
      {/* Ast Ast (Meter) Number */}
      {/* <DataDisplayComponent label={"Meter number"} data={astNo} /> */}
      {/* Ast Manufacturer */}
      <DataDisplayComponent label={"Manufacturer"} data={astManufacturer} />
      {/* Ast Name */}
      <DataDisplayComponent label={"Ast Name"} data={astName} />
      {/* Ast State */}
      <DataDisplayComponent label={"Ast State"} data={state} />
      {/* Ast CB Size */}
      <DataDisplayComponent label={"CB Size"} data={size} />
      {/* Ast CB Comment */}
      <DataDisplayComponent label={"CB Comment"} data={cbComment} />
      {/* Ast Seal No */}
      <DataDisplayComponent label={"Seal Number"} data={sealNo} />
      {/* Ast Seal Comment */}
      <DataDisplayComponent label={"Seal Comment"} data={sealComment} />
    </DataDetailWrapper>
  );
};

export default AstData;
