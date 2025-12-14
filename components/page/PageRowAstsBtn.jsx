import { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

const PageRowErfsBtn = (props) => {
  // console.log(`props`, props);
  const { title, ast, action, displays, children, noAction } = props;
  // console.log(`displays`, displays);
  // console.log(`action`, action);
  // console.log(`ast`, ast);

  // const width = flexNo === "none" ? "w-[100]" : "";
  const { erf } = ast;

  const router = useRouter();

  const onPress = useCallback(() => {
    if (action) {
      router.navigate({
        pathname: `/${displays}/${action}`,
        params: {
          ast: JSON.stringify(ast),
          irepsKeyItem: "ast",
          erfNo: erf?.erfNo,
          erfType: erf?.erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal",
          trnType: null,
        },
      });
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // width,
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        borderColor: "lightblue",
        height: "100%",
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
          color: action ? "black" : "rgba(117, 117, 163, 1)",
        }}
      >
        {title}
      </Text>

      {children}
    </TouchableOpacity>
  );
};

export default PageRowErfsBtn;
