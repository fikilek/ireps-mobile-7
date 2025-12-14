import { Text, View } from "react-native";

import PageRowAstsBtn from "../../components/page/PageRowAstsBtn";
import PageRowBtnData from "../../components/page/PageRowBtnData";
import { irepsDictionary, truncateString } from "../../utils/utilsCommon";

const Ast = ({ ast }) => {
  // console.log(`Ast ast`, JSON.stringify(ast, null, 2));
  const { anomalies, astData, erf, trns, media } = ast;
  // console.log(`address`, address);

  const anomaly = anomalies?.anomaly;

  const astNo = astData?.astNo;
  // const type = astData?.meter?.type;
  // const phase = astData?.meter?.phase;
  const cb = astData?.meter?.cb?.size;
  const sealNo = astData?.meter?.seal?.sealNo;

  // const {streetAdr} = erf?.address;
  // const propertyType = erf?.address?.propertyType?.type;

  // const meterState = astData?.astState?.state;
  // const meterStateName = astData?.astState?.name;
  const {
    erfNo,
    address: { streetAdr },
    // ,
  } = erf || {};

  const { strNo, strName, strType } = streetAdr || {};
  const strAdr =
    strNo === undefined ||
    strNo === null ||
    strNo === "" ||
    strName === undefined ||
    strName === null ||
    strName === "" ||
    strType === undefined ||
    strType === null ||
    strType === ""
      ? ""
      : `${strNo} ${strName} ${strType}`;

  return (
    <View
      style={{
        padding: 5,
        gap: 4,
      }}
    >
      {/* row 1 */}
      <View style={{ flex: 1, flexDirection: "row", gap: 3 }}>
        {/* Ast Details - meter */}
        <PageRowAstsBtn
          // flexNo={1}
          title="Meter Details"
          ast={ast}
          action="astDetails"
          displays="astsDisplays"
        >
          <PageRowBtnData data={truncateString(astNo)} />
        </PageRowAstsBtn>

        {/* erf */}
        <PageRowAstsBtn
          flexNo={1}
          title="Erf/Adr"
          ast={ast}
          // action="astErf"
          // displays="astsDisplays"
          noAction={true} // A true i
        >
          <PageRowBtnData data={erfAdr(erfNo, strAdr)} />
        </PageRowAstsBtn>

        {/* CB */}
        <PageRowAstsBtn
          flexNo={1}
          title="CB"
          ast={ast}
          // action="astCb"
          // displays="astsDisplays"
          noAction={true} // A true i
        >
          <PageRowBtnData data={cb} />
        </PageRowAstsBtn>

        {/* Seal */}
        <PageRowAstsBtn
          flexNo={1}
          title="Seal"
          ast={ast}
          // action="astSeal"
          // displays="astsDisplays"
          noAction={true} // A true i
        >
          <PageRowBtnData data={sealNo} />
        </PageRowAstsBtn>
      </View>

      {/* row 2 */}
      <View style={{ flex: 1, flexDirection: "row", gap: 3 }}>
        {/* Anomaly */}
        <PageRowAstsBtn
          flexNo={2}
          title="Anomaly"
          ast={ast}
          // action="astAnomaly"
          // displays="astsDisplays"
          noAction={true} // A true indicates that the btn is NOT suppose ot trigger nay action. Its just for display.
        >
          <PageRowBtnData
            data={truncateString(irepsDictionary.get(anomaly?.trim()), 10)}
          />
        </PageRowAstsBtn>
        {/* Meter State */}
        <PageRowAstsBtn
          flexNo={1}
          title="State"
          ast={ast}
          action="astState"
          displays="astsDisplays"
        >
          <PageRowBtnData
            data={`${truncateString(astData?.astState?.state, 8)} `}
            state={ast?.astData?.astState?.state}
            title={"state"}
          />
        </PageRowAstsBtn>

        {/* Meter On Map */}
        <PageRowAstsBtn
          flexNo={1}
          title="GPS"
          ast={ast}
          action="astOnMap"
          displays="astsDisplays"
        >
          <PageRowBtnData data={"Map"} />
        </PageRowAstsBtn>

        {/* Media */}
        <PageRowAstsBtn
          flexNo={1}
          title="Media"
          ast={ast}
          action="astMedia"
          displays="astsDisplays"
        >
          <PageRowBtnData data={media?.length ? media?.length : 0} />
        </PageRowAstsBtn>

        {/* Transactions */}
        <PageRowAstsBtn
          // flexNo={1}
          title="Trns"
          ast={ast}
          action="astTrns"
          displays="astsDisplays"
        >
          <PageRowBtnData data={trns?.length ? trns?.length : 0} />
        </PageRowAstsBtn>
      </View>

      {/* Row 3 */}
      <View style={{ flex: 1, flexDirection: "row", gap: 3 }}>
        {/* Inspection Form */}
        {/* <PageRowAstsBtn
					flexNo={1}
					title="INSPs"
					ast={ast}
					action="astInspectionForm"
					displays="astsDisplays"
				>
					<PageRowBtnData data={8} />
				</PageRowAstsBtn> */}

        {/* Disconnection Form */}
        {/* <PageRowAstsBtn
					flexNo={1}
					title="DCNs"
					ast={ast}
					action="astDisconnectionForm"
					displays="astsDisplays"
				>
					<PageRowBtnData data={3} />
				</PageRowAstsBtn> */}

        {/* Reconnection Form */}
        {/* <PageRowAstsBtn
					flexNo={1}
					title="RCNs"
					ast={ast}
					action="astReconnectionForm"
					displays="astsDisplays"
				>
					<PageRowBtnData data={2} />
				</PageRowAstsBtn> */}

        {/* Decommissioning Form */}
        {/* <PageRowAstsBtn
					flexNo={1}
					title="Decom"
					ast={ast}
					action="astDecommissioningForm"
					displays="astsDisplays"
				>
					<PageRowBtnData data={0} />
				</PageRowAstsBtn> */}
      </View>
    </View>
  );
};

export default Ast;

const erfAdr = (erfNo, strAdr) => {
  if (!erfNo || !strAdr) {
    return <Text> No Erf/Adr </Text>;
  }
  return (
    <View>
      <Text style={{ fontSize: 10 }}>{erfNo ? erfNo : "No Erf Number"}</Text>
      <Text style={{ fontSize: 10 }}>
        {strAdr ? truncateString(strAdr) : "No Adr"}
      </Text>
    </View>
  );
};
