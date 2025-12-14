import { View } from "react-native";
import { ListEmptyComponent } from "../../components/ListEmptyComponent";
import TrnDetail from "./TrnDetail";

const TrnsDetails = (props) => {
  // console.log(`TrnsDetails props`, props);
  const { trns } = props;
  // console.log(`TrnsDetails trns`, JSON.stringify(trns, null, 2));
  if (!trns || trns?.length === 0) {
    return <ListEmptyComponent msg="No Trns Found" />;
  }
  return (
    <View>
      {trns?.map((trn, index) => (
        <TrnDetail key={trn.trnId} trn={trn} />
      ))}
    </View>
  );
};

export default TrnsDetails;
