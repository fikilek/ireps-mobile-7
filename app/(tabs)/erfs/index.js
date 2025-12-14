import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import FormDropDownPicker from "../../../components/forms/FormDropDownPicker";

import StatsErfs from "../../../components/stats/StatsErfs";
import { useErfs } from "../../../hooks/useErfs";
import { useErfsStats } from "../../../hooks/useErfsStats";

import FiltersErfs from "../../../components/filters/FiltersErfs";
import Erf from "../../../features/erfs/Erf"; // Adjust the path as needed

// import StatsErfs from "../../components/stats/StatsErfs";
import HeaderMainPage from "../../../components/HeaderMainPage";
import ListItemSeperator from "../../../components/ListItemSeperator";
import { useInfiteScroll } from "../../../hooks/useInfiniteScroll";
import { styles } from "../../../utils/utilsGlobalStyles";

const Erfs = () => {
  console.log(`Erfs ----running`);

  const {
    erfs,
    formalErfs,
    fakeErfs,

    activeErfs,
    setActiveErfs,

    activeErfsName,
    setActiveErfsName,

    filterErfs, //Method to filters erfs

    isLoading,
    isError,
    isFetching,
  } = useErfs();
  // console.log(`activeErfs?.length`, activeErfs?.length);

  const [showStats, setShowStats] = useState(false);

  const { erfsStats } = useErfsStats(erfs);
  // console.log(`Erfs erfsStats`, erfsStats);

  const { onEndReached, dataRef, page, setPage, pageRef, hasMoreRef } =
    useInfiteScroll(activeErfs);
  // console.log(`Erfs -- dataRef.current?.length`, dataRef.current?.length);
  // console.log(`Erfs -- page`, page);
  // console.log(`Erfs -- pageRef.current`, pageRef.current);
  // console.log(`Erfs -- hasMoreRef.current`, hasMoreRef.current);

  const handleResetFilters = useCallback(() => {
    console.log(`Close filters context menu`);

    dataRef.current = [];
    hasMoreRef.current = true;
    setPage((prev) => (prev = 1));
    pageRef.current = 1;

    setActiveErfs((prev) => (prev = erfs));
    setActiveErfsName((prev) => (prev = "erfs"));
  }, [erfs]);

  const totalErfs = useMemo(() => erfs?.length, [erfs]);
  // console.log(`totalErfs`, totalErfs);

  const totalFormalErfs = useMemo(() => formalErfs?.length, [formalErfs]);
  // console.log(`formalErfs`, formalErfs);

  const totalFakeErfs = useMemo(() => fakeErfs?.length, [fakeErfs]);
  // console.log(`fakeErfs`, fakeErfs);

  const options = useMemo(() => {
    return erfs?.map((item) => {
      const {
        address: { streetAdr, ward },
      } = item || {};
      const { strNo, strName, strType } = streetAdr || {};
      const strAdr = strName ? `- ${strNo} ${strName} ${strType}` : "";
      return {
        label: `${item?.erfNo} - W${ward}  ${strAdr} `,
        value: item?.id,
        item,
      };
    });
  }, [erfs]);

  if (isError) {
    return (
      <View style={styles.containerCenter}>
        <Text
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          Error in fetching Erfs
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
              {/* All Erfs */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;
                  // loadingRef.current = false;

                  setActiveErfs((prev) => (prev = erfs));
                  setActiveErfsName((prev) => (prev = "erfs"));
                  // console.log(`All Erfs Btn Pressed`);
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>All</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeErfsName === "erfs" ? "yellow" : null,
                      },
                    ]}
                  >
                    {totalErfs}
                  </Text>
                </View>
              </Pressable>

              <Text style={{ fontSize: 18 }}>=</Text>

              {/* Formal Erfs */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;

                  setActiveErfs((prev) => (prev = formalErfs));
                  setActiveErfsName((prev) => (prev = "formalErfs"));
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>Formal</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeErfsName === "formalErfs" ? "yellow" : null,
                      },
                    ]}
                  >
                    {totalFormalErfs}
                  </Text>
                </View>
              </Pressable>

              <Text style={{ fontSize: 18 }}>+</Text>

              {/* Fake Erfs */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;
                  setActiveErfs((prev) => (prev = fakeErfs));
                  setActiveErfsName((prev) => (prev = "fakeErfs"));
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>Fake</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeErfsName === "fakeErfs" ? "yellow" : null,
                      },
                    ]}
                  >
                    {totalFakeErfs}
                  </Text>
                </View>
              </Pressable>
            </View>

            <View style={{ flexDirection: "row", gap: 5 }}>
              {/* Stats */}
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
                  setActiveErfsName((prev) => (prev = "stats"));
                  // console.log(`All Erfs Btn Pressed`);
                }}
              >
                <Ionicons name="stats-chart" size={24} color="black" />
              </Pressable>

              {/* Filters */}
              <View>
                {/* <View style={{ position: "relative" }}> */}
                {activeErfsName === "filteredErfs" ? (
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
                      {activeErfs?.length}
                    </Text>
                  </Pressable>
                ) : (
                  <FiltersErfs
                    erfsStats={erfsStats}
                    filterErfs={filterErfs}
                    erfs={erfs}
                    setActiveErfs={setActiveErfs}
                    setActiveErfsName={setActiveErfsName}
                    dataRef={dataRef}
                    hasMoreRef={hasMoreRef}
                    setPage={setPage}
                    pageRef={pageRef}
                    // loadingRef={loadingRef}
                  />
                )}
                {/* </View> */}
              </View>
            </View>
          </HeaderMainPage>
          {/* <ListItemSeperator /> */}

          {/* body */}
          <View styles={{ flex: 1 }}>
            <FlatList
              ItemSeparatorComponent={() => <ListItemSeperator />}
              style={{ flexGrow: 1, marginTop: 5 }}
              data={dataRef.current}
              renderItem={({ item }) => <Erf erf={item} />}
              keyExtractor={(item) => item?.id}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}

              // onEndReached={async ({ distanceFromEnd }) => {
              //   // console.log(
              //   //   `----onEndReached -------fired @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ === onEndReached STARTED`
              //   // );
              //   // console.log(
              //   //   `----onEndReached -------distanceFromEnd`,
              //   //   distanceFromEnd
              //   // );
              //   // console.log(
              //   //   `----onEndReached -------onEndReachedCalledDuringMomentum.curren`,
              //   //   onEndReachedCalledDuringMomentum.current
              //   // );

              //   if (distanceFromEnd < 0) return;
              //   if (
              //     // !onEndReachedCalledDuringMomentum.current &&
              //     page === pageRef.current
              //   ) {
              //     // console.log(
              //     // 	`1----onEndReached BEFORE FETCH RUN ----- page: [${page}]`
              //     // );
              //     // console.log(
              //     // 	`2----onEndReached BEFORE FETCH RUN----- pageRef.current: [${pageRef.current}]`
              //     // );
              //     // console.log(
              //     // 	`3----onEndReached BEFORE FETCH RUN----- fetchDataRef.current: [${fetchDataRef.current}]`
              //     // );
              //     // console.log(
              //     // 	`4----onEndReached BEFORE FETCH RUN-----fetchData() ABOUT TO RUN NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN`
              //     // );

              //     await fetchData();

              //     // console.log(
              //     //   `5----onEndReached AFTER FETCH RUN-----fetchData() DONE RUNNING NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN`
              //     // );

              //     // console.log(
              //     //   `6----onEndReached AFTER FETCH RUN ----- page: [${page}]`
              //     // );
              //     // console.log(
              //     //   `7----onEndReached AFTER FETCH RUN----- pageRef.current: [${pageRef.current}]`
              //     // );
              //     // console.log(
              //     //   `8----onEndReached AFTER FETCH RUN----- fetchDataRef.current: [${fetchDataRef.current}]`
              //     // );
              //     // console.log(
              //     //   `9----onEndReached -------stopped @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ === STOPPED [WITH fetchData]`
              //     // );
              //   } else {
              //     // console.log(
              //     //   `10----onEndReached -------stopped @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ === STOPPED [WITHOUT fetchData] `
              //     // );
              //   }
              // }}
              // onMomentumScrollBegin={() => {
              //   onEndReachedCalledDuringMomentum.current = false;
              // // }}
              // onEndReachedThreshold={0.5}
              // // ListFooterComponent={renderFooter}
              // initialNumToRender={10}
              // // maxRenderPerBatch={10}
            />
          </View>

          {/* footer */}
          <View
            style={{
              height: 17,
              marginHorizontal: 5,
              backgroundColor:
                activeErfsName === "selectedErf" ? "yellow" : null,
            }}
          >
            <FormDropDownPicker
              options={options}
              setActive={setActiveErfs}
              setActiveName={setActiveErfsName}
              dataRef={dataRef}
              hasMoreRef={hasMoreRef}
              setPage={setPage}
              pageRef={pageRef}
              selectedItem={"selectedErf"}
              placeholder={"Erf Search"}
              searchPlaceHolder={"Type Erf No"}
            />
          </View>
        </View>
      )}
      <StatsErfs
        erfsStats={erfsStats}
        showStats={showStats}
        setShowStats={setShowStats}
        erfs={erfs}
        setActiveErfs={setActiveErfs}
        setActiveErfsName={setActiveErfsName}
        dataRef={dataRef}
        hasMoreRef={hasMoreRef}
        setPage={setPage}
        pageRef={pageRef}
      />
    </View>
  );
};

export default Erfs;
