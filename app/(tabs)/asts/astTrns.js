import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import PageWrapper from "../../../components/page/PageWrapper.jsx";
import AstTrnsBtns from "../../../features/asts/AstTrnsBtns.jsx";
import AstTrnsList from "../../../features/asts/AstTrnsList.jsx";
import AstTrnsPageHeader from "../../../features/asts/AstTrnsPageHeader";

const AstTrns = () => {
  const { ast } = useLocalSearchParams();
  // console.log(`params`, params);

  const parsedAst = JSON.parse(ast);
  // console.log(`parsedAst`, parsedAst);

  const {
    trns,
    astData,
    erf: {
      address: { streetAdr },
      erfNo,
    },
  } = parsedAst || {};

  const { strNo, strName, strType } = streetAdr || {};

  const strAdr = strNo ? `${strNo} ${strName} ${strType}` : "N/Av";
  const { astState, astNo } = astData || {};

  const { state } = astState || {};
  return (
    <PageWrapper>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <AstTrnsPageHeader
          title="Ast Trns"
          trns={trns}
          astState={state || ""}
          strAdr={strAdr}
          erfNo={erfNo}
          astNo={astNo}
        />

        <AstTrnsBtns ast={parsedAst} />
        <AstTrnsList trns={trns} ast={parsedAst} />
      </View>
    </PageWrapper>
  );
};

export default AstTrns;
