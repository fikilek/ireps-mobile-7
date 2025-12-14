import DataDisplayComponent from "../components/DataDisplayComponent";
import { convertFromTimestamp } from "../utils/utilsFirebase";
import DataDetailWrapper from "./DataDetailWrapper";

const Metadata = (props) => {
  const { metadata } = props;
  // console.log(`metadata`, metadata);

  const createdAtDatetime = convertFromTimestamp(
    metadata?.createdAtDatetime,
    "yyyy-MMM-dd HH:mm"
  );

  const updatedAtDatetime = convertFromTimestamp(
    metadata?.updatedAtDatetime,
    "yyyy-MMM-dd HH:mm"
  );

  return (
    <DataDetailWrapper>
      <DataDisplayComponent
        label="Created At Datetime"
        data={createdAtDatetime}
      />
      <DataDisplayComponent
        label="Created By User"
        data={metadata?.createdByUser}
      />
      <DataDisplayComponent
        label="Updated At Datetime"
        data={updatedAtDatetime}
      />
      <DataDisplayComponent
        label="Updated By User"
        data={metadata?.updatedByUser}
      />
    </DataDetailWrapper>
  );
};

export default Metadata;
