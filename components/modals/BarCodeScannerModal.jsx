import { AntDesign } from "@expo/vector-icons";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import BarCodeScanner from "../../components/BarCodeScanner";

const BarCodeScannerModal = (props) => {
  const { modalVisible, setModalVisible, formik, name } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalViewHeader}>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              {/* <Text style={styles.textStyle}>X</Text> */}
              <AntDesign
                name="caretleft"
                size={40}
                color="indigo"
                // onPress={() => router.navigate(destination)}
              />
            </Pressable>
            <Text style={styles.modalText}>Bar Code Scanner</Text>
          </View>

          <BarCodeScanner
            formik={formik}
            setModalVisible={setModalVisible}
            name={name}
          />
        </View>
      </View>
    </Modal>
  );
};

export default BarCodeScannerModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalView: {
    width: "100%",
    height: "100%",
    // margin: 20,
    backgroundColor: "lightgrey",
    // borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewHeader: {
    flexDirection: "row",
    margin: 5,
    // padding: 10,
    // fontSize: 20,
    backgroundColor: "yellow",
    width: "97%",
    height: 50,
    alignItems: "center",
    borderRadius: 7,
    // textAlign: "center",
  },
  button: {
    // borderRadius: 5,
    borderTopLeftRadius: 5,
    // padding: 10,
    width: 50,
    height: "100%",
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFC100",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    flex: 1,
    textAlign: "center",
    // margin: 5,
    // padding: 10,
    fontSize: 20,
    backgroundColor: "yellow",
    // width: "97%",
    borderRadius: 7,
    // textAlign: "center",
  },
});
