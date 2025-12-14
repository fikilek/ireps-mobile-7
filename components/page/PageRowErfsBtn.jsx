import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

const PageRowErfsBtn = (props) => {
  // console.log(` `);
  // console.log(` `);
  // console.log(`PageRowErfsBtn ----START START`);
  // console.log(`PageRowErfsBtn ----START START`);

  // console.log(`PageRowErfsBtn ----props`, props);

  const { title, erf, action, children } = props;
  // console.log(`PageRowErfsBtn ----title`, title);
  // console.log(`PageRowErfsBtn ----erf`, erf);
  // console.log(`PageRowErfsBtn ----action`, action);

  const router = useRouter();

  const onPress = useCallback(() => {
    const { address, propertyType, erfNo } = erf;
    // console.log(`PageRowErfsBtn ----address`, address);
    // console.log(`PageRowErfsBtn ----propertyType`, propertyType);
    // console.log(`PageRowErfsBtn ----erfNo`, erfNo);
    // console.log(`PageRowErfsBtn ----erf`, erf);

    const streetAdr = address?.streetAdr;

    if (
      (action === "trnFormMeterAudit_" ||
        action === "trnFormMeterInstallation_") &&
      (!streetAdr?.strNo || !streetAdr?.strName || !streetAdr?.strType)
    ) {
      // streetAdr is false, display an Alert
      Alert.alert("Meter Audit Alert", "Please complete 'Erf Address' fields.");
      return null;
    }

    if (
      (action === "trnFormMeterAudit_" ||
        action === "trnFormMeterInstallation_") &&
      !propertyType?.type
    ) {
      // propertyType is false, display an Alert and return null
      Alert.alert(
        "Meter Audit Alert",
        "Please complete 'Erf Prop Type' fields."
      );
      return null;
    }

    //const erfType = erf?.erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal";
    // console.log(`erfType`, erfType);

    // console.log(`displays`, displays);
    // console.log(`action`, action);

    router.push({
      // pathname: `/${displays}/${action}`,
      pathname: `/(tabs)/erfs/${action}`,
      params: {
        erf: JSON.stringify(erf),
        irepsKeyItem: "erf",
        erfNo: erf?.erfNo,
        erfType: erf?.erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal",
      },
    });
  }, [action, erf, router]);

  // console.log(`PageRowErfsBtn ----END END`);
  // console.log(`PageRowErfsBtn ----END END`);
  // console.log(` `);
  // console.log(` `);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // width,
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        borderColor: "lightblue",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "800",
          backgroundColor: "lightblue",
          width: "100%",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          textAlign: "center",
          color: action ? "black" : "rgba(117, 117, 163, 1)",
        }}
      >
        {title}
      </Text>
      {children}
    </TouchableOpacity>
  );
};

export default PageRowErfsBtn;
