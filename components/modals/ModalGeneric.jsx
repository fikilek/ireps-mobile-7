import { Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ModalGenericHeader from "./ModalGenericHeader";

const ModalGeneric = (props) => {
  const { modalVisible, setModalVisible, children } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      // onRequestClose={() => {
      //   Alert.alert("Modal has been closed.");
      //   setModalVisible(!modalVisible);
      // }}
    >
      <SafeAreaProvider style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "lavenderblush",
            padding: 5,
            gap: 5,
          }}
        >
          <ModalGenericHeader setModalVisible={setModalVisible} />
          {children}
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default ModalGeneric;
