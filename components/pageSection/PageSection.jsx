import { View } from "react-native";

import PageSectionBody from "./PageSectionBody";
import PageSectionHeader from "./PageSectionHeader";

const PageSection = (props) => {
  // console.log(`PageSection`, props);
  const { hl, hr, selected, setSelected, error, children } = props;
  // console.log(`error`, error);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "papayawhip",
        // marginLeft: 5,
        // marginRight: 5,
        // marginBottom: 10,
        marginTop: 10,
        borderWidth: 2,
        // borderColor: "lightsteelblue",
        borderRadius: 5,
        padding: 5,

        // borderWidth: selected === hr ? 2 : null,
        borderColor: selected === hr ? "blue" : "transparent",
      }}
    >
      <PageSectionHeader
        hl={hl}
        hr={hr}
        selected={selected}
        setSelected={setSelected}
        error={error}
      />
      <PageSectionBody hr={hr} selected={selected} setSelected={setSelected}>
        {children}
      </PageSectionBody>
    </View>
  );
};

export default PageSection;
