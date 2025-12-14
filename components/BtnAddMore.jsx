import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { styles } from "../utils/utilsGlobalStyles";

const BtnAddMore = (props) => {
  const { title, onPressHandler, bottom = 20, right = 5 } = props;
  return (
    <Pressable onPress={onPressHandler} style={[styles.btnAddMore]}>
      {/* <Text style={{ color: "black", fontSize: 14 }}>Add {title} </Text> */}
      <MaterialIcons
        name="add"
        size={20}
        color="black"
        // style={{
        //   padding: 3,
        // }}
      />
    </Pressable>
  );
};

export default BtnAddMore;
