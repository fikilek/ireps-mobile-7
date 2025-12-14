import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
// import useCreateMediaErfMutation

import { storage } from "../config/fbConfig";

const useStorage = () => {
  // console.log(`MediaAppCapture_ data`, JSON.stringify(data, null, 2));

  const [progress] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [success, setSuccess] = useState(null);

  const uploadFile = async (
    blobFile,
    irepsKeyItem,
    id,
    imgMetadata,
    mediaType,
    erfNo,
    astNo
  ) => {
    console.log(`-     `);
    console.log(`-     `);
    console.log(`-     `);
    console.log(`uploadFile START ---`);
    console.log(`uploadFile START ---`);
    console.log(`uploadFile START ---`);

    console.log(`uploadFile ----blobFile`, blobFile);
    console.log(`uploadFile ----irepsKeyItem`, irepsKeyItem);
    console.log(`uploadFile ----id`, id);
    console.log(
      `uploadFile ---imgMetadata`,
      JSON.stringify(imgMetadata, null, 2)
    );
    console.log(`uploadFile ----mediaType`, mediaType);

    if (
      !(mediaType === "image" || mediaType === "video" || mediaType === "audio")
    ) {
      console.log(`uploadFile ----Not a valid media type`, mediaType);
      return;
    }

    const { filePath } = imgMetadata;
    console.log(`uploadFile ----filePath`, filePath);
    // if (irepsKeyItem === "erf") {
    //   filePath = `${irepsKeyItem}/${id}_${erfNo}/${imgMetadata?.mediaCategory}_${imgMetadata?.createdAtDatetime}`;
    // }
    // if (irepsKeyItem === "ast") {
    //   filePath = `${irepsKeyItem}/${id}_${astNo}/${imgMetadata?.mediaCategory}_${imgMetadata?.createdAtDatetime}`;
    // }
    // if (irepsKeyItem === "trn") {
    //   filePath = `${irepsKeyItem}/${id}_${erfNo}/${imgMetadata?.mediaCategory}_${imgMetadata?.createdAtDatetime}`;
    // }

    const fileStorageRef = ref(storage, filePath);
    console.log(`uploadFile ----fileStorageRef`, fileStorageRef);

    let metadata = {
      customMetadata: {
        mediaType: imgMetadata?.mediaType,
        mediaCategory: imgMetadata?.mediaCategory,
        mediaId: imgMetadata?.mediaId,
        lat: imgMetadata?.createdAtLocation?.lat,
        lng: imgMetadata?.createdAtLocation?.lng,

        workbase: imgMetadata?.workbase,

        createdByUser: imgMetadata?.createdByUser,
        createdByUid: imgMetadata?.createdByUid,
        createdAtDatetime: imgMetadata?.createdAtDatetime,
      },
      contentType: imgMetadata?.mediaType,
      type: imgMetadata?.mediaType,
      // workbase: imgMetadata?.workbase,
      // createdByUser: imgMetadata?.createdByUser,
      // createdByUid: imgMetadata?.createdByUid,
      // createdAtDatetime: imgMetadata?.createdAtDatetime,
    };

    if (irepsKeyItem === "erf") {
      metadata = {
        ...metadata,
        customMetadata: {
          ...metadata.customMetadata,
          erfId: imgMetadata?.erfId || "",
          erfNo: imgMetadata?.erfNo || "",
          astId: imgMetadata?.astId || "",
          astNo: imgMetadata?.astNo || "",
          trnId: imgMetadata?.trnId || "",
        },
      };
    }
    if (irepsKeyItem === "ast") {
      metadata = {
        ...metadata,
        customMetadata: {
          ...metadata.customMetadata,
          erfId: imgMetadata?.erfId || "",
          erfNo: imgMetadata?.erfNo || "",
          astId: imgMetadata?.astId || "",
          astNo: imgMetadata?.astNo || "",
          trnId: imgMetadata?.trnId || "",
        },
      };
    }
    if (irepsKeyItem === "trn") {
      // This is for No Access trn
      metadata = {
        ...metadata,
        customMetadata: {
          ...metadata.customMetadata,
          erfId: imgMetadata?.erfId || "",
          erfNo: imgMetadata?.erfNo || "",
          astId: imgMetadata?.astId || "",
          astNo: imgMetadata?.astNo || "",
          trnId: imgMetadata?.trnId || "",
        },
      };
    }
    console.log(`uploadFile ----metadata`, JSON.stringify(metadata, null, 2));

    const storageRef = ref(storage, fileStorageRef);
    console.log(`uploadFile ----storageRef`, storageRef);

    let snapshot;
    if (mediaType === "audio" || mediaType === "video") {
      snapshot = await uploadBytes(storageRef, blobFile, metadata);
    }

    if (mediaType === "image") {
      snapshot = await uploadBytes(storageRef, blobFile, metadata);
    }
    console.log(`uploadFile ----snapshot`, snapshot);

    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log("uploadFile ----File available at", downloadUrl);
    setUrl(downloadUrl);

    console.log(`uploadFile END ---`);
    console.log(`uploadFile END ---`);
    console.log(`uploadFile END ---`);
    console.log(`-     `);
    console.log(`-     `);
    console.log(`-     `);

    return {
      downloadUrl,
    };
  };

  /*
  This method is responsible for uploading media to firebase storage. The media to be uploaded resided in a media array. 
  The media array is attached to a form.This could be a trn form, a erfAdr form. erfPropertyType form, inspection form,
  installation form etc. Any form that has media will have a media array to keep all media linked to that form in one place.  

  All media in iREPS is taken through a component called MediaAppCapture. In a normal course of collecting media for a formik form, the following steps followed (these steps always happen with a formik for open, so there is a formik object available):
  1. Media is taken using takePictureAsync (if its an image). This image is stored inside MediaAppCapture state called 'photo'.
  2. The media metadata is creatted and stored in a MediaAppCapture state called 'metadata'. This is the origin of the media metadata. The media metadata contains amongst others (1)trnId, (2)erfId, (3)astId, (4)mediaId
  3.The image is immedietly previewed with some metadata dispayed as an overlay. The ppreviwed photo can be discarded if not neede.
  4.If the image is desired, captureRef method from 'react-native-view-shot' library is used to capture the image with an overlay. This image is captured as a jpg image. The jpg format option is supplied as a argument or parameter in the capturRef methos. This captuered jpg image is now available as uri file.
  5. The jpg image is then saved to the device media library album.
  6. Image is then converted to a blob to prepare for saving it in the firebase storage. At thi sstage, the image is avaialable in two formats (1) as a jpg available in a 'uri' (2) as a 'blob'
  7. Prepare the image file path that will be used in forebase storage. Th filePath' is stored in metadata.

  8.a....... If there is network connectivity and internet availability
    8.a.1. The blob is saved to firebase storage. To save firebase storage there are three items needed, (1) the image file (its avaiable as a blob) ,(2) filePath and (3) file metadata
    8.a.2. Get the downloadUrl 
  8.b.......  If there is NO network connectivity and NO internet availability
    8.b.1 DownloadUrl will not be avaialbe

  1o. Prepare media object. This object contains the downloadUrl as well as media metadata. Every media object contains the mediaId. This is used as a unique identifier for each media.
  11. Update the media array in the formik form with the newly formed media object
  12. The media process ends after the media object is pushed into the form media array. At this point, each media object in the media arrray either has a 'downloadUrl' or it does not.

  */
  const manageUpload = async (formData, irepsKeyItem) => {
    console.log(`manageUpload ----running`);
    if (!formData) {
      console.log("manageUpload ----No formData - return");
      return;
    }

    // Get media array
    const { media, metadata } = formData || {};
    const mediaArray = media;

    if (!media) {
      console.log(`manageUpload ----No media array - return`);
      return formData;
    }
    // console.log(`manageUpload ----mediaArray`, mediaArray);
    console.log(`manageUpload ----metadata`, metadata);
    console.log(`manageUpload ----metadata?.length`, metadata?.length);

    // // Get what is needed from metadata
    // const { trnId, mediaCategory, createdAtDatetime } = metadata;
    // console.log(`manageUpload ----trnId`, trnId);
    // console.log(`manageUpload ----mediaCategory`, mediaCategory);
    // console.log(`manageUpload ----createdAtDatetime`, createdAtDatetime);

    // Get erfNo
    const { erfNo } = formData?.ast?.erf || "";
    console.log(`manageUpload ----erfNo`, erfNo);

    const updatedMedia = [];
    let uploadIteration = 0;
    for (const mediaItem of mediaArray) {
      uploadIteration++;
      console.log(" ");
      console.log(" ");
      console.log(" ");
      console.log(
        `manageUpload ----START of uploadIteration ---- [${uploadIteration}]`
      );
      console.log(`manageUpload ----updatedMedia`, updatedMedia);
      if (mediaItem.uri && !mediaItem.downloadUrl) {
        // There is uri but no downloadUrl. So the media has not yet been saved onto sirenase storage.
        console.log(`manageUpload ----mediaItem`, mediaItem);
        console.log(
          `manageUpload ----mediaItem`,
          JSON.stringify(mediaItem, null, 2)
        );

        const { trnId } = mediaItem;
        console.log(`manageUpload ----trnId`, trnId);

        const response = await fetch(mediaItem.uri);
        console.log(`manageUpload ----response`, response);

        const blob = await response.blob();
        console.log(`manageUpload ----blob`, blob);

        const uploadResult = await uploadFile(
          blob,
          irepsKeyItem,
          trnId,
          mediaItem,
          "image",
          erfNo
        );
        console.log(`manageUpload ----uploadResult`, uploadResult);

        // Get the downloadUrl
        const { downloadUrl } = uploadResult;
        console.log(`manageUpload ----downloadUrl`, downloadUrl);

        // Update mediaItem
        const newmediaItem = {
          ...mediaItem,
          downloadUrl,
        };
        updatedMedia.push(newmediaItem);
        console.log(`manageUpload ----updatedMedia`, updatedMedia);
      } else {
        // Already has download URL, keep as is
        updatedMedia.push(mediaItem);
      }
      console.log(`manageUpload ----mediaItem`, mediaItem);
      console.log(`manageUpload ----updatedMedia`, updatedMedia);
      console.log(
        `manageUpload ----END of uploadIteration ---- [${uploadIteration}]`
      );
      console.log(" ");
      console.log(" ");
      console.log(" ");
    }

    // After the iteration, insert the updated media array back onto the form
    const newFormData = {
      ...formData,
      media: updatedMedia,
    };
    // console.log(`manageUpload ----newFormData`, newFormData);
    return newFormData;
  };

  const deleteFile = async (fileRef, id) => {
    // console.log(`fileRef`, fileRef);
    // 	console.log(`id`, id);

    // 	// Delete the file
    deleteObject(fileRef)
      .then(() => {
        // console.log(`File ${id} deleted successfully`);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(`Error deleting file ${id} : ${error.message}`);
        setError(`Error deleting file ${id} : ${error.message}`);
      });
  };

  return {
    uploadFile,
    progress,
    error,
    url,
    deleteFile,
    success,
    manageUpload,
  };
};

export default useStorage;
