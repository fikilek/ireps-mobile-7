import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";

const AstTrnLaunchBtn = (props) => {
  const { title, launcTrn, trnName, ast, action, trnType } = props;
  // console.log(`title`, title);
  // console.log(`ast?.astData?.astNo`, ast?.astData?.astNo);
  // console.log(`action`, action);
  // console.log(`trnType`, trnType);

  const {
    erf: { erfNo },
  } = ast || {};

  const router = useRouter();

  const openTrn = useCallback(() => {
    if (action) {
      router.navigate({
        pathname: `/trnsDisplays/${action}`,
        params: {
          ast: JSON.stringify(ast),
          irepsKeyItem: "ast",
          erfNo: erfNo || null,
          erfType: ast?.erf?.erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal",
          trnType: trnType || "",
        },
      });
    }
  }, []);
  return (
    <TouchableOpacity
      onPress={openTrn}
      style={{
        width: 80,
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 13 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AstTrnLaunchBtn;
