import { View } from "react-native";

const PageSectionBody = (props) => {
  // console.log(`PageSectionBody`, props);
  const { hr, selected, children } = props;
  return (
    <View
      style={{
        width: "100%",
        padding: 10,
        borderRadius: 5,
      }}
    >
      {selected === hr ? children : null}
    </View>
    // <View style={{ width: "100%" }}>{children}</View>
  );
};

export default PageSectionBody;
