import { Text, View } from "react-native";
// Import or define irepsDictionary here
import DataDetailWrapper from "../../components/DataDetailWrapper.jsx";
import DataDisplayComponent from "../../components/DataDisplayComponent"; // <-- Update the path as needed
import { irepsDictionary } from "../../utils/utilsCommon.js"; // <-- Update the path as needed

const ErfStreetAddress = (props) => {
  // console.log(`ErfStreetAddress props`, props);
  const { address } = props || {};
  const {
    country,
    province,
    dm,
    lmMetro,
    ward,
    town,
    street,
    streetAdr,
    systemAdr,
  } = address || {};

  const detailedAdr = (
    <View>
      <Text style={{ fontWeight: "bold" }}>{`${
        country ? country : "Country"
      } - ${province ? irepsDictionary.get(province) : "??"} - ${
        dm ? `${dm} DM` : "Dm"
      } `}</Text>
      <Text style={{ fontWeight: "bold" }}>{`${
        lmMetro ? lmMetro : "Lm/Metro"
      } -${town ? town : "Town"} - ward ${ward ? ward : "Ward No"}`}</Text>
    </View>
  );
  return (
    <DataDetailWrapper>
      {/* Detailed adr */}
      <DataDisplayComponent label={"Ward Adr"} data={detailedAdr} />

      {/* street */}
      <DataDisplayComponent label={"Site Adr"} data={street} />

      {/* Google Adr */}
      <DataDisplayComponent label={"Google Adr"} data={systemAdr} />

      {/* street Adr */}
      <DataDisplayComponent
        label={"Street Adr"}
        data={`${streetAdr?.strNo ? streetAdr?.strNo : ""} ${
          streetAdr?.strName ? ` ${streetAdr?.strName}` : ""
        } ${streetAdr?.strType ? ` ${streetAdr?.strType}` : ""}`}
      />
    </DataDetailWrapper>
  );
};

export default ErfStreetAddress;
