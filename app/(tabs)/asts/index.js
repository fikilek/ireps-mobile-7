import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { useAsts } from "../../../hooks/useAsts";
import { useAstsStats } from "../../../hooks/useAstsStats";

import { Ionicons } from "@expo/vector-icons";
import FiltersAsts from "../../../components/filters/FiltersAsts";
import FormDropDownPicker from "../../../components/forms/FormDropDownPicker";
import HeaderMainPage from "../../../components/HeaderMainPage";
import ListItemSeperator from "../../../components/ListItemSeperator";
import StatsAsts from "../../../components/stats/StatsAsts";
import Ast from "../../../features/asts/Ast";
import { useInfiteScroll } from "../../../hooks/useInfiniteScroll";
import { styles } from "../../../utils/utilsGlobalStyles";

const Asts = () => {
  console.log(`Running Asts ------------------------`);

  const {
    asts,
    prePaidAsts,
    conventionalAsts,
    singlePhaseAsts,
    threePhaseAsts,

    activeAsts,
    setActiveAsts,

    activeAstsName,
    setActiveAstsName,

    filterAsts, //Method to filters Asts

    isLoading,
    isError,
    isFetching,
  } = useAsts();

  // console.log(`asts`, asts);
  // console.log(`activeAsts?.length`, activeAsts?.length);

  const [showStats, setShowStats] = useState(false);

  const { astsStats } = useAstsStats(asts);
  // console.log(`Asts astsStats`, astsStats);

  const { onEndReached, dataRef, page, setPage, pageRef, hasMoreRef } =
    useInfiteScroll(activeAsts);
  // console.log(`Trns -- dataRef.current?.length`, dataRef.current?.length);
  // console.log(`Trns -- page`, page);
  // console.log(`Trns -- pageRef.current`, pageRef.current);
  // console.log(`Trns -- hasMoreRef.current`, hasMoreRef.current);

  const handleResetFilters = useCallback(() => {
    // console.log(`Close filters context menu`);
    dataRef.current = [];
    hasMoreRef.current = true;
    setPage((prev) => (prev = 1));
    pageRef.current = 1;

    setActiveAsts((prev) => (prev = asts));
    setActiveAstsName((prev) => (prev = "asts"));
  }, [asts]);

  const totalAsts = useMemo(() => asts?.length, [asts]);
  // console.log(`totalAsts`, totalAsts);

  const totalPrePaid = useMemo(() => prePaidAsts?.length, [prePaidAsts]);
  // console.log(`totalPrePaid`, totalPrePaid);

  const totalConventional = useMemo(
    () => conventionalAsts?.length,
    [conventionalAsts]
  );
  // console.log(`totalConventional`, totalConventional);

  const totalSinglePhase = useMemo(
    () => singlePhaseAsts?.length,
    [singlePhaseAsts]
  );
  // console.log(`totalSinglePhase`, totalSinglePhase);

  const totalThreePhase = useMemo(
    () => threePhaseAsts?.length,
    [threePhaseAsts]
  );
  // console.log(`totalThreePhase`, totalThreePhase);

  const options = useMemo(() => {
    return asts?.map((ast) => {
      const {
        erf: {
          address: { streetAdr, ward },
        },
      } = ast || {};
      const { strNo, strName, strType } = streetAdr || {};
      const strAdr = strName ? `- ${strNo} ${strName} ${strType}` : "";
      const { astNo } = ast?.astData || {};
      return {
        label: `${astNo ? astNo : ""} - Ward:${ward ? ward : ""} ${strAdr} `,
        value: ast?.astData?.astId,
        item: ast,
      };
    });
  }, [asts]);

  if (isError) {
    return (
      <View style={styles.containerCenter}>
        <Text
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          Error in fetching Asts
        </Text>
      </View>
    );
  }

  if (isFetching) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size="large" style={{ paddingVertical: 20 }} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isFetching ? (
        <View style={styles.containerCenter}>
          <ActivityIndicator size="large" color="deepskyblue" />
        </View>
      ) : (
        <View style={{ flex: 1, marginBottom: 115 }}>
          {/* header */}
          <HeaderMainPage>
            {/* Totals */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* All Asts */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;
                  // loadingRef.current = false;
                  setActiveAsts(asts);
                  setActiveAstsName("asts");
                  // console.log(`All Asts Btn Pressed`);
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>All</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeAstsName === "asts" ? "yellow" : null,
                      },
                    ]}
                  >
                    {totalAsts}
                  </Text>
                </View>
              </Pressable>

              <Text style={{ fontSize: 18 }} className=" p-2 ">
                =
              </Text>

              {/* Prepaid Asts */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;
                  // loadingRef.current = false;
                  setActiveAsts((prev) => (prev = prePaidAsts));
                  setActiveAstsName((prev) => (prev = "totalPrePaid"));
                  // console.log(`Formal Asts Btn Pressed`);
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>Pp</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeAstsName === "totalPrePaid" ? "yellow" : null,
                      },
                    ]}
                  >
                    {totalPrePaid}
                  </Text>
                </View>
              </Pressable>

              <Text style={{ fontSize: 18 }} className=" p-2 ">
                +
              </Text>

              {/* Conventional Asts */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;
                  // loadingRef.current = false;
                  setActiveAsts((prev) => (prev = conventionalAsts));
                  setActiveAstsName((prev) => (prev = "totalConventional"));
                  // console.log(`Fake Asts Btn Pressed`);
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>Cnv</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeAstsName === "totalConventional"
                            ? "yellow"
                            : null,
                      },
                    ]}
                  >
                    {totalConventional}
                  </Text>
                </View>
              </Pressable>

              <Text style={{ fontSize: 18 }} className=" p-2 ">
                =
              </Text>

              {/* Single Phase */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;
                  // loadingRef.current = false;
                  setActiveAsts((prev) => (prev = singlePhaseAsts));
                  setActiveAstsName((prev) => (prev = "totalSinglePhase"));
                  // console.log(`Formal Asts Btn Pressed`);
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>1Phs</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeAstsName === "totalSinglePhase"
                            ? "yellow"
                            : null,
                      },
                    ]}
                  >
                    {totalSinglePhase}
                  </Text>
                </View>
              </Pressable>

              <Text style={{ fontSize: 18 }} className=" p-2 ">
                +
              </Text>

              {/*Three Phase */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;
                  // loadingRef.current = false;
                  setActiveAsts((prev) => (prev = threePhaseAsts));
                  setActiveAstsName((prev) => (prev = "totalThreePhase"));
                  // console.log(`Fake Asts Btn Pressed`);
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>3Phs</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeAstsName === "totalThreePhase"
                            ? "yellow"
                            : null,
                      },
                    ]}
                  >
                    {totalThreePhase}
                  </Text>
                </View>
              </Pressable>
            </View>

            <View style={{ flexDirection: "row", gap: 5 }}>
              {/* Asts Stats */}

              <Pressable
                style={[
                  styles.pressableTotals,
                  {
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    // alignSelf: "center",
                  },
                ]}
                onPress={() => {
                  setShowStats(true);
                  setActiveAstsName((prev) => (prev = "stats"));
                  console.log(`All Asts Btn Pressed`);
                }}
              >
                <Ionicons name="stats-chart" size={24} color="black" />
              </Pressable>

              {/* Asts Filtering */}
              <View className="flex-row">
                {/* <View style={{ position: "relative" }}> */}
                {activeAstsName === "filteredAsts" ? (
                  <Pressable
                    style={[
                      styles.pressableTotals,
                      {
                        justifyContent: "center",
                        width: 50,
                        height: 55,
                        alignItems: "center",
                        flex: 1,
                        backgroundColor: "grey",
                      },
                    ]}
                    onPress={handleResetFilters}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {activeAsts?.length}
                    </Text>
                  </Pressable>
                ) : (
                  // <Text>F</Text>
                  <FiltersAsts
                    astsStats={astsStats}
                    filterAsts={filterAsts}
                    asts={asts}
                    setActiveAsts={setActiveAsts}
                    setActiveAstsName={setActiveAstsName}
                    dataRef={dataRef}
                    hasMoreRef={hasMoreRef}
                    setPage={setPage}
                    pageRef={pageRef}
                  />
                )}
                {/* </View> */}
              </View>
            </View>
          </HeaderMainPage>
          {/* body */}
          <View styles={{ flex: 1 }}>
            <FlatList
              ItemSeparatorComponent={() => <ListItemSeperator />}
              style={{ flexGrow: 1, marginTop: 5 }}
              data={dataRef.current}
              renderItem={({ item }) => <Ast ast={item} />}
              keyExtractor={(item) => item?.id}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}
            />
          </View>

          {/* footer */}
          <View
            style={{
              height: 17,
              marginHorizontal: 5,
              backgroundColor:
                activeAstsName === "selectedAst" ? "yellow" : null,
            }}
          >
            <FormDropDownPicker
              options={options}
              setActive={setActiveAsts}
              setActiveName={setActiveAstsName}
              dataRef={dataRef}
              hasMoreRef={hasMoreRef}
              setPage={setPage}
              pageRef={pageRef}
              selectedItem={"selectedAst"}
              placeholder={"Meter Search"}
              searchPlaceHolder={"Type Ast No"}
            />
          </View>
        </View>
      )}
      <StatsAsts
        astsStats={astsStats}
        showStats={showStats}
        setShowStats={setShowStats}
        asts={asts}
        setActiveAsts={setActiveAsts}
        setActiveAstsName={setActiveAstsName}
        dataRef={dataRef}
        hasMoreRef={hasMoreRef}
        setPage={setPage}
        pageRef={pageRef}
      />
    </View>
  );
};

export default Asts;
