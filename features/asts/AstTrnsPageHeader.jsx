import { View } from "react-native";
import DataDisplayComponent2 from "../../components/DataDisplayComponent2";
import { capitalizeFirstLetter } from "../../utils//utilsCommon";

export const AstTrnsPageHeader = (props) => {
  const { title, trns, astState, strAdr, astNo } = props;
  return (
    <View
      style={{
        height: 50,
        backgroundColor: "gainsboro",
        marginHorizontal: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
      }}
    >
      <View>
        <DataDisplayComponent2
          title={"Ast Trns"}
          data={trns?.length}
          fontSize={14}
        />
        <DataDisplayComponent2 title={"Ast Adr"} data={strAdr} fontSize={14} />
      </View>

      <View>
        <DataDisplayComponent2 title={"Ast No"} data={astNo} fontSize={14} />
        <DataDisplayComponent2
          title={"Ast State"}
          data={capitalizeFirstLetter(astState ? astState : "N/Av")}
          fontSize={14}
        />
      </View>
    </View>
  );
};

export default AstTrnsPageHeader;
