import { Feather, Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { useSelector } from "react-redux";
import FiltersTrns from "../../../components/filters/FiltersTrns";
import FormDropDownPicker from "../../../components/forms/FormDropDownPicker";
import HeaderMainPage from "../../../components/HeaderMainPage";
import ListItemSeperator from "../../../components/ListItemSeperator";
import { clearAllData } from "../../../redux/store";

import StatsTrns from "../../../components/stats/StatsTrns";
import Trn from "../../../features/trns/Trn";
import { useInfiteScroll } from "../../../hooks/useInfiniteScroll";
import { useTrns } from "../../../hooks/useTrns";
import { useTrnsStats } from "../../../hooks/useTrnsStats";
import { camelCaseToNormal, truncateString } from "../../../utils/utilsCommon";
import { styles } from "../../../utils/utilsGlobalStyles";

const Trns = () => {
  console.log(`Trns ----Running`);

  const pendingForms = useSelector((state) => state.offline.pendingForms);
  // console.log(`Trns pendingForms`, pendingForms);

  const filterKeyRef = useRef("");
  // console.log(`filterKeyRef.current`, filterKeyRef.current);
  const filterValueRef = useRef("");
  // console.log(`filterValueRef.current`, filterValueRef.current);

  const {
    trns,
    accessTrns,
    noAccessTrns,

    activeTrns,
    setActiveTrns,
    activeTrnsName,
    setActiveTrnsName,

    filterTrns, //Method to filters Trns

    isLoading,
    isError,
    isFetching,
  } = useTrns(filterKeyRef, filterValueRef);
  // console.log(`trns?.length`, trns?.length);
  // console.log(`activeTrns?.length`, activeTrns?.length);

  const [showStats, setShowStats] = useState(false);

  const { trnsStats } = useTrnsStats(trns);
  // console.log(`Erfs trnsStats`, trnsStats);

  const { onEndReached, dataRef, page, setPage, pageRef, hasMoreRef } =
    useInfiteScroll(activeTrns);
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

    setActiveTrns((prev) => (prev = trns));
    setActiveTrnsName((prev) => (prev = "trns"));
  }, [trns]);

  const options = useMemo(() => {
    return trns?.map((trn) => {
      const {
        ast: {
          erf: {
            address: { streetAdr },
            erfNo,
          },
        },
        metadata: { trnType },
      } = trn || {};

      const { strNo, strName, strType } = streetAdr || {};
      const strAdr = strName ? `- ${strNo} ${strName} ${strType}` : "";
      const { astNo } = trn?.ast?.astData || {};
      return {
        label: `${astNo ? astNo : "No Ast"} - Erf:${
          erfNo ? erfNo : "No Erf"
        } ${strAdr} - ${trnType} `,
        value: trn?.ast?.astData?.astId,
        item: trn,
      };
    });
  }, [trns]);

  if (isError) {
    return (
      <View style={styles.containerCenter}>
        <Text
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          Error in fetching Trns
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

  const handleClearLocalStorage = () => {
    console.log(`Clear local storage`);
    clearAllData();
  };

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
              {/* All Trns */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;
                  setActiveTrns(trns);
                  setActiveTrnsName((prev) => (prev = "trns"));
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>All</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeTrnsName === "trns" ? "yellow" : null,
                      },
                    ]}
                  >
                    {trns?.length}
                  </Text>
                </View>
              </Pressable>

              <Text style={{ fontSize: 18 }}>=</Text>

              {/* Access Trns */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;
                  setActiveTrns(accessTrns);
                  setActiveTrnsName((prev) => (prev = "accessTrns"));
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>Access</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeTrnsName === "accessTrns" ? "yellow" : null,
                      },
                    ]}
                  >
                    {accessTrns?.length}
                  </Text>
                </View>
              </Pressable>

              <Text style={{ fontSize: 18 }}>+</Text>

              {/* No Access Trns */}
              <Pressable
                style={styles.pressableTotals}
                onPress={() => {
                  dataRef.current = [];
                  hasMoreRef.current = true;
                  setPage((prev) => (prev = 1));
                  pageRef.current = 1;
                  setActiveTrns(noAccessTrns);
                  setActiveTrnsName((prev) => (prev = "noAccessTrns"));
                }}
              >
                <View style={styles.totalsWrapper}>
                  <Text style={styles.totalsHeader}>NA</Text>
                  <Text
                    style={[
                      styles.totalsTotal,
                      {
                        backgroundColor:
                          activeTrnsName === "noAccessTrns" ? "yellow" : null,
                      },
                    ]}
                  >
                    {noAccessTrns?.length}
                  </Text>
                </View>
              </Pressable>
            </View>

            {/* Local Storage */}
            <Pressable
              style={[styles.pressableTotals, { backgroundColor: "lightgrey" }]}
              onPress={handleClearLocalStorage}
            >
              <View style={styles.totalsWrapper}>
                <Feather name="hard-drive" size={24} color="black" />
                <Text
                  style={[
                    styles.totalsTotal,
                    {
                      backgroundColor:
                        activeTrnsName === "noAccessTrns" ? "yellow" : null,
                    },
                  ]}
                >
                  {pendingForms?.length}
                </Text>
              </View>
            </Pressable>

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
                  setActiveTrnsName((prev) => (prev = "stats"));
                  // console.log(`All Erfs Btn Pressed`);
                }}
              >
                <Ionicons name="stats-chart" size={24} color="black" />
              </Pressable>

              {/* Filters */}
              <View>
                {/* <View style={{ position: "relative" }}> */}
                {activeTrnsName === "filteredTrns" ? (
                  <Pressable
                    style={[
                      styles.pressableTotals,
                      {
                        justifyContent: "center",
                        width: 50,
                        height: 55,
                        alignItems: "center",
                        flex: 1,
                        backgroundColor: "yellow",
                      },
                    ]}
                    onPress={handleResetFilters}
                  >
                    <Text style={{ fontSize: 9 }}>
                      {truncateString(
                        camelCaseToNormal(filterKeyRef?.current),
                        8
                      )}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        // color: "white",
                      }}
                    >
                      {activeTrns?.length}
                    </Text>
                    <Text style={{ fontSize: 9 }}>
                      {truncateString(
                        camelCaseToNormal(filterValueRef.current),
                        8
                      )}
                    </Text>
                  </Pressable>
                ) : (
                  <FiltersTrns
                    trnsStats={trnsStats}
                    filterTrns={filterTrns}
                    trns={trns}
                    setActiveTrns={setActiveTrns}
                    setActiveTrnsName={setActiveTrnsName}
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
          {/* <ListItemSeperator /> */}
          {/* body */}
          <View styles={{ flex: 1 }}>
            <FlatList
              ItemSeparatorComponent={() => <ListItemSeperator />}
              data={dataRef.current}
              renderItem={({ item }) => <Trn trn={item} />}
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
                activeTrnsName === "selectedTrn" ? "yellow" : null,
            }}
          >
            <FormDropDownPicker
              options={options}
              setActive={setActiveTrns}
              setActiveName={setActiveTrnsName}
              dataRef={dataRef}
              hasMoreRef={hasMoreRef}
              setPage={setPage}
              pageRef={pageRef}
              selectedItem={"selectedTrn"}
              placeholder={"Trn Search"}
              searchPlaceHolder={"Type Ast Nn"}
            />
          </View>
        </View>
      )}
      <StatsTrns
        trnsStats={trnsStats}
        showStats={showStats}
        setShowStats={setShowStats}
        trns={trns}
        setActiveTrns={setActiveTrns}
        setActiveTrnsName={setActiveTrnsName}
        dataRef={dataRef}
        hasMoreRef={hasMoreRef}
        setPage={setPage}
      />
    </View>
  );
};

export default Trns;
