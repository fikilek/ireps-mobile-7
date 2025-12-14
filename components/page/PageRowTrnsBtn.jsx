import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
// import { useTrns } from "../../hooks/useTrns.js";

const PageRowTrnsBtn = (props) => {
  // console.log(`props`, props);
  const { title, trn, erf, action, displays, children, flexNo } = props;
  // console.log(`PageRowTrnsBtn action`, action);
  // console.log(`PageRowTrnsBtn trn`, trn);
  // console.log(`PageRowTrnsBtn flexNo`, flexNo);

  let newAction = action;
  if (!action) {
    newAction = getAction(trn);
  }
  // console.log(`PageRowTrnsBtn newAction`, newAction);

  const { erfNo } = trn?.ast?.erf;
  // console.log(`PageRowTrnsBtn erfNo`, erfNo);

  const router = useRouter();

  const onPress = useCallback(() => {
    // console.log(`displays`, displays);
    // console.log(`newAction`, newAction);
    if (displays && newAction) {
      router.navigate({
        pathname: `/${displays}/${newAction}`,
        params: {
          trn: JSON.stringify(trn),
          irepsKeyItem: "trn",
          erfNo: erfNo,
          erfType: erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal",
          trnType: trn?.metadata?.trnType || "",
        },
      });
    }
  }, [displays, router, trn, erfNo, newAction]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // width,
        flex: flexNo,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        borderColor: "lightblue",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "800",
          backgroundColor: "lightblue",
          width: "100%",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          textAlign: "center",
          color: action === "" ? "rgba(117, 117, 163, 1)" : "black",
        }}
      >
        {title}
      </Text>
      {children}
    </TouchableOpacity>
  );
};

export default PageRowTrnsBtn;

export const getAction = (trn) => {
  if (!trn) return;
  const { trnType } = trn?.metadata || "";
  if (!trnType) return;
  switch (trnType) {
    case "audit":
      return "trnFormMeterAudit_";
    case "inspection":
      return "trnFormMeterInspection_";
    case "installation":
      return "trnFormMeterInstallation_";
    case "commissioning":
      return "trnFormMeterCommissioning_";
    case "checkIn":
      return "trnFormMeterCheckIn_";
    case "grv":
      return "trnFormGrv_";
    case "checkOutInit":
      return "trnFormMeterCheckOutInit_";
    case "checkOutConfirm":
      return "trnFormMeterCheckOutConfirm_";
    case "disconnection":
      return "trnFormMeterDisconnection_";
    case "reconnection":
      return "trnFormMeterReconnection_";
    case "recharge":
      return "trnFormMeterRecharge_";
    case "dispose":
      return "trnFormMeterDispose_";
    case "lost":
      return "trnFormMeterLost_";
    default:
      return null;
  }
};
