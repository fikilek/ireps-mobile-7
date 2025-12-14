import { format } from "date-fns";
import { useAuth } from "../context/authContext";
import { constants } from "../utils/utilsConstants";

export const useImage = () => {
  const { user } = useAuth();
  // console.log(`useImage user`, JSON.stringify(user, null, 2));

  const { uid, displayName } = user || {};
  // console.log(`uid`, uid);
  // console.log(`useErfs claims`, claims);

  const getImageMetadata = async (
    irepsKeyItem,
    mediaType,
    mediaCat,
    data,
    coords,
    workbase,
    mediaId
  ) => {
    // console.log(`getImageMetadata irepsKeyItem: `, irepsKeyItem);
    // console.log(`getImageMetadata mediaType: `, mediaType);
    // console.log(`getImageMetadata mediaCat: `, mediaCat);
    // console.log(`getImageMetadata data: `, data);
    // console.log(
    //   `useImage getImageMetadata data `,
    //   JSON.stringify(data, null, 2)
    // );

    // console.log(`getImageMetadata coords: `, coords);
    // if irepsKeyItem is trn, extract trnId from data
    // const trnId = "trnId";

    //TODO: fins a way to alert an error if coordinates are not defines or are null or do not exist.

    const metadata = {
      mediaType: mediaType,
      mediaCategory: mediaCat,
      createdByUser: displayName,
      createdByUid: uid,
      createdAtDatetime: format(new Date(), constants.dateFormat2),
      createdAtLocation: {
        lat: coords?.latitude,
        lng: coords?.longitude,
      },
      workbase,
      mediaId,
    };
    // console.log(`getImageMetadata metadata: `, metadata);

    let newMetadata = {};
    if (irepsKeyItem?.trim() === "erf") {
      newMetadata = {
        ...metadata,
        erfId: data?.id,
        erfNo: data?.erfNo,
      };
      // console.log(`newMetadata`, newMetadata);
    }
    if (irepsKeyItem?.trim() === "trn") {
      newMetadata = {
        ...metadata,
        astId: data?.ast?.astData?.astId,
        astNo: data?.ast?.astData?.astNo,
        trnId: data?.metadata?.trnId,
        erfId: data?.ast?.erf?.erfId,
        erfNo: data?.ast?.erf?.erfNo,
      };
    }
    if (irepsKeyItem?.trim() === "ast") {
      newMetadata = {
        ...metadata,
        astId: data?.astData?.astId,
        astNo: data?.astData?.astNo,
      };
    }
    // console.log(`return newMetadata`, newMetadata);
    return newMetadata;
  };

  return { getImageMetadata };
};
