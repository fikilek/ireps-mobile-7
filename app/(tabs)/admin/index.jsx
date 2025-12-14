import { Text, View } from "react-native";

const index = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Admin index header */}
      <View>
        <Text>Admin Header</Text>
      </View>
      {/* Admin  */}
      <View>
        <Text>Stores</Text>
      </View>
      <View>
        <Text>Asts In Sps</Text>
      </View>
      <View>
        <Text>Service Providers</Text>
      </View>
      <View>
        <Text>Teams</Text>
      </View>
      <View>
        <Text>Workbases</Text>
      </View>
    </View>
  );
};

export default index;
