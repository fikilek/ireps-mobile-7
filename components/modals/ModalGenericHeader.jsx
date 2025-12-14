import { AntDesign } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useMediaContext } from "../../context/MediaContext";
import { camelCaseToWords } from "../../utils/utilsCommon";

const ModalGenericHeader = (props) => {
  const { setModalVisible } = props;
  const { mediaData } = useMediaContext();
  // console.log(`ModalGenericHeader mediaData`, mediaData);
  // console.log(
  //   `ModalGenericHeader mediaData`,
  //   JSON.stringify(mediaData, null, 2)
  // );
  const { mediaCat: title, data, irepsKeyItem } = mediaData;
  // console.log(`title`, title);

  const erfNo =
    irepsKeyItem === "trn"
      ? data?.ast?.erf?.erfNo
      : "erf"
      ? data?.erfNo
      : "ast"
      ? data?.erf?.address?.erfNo
      : "";
  return (
    <View
      style={{
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        borderRadius: 5,
      }}
    >
      <Pressable
        style={{
          borderRadius: 5,
          width: 50,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFC100",
        }}
        onPress={() => setModalVisible(false)}
      >
        <AntDesign name="close" size={30} color="indigo" />
      </Pressable>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "yellow",
          borderRadius: 7,
          height: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {`${camelCaseToWords(title)} - Erf: ${erfNo}`}
        </Text>
      </View>
    </View>
  );
};

export default ModalGenericHeader;
