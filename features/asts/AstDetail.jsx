import DataDetailWrapper from "../../components/DataDetailWrapper.jsx";
import DataDisplayComponent from "../../components/DataDisplayComponent";
import { convertFromTimestamp } from "../../utils/utilsFirebase.js"; // Adjust the path as needed

const AstDetail = (props) => {
  const { ast } = props;
  // console.log(`AstDetail ast`, ast);
  return (
    <DataDetailWrapper>
      {/* <DataDisplayComponent label="Ast Details" data={ast?.astCat} /> */}
      <DataDisplayComponent
        label="Meter Creator"
        data={ast?.astCreatorTrnName}
      />
      <DataDisplayComponent label="Meter Number" data={ast?.astNo} />
      <DataDisplayComponent label="Created By User" data={ast?.createdByUser} />
      <DataDisplayComponent
        label="Created At Datetime"
        data={convertFromTimestamp(ast?.createdAtDatetime, "yyyy-MMM-dd HH:mm")}
      />
    </DataDetailWrapper>
  );
};

export default AstDetail;
