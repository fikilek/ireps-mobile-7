import DataDetailWrapper from "../../components/DataDetailWrapper";
import DataDisplayComponent from "../../components/DataDisplayComponent"; // <-- Update the path as needed
import { capitalizeFirstLetter } from "../../utils/utilsCommon";

const AstState = (props) => {
  const { astState } = props;
  const { state, name, comment } = astState || {};
  return (
    <DataDetailWrapper>
      {/* Ast State */}
      <DataDisplayComponent
        label={"State"}
        data={capitalizeFirstLetter(state)}
      />
      {/* Ast State Name */}
      <DataDisplayComponent label={"Name"} data={name} />
      {/* Ast State Comment */}
      <DataDisplayComponent label={"Comment"} data={comment} />
    </DataDetailWrapper>
  );
};

export default AstState;
