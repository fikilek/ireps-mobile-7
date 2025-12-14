import { ScrollView, Text, View } from "react-native";
import { styles } from "../../../utils/utilsGlobalStyles";

const Dashboard = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
        margin: 5,
        backgroundColor: "yellow",
      }}
    >
      {/* Bondarries */}
      <View style={styles.section}>
        <View>
          <Text>Town: Marble Hall</Text>
        </View>
        <View>
          <Text>Wards: 4</Text>
        </View>
        <View>
          <Text>Custome Boundaries: 5</Text>
        </View>
        <View>
          <Text>Erfs</Text>
        </View>
      </View>
      {/* Customers */}
      <View style={styles.section}>
        <Text>Total Customer Accounts: 12000</Text>
        <Text>Customer Accounts Indigents: 2000</Text>
        <Text>Customer Accounts Industrial: 1000</Text>
        <Text>Customer Accounts Commercial: 1000</Text>
        <Text>Customer Accounts Residential Suburb: 5000</Text>
        <Text>Customer Accounts Residential Township: 5000</Text>
        <Text>Customer Accounts Church: 3000</Text>
        <Text>Customer Accounts Schools: 1000</Text>
        <Text>Customer Accounts Flats: 1000</Text>
      </View>
      {/*  */}
      <View style={styles.section}>
        <View>
          <Text>Total Trns: 22222</Text>
          <Text>Purchase Orders: 22</Text>
          <Text>Grv: 22</Text>
          <Text>CheckOutInit: 22</Text>
          <Text>CheckOutConfirm: 22</Text>
          <Text>CheckIn: 22</Text>
          <Text>Installation: 22</Text>
          <Text>Conmmissioning: 22</Text>
          <Text>Disconnection: 22</Text>
          <Text>Reconnection: 22</Text>
        </View>
        <View>
          <Text>Asts</Text>
        </View>
      </View>
      <View style={styles.section}>
        <View>
          <Text>Service Providers</Text>
        </View>
        <View>
          <Text>Teams</Text>
        </View>
        <View>
          <Text>Users</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
