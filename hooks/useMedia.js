import * as MediaLibrary from "expo-media-library";
import { Timestamp } from "firebase/firestore";

export const useMedia = () => {
  // const { updateMediaData } = useMediaContext();

  const createMediaObj = async (uri, metadata) => {
    // console.log(
    //   `useMedia createMediaObj metadata`,
    //   JSON.stringify(metadata, null, 2)
    // );
    return {
      uri,
      downloadUrl: "",
      ...metadata,
    };
  };

  const saveToMediaLibraryAlbum = async (uri, albumName) => {
    // console.log(`saveToMediaLibraryAlbum uri`, uri);
    // console.log(`saveToMediaLibraryAlbum albumName`, albumName);

    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      // console.log(`asset`, asset);

      let album = await MediaLibrary.getAlbumAsync(albumName);

      if (album === null) {
        await MediaLibrary.createAlbumAsync(albumName, asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (error) {
      return {
        error: `Error saving to media library album [${albumName}]`,
        message: error?.message,
      };
    }
  };

  const splitAndSortMedia = (media = []) => {
    // console.log(`splitAndSortMedia media`, media);
    if ((!media && media?.length === 0, media === undefined, media === null))
      return;

    media &&
      media?.sort(function (a, b) {
        const createdAt_a = a.createdAtDatetime;
        const cTimestamp_a = new Timestamp(
          createdAt_a?.seconds,
          createdAt_a?.nanoseconds
        );
        const newCreatedAt_a = cTimestamp_a?.toDate();

        const createdAt_b = b.createdAtDatetime;
        const cTimestamp_b = new Timestamp(
          createdAt_b?.seconds,
          createdAt_b?.nanoseconds
        );
        const newCreatedAt_b = cTimestamp_b?.toDate();
        return newCreatedAt_a - newCreatedAt_b;
      });

    const photos = media?.filter((item) => item?.mediaType === "image/jpeg");
    const audios = media?.filter((item) => item?.mediaType === "audio/webm");
    const videos = media?.filter((item) => item?.mediaType === "video/webm");

    return { photos, audios, videos };
  };

  const updateMediaArray = async (setFieldValue, values, mediaObj) => {
    // console.log(`updateMediaArray setFieldValue`, setFieldValue);
    // console.log(`updateMediaArray values?.media`, values?.media);
    // console.log(`updateMediaArray mediaObj`, mediaObj);

    const media = values?.media || [];
    try {
      if (mediaObj) {
        const updatedMedia = [...media, mediaObj];
        // console.log(`updateMediaArray updatedMedia`, updatedMedia);
        const mediaArrayUpdateResult = await setFieldValue(
          "media",
          updatedMedia
        );
        console.log(`mediaArrayUpdateResult`, mediaArrayUpdateResult);
        // const { photos, audios, videos } = splitAndSortMedia(updatedMedia);
        // updateMediaData({
        //   photos,
        //   audios,
        //   videos,
        // });
      }
    } catch (error) {
      console.log(`Error updating media array`, error);
    }
  };

  const removeMedia = (setFieldValue, values, index) => {
    const updatedMedia = values.media.filter((_, i) => i !== index);
    setFieldValue("media", updatedMedia);
  };

  return {
    splitAndSortMedia,
    saveToMediaLibraryAlbum,
    createMediaObj,
    updateMediaArray,
    removeMedia,
  };
};
