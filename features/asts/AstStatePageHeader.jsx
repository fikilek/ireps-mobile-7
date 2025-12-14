import { Text, View } from "react-native";
import { capitalizeFirstLetter } from "../../utils//utilsCommon";

export const AstStatePageHeader = (props) => {
  const { title, astState, strAdr, history } = props;
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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {`${title} - ${history?.length} updates`}
        </Text>
        <Text>{strAdr ? strAdr : ""}</Text>
      </View>

      <View>
        {/* <Text>State</Text> */}
        <Text style={{ fontSize: 15, marginHorizontal: 5, fontWeight: "bold" }}>
          {capitalizeFirstLetter(astState ? astState : "State Not Available")}
        </Text>
      </View>
    </View>
  );
};

export default AstStatePageHeader;
