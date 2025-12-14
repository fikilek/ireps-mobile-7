import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";

const PageSectionHeader = (props) => {
  const { hl, hr, selected, setSelected, error } = props;
  // console.log(`PageSectionHeader hl`, hl);
  // console.log(`PageSectionHeader hr`, hr);
  // console.log(`PageSectionHeader error`, error);
  // console.log(`PageSectionHeader selected`, selected);

  let color = "";
  if (error) {
    color = "red";
  } else {
    color = selected === hr ? "blue" : "black";
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: error ? 2 : 0,
        borderColor: error ? "red" : "transparent",
        borderRadius: error ? 5 : 0,
      }}
      className="flex-row bg-zinc-200"
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          // justifyContent: "space-between",
          // alignItems: "center",
          padding: 5,
          // width: "95%",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {selected === hr ? (
            // Show this btn when showSection is true

            <AntDesign.Button
              name=""
              backgroundColor="blue"
              size={15}
              // onPress={() => setSelected("")}
              color="black"
            />
          ) : (
            // Show this btn when showSection is false
            <AntDesign.Button
              name=""
              backgroundColor="lightsteelblue"
              size={15}
              onPress={() => setSelected(hr)}
              color="back"
              width={10}
              height={14}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          // alignItems: "center",
          width: "90%",
          padding: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>{hl}</Text>
        <Text
          style={{
            // color: error ? "red" : selected === hr ? "blue" : "black",
            color: color,
            fontWeight: error || selected === hr ? "bold" : "",
            fontSize: 17,
          }}
        >
          {hr}
        </Text>
      </View>
    </View>
  );
};

export default PageSectionHeader;
