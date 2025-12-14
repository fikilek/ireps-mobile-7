import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
// import { useAsts } from "../../hooks/useAsts"; // Adjust the import path as necessary

const BarCodeScanner = (props) => {
  const { formik, name, setModalVisible } = props;
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // const { checkDuplicate } = useAsts(); // Assuming useAsts is imported from hooks/useAsts.js

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to access the camera
        </Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const handleScan = async ({ data, type }) => {
    // console.log(`handleScan data`, data);
    if (!scanned) {
      setScanned(true);

      // Check if the scanned data already exists in asts collection
      // const dataExist = await checkDuplicate(data);
      const dataExist = false;

      if (dataExist) {
        // If it exists, show an alert to discard or save the data
        Alert.alert("Duplicate Data", "Meter already exists.", [
          {
            text: "Discard",
            onPress: () => setScanned(false),
            style: "cancel",
          },
        ]);
      } else {
        Alert.alert("Scanned Data", `${data}`, [
          {
            text: "Discard",
            onPress: () => setScanned(false),
            style: "cancel",
          },
          {
            text: "Save",
            onPress: () => {
              // console.log(`save handleScan data`, data);
              // console.log(`save handleScan name`, name);
              // Save the scanned data to formik
              formik.setFieldValue(name, data);
              setScanned(false);
              // console.log("Data posted to Formik:", data);
              setModalVisible(false); // Close the modal after saving
            },
          },
        ]);
      }
      // console.log(`Scanned Data: ${data}, Type: ${type}`);
    }
  };

  // const toggleCameraFacing = () => {
  // 	setFacing((prev) => (prev === "back" ? "front" : "back"));
  // };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code39",
            "code128",
          ],
        }}
        onBarcodeScanned={handleScan}
      />
      <View style={styles.overlay}>
        <View style={styles.scanArea} />
      </View>
      {/* <View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
						<Text style={styles.buttonText}>Flip Camera</Text>
					</TouchableOpacity>
				</View> */}
    </View>
  );
};

export default BarCodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "wheat",
    width: "97%",
    height: "100%",
    position: "relative",
  },
  message: { textAlign: "center", marginTop: 20 },
  camera: { flex: 1, width: "100%", height: "100%" },
  // buttonContainer: {
  // 	position: "absolute",
  // 	bottom: 30,
  // 	alignSelf: "center",
  // },
  // button: {
  // 	backgroundColor: "black",
  // 	paddingVertical: 10,
  // 	paddingHorizontal: 20,
  // 	borderRadius: 8,
  // },
  // buttonText: {
  // 	color: "white",
  // 	fontSize: 16,
  // },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  scanArea: {
    width: "97%",
    height: "50%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
  },
});
