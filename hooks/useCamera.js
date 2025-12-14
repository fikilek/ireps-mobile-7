// hooks/useCamera.js
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
// import { storage } from '../config/firebase';
import { captureRef } from "react-native-view-shot";

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  // const [cameraType, setCameraType] = useState("back");
  const [isLoading, setIsLoading] = useState(false);
  const [lastPhotoInfo, setLastPhotoInfo] = useState(null);

  const [facing, setFacing] = useState("back");
  const [cameraMode, setCameraMode] = useState("picture");
  const [flashMode, setFlashMode] = useState("auto");
  const [zoom, setZoom] = useState(0);
  //State will be true when the camera will be recording
  const [recording, setRecording] = useState(false);

  const ALBUM_NAME = "erfs";

  // Check permissions on mount
  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();

      setHasPermission(cameraStatus === "granted" && mediaStatus === "granted");
    } catch (error) {
      console.error("Error checking permissions:", error);
      setHasPermission(false);
    }
  };

  const generateTimestamp = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const checkAlbumExists = async () => {
    try {
      const albums = await MediaLibrary.getAlbumsAsync();
      return albums.find((album) => album.title === ALBUM_NAME);
    } catch (error) {
      console.error("Error checking album:", error);
      return null;
    }
  };

  const createAlbumIfNeeded = async () => {
    try {
      let album = await checkAlbumExists();

      if (!album) {
        album = await MediaLibrary.createAlbumAsync(ALBUM_NAME);
        console.log("Album created:", album.title);
      }

      return album;
    } catch (error) {
      console.error("Error creating album:", error);
      throw error;
    }
  };

  const addTimestampOverlay = async (viewShotRef) => {
    try {
      const timestamp = generateTimestamp();

      // Capture the view with timestamp overlay
      const uriWithTimestamp = await captureRef(viewShotRef, {
        format: "jpg",
        quality: 1.0,
        result: "base64",
      });
      console.log(`addTimestampOverlay uriWithTimestamp`, uriWithTimestamp);

      return {
        base64: `data:image/jpeg;base64,${uriWithTimestamp}`,
        timestamp,
      };
    } catch (error) {
      console.error("Error adding timestamp overlay:", error);
      throw error;
    }
  };

  const saveToMediaLibrary = async (photoBase64) => {
    try {
      // Create album if needed
      const album = await createAlbumIfNeeded();

      // Convert base64 to file URI
      const fileUri = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;
      await FileSystem.writeAsStringAsync(fileUri, photoBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(fileUri);

      // Add to album
      await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);

      // Clean up temporary file
      await FileSystem.deleteAsync(fileUri);

      return asset;
    } catch (error) {
      console.error("Error saving to media library:", error);
      throw error;
    }
  };

  // const uploadToFirebaseStorage = async (photoBase64) => {
  //   try {
  //     const timestamp = generateTimestamp();
  //     const fileName = `photo_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;

  //     // Remove data URL prefix if present
  //     const base64Data = photoBase64.replace(/^data:image\/jpeg;base64,/, '');

  //     // Create storage reference
  //     const storageRef = ref(storage, `timestamped-photos/${fileName}`);

  //     // Upload the file
  //     const snapshot = await uploadString(storageRef, base64Data, 'base64', {
  //       contentType: 'image/jpeg',
  //       customMetadata: {
  //         timestamp: timestamp,
  //         capturedAt: new Date().toISOString()
  //       }
  //     });

  //     // Get download URL
  //     const downloadURL = await getDownloadURL(snapshot.ref);

  //     return {
  //       downloadURL,
  //       storagePath: snapshot.ref.fullPath,
  //       timestamp
  //     };
  //   } catch (error) {
  //     console.error('Error uploading to Firebase Storage:', error);
  //     throw error;
  //   }
  // };

  const capturePhoto = async (cameraRef, viewShotRef) => {
    if (!cameraRef.current || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Capture original photo with base64
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
        exif: true,
      });

      // Step 2: Add timestamp overlay
      const processedPhoto = await addTimestampOverlay(viewShotRef);

      // Step 3: Save to Media Library
      const mediaAsset = await saveToMediaLibrary(
        processedPhoto.base64.split(",")[1]
      );

      // Step 4: Upload to Firebase Storage
      // const firebaseResult = await uploadToFirebaseStorage(processedPhoto.base64);

      const result = {
        success: true,
        mediaAsset,
        // firebaseResult,
        timestamp: processedPhoto.timestamp,
        localUri: photo.uri,
      };

      setLastPhotoInfo(result);
      Alert.alert("Success", "Photo saved with timestamp overlay!");

      console.log("Photo saved successfully:", {
        mediaLibraryId: mediaAsset.id,
        // firebaseUrl: firebaseResult.downloadURL,
        timestamp: processedPhoto.timestamp,
      });

      return result;
    } catch (error) {
      console.error("Error capturing photo:", error);
      Alert.alert("Error", `Failed to save photo: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  //Function to toggle between back and front camera
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  //Video Recorder
  // const recordVideo = async () => {
  //   setRecording(true); //Updates the recording state to true. This will also toggle record button to stop button.
  //   cameraRef.current
  //     .recordAsync({
  //       //cameraRef is a useRef hook pointing to the camera component. It provides access to the camera's methods, such as recordAsync. Starts recording a video and returns a Promise that resolves with the recorded video’s details.
  //       maxDuration: 30, //Limits the recording duration to 30 seconds. After 30 seconds, the recording automatically stops, and the Promise resolves.
  //     })
  //     .then((newVideo) => {
  //       //The result of this Promise is an object (newVideo) containing information about the recorded video, such as the file's URI and other metadata. This callback runs when the recording completes successfully.
  //       setVideo(newVideo); // Stores the recorded video details in the state, which can later be used for playback, uploading, or other actions.
  //       setRecording(false);
  //     });
  //   console.log(video.uri);
  // };

  // function stopRecording() {
  //   setRecording(false);
  //   cameraRef.current.stopRecording();
  //   console.log("Recording stopped");
  // }

  return {
    hasPermission,
    isLoading,
    lastPhotoInfo,
    capturePhoto,
    toggleCameraFacing,
    generateTimestamp,

    facing,
    setFacing,
    cameraMode,
    setCameraMode,
    flashMode,
    setFlashMode,
    zoom,
    setZoom,
    recording,
    setRecording,
  };
};
