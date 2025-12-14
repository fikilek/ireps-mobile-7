import DataDetailWrapper from "../../components/DataDetailWrapper";
import DataDisplayComponent from "../../components/DataDisplayComponent"; // <-- Update the path as needed

const AstNormalisation = (props) => {
  // console.log(`props`, props);
  const { normalisation } = props || {};
  // console.log(`normalisation`, normalisation);
  const { newInstallation, actionTaken, comment } = normalisation || {};

  return (
    <DataDetailWrapper>
      {/* New Installation */}
      <DataDisplayComponent
        label={"New Installation?"}
        data={newInstallation}
      />
      {/* Action taken */}
      <DataDisplayComponent label={"Action Taken"} data={actionTaken} />
      {/* Comment */}
      <DataDisplayComponent label={"Normalisation Comment"} data={comment} />
    </DataDetailWrapper>
  );
};

export default AstNormalisation;
