import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import PageWrapper from "../../../components/page/PageWrapper.jsx";
import AstStateHistory from "../../../features/asts/AstStateHistory.jsx";
import { AstStatePageHeader } from "../../../features/asts/AstStatePageHeader";

const history = [
  { date: "22 Mar 2025 : 18H22", user: "John Doe", state: "connected" },
  { date: "20 Mar 2025 : 17H15", user: "Lefufu Zaku", state: "disconnected" },
  { date: "3 Feb 2025 : 10H45", user: "Zane Ngomani", state: "connected" },
  { date: "2 Feb 2025 : 13H21", user: "John Doe", state: "field" },
  {
    date: "23 Jan 2025 : 09H13",
    user: "Chalie Traore",
    state: "checkedOut",
  },
  { date: "20 Jan 2025 : 10H23", user: "John Doe", state: "stores" },
];

const AstState = () => {
  const { ast } = useLocalSearchParams();
  // console.log(`params`, params);

  const parsedAst = JSON.parse(ast);
  // console.log(`parsedAst`, parsedAst);

  const {
    astData: { astState },
    erf: { address },
  } = parsedAst || {};
  const { state } = astState || {};
  const { streetAdr } = address || {};
  const { strNo, strName, strType } = streetAdr || {};
  const strAdr = strNo
    ? `${strNo} ${strName} ${strType}`
    : "Str Adr Not Available";
  return (
    <PageWrapper>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <AstStatePageHeader
          title="Ast State"
          astState={state || ""}
          strAdr={strAdr}
          history={history}
        />

        <AstStateHistory history={history} />
      </View>
    </PageWrapper>
  );
};

export default AstState;
