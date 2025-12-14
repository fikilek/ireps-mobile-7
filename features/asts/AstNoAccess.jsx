import { Text, View } from "react-native";
import { convertFromTimestamp } from "../../utils/utilsFirebase.js";

export default function AstNoAccess(props) {
  const { trn } = props;
  // console.log(`AstNoAccess trn`, trn);
  return (
    <View style={{ borderBottomWidth: 1, padding: 5, fontSize: 15 }}>
      <Text style={{ fontSize: 15 }}>
        Meter Number :
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{trn?.astNo}</Text>{" "}
      </Text>
      <Text style={{ fontSize: 15 }}>
        {`noAccessReason`} :
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {trn?.noAccessReason}
        </Text>
      </Text>
      <Text style={{ fontSize: 15 }}>
        Trn Type :
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{trn?.trnType}</Text>
      </Text>
      <Text style={{ fontSize: 15 }}>
        Last Updated By User :
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {trn?.updatedByUser}
        </Text>
      </Text>
      <Text style={{ fontSize: 15 }}>
        Last Updated At Date/Time :
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {convertFromTimestamp(trn?.updatedAtDatetime, "yyyy-MMM-dd HH:mm")}
        </Text>
      </Text>
    </View>
  );
}
