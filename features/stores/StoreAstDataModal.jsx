import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Picker from "../../components/Picker";

const StoreAstDataModal = (props) => {
  const router = useRouter();
  const { modalVisible, setModalVisible } = props;
  return (
    <View style={{ position: "absolute", top: 30, left: 0 }}>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        // 	// Alert.alert("Modal has been closed.");
        // 	setModalVisible(!modalVisible);
        // }}
      >
        <View
          style={{
            flex: 1,
            margin: 20,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // width: "100%",
              backgroundColor: "grey",
              // marginTop: 40,
              padding: 10,
              height: 60,
              alignItems: "center",
            }}
          >
            <FontAwesome5
              name="caret-square-left"
              size={30}
              color="indigo"
              onPress={() => setModalVisible(false)}
            />
            <Text style={styles.textStyle}>Ast Data Modal</Text>
          </View>
          {/* Body */}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  padding: 5,
                  marginTop: 5,
                  textAlign: "center",
                  backgroundColor: "lightgrey",
                }}
              >
                You are about to do a Goods Receiving Process capturing meters
                onto a Store
              </Text>
              <Text
                style={{
                  padding: 5,
                  marginTop: 5,
                  textAlign: "center",
                  backgroundColor: "lightgrey",
                }}
              >
                Below select the items that wil be completed for each meter and
                press{"  "}
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "blue",
                  }}
                >
                  Submit
                </Text>{" "}
                btn.
              </Text>
              <Text
                style={{
                  padding: 5,
                  marginTop: 5,
                  textAlign: "center",
                  backgroundColor: "lightgrey",
                }}
              >
                The GRV process will accommodate a maximum of 10 meters at a go
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <Picker
                  title={"type"}
                  initItems={[
                    { label: "single", value: "single" },
                    { label: "three", value: "three" },
                  ]}
                  // astData={astData}
                  // setAstData={setAstData}
                />
                {/* <Picker
										title={"phase"}
										astData={astData}
										setAstData={setAstData}
									/>
								</View>
								<View>
									<Picker
										title={"astManufacturer"}
										astData={astData}
										setAstData={setAstData}
									/>
									<Picker
										title={"astName"}
										astData={astData}
										setAstData={setAstData}
									/> */}
              </View>
            </View>
          </View>
          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

              // width: "100%",
              backgroundColor: "grey",
              // marginTop: 40,
              padding: 10,
              height: 60,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "beige",
                padding: 5,
                width: 100,
                borderRadius: 5,
                alignItems: "center",
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "beige",
                padding: 5,
                width: 100,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StoreAstDataModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    marginTop: 80,
    backgroundColor: "white",
    // borderRadius: 20,
    borderColor: "#bbb",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
  },
  button: {
    // borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginHorizontal: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#bbb",
    borderWidth: 2,
    borderStyle: "dashed",
    width: "100%",
  },
  headerText: {
    fontSize: 15,
    padding: 10,
  },
});
