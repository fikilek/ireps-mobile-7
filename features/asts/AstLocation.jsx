import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import DataDetailWrapper from "../../components/DataDetailWrapper";
import DataDisplayComponent from "../../components/DataDisplayComponent"; // <-- Update the path as needed

const AstLocation = (props) => {
  const { location } = props;
  const {
    address,
    gps: { lat, lng },
  } = location || {};

  const openMap = () => {
    console.log(`Open Map to vies meter location`);
  };

  const gpsLocation = (
    <Pressable
      style={{
        width: "80%",
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
        backgroundColor: "lightblue",
      }}
      onPress={openMap}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ marginHorizontal: 30 }}>{lat}</Text>
        <FontAwesome6 name="map-location-dot" size={24} color="black" />
        <Text style={{ marginHorizontal: 30 }}>{lng}</Text>
      </View>
    </Pressable>
  );

  return (
    <DataDetailWrapper>
      {/* Location Address */}
      <DataDisplayComponent label={"Location Adr"} data={address} />

      {/* Location Address */}
      <DataDisplayComponent label={"Meter GPS"} data={gpsLocation} />
    </DataDetailWrapper>
  );
};

export default AstLocation;
