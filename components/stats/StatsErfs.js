import { AntDesign } from "@expo/vector-icons";
import { useMemo } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";

import StatsComponent from "../../components/stats/StatsComponent";
import StatsComponentData from "../../components/stats/StatsComponentData";
import StatsComponentGraphs from "../../components/stats/StatsComponentGraphs";
import StatsComponentHeader from "../../components/stats/StatsComponentHeader";

const StatsErfs = (props) => {
  const {
    erfsStats,
    showStats,
    setShowStats,
    erfs: originalErfs,
    setActiveErfs,
    setActiveErfsName,
    dataRef,
    hasMoreRef,
    setPage,
    pageRef,
  } = props;
  // console.log(`ErfsStats erfsStats`, erfsStats);

  const { totalErfs, erfsStats: stats } = erfsStats;
  // console.log(`ErfsStats stats`, stats);

  const {
    erfs,
    propertyTypes,
    metered,
    noAccess,
    // serviceConnections,
    // grouped,
    wards,
    towns,
    suburbTownships,
    strNames,
  } = stats;
  // console.log(`ErfsStats metered`, metered);

  const erfsTypeData = useMemo(() => {
    return Object.entries(erfs).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalErfs) * 100).toFixed(0)}%`,
      };
    });
  }, [erfs]);
  // console.log(`erfsTypeData`, erfsTypeData);

  const propertyTypeData = useMemo(() => {
    return Object.entries(propertyTypes).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalErfs) * 100).toFixed(0)}%`,
      };
    });
  }, [propertyTypes]);
  // console.log(`propertyTypeData`, propertyTypeData);

  const sortedPropertyTypeData = useMemo(() => {
    return propertyTypeData.sort((a, b) => a.key.localeCompare(b.key));
  }, [propertyTypeData]);
  // console.log(`sortedPropertyTypeData`, sortedPropertyTypeData);

  const meteredData = useMemo(() => {
    return Object.entries(metered).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalErfs) * 100).toFixed(0)}%`,
      };
    });
  }, [metered]);
  // console.log(`meteredData`, meteredData);

  const noAccessData = useMemo(() => {
    return Object.entries(noAccess).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalErfs) * 100).toFixed(0)}%`,
      };
    });
  }, [noAccess]);
  // console.log(`noAccessData`, noAccessData);

  const wardData = useMemo(() => {
    return Object.entries(wards).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalErfs) * 100).toFixed(0)}%`,
      };
    });
  }, [wards]);
  // console.log(`wardData`, wardData);

  const townData = useMemo(() => {
    return Object.entries(towns).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalErfs) * 100).toFixed(0)}%`,
      };
    });
  }, [towns]);
  // console.log(`townData`, townData);

  const suburbTownshipData = useMemo(() => {
    return Object.entries(suburbTownships).map(([key, value]) => {
      // console.log(`${key}: ${value}`);
      return {
        label: key,
        value: value,
        key: key,
        text: `${((value / totalErfs) * 100).toFixed(0)}%`,
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
        text: `${((value / totalErfs) * 100).toFixed(0)}%`,
      };
    });
  }, [strNames]);
  // console.log(`strNameData`, strNameData);
  const sortedStrNameData = useMemo(() => {
    return strNameData.sort((a, b) => a.key.localeCompare(b.key));
  }, [strNameData]);

  const onPress = () => {
    setShowStats(false);
    setActiveErfs(originalErfs);
    setActiveErfsName((prev) => (prev = "erfs"));
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
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Erfs Stats</Text>
        </View>

        {/* Modal Body */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.modalView}>
            {/* Erfs Types */}
            <StatsComponent>
              <StatsComponentHeader title={"Erfs Types"} total={totalErfs} />
              <StatsComponentData data={erfsTypeData} />
              <StatsComponentGraphs data={erfsTypeData} />
            </StatsComponent>

            {/* Erf Property Types */}
            <StatsComponent>
              <StatsComponentHeader
                title={"Erfs PropertyTypes"}
                total={totalErfs}
              />
              <StatsComponentData data={sortedPropertyTypeData} />
              <StatsComponentGraphs data={sortedPropertyTypeData} />
            </StatsComponent>

            {/* Metered Erfs */}
            <StatsComponent>
              <StatsComponentHeader title={"Metered Erfs"} total={totalErfs} />
              <StatsComponentData data={meteredData} />
              <StatsComponentGraphs data={meteredData} />
            </StatsComponent>

            {/* No Access */}
            <StatsComponent>
              <StatsComponentHeader title={"No Access"} total={totalErfs} />
              <StatsComponentData data={noAccessData} />
              <StatsComponentGraphs data={noAccessData} />
            </StatsComponent>

            {/* Service Connections */}
            {/* <StatsComponent>
              <StatsComponentHeader
                title={"Service Connections"}
                total={totalErfs}
              />
              <StatsComponentData data={serviceConnectionData} />
              <StatsComponentGraphs data={serviceConnectionData} />
            </StatsComponent> */}

            {/* Grouped */}
            {/* <StatsComponent>
							<StatsComponentHeader title={"Grouped Erfs"} total={totalErfs} />
							<StatsComponentData data={groupedData} />
							<StatsComponentGraphs data={groupedData} />
						</StatsComponent> */}

            {/* Wards */}
            <StatsComponent>
              <StatsComponentHeader title={"Wards"} total={totalErfs} />
              <StatsComponentData data={wardData} />
              <StatsComponentGraphs data={wardData} />
            </StatsComponent>

            {/* Towns */}
            <StatsComponent>
              <StatsComponentHeader title={"Towns"} total={totalErfs} />
              <StatsComponentData data={townData} />
              <StatsComponentGraphs data={townData} />
            </StatsComponent>

            {/* suburbTownships */}
            <StatsComponent>
              <StatsComponentHeader
                title={"Suburb/Townships"}
                total={totalErfs}
              />
              <StatsComponentData data={suburbTownshipData} />
              <StatsComponentGraphs data={suburbTownshipData} />
            </StatsComponent>

            {/* strNames */}
            <StatsComponent>
              <StatsComponentHeader title={"Street Names"} total={totalErfs} />
              <StatsComponentData data={sortedStrNameData} />
              <StatsComponentGraphs data={sortedStrNameData} />
            </StatsComponent>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default StatsErfs;

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
