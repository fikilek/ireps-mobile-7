import { View } from "react-native";

import PageRowBtnData from "../../components/page/PageRowBtnData";
import PageRowTrnsBtn from "../../components/page/PageRowTrnsBtn";
import {
  irepsDictionary,
  sanitize,
  truncateString,
} from "../../utils/utilsCommon";

const Trn = ({ trn }) => {
  // console.log(`Trn trn`, trn);
  const { access, ast, metadata, media } = trn;
  // console.log(`metadata`, metadata);
  // console.log(`ast`, ast);
  // console.log(`access`, access);
  // console.log(`media?.length`, media?.length);

  const { astData, erf } = ast || {};
  // console.log(`erf`, erf);

  let customerAdr = "";
  let streetAdr = erf?.address?.streetAdr;
  if (
    sanitize(streetAdr?.strNo) &&
    sanitize(streetAdr?.strName) &&
    sanitize(streetAdr?.strType)
  ) {
    streetAdr = truncateString(
      `${sanitize(streetAdr?.strNo)} ${sanitize(streetAdr?.strName)} ${sanitize(
        streetAdr?.strType
      )}`
    );
    customerAdr = streetAdr;
  } else {
    customerAdr = erf?.address?.street;
  }

  return (
    <View
      style={{
        padding: 5,
        gap: 4,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 3 }}>
        {/* Trn Type */}
        <PageRowTrnsBtn
          // flexNo={1}
          title={`${irepsDictionary.get(metadata?.trnType)} Form`}
          trn={trn}
          erf={null}
          action={null}
          displays="trnsDisplays"
        >
          <PageRowBtnData
            data={astData?.astNo ? truncateString(astData?.astNo, 9) : "No Ast"}
          />
        </PageRowTrnsBtn>

        {/* Erf No */}
        <PageRowTrnsBtn
          flexNo={1}
          title="Erf No"
          trn={trn}
          action=""
          displays=""
        >
          <PageRowBtnData data={erf?.erfNo} />
        </PageRowTrnsBtn>

        {/* Access */}
        <PageRowTrnsBtn
          flexNo={1}
          title="Access"
          trn={trn}
          action=""
          displays=""
        >
          <PageRowBtnData
            data={truncateString(
              `${access?.meterAccess} ${
                access?.meterAccess === "no"
                  ? `- ${access?.noAccessReason}`
                  : ""
              }`,
              10
            )}
          />
        </PageRowTrnsBtn>

        {/* Ward No */}
        <PageRowTrnsBtn flexNo={1} title="Ward" trn={trn} action="" displays="">
          <PageRowBtnData data={erf?.address?.ward} />
        </PageRowTrnsBtn>

        {/* Erf No */}
        <PageRowTrnsBtn
          flexNo={1}
          title="Trn State"
          trn={trn}
          action=""
          displays=""
        >
          <PageRowBtnData data={metadata?.trnState} />
        </PageRowTrnsBtn>
      </View>
      <View style={{ flex: 1, flexDirection: "row", gap: 3 }}>
        <PageRowTrnsBtn
          flexNo={1}
          title="Ast Address"
          trn={trn}
          action=""
          displays=""
        >
          <PageRowBtnData data={customerAdr} />
        </PageRowTrnsBtn>
        <PageRowTrnsBtn
          flexNo={1}
          title="Property Type"
          trn={trn}
          action=""
          displays=""
        >
          <PageRowBtnData data={erf?.propertyType?.type} />
        </PageRowTrnsBtn>
        {/* Media */}
        <PageRowTrnsBtn
          flexNo={0.3}
          title="Media"
          trn={trn}
          action="trnMedia"
          displays="trnsDisplays"
        >
          <PageRowBtnData data={media?.length} />
        </PageRowTrnsBtn>
      </View>
    </View>
  );
};

export default Trn;
