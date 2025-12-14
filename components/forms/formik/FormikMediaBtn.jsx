import { Entypo, Octicons } from "@expo/vector-icons";
import { Field, useFormikContext } from "formik";
import { View } from "react-native";

import { useEffect } from "react";
import { useMediaContext } from "../../../context/MediaContext";
import { useMedia } from "../../../hooks/useMedia";
import MediaAppLaunchMediaViewerBtn from "../../media/MediaAppLauncMediaViewerBtn";
import FormikError from "./FormikError"; // Adjust the import path as necessary
import FormikLabel from "./FormikLabel";

const FormikMediaBtn = (props) => {
  // console.log(`props @ FormikMediaBtn`, props);
  const {
    inputRef,
    label,
    name,
    placeHolder,
    icon,
    // media,
    mediaCat,
    // formik,
    ...rest
  } = props;

  const formik = useFormikContext();
  // console.log(`FormikMediaBtn ----formik?.values`, formik?.values);
  const { media } = formik?.values || [];
  // console.log(`FormikMediaBtn ----media`, media);
  const { splitAndSortMedia } = useMedia();
  const { photos, audios, videos } = splitAndSortMedia(media);
  // console.log(`FormikMediaBtn ----photos`, photos);

  const { updateMediaData } = useMediaContext();

  // const handleOpenMediaViewer = (mediaCat) => {
  // console.log(`Open MediaViewer mediaCat:`, mediaCat);
  useEffect(() => {
    updateMediaData({
      // modalMediaViewer: true, // Open mediaAppviewer modal
      // modalMediaCapture: false, // close mediaAppCapture modal
      // mediaCat: mediaCat,
      photos,
      audios,
      videos,
    });
  }, [media]);

  // };

  // split media to get different media types
  const iconPhoto = <Entypo name="images" size={25} color="black" />;
  const iconAudio = <Entypo name="voicemail" size={25} color="black" />;
  const iconVideo = <Octicons name="video" size={25} color="black" />;

  // const { photos, audios, videos } = splitAndSortMedia(media);

  return (
    <>
      <Field name={name} {...rest}>
        {(props) => {
          // console.log(`FormikMediaBtn ----props`, props);
          const { form, meta } = props;
          // console.log(`FormikMediaBtn ----form`, form);
          // console.log(`FormikMediaBtn ----meta`, meta);
          const { errors, touched } = form;
          // console.log(`FormikMediaBtn ----errors`, errors);
          // console.log(`FormikMediaBtn ----touched`, touched);

          return (
            <View style={{ marginTop: 5 }}>
              <FormikError meta={meta} form={form} fontSize={18} />
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 5,
                  paddingBottom: 1,
                  paddingTop: 1,
                  gap: 10,
                  borderColor: errors[name] && touched[name] ? "red" : null,
                  height: 75,
                  alignItems: "center",
                  backgroundColor: "skyblue",
                  position: "relative",
                }}
              >
                {icon}
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: 20,
                    padding: 15,
                  }}
                >
                  <MediaAppLaunchMediaViewerBtn
                    icon={iconPhoto}
                    mediaType={"photos"}
                    mediaCat={mediaCat}
                    media={photos}
                    fontSize={15}
                  />
                  <MediaAppLaunchMediaViewerBtn
                    icon={iconAudio}
                    mediaType={"audio"}
                    mediaCat={mediaCat}
                    media={audios}
                    fontSize={15}
                  />
                  <MediaAppLaunchMediaViewerBtn
                    icon={iconVideo}
                    mediaType={"videos"}
                    mediaCat={mediaCat}
                    media={videos}
                    fontSize={15}
                  />
                </View>
                <FormikLabel label={label} />
              </View>
            </View>
          );
        }}
      </Field>
    </>
  );
};

export default FormikMediaBtn;
