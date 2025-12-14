import { View } from "react-native";
import { convertFromTimestamp } from "../../utils/utilsFirebase";
import AstTrnsListItem from "./AstTrnsListItem";

const AstTrnsList = (props) => {
  const { trns, ast } = props;
  return (
    <View>
      {trns?.map((trn) => {
        const updatedAtDatetime = convertFromTimestamp(
          trn?.updatedAtDatetime,
          "yy-MMM-dd HH:mm"
        );

        return (
          <AstTrnsListItem
            key={trn?.trnId}
            date={updatedAtDatetime}
            user={trn?.updatedByUser}
            trnType={trn?.trnType}
            vendingAmount={trn?.vending?.amount}
          />
        );
      })}
      <AstTrnsListItem />
    </View>
  );
};

export default AstTrnsList;
