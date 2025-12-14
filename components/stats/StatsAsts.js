import { AntDesign } from "@expo/vector-icons";
import { useMemo } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import StatsComponent from "../../components/stats/StatsComponent";
import StatsComponentData from "../../components/stats/StatsComponentData";
import StatsComponentGraphs from "../../components/stats/StatsComponentGraphs";
import StatsComponentHeader from "../../components/stats/StatsComponentHeader";

const StatsAsts = (props) => {
  const {
    astsStats,
    showStats,
    setShowStats,
    asts,
    setActiveAsts,
    setActiveAstsName,
    dataRef,
    hasMoreRef,
    setPage,
    pageRef,
  } = props;
  // console.log(`AstsStats astsStats`, astsStats);

  const {
    totalAsts,
    astTypesStats,
    astPhasesStats,
    anomalyStats,
    anomalyDetailStats,
    astManufacturerStats,
    astNameStats,
    astStateStats,
    cbSizeStats,
    cbCommentStats,
    sealPresenceStats,
    sealCommentStats,
    creatorStats,
    trnCountStats,
    deletePendingStats,
  } = astsStats;
  // console.log(`AstsStats anomalyStats`, anomalyStats);

  const astsTypeData = useMemo(() => {
    return Object.entries(astTypesStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [astTypesStats]);
  // console.log(`astsTypeData`, astsTypeData);
  const sortedAstsTypeData = useMemo(() => {
    return astsTypeData.sort((a, b) => a.key.localeCompare(b.key));
  }, [astsTypeData]);
  // console.log(`sortedAstsTypeDataData`, sortedAstsTypeDataData);

  const astPhaseData = useMemo(() => {
    return Object.entries(astPhasesStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [astPhasesStats]);
  // console.log(`propertyTypeData`, propertyTypeData);

  const anomalyStatsData = useMemo(() => {
    return Object.entries(anomalyStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [anomalyStats]);
  // console.log(`anomalyStatsData`, anomalyStatsData);

  const anomalyDetailStatsData = useMemo(() => {
    return Object.entries(anomalyDetailStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [anomalyDetailStats]);
  // console.log(`noAccessData`, noAccessData);

  const astManufacturerStatsData = useMemo(() => {
    return Object.entries(astManufacturerStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [astManufacturerStats]);
  // console.log(`serviceConnectionData`, serviceConnectionData);

  const astNameStatsData = useMemo(() => {
    return Object.entries(astNameStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [astNameStats]);
  // console.log(`astNameStatsData`, astNameStatsData);

  const astStateData = useMemo(() => {
    return Object.entries(astStateStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [astStateStats]);
  // console.log(`astStateData`, astStateData);

  const cbSizeData = useMemo(() => {
    return Object.entries(cbSizeStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [cbSizeStats]);
  // console.log(`cbSizeData`, cbSizeData);

  const cbCommentData = useMemo(() => {
    return Object.entries(cbCommentStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [cbCommentStats]);
  // console.log(`cbCommentData`, cbCommentData);

  const sealPresenceData = useMemo(() => {
    return Object.entries(sealPresenceStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [sealPresenceStats]);
  // console.log(`sealPresenceData`, sealPresenceData);

  const sealCommentData = useMemo(() => {
    return Object.entries(sealCommentStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [sealCommentStats]);
  // console.log(`sealCommentData`, sealCommentData);

  const creatorData = useMemo(() => {
    return Object.entries(creatorStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [creatorStats]);
  // console.log(`creatorData`, creatorData);

  const trnCountData = useMemo(() => {
    return Object.entries(trnCountStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [trnCountStats]);
  // console.log(`trnCountData`, trnCountData);

  const deletePendingData = useMemo(() => {
    return Object.entries(deletePendingStats).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        key: key,
        value: value,
      };
    });
  }, [deletePendingStats]);
  // console.log(`deletePendingData`, deletePendingData);

  const onPress = () => {
    setShowStats(false);
    setActiveAsts(asts);
    setActiveAstsName((prev) => (prev = "asts"));
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
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Asts Stats</Text>
        </View>

        {/* Modal Body */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.modalView}>
            {/* Asts Types */}
            <StatsComponent>
              <StatsComponentHeader title={"Asts Types"} total={totalAsts} />
              <StatsComponentData data={sortedAstsTypeData} />
              <StatsComponentGraphs data={sortedAstsTypeData} />
            </StatsComponent>
            {/* Asts Phases */}
            <StatsComponent>
              <StatsComponentHeader title={"Asts Phases"} total={totalAsts} />
              <StatsComponentData data={astPhaseData} />
              <StatsComponentGraphs data={astPhaseData} />
            </StatsComponent>
            {/* Anomaly Stats */}
            <StatsComponent>
              <StatsComponentHeader title={"Anomaly"} total={totalAsts} />
              <StatsComponentData data={anomalyStatsData} />
              <StatsComponentGraphs data={anomalyStatsData} />
            </StatsComponent>
            {/* Anomaly Details Stats */}
            <StatsComponent>
              <StatsComponentHeader
                title={"Anomaly Detail"}
                total={totalAsts}
              />
              <StatsComponentData data={anomalyDetailStatsData} />
              <StatsComponentGraphs data={anomalyDetailStatsData} />
            </StatsComponent>
            {/* Anomaly Details Stats */}
            <StatsComponent>
              <StatsComponentHeader
                title={"Ast Manufacture"}
                total={totalAsts}
              />
              <StatsComponentData data={astManufacturerStatsData} />
              <StatsComponentGraphs data={astManufacturerStatsData} />
            </StatsComponent>
            {/* Anomaly Details Stats */}
            <StatsComponent>
              <StatsComponentHeader title={"Ast Name"} total={totalAsts} />
              <StatsComponentData data={astNameStatsData} />
              <StatsComponentGraphs data={astNameStatsData} />
            </StatsComponent>
            {/* Ast State Stats */}
            <StatsComponent>
              <StatsComponentHeader title={"Ast State"} total={totalAsts} />
              <StatsComponentData data={astStateData} />
              <StatsComponentGraphs data={astStateData} />
            </StatsComponent>
            {/* CB Size Stats */}
            <StatsComponent>
              <StatsComponentHeader title={"CB Size"} total={totalAsts} />
              <StatsComponentData data={cbSizeData} />
              <StatsComponentGraphs data={cbSizeData} />
            </StatsComponent>
            {/* CB Comments Stats */}
            <StatsComponent>
              <StatsComponentHeader title={"CB Comments"} total={totalAsts} />
              <StatsComponentData data={cbCommentData} />
              <StatsComponentGraphs data={cbCommentData} />
            </StatsComponent>
            {/* Seal Count Stats */}
            <StatsComponent>
              <StatsComponentHeader title={"Seal Presence"} total={totalAsts} />
              <StatsComponentData data={sealPresenceData} />
              <StatsComponentGraphs data={sealPresenceData} />
            </StatsComponent>
            {/* Seal Comments Stats */}
            <StatsComponent>
              <StatsComponentHeader title={"Seal Comments"} total={totalAsts} />
              <StatsComponentData data={sealCommentData} />
              <StatsComponentGraphs data={sealCommentData} />
            </StatsComponent>
            {/* Ast Creator Stats */}
            <StatsComponent>
              <StatsComponentHeader title={"Ast Creator"} total={totalAsts} />
              <StatsComponentData data={creatorData} />
              <StatsComponentGraphs data={creatorData} />
            </StatsComponent>
            {/* Ast Trn Count Stats */}
            <StatsComponent>
              <StatsComponentHeader title={"Ast Trn Count"} total={totalAsts} />
              <StatsComponentData data={trnCountData} />
              <StatsComponentGraphs data={trnCountData} />
            </StatsComponent>
            {/* DeletePending Stats */}
            <StatsComponent>
              <StatsComponentHeader
                title={"Delete Pending Asts"}
                total={totalAsts}
              />
              <StatsComponentData data={deletePendingData} />
              <StatsComponentGraphs data={deletePendingData} />
            </StatsComponent>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default StatsAsts;

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
