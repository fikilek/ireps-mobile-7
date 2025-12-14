import { Camera, CameraView } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import uuid from "react-native-uuid";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useFormikContext } from "formik";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ViewShot, { captureRef } from "react-native-view-shot";
import { useMediaContext } from "../../context/MediaContext";
import { useImage } from "../../hooks/useImage.js";
import { useMedia } from "../../hooks/useMedia.js";
import useStorage from "../../hooks/useStorage.jsx";
import { camelCaseToWords } from "../../utils/utilsCommon.js";

const MediaAppCapture = (props) => {
  // const { mediaCat } = props;
  // console.log(`MediaAppCapture data`, data);
  // console.log(`MediaAppCapture irepsKeyItem`, irepsKeyItem);

  // Get network status
  // const { networkState } = useNetworkStatus();
  // console.log(`MediaAppCapture networkState`, networkState);
  // const { isConnected, isInternetReachable } = networkState;

  const formik = useFormikContext();
  // console.log(`MediaAppCapture formik`, formik);
  // const { media } = formik?.values || [];
  // console.log(`MediaAppCapture media`, media);

  // const { splitAndSortMedia } = useMedia();
  // const { photos, audios, videos } = splitAndSortMedia(media);
  // console.log(`MediaAppCapture photos`, photos);

  const { mediaData, updateMediaData } = useMediaContext();
  // console.log(`MediaAppCapture mediaData`, mediaData);
  // console.log(`MediaAppCapture mediaData`, JSON.stringify(mediaData, null, 2));

  const { data, irepsKeyItem, mediaCat } = mediaData;
  // console.log(`MediaAppCapture data`, data);
  // console.log(`MediaAppCapture data`, JSON.stringify(data, null, 2));
  // console.log(`MediaAppCapture irepsKeyItem`, irepsKeyItem);

  const { uploadFile, progress, error, url, success } = useStorage();
  // console.log(`MediaAppCapture url`, url);
  // console.log(`MediaAppCapture progress`, typeof progress);
  // console.log(`MediaAppCapture error`, error);
  // console.log(`MediaAppCapture success`, success);
  const { saveToMediaLibraryAlbum, createMediaObj, updateMediaArray } =
    useMedia(formik?.values?.media);

  let id, workbase, erfNo, astNo;
  if (irepsKeyItem === "trn") {
    id = data?.metadata?.trnId;
    workbase = data?.ast?.erf?.address?.lmMetro;
    erfNo = data?.ast?.erf?.erfNo;
  }
  if (irepsKeyItem === "ast") {
    id = data?.ast?.astData?.astId;
    workbase = data?.erf?.address?.lmMetro;
    astNo = data?.astData?.astNo;
  }
  if (irepsKeyItem === "erf") {
    id = data?.id;
    workbase = data?.address?.lmMetro;
    erfNo = data?.erfNo;
  }
  // console.log(`MediaAppCapture irepsKeyItem`, irepsKeyItem);
  // console.log(`MediaAppCapture id`, id);
  // console.log(`MediaAppCapture workbase`, workbase);

  const [isLoading, setIsLoading] = useState(false);
  // console.log(`isLoading`, isLoading);

  const [isSaving, setIsSaving] = useState(false);
  // console.log(`isSaving`, isSaving);

  // const [lastSaveInfo, setLastSaveInfo] = useState(null);
  // console.log(`lastSaveInfo`, lastSaveInfo);

  //State variable for camera permission
  const [cameraPermission, setCameraPermission] = useState();
  // console.log(`cameraPermission`, cameraPermission);

  //State variable for media library permission
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState();
  // console.log(`mediaLibraryPermission`, mediaLibraryPermission);

  // state variable for microphone permission
  const [micPermission, setMicPermission] = useState();
  // console.log(`micPermission`, micPermission);

  const [locationPermission, setLocationPermission] = useState();
  // console.log(`locationPermission`, locationPermission);

  // State variable for all albums in media library
  const [albums, setAlbums] = useState(null);
  // console.log(`albums`, albums);

  //State variable for picture or video. By default it will be for picture
  const [cameraMode, setCameraMode] = useState("picture");

  const [facing, setFacing] = useState("back");

  const [photo, setPhoto] = useState(null);
  // console.log(`photo?.exif?.ImageLength`, photo?.exif?.ImageLength);
  // console.log(`photo?.exif?.ImageWidth`, photo?.exif?.ImageWidth);
  // console.log(
  //   `MediaAppCapture photo?.exif`,
  //   JSON.stringify(photo?.exif, null, 2)
  // );
  //After video is recorded this state will be updated
  // const [photoUri, setPhotoUri] = useState(null);
  // console.log(`MediaAppCapture photoUri`, JSON.stringify(photoUri, null, 2));

  const [video, setVideo] = useState();

  //Camera Flash will be ON by default
  const [flashMode, setFlashMode] = useState("auto");

  //State will be true when the camera will be recording
  const [recording, setRecording] = useState(false);

  //State to control the digital zoom
  const [zoom, setZoom] = useState(0);

  //Creates a ref object for the cameera image.
  let cameraRef = useRef();
  //Creates a ref object for the camera image with an overlay.
  const imageRef = useRef();

  const [metadata, setMetadata] = useState();
  // console.log(`MediaAppCapture ---metadata`, JSON.stringify(metadata, null, 2));
  //     {
  //       "uri": "file:///data/user/0/com.ireps.irespmobile4/cache/ReactNative-snapshot-image4992737569353215352.jpg",
  //       "mediaType": "image/jpeg",
  //       "mediaCategory": "noAccess",
  //       "createdByUser": "Fikile Kentane",
  //       "createdByUid": "1Sihka6hmCbguubMCsgiJQcwHLs1",
  //       "createdAtDatetime": "2025-Nov-28_12:16:41",
  //       "createdAtLocation": {
  //         "lat": -26.5025402,
  //         "lng": 28.3614885
  //       },
  //       "workbase": "Ephraim Mogale LM",
  //       "mediaId": "f94068c3-46dc-48c6-b85b-05594d846032",
  //       "astId": "6979597a-bc25-4332-866a-3c125f6ee71e",
  //       "astNo": "",
  //       "trnId": "864aa553-a150-4359-bd1b-abe19af7ee94",
  //       "erfId": "ylGjcfpuxwEmDUsqag48",
  //       "erfNo": "247"
  //     }
  const { getImageMetadata } = useImage();

  //When the screen is rendered initially the use effect hook will run and check if permission is granted to the app to access the Camera, Microphone and Media Library.
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      // console.log(`useEffect cameraPermission`, cameraPermission);

      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      // console.log(`useEffect mediaLibraryPermission`, mediaLibraryPermission);

      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      // console.log(`useEffect microphonePermission`, microphonePermission);

      const locationPermission =
        await Location.requestForegroundPermissionsAsync();
      // console.log(`useEffect locationPermission`, locationPermission);

      setCameraPermission(cameraPermission.status === "granted");
      setMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      setMicPermission(microphonePermission.status === "granted");
      setLocationPermission(locationPermission.status === "granted");

      const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      });
      setAlbums(fetchedAlbums);
    })();
  }, []);

  //If permissions are not granted app will have to wait for permissions
  if (
    cameraPermission === undefined ||
    mediaLibraryPermission === undefined ||
    micPermission === undefined ||
    locationPermission === undefined
  ) {
    return <Text>Request Permissions....</Text>;
  }
  if (!cameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings
      </Text>
    );
  }
  if (!mediaLibraryPermission) {
    return (
      <Text>
        Permission for meadi library not granted. Please change this in settings
      </Text>
    );
  }
  if (!micPermission) {
    return (
      <Text>
        Permission for microphone not granted. Please change this in settings
      </Text>
    );
  }
  if (!locationPermission) {
    return (
      <Text>
        Permission for location not granted. Please change this in settings
      </Text>
    );
  }

  //Function to toggle between back and front camera
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const convertImageToBlob = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error converting image to blob:", error);
      return null;
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return (reader.onloadend = async () => {
        const base64data = await reader.result.split(",")[1]; // Get only the base64 part
        // console.log(`convertImageToBase64 base64data`, base64data);
        // Send base64data to Cloud Function
        return base64data;
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  };

  const uriToBlob = async (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  const getFilePath = async (
    irepsKeyItem = "N/A",
    id = "N/A",
    erfNo = "N/A",
    astNo = "N/A",
    mediaCategory = "N/A",
    createdAtDatetime = "N/A"
  ) => {
    let filePath = null;
    if (irepsKeyItem === "erf") {
      filePath = `${irepsKeyItem}/${id}_${erfNo}/${mediaCategory}_${createdAtDatetime}`;
    }
    if (irepsKeyItem === "ast") {
      filePath = `${irepsKeyItem}/${id}_${astNo}/${mediaCategory}_${createdAtDatetime}`;
    }
    if (irepsKeyItem === "trn") {
      filePath = `${irepsKeyItem}/${id}_${erfNo}/${mediaCategory}_${createdAtDatetime}`;
    }
    // console.log(`MediaAppCapture ---getFilePath ----filePath`, filePath);

    return filePath;
  };

  /*
    captureAndSave method does the following
    step 0: set the saving state to true
    step 1: Captures the image in imageRef (ViewShot). To acomplish this, method 
      method used  - captureRef
      params - 
      return - uri
    step 2: Save the image represented by uri object to media library album
      method used - saveToMediaLibraryAlbum
      params - 
      return  - null
    step 3: Create a media object that will hold uri and media metadata. 
      method used - createMediaObj
      params - uri, metadata
      return -  mediaObj
    step 4: Update media array in the formik form values with media object
      method - updateMediaArray
      params - values, setFieldValue, mediaObj
      return - 
    step 5: clear photo state
    step 6: set the saving state to false 
  */
  const captureAndSave = async (customFilename = null) => {
    if (!imageRef.current || isSaving) {
      Alert.alert("Error", "View reference not ready or already saving");
      return;
    }

    // step 0 ---
    setIsSaving(true);
    try {
      // Step 1 ---
      const uri = await captureRef(imageRef, {
        format: "jpg",
        quality: 1.0,
      });

      // Step X: Generate filename
      const filePath = await getFilePath(
        irepsKeyItem,
        id,
        erfNo,
        astNo,
        metadata?.mediaCategory,
        metadata?.createdAtDatetime
      );
      // console.log(`MediaAppCapture captureAndSave---filePath`, filePath);

      // Step X: Save the filePath onto metadata
      setMetadata((prev) => ({ ...prev, filePath }));

      // Step X: Save to Media Library
      await saveToMediaLibraryAlbum(uri, irepsKeyItem);

      // Step X: Convert uri to a blob
      // const imageBlob = await convertImageToBlob(uri);
      // console.log(`MediaAppCapture captureAndSave---imageBlob`, imageBlob);

      // If there is network connnectivity
      // ---------------------------------
      // 1. save picture in firestore storage
      // 2. get url
      // 3. save url in media object

      // if there is NO network connectivity
      // ----------------------------------
      // 1. leave url empty (when network becomes availavle, follow the steps above)

      // Get network connectivity state
      // const state = await NetInfo.fetch();
      // console.log(
      //   `MediaAppCapture captureAndSave---state`,
      //   JSON.stringify(state, null, 2)
      // );

      // const state = {
      //   isConnected: false,
      // };
      // console.log(
      //   `MediaAppCapture captureAndSave---state`,
      //   JSON.stringify(state, null, 2)
      // );

      // let downloadUrl = "";
      // if (state?.isConnected && state?.isInternetReachable) {
      //   // console.log(
      //   //   "MediaAppCapture captureAndSave---Device is online and has internet access."
      //   // );

      //   const uploadResult = await uploadFile(
      //     imageBlob,
      //     irepsKeyItem,
      //     id,
      //     {
      //       ...metadata,
      //       filePath,
      //     },
      //     "image",
      //     erfNo,
      //     astNo
      //   );
      //   // console.log(
      //   //   `MediaAppCapture captureAndSave---uploadResult`,
      //   //   uploadResult
      //   // );

      //   downloadUrl = uploadResult?.downloadUrl || "";
      //   // console.log(
      //   //   `MediaAppCapture captureAndSave---downloadUrl`,
      //   //   downloadUrl
      //   // );

      //   Alert.alert(
      //     `${camelCaseToWords(metadata?.mediaCategory)} photo`,
      //     `uploaded succesfully`
      //   );
      // } else {
      //   // console.log("MediaAppCapture captureAndSave---Device is offline.");
      //   Alert.alert(`Device is offline`, `Image will be uploadded when online`);
      // }

      // step X: Create media object
      const mediaObj = await createMediaObj(uri, {
        ...metadata,
        filePath,
      });
      // console.log(
      //   `MediaAppCapture captureAndSave---mediaObj`,
      //   JSON.stringify(mediaObj, null, 2)
      // );

      // step X: update form media array
      await updateMediaArray(formik?.setFieldValue, formik?.values, mediaObj);
    } catch (error) {
      console.error("Error in captureAndSave:", error);
      Alert.alert("Error", `Failed to save image: ${error.message}`);
      throw error;
    } finally {
      // step 5
      setPhoto(null);
      // step 6
      setIsSaving(false);
      // step 7 - close mediaAppCapture modal
      updateMediaData({
        modalMediaCapture: false,
      });
    }
  };

  //Function to capture picture
  const takePicture = async () => {
    setIsLoading(true);
    const mediaId = uuid.v4();
    try {
      if (cameraRef.current) {
        const options = {
          quality: 1, //Specifies the quality of the captured image. A value of 1 indicates maximum quality, whereas lower values reduce quality (and file size).
          base64: true, //Includes the image's Base64 representation in the returned object. This is useful for embedding the image directly in data URIs or for immediate upload to servers.
          exif: true, //Disables the inclusion of EXIF metadata in the image (e.g., location, device info). Setting this to true would include such metadata.
        };
        const photo = await cameraRef.current.takePictureAsync(options);
        // console.log(`photo?.exif`, photo?.exif);

        let currentLocation = await Location.getCurrentPositionAsync({});
        // console.log(`currentLocation`, currentLocation);

        const metadata = await getImageMetadata(
          irepsKeyItem,
          "image/jpeg",
          mediaCat,
          data,
          currentLocation?.coords,
          workbase,
          mediaId
        );
        // console.log(
        //   `MediaAppCapture takePicture metadata`,
        //   JSON.stringify(metadata, null, 2)
        // );

        setMetadata(metadata);
        setPhoto(photo);
      }
    } catch (error) {
      console.log(`Error taking picture`, error);
    } finally {
      setIsLoading(false);
    }
  };

  //Video Recorder
  const recordVideo = async () => {
    setRecording(true); //Updates the recording state to true. This will also toggle record button to stop button.
    cameraRef.current
      .recordAsync({
        //cameraRef is a useRef hook pointing to the camera component. It provides access to the camera's methods, such as recordAsync. Starts recording a video and returns a Promise that resolves with the recorded video’s details.
        maxDuration: 30, //Limits the recording duration to 30 seconds. After 30 seconds, the recording automatically stops, and the Promise resolves.
      })
      .then((newVideo) => {
        //The result of this Promise is an object (newVideo) containing information about the recorded video, such as the file's URI and other metadata. This callback runs when the recording completes successfully.
        setVideo(newVideo); // Stores the recorded video details in the state, which can later be used for playback, uploading, or other actions.
        setRecording(false);
      });
    console.log(video.uri);
  };

  function stopRecording() {
    setRecording(false);
    cameraRef.current.stopRecording();
    console.log("Recording stopped");
  }

  //After the picture is captured it will be displayed to the user and the user will also be provided
  // the option to save or discard the image
  if (photo) {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* ViewShot is a react-native-view-shot component that captures the View component image */}
          <ViewShot
            style={{
              flex: 1,
            }}
            ref={imageRef}
            options={{ format: "png", quality: 1.0 }}
          >
            <View
              style={{
                backgroundColor: "black",
              }}
            >
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                {/* ErfNo / AstNo */}
                <Text style={[styles.metadata]}>Erf No: {metadata?.erfNo}</Text>
                {/* mediaCat */}
                <Text style={[styles.metadata]}>
                  {camelCaseToWords(mediaData?.mediaCat)}
                </Text>
                {/* CreateByUser */}
                <Text style={[styles.metadata]}>{metadata?.createdByUser}</Text>
              </View>

              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                {/* Timestamp */}
                <Text style={[styles.metadata]}>
                  {metadata?.createdAtDatetime}
                </Text>
                {/* Lat/Lng */}
                <Text style={[styles.metadata]}>
                  {`${metadata?.createdAtLocation?.lat} / ${metadata?.createdAtLocation?.lng}`}
                </Text>
              </View>
            </View>
            <Image
              source={{ uri: photo.uri }}
              style={{
                flex: 1,
                width: "100%",
              }}
            />
          </ViewShot>

          {isSaving ? (
            <View style={styles.containerCenter}>
              <ActivityIndicator size="large" style={{ paddingVertical: 20 }} />
            </View>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                backgroundColor: "white",
                padding: 10,
                borderWidth: 1,
              }}
            >
              {mediaLibraryPermission ? (
                <TouchableOpacity style={styles.btn} onPress={captureAndSave}>
                  <Ionicons name="save-outline" size={30} color="black" />
                </TouchableOpacity>
              ) : undefined}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  // setPhotoUri(undefined);
                  setPhoto(undefined);
                }}
              >
                <Ionicons name="trash-outline" size={30} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "red",
      }}
    >
      {isLoading && (
        <View style={styles.containerCenter}>
          <ActivityIndicator size="large" style={{ paddingVertical: 20 }} />
        </View>
      )}
      <CameraView
        style={{
          flex: 1,
        }}
        facing={facing}
        ref={cameraRef}
        flash={flashMode}
        mode={cameraMode}
        zoom={zoom}
        // ratio={"1:1"}
      />
      {isLoading ? (
        <View style={styles.containerCenter}>
          <ActivityIndicator size="large" style={{ paddingVertical: 20 }} />
        </View>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              // backgroundColor: "transparent",
              // margin: 20,
              position: "absolute",
              bottom: 50,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Ionicons name="camera-reverse-outline" size={35} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCameraMode("picture")}
            >
              <Ionicons
                name="camera-outline"
                size={35}
                color={cameraMode === "picture" ? "yellow" : `white`}
              />
            </TouchableOpacity>

            {cameraMode === "picture" ? (
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Ionicons name="aperture-outline" size={70} color="white" />
              </TouchableOpacity>
            ) : recording ? (
              <TouchableOpacity style={styles.button} onPress={stopRecording}>
                <Ionicons name="stop-circle-outline" size={70} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={recordVideo}>
                <Ionicons name="play-circle-outline" size={70} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => setCameraMode("video")}
            >
              <Ionicons
                name="videocam-outline"
                size={35}
                color={cameraMode === "video" ? "yellow" : `white`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCameraMode("microphone")}
            >
              <FontAwesome
                name="microphone"
                size={35}
                color={cameraMode === "microphone" ? "yellow" : `white`}
              />
            </TouchableOpacity>
          </View>
          <Slider
            style={{
              width: "100%",
              height: 35,
              // position: "absolute",
              // bottom: "20%",
              backgroundColor: "grey",
            }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="white"
            value={zoom}
            onValueChange={(value) => setZoom(value)}
          />
        </>
      )}
    </View>
  );
};

export default MediaAppCapture;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  metadata: {
    color: "white",
    fontSize: 12,
    backgroundColor: "rgba(0,0,0,0)",
    padding: 2,
  },
});
