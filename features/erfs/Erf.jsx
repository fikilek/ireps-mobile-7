import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ActivityIndicator, Alert, View } from "react-native";
import uuid from "react-native-uuid";

import PageRowBtnData from "../../components/page/PageRowBtnData";
import PageRowBtnElecWaterData from "../../components/page/PageRowBtnElecWaterData";
import PageRowErfsBtn from "../../components/page/PageRowErfsBtn";
import { useAuth } from "../../context/authContext.js";
import { useCreateErfMutation } from "../../redux/erfsSlice.js";
import { truncateString } from "../../utils/utilsCommon.js";

const Erf = (props) => {
  const { erf } = props;
  const { erfNo, asts, address, propertyType, media, trns, waterMeters } = erf;
  // console.log(`address`, address);

  // TODO: Confirm from trns collcetion if indeed the trns are there. If ghe trns length of the erf is NOT equal to the transactions from the trns collection, then something is wrong - there is a mismatch.

  const { streetAdr, street } = address;
  // console.log(`streetAdr`, streetAdr);

  const strNo = streetAdr?.strNo;
  const strName = streetAdr?.strName;
  const strType = streetAdr?.strType;

  // Property time
  const { type, unitName, untiNo } = propertyType || {};

  // Check if there is streetAdr
  const strAdr =
    !strNo ||
    strNo == null ||
    strNo === undefined ||
    strNo === "" ||
    !strName ||
    strName == null ||
    strName === undefined ||
    strName === "" ||
    !strType ||
    strType == null ||
    strType === undefined ||
    strType === ""
      ? ``
      : `${strNo} ${strName} ${strType}`;
  // console.log(`strAdr`, strAdr);

  const router = useRouter();

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName } = user || {};
  // console.log(`Erf uid`, uid);
  // console.log(`Erf displayName`, displayName);

  const [createErf, { isError, isLoading, isSuccess }] = useCreateErfMutation();

  const duplicateErf = async (erf) => {
    // console.log("Duplicate Erf: ", erf?.erfNo);
    Alert.alert(
      "Confirm Action", // Alert Title
      `This will dulicate Erf ${erf?.erfNo}.`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel", // This style often places the button on the left on iOS
        },
        {
          text: "OK",
          onPress: async () => {
            // console.log("OK Pressed - Proceeding with action");
            const newErfData = {
              ...erf,
              asts: [],
              trns: [],
              propertyType: {
                ...erf.propertyType,
                unitNo: "",
              },
            };
            // delete id
            delete newErfData.id;
            // console.log(
            //   `duplicateErf newErfData`,
            //   JSON.stringify(newErfData, null, 2)
            // );
            const erfId = uuid.v4();
            // console.log(`erfId`, erfId);

            const createErfResult = await createErf({
              newErfData,
              displayName,
              uid,
              id: erfId,
            });
            if (createErfResult?.data) {
              // show alert  and go back
              router.navigate("erfs");
              // display success notice
              Alert.alert(`Erf [${erf?.erfNo}] Duplicated Successfully`);
            }
            if (createErfResult?.error) {
              // Show Alert only (Do not reroute - ussr must decide)
              Alert.alert(`Erf Duplication Failure `, createErfResult.error);
              // }
            }
          },
          style: "default", // Default style for the positive action
        },
      ],
      { cancelable: false } // Optional: prevents dismissing the alert by tapping outside
    );
  };

  return (
    <View
      style={{
        padding: 5,
        gap: 4,
      }}
    >
      {/* row 1 */}
      <View style={{ flex: 1, flexDirection: "row", gap: 3 }}>
        <PageRowErfsBtn
          // flexNo={1}
          title="Details"
          erf={erf}
          action="erfDetails"
        >
          <PageRowBtnData data={erfNo} />
        </PageRowErfsBtn>

        {/* Meters on Erf */}
        <PageRowErfsBtn
          // flexNo={1}
          title="Services"
          erf={erf}
          action="erfMetersOnErf"
          displays="erfsDisplays"
        >
          <PageRowBtnElecWaterData
            data={asts?.length ? asts?.length : 0}
            wmData={waterMeters?.length ? waterMeters?.length : 0}
          />
        </PageRowErfsBtn>

        {/* No Access */}
        <PageRowErfsBtn
          flexNo={1}
          title="N/A"
          erf={erf}
          action="erfNoAccessTrns"
          displays="erfsDisplays"
        >
          <PageRowBtnData data={trns?.length ? trns?.length : 0} />
        </PageRowErfsBtn>

        {/* Audit Form */}
        <PageRowErfsBtn
          // flexNo={2}
          title="Audit"
          erf={erf}
          action="trnFormMeterAudit_"
          displays="trnsDisplays"
          trnType="audit"
        >
          <PageRowBtnData data={"Form"} />
        </PageRowErfsBtn>

        {/* Installation Form */}
        <PageRowErfsBtn
          // flexNo={2}
          title="Install"
          erf={erf}
          action="trnFormMeterInstallation_"
          displays="trnsDisplays"
          trnType="installation"
        >
          <PageRowBtnData data={"Form"} />
        </PageRowErfsBtn>

        {/* Media */}
        <PageRowErfsBtn
          // flexNo={1}
          title="Media"
          erf={erf}
          action="erfMedia"
          displays="erfsDisplays"
        >
          <PageRowBtnData data={media?.length ? media?.length : 0} />
        </PageRowErfsBtn>
      </View>

      {/* row 2 */}
      <View style={{ flex: 1, flexDirection: "row", gap: 3 }}>
        <View style={{ flex: 1 }}>
          <PageRowErfsBtn
            title="Address"
            erf={erf}
            action="erfFormErfAdr"
            // displays="erfsDisplays"
          >
            <PageRowBtnData
              data={strAdr?.length !== 0 ? truncateString(strAdr) : street}
            />
          </PageRowErfsBtn>
        </View>
        <View style={{ flex: 1 }}>
          <PageRowErfsBtn
            title="Prop Type"
            erf={erf}
            action="erfFormPropertyType"
            // displays="erfsDisplays"
          >
            <PageRowBtnData
              data={
                propertyType?.type === "Flats"
                  ? `${propertyType?.type}: ${propertyType?.unitName}-${propertyType?.unitNo}`
                  : propertyType?.type
              }
            />
          </PageRowErfsBtn>
        </View>

        {erf?.propertyType?.type === "Flats" && (
          <View style={{ flex: 0.5 }}>
            {isLoading ? (
              <PageRowErfsBtn title="Duplicate">
                <ActivityIndicator />
              </PageRowErfsBtn>
            ) : (
              <PageRowErfsBtn
                title="Duplicate"
                erf={erf}
                action="erfFormDuplicateErf_"
                displays="erfsDisplays"
              >
                <PageRowBtnData
                  data={
                    <FontAwesome
                      name="copy"
                      size={12}
                      color="black"
                      onPress={() => duplicateErf(erf)}
                    />
                  }
                />
              </PageRowErfsBtn>
            )}
          </View>
        )}

        <View>
          <PageRowErfsBtn
            title="Erf GPS"
            erf={erf}
            action="erfOnMap"
            displays="erfsDisplays"
          >
            <PageRowBtnData data={"Map"} />
          </PageRowErfsBtn>
        </View>
      </View>
    </View>
  );
};

export default Erf;
