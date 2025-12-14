import { createContext, useContext, useState } from "react";

// Create context:
// UserContext: to query the context state
export const MediaContext = createContext();

const initValue = {
  data: {}, // either erf or ast
  photos: [],
  videos: [],
  audios: [],
  displayPosition: 0,
  mediaCat: null,
  irepsKeyItem: null,
  // modalVisible: false,
  modalMediaViewer: false,
  modalMediaCapture: false,
};

export const MediaContextProvider = (props) => {
  // console.log(`MediaContextProvider_ props`, props);
  const { children } = props;

  // props is either gonna be an erf or an ast.
  // console.log(
  // 	`MediaContextProvider props ----------------------------------`,
  // 	props
  // );

  const [mediaData, setMediaData] = useState(initValue);
  // console.log(
  //   `MediaContextProvider mediaData?.isConnected`,
  //   mediaData?.mediaCat?.isConnected
  // );
  // console.log(
  //   `MediaContextProvider mediaData`,
  //   JSON.stringify(mediaData, null, 2)
  // );

  const updateMediaData = (patch) => setMediaData((s) => ({ ...s, ...patch }));

  return (
    <MediaContext.Provider
      value={{ initValue, mediaData, setMediaData, updateMediaData }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => {
  const mediaContext = useContext(MediaContext);
  // console.log(`mediaContext`, mediaContext);

  if (!mediaContext) {
    throw new Error("Media Context must be used ONLY where its provided");
  }

  return mediaContext;
};
