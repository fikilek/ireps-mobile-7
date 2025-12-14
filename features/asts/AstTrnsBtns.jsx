import { View } from "react-native";
import TextTrnLaunc from "../../components/text/TextTrnLaunc";
import AstTrnLaunchBtn from "../../features/asts/AstTrnLaunchBtn";
import { useTrns } from "../../hooks/useTrns";

const AstTrnsBtns = (props) => {
  const { ast } = props;
  const { astData } = ast || {};
  const { astState } = astData || {};
  const { state } = astState || {};
  const { trnAllowed } = useTrns();
  return (
    <View
      style={{
        // justifyContent: "center",
        margin: 10,
        gap: 10,
        maxWidth: 350,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "space-between",
          // marginVertical: 10,
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        {trnAllowed("commission", state) && (
          <AstTrnLaunchBtn
            title={<TextTrnLaunc data={["COMMN"]} />}
            ast={ast}
            action={"trnFormMeterCommission_"}
            trnType={"commission"}
          />
        )}

        {trnAllowed("inspection", state) && (
          <AstTrnLaunchBtn
            title={<TextTrnLaunc data={["INSPECT"]} />}
            ast={ast}
            action={"trnFormMeterInspection_"}
            trnType={"inspection"}
          />
        )}
        {trnAllowed("disconnection", state) && (
          <AstTrnLaunchBtn
            title={<TextTrnLaunc data={["DSCN"]} />}
            ast={ast}
            action={"trnFormMeterDisconnection_"}
            trnType={"disconnection"}
          />
        )}
        {trnAllowed("reconnection", state) && (
          <AstTrnLaunchBtn
            title={<TextTrnLaunc data={["RCN"]} />}
            ast={ast}
            action={"trnFormMeterReconnection_"}
            trnType={"reconnection"}
          />
        )}
        {trnAllowed("vend", state) && (
          <AstTrnLaunchBtn
            title={<TextTrnLaunc data={["VEND"]} />}
            ast={ast}
            action={"trnFormMeterVend_"}
            trnType={"vend"}
          />
        )}
        {trnAllowed("decommission", state) && (
          <AstTrnLaunchBtn
            title={<TextTrnLaunc data={["DECOMMN"]} />}
            ast={ast}
            action={"trnFormMeterDecommission_"}
            trnType={"decommission"}
          />
        )}
        {trnAllowed("lost", state) && (
          <AstTrnLaunchBtn
            title={<TextTrnLaunc data={["LOST"]} />}
            ast={ast}
            action={"trnFormMeterLost_"}
            trnType={"lost"}
          />
        )}
        {trnAllowed("uninstall", state) && (
          <AstTrnLaunchBtn
            title={<TextTrnLaunc data={["UNINSTALL"]} />}
            ast={ast}
            action={"trnFormMeterUninstall_"}
            trnType={"uninstall"}
          />
        )}
        {trnAllowed("found", state) && (
          <AstTrnLaunchBtn
            title={<TextTrnLaunc data={["FOUND"]} />}
            ast={ast}
            action={"trnFormMeterFound_"}
            trnType={"found"}
          />
        )}
      </View>
    </View>
  );
};

export default AstTrnsBtns;
