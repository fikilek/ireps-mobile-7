import { Text, View } from "react-native";
import { convertFromTimestamp } from "../../utils/utilsFirebase.js";

export default function AstOnErf(props) {
  const { ast } = props;
  // console.log(`AstOnErf ast`, ast);
  return (
    <View style={{ borderBottomWidth: 1, padding: 5, fontSize: 15 }}>
      <Text style={{ fontSize: 15 }}>
        Meter Number :
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{ast?.astNo}</Text>{" "}
      </Text>
      <Text style={{ fontSize: 15 }}>
        {`Creator - (Audit/Installation)`} :
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {" "}
          {ast?.astCreatorTrnName}
        </Text>
      </Text>
      <Text style={{ fontSize: 15 }}>
        Created By :
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {ast?.createdByUser}
        </Text>
      </Text>
      <Text style={{ fontSize: 15 }}>
        Created At Date/Time :
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {convertFromTimestamp(ast?.createdAtDatetime, "yyyy-MMM-dd HH:mm")}
        </Text>
      </Text>
    </View>
  );
}
