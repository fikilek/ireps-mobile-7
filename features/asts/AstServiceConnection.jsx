import DataDetailWrapper from "../../components/DataDetailWrapper";
import DataDisplayComponent from "../../components/DataDisplayComponent";

const AstAnomaly = (props) => {
  const { serviceConnection } = props;

  return (
    <DataDetailWrapper>
      {/* Status*/}
      <DataDisplayComponent label={"Status"} data={serviceConnection?.status} />
      {/* Off Grid Supply */}
      <DataDisplayComponent
        label={"Off Grid Supply"}
        data={serviceConnection?.offGridSupply}
      />
    </DataDetailWrapper>
  );
};

export default AstAnomaly;
