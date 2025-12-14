import DataDetailWrapper from "../../components/DataDetailWrapper";
import DataDisplayComponent from "../../components/DataDisplayComponent";

const AstAnomaly = (props) => {
  const { anomalies } = props;

  return (
    <DataDetailWrapper>
      {/* Anomaly*/}
      <DataDisplayComponent label={"Anomaly"} data={anomalies?.anomaly} />
      {/* Anomaly Detail */}
      <DataDisplayComponent
        label={"Anomaly Detail"}
        data={anomalies?.anomalyDetail}
      />
    </DataDetailWrapper>
  );
};

export default AstAnomaly;
