import { AntDesign } from "@expo/vector-icons";
import { useMemo } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import StatsComponent from "./StatsComponent";
import StatsComponentData from "./StatsComponentData";
import StatsComponentGraphs from "./StatsComponentGraphs";
import StatsComponentHeader from "./StatsComponentHeader";

const StatsTrns = (props) => {
  const {
    trnsStats,
    showStats,
    setShowStats,
    trns: originalTrns,
    setActiveTrns,
    setActiveTrnsName,
  } = props;
  // console.log(`TrnsStats trnsStats`, trnsStats);

  const { totalTrns, trnsStats: stats } = trnsStats;
  // console.log(`ErfsStats stats`, stats);

  const {
    trns,
    propertyTypes,
    noAccessReasons,
    trnType,
    trnState,
    wards,
    towns,
    suburbTownships,
    strNames,
  } = stats;
  // console.log(`TrnsStats trns`, trns);
  // console.log(`TrnsStats noAccessReasons`, noAccessReasons);

  const accessData = useMemo(() => {
    return Object.entries(trns).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalTrns) * 100).toFixed(0)}%`,
      };
    });
  }, [trns]);
  // console.log(`erfsTypeData`, erfsTypeData);

  const propertyTypeData = useMemo(() => {
    return Object.entries(propertyTypes).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalTrns) * 100).toFixed(0)}%`,
      };
    });
  }, [propertyTypes]);
  // console.log(`propertyTypeData`, propertyTypeData);
  const sortedPropertyTypeData = useMemo(() => {
    return propertyTypeData.sort((a, b) => a.key.localeCompare(b.key));
  }, [propertyTypeData]);
  // console.log(`sortedPropertyTypeData`, sortedPropertyTypeData);

  const noAccessReasonsData = useMemo(() => {
    return Object.entries(noAccessReasons).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalTrns) * 100).toFixed(0)}%`,
      };
    });
  }, [noAccessReasons, totalTrns]);
  // console.log(`noAccessReasonsData`, noAccessReasonsData);
  const noAccessReasonsTotal = noAccessReasonsData?.reduce(
    (accum, curValue) => accum + curValue?.value,
    0
  );
  // console.log(`noAccessReasonsTotal`, noAccessReasonsTotal);

  const trnsTypeData = useMemo(() => {
    return Object.entries(trnType).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalTrns) * 100).toFixed(0)}%`,
      };
    });
  }, [trnType]);
  // console.log(`trnTypeData`, trnTypeData);

  const trnsStateData = useMemo(() => {
    return Object.entries(trnState).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalTrns) * 100).toFixed(0)}%`,
      };
    });
  }, [trnState, totalTrns]);
  // console.log(`trnStateData`, trnStateData);

  const wardsData = useMemo(() => {
    return Object.entries(wards).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalTrns) * 100).toFixed(0)}%`,
      };
    });
  }, [wards]);
  // console.log(`wardsData`, wardsData);

  const townsData = useMemo(() => {
    return Object.entries(towns).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalTrns) * 100).toFixed(0)}%`,
      };
    });
  }, [towns]);
  // console.log(`townsData`, townsData);

  const suburbTownshipData = useMemo(() => {
    return Object.entries(suburbTownships).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalTrns) * 100).toFixed(0)}%`,
      };
    });
  }, [suburbTownships]);
  // console.log(`suburbTownshipData`, suburbTownshipData);

  const strNameData = useMemo(() => {
    return Object.entries(strNames).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalTrns) * 100).toFixed(0)}%`,
      };
    });
  }, [strNames]);
  // console.log(`strNameData`, strNameData);
  const sortedStrNameData = useMemo(() => {
    return strNameData.sort((a, b) => a.key.localeCompare(b.key));
  }, [strNameData]);

  const onPress = () => {
    setShowStats(false);
    setActiveTrns(originalTrns);
    setActiveTrnsName((prev) => (prev = "trns"));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={showStats}>
      <View style={styles.centeredView}>
        {/* Modal Header */}
        <View style={styles.header}>
          <AntDesign
            name="close"
            size={25}
            color="#aaa"
            onPress={onPress}
            borderWidth={2}
            borderColor="#6495ed"
            borderRadius={10}
          />
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Trns Stats</Text>
        </View>

        {/* Modal Body */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.modalView}>
            {/* Trns Access */}
            <StatsComponent>
              <StatsComponentHeader title={"Trns Access"} total={totalTrns} />
              <StatsComponentData data={accessData} />
              <StatsComponentGraphs data={accessData} />
            </StatsComponent>

            {/* Trns No Access Reasons */}
            <StatsComponent>
              <StatsComponentHeader
                title={"Trn Property Types"}
                total={totalTrns}
              />
              <StatsComponentData data={sortedPropertyTypeData} />
              <StatsComponentGraphs data={sortedPropertyTypeData} />
            </StatsComponent>

            {/* Trns No Access Reasons */}
            <StatsComponent>
              <StatsComponentHeader
                title={"Trn No Access Reasons"}
                total={noAccessReasonsTotal}
              />
              <StatsComponentData data={noAccessReasonsData} />
              <StatsComponentGraphs data={noAccessReasonsData} />
            </StatsComponent>
            {/* Trns Types */}
            <StatsComponent>
              <StatsComponentHeader title={"Trn Types"} total={totalTrns} />
              <StatsComponentData data={trnsTypeData} />
              <StatsComponentGraphs data={trnsTypeData} />
            </StatsComponent>
            {/* Trns States */}
            <StatsComponent>
              <StatsComponentHeader title={"Trn States"} total={totalTrns} />
              <StatsComponentData data={trnsStateData} />
              <StatsComponentGraphs data={trnsStateData} />
            </StatsComponent>
            {/* Trns Wards */}
            <StatsComponent>
              <StatsComponentHeader title={"Trn Wards"} total={totalTrns} />
              <StatsComponentData data={wardsData} />
              <StatsComponentGraphs data={wardsData} />
            </StatsComponent>
            {/* Trns Towns */}
            <StatsComponent>
              <StatsComponentHeader title={"Trn Towns"} total={totalTrns} />
              <StatsComponentData data={townsData} />
              <StatsComponentGraphs data={townsData} />
            </StatsComponent>
            {/* Trns surburbTownship */}
            <StatsComponent>
              <StatsComponentHeader
                title={"Trn Surnburbs/Townships"}
                total={totalTrns}
              />
              <StatsComponentData data={suburbTownshipData} />
              <StatsComponentGraphs data={suburbTownshipData} />
            </StatsComponent>
            {/* Trns Str Names */}
            <StatsComponent>
              <StatsComponentHeader title={"Trn Str Names"} total={totalTrns} />
              <StatsComponentData data={sortedStrNameData} />
              <StatsComponentGraphs data={sortedStrNameData} />
            </StatsComponent>
            {/* Trns Phases */}
            {/* <StatsComponent>
              <StatsComponentHeader title={"Trns Phases"} total={totalTrns} />
              <StatsComponentData data={astPhaseData} />
              <StatsComponentGraphs data={astPhaseData} />
            </StatsComponent> */}
            {/* Anomaly Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader title={"Anomaly"} total={totalTrns} />
              <StatsComponentData data={anomalyStatsData} />
              <StatsComponentGraphs data={anomalyStatsData} />
            </StatsComponent> */}
            {/* Anomaly Details Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader
                title={"Anomaly Detail"}
                total={totalTrns}
              />
              <StatsComponentData data={anomalyDetailStatsData} />
              <StatsComponentGraphs data={anomalyDetailStatsData} />
            </StatsComponent> */}
            {/* Anomaly Details Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader
                title={"Ast Manufacture"}
                total={totalTrns}
              />
              <StatsComponentData data={astManufacturerStatsData} />
              <StatsComponentGraphs data={astManufacturerStatsData} />
            </StatsComponent> */}
            {/* Anomaly Details Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader title={"Ast Name"} total={totalTrns} />
              <StatsComponentData data={astNameStatsData} />
              <StatsComponentGraphs data={astNameStatsData} />
            </StatsComponent> */}
            {/* Ast State Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader title={"Ast State"} total={totalTrns} />
              <StatsComponentData data={trnstateData} />
              <StatsComponentGraphs data={trnstateData} />
            </StatsComponent> */}
            {/* CB Size Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader title={"CB Size"} total={totalTrns} />
              <StatsComponentData data={cbSizeData} />
              <StatsComponentGraphs data={cbSizeData} />
            </StatsComponent> */}
            {/* CB Comments Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader title={"CB Comments"} total={totalTrns} />
              <StatsComponentData data={cbCommentData} />
              <StatsComponentGraphs data={cbCommentData} />
            </StatsComponent> */}
            {/* Seal Count Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader title={"Seal Presence"} total={totalTrns} />
              <StatsComponentData data={sealPresenceData} />
              <StatsComponentGraphs data={sealPresenceData} />
            </StatsComponent> */}
            {/* Seal Comments Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader title={"Seal Comments"} total={totalTrns} />
              <StatsComponentData data={sealCommentData} />
              <StatsComponentGraphs data={sealCommentData} />
            </StatsComponent> */}
            {/* Ast Creator Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader title={"Ast Creator"} total={totalTrns} />
              <StatsComponentData data={creatorData} />
              <StatsComponentGraphs data={creatorData} />
            </StatsComponent> */}
            {/* Ast Trn Count Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader title={"Ast Trn Count"} total={totalTrns} />
              <StatsComponentData data={trnCountData} />
              <StatsComponentGraphs data={trnCountData} />
            </StatsComponent> */}
            {/* DeletePending Stats */}
            {/* <StatsComponent>
              <StatsComponentHeader
                title={"Delete Pending Trns"}
                total={totalTrns}
              />
              <StatsComponentData data={deletePendingData} />
              <StatsComponentGraphs data={deletePendingData} />
            </StatsComponent> */}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default StatsTrns;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "pink",
    width: "100%",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 50,
    // height: "100%",
    // marginHorizontal: 7,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "97.5%",
    height: 50,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    padding: 5,
    backgroundColor: "white",
  },
  modalView: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  button: {
    borderRadius: 20,
    // padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
  },
});
