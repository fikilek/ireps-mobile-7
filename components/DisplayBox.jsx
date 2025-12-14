import { Text, View } from "react-native";

const DisplayBox = (props) => {
  const { width, title, data, bckColor = "orange" } = props;
  const flex = getFlex(title);
  // console.log(`title Flex`, title, flex);

  return (
    <View style={{ width: width, borderWidth: 1, borderRadius: 3, flex: flex }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
          backgroundColor: bckColor,
          color: "blue",
        }}
      >
        {title}
      </Text>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: title === "Store Name" ? "bold" : "none",
            color: title === "Store Name" ? "Red" : "black",
            // backgroundColor: title === "Store Name" ? "Red" : "white",
            textAlign: "center",
          }}
        >
          {data}
        </Text>
      </View>
    </View>
  );
};

export default DisplayBox;

const getFlex = (title) => {
  switch (title) {
    case "Surname":
      return Number(0.5);
    case "Name":
      return Number(0.5);
    // case "Store Name":
    // 	return Number(1);

    default:
      return Number(1);
  }
};
