import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";

import { styles } from "../../utils/utilsGlobalStyles";
import { FilterMenuItem } from "./FilterMenuItem";

export const initFilters = [
  { key: "astType", value: "" },
  { key: "astPhase", value: "" },
  { key: "anomaly", value: "" },
  { key: "anomalyDetail", value: "" },
  { key: "astManufacturer", value: "" },
  { key: "astName", value: "" },
  { key: "astStateLocation", value: "" },
  { key: "astState", value: "" },
  { key: "cbSize", value: "" },
  { key: "cbComment", value: "" },
  { key: "sealPresence", value: "" },
  { key: "sealComment", value: "" },
  { key: "creator", value: "" },
  { key: "trnCount", value: "" },
  { key: "deletePending", value: "" },

  { key: "propertyType", value: "" }, //['school', 'church', 'commercial', 'industrial', 'residential (t/ship)', 'residential (suburb)', 'flat', 'townhouse', 'government', 'hospital', 'municipality', 'estate', 'vacant stand'],
  // { key: "serviceConnections", value: "" }, //['0', '1', '3', 'allNoAccess'  ]
  // { key: "grouped", value: "" }, //['0', '1', '3', 'allNoAccess'  ]

  { key: "ward", value: "" }, //['1', '3', '4', '5']
  { key: "town", value: "" }, //['"Marble Hall', '' ,'']
  { key: "suburbTownship", value: "" }, //['"Marble Hall', '' ,'']
  { key: "strName", value: "" }, //['"Marble Hall', '' ,'']
];

const getItems = (data) => {
  return Object.entries(data)?.map(([key, value]) => ({
    label: `${key} - (${value})`,
    value: key,
  }));
};

const FiltersAsts = (props) => {
  // console.log(`FiltersAsts running --------------------------------`);
  const {
    astsStats,
    filterAsts,
    asts,
    setActiveAsts,
    setActiveAstsName,

    dataRef,
    hasMoreRef,
    setPage,
    pageRef,
    // loadingRef,
  } = props;
  // console.log(`FiltersAsts 61 astsStats`, astsStats);

  const {
    totalAsts,
    anomalyStats,
    anomalyDetailStats,
    astManufacturerStats,
    astNameStats,
    astStateLocationStats,
    astStateStats,
    cbSizeStats,
    cbCommentStats,
    sealPresenceStats,
    sealCommentStats,
    creatorStats,
    trnCountStats,
    deletePendingStats,

    propertyTypeStats,
    wardStats,
    townStats,
    suburbTownshipStats,
    strNameStats,
  } = astsStats || {};
  // console.log(`FiltersAsts totalAsts`, totalAsts);
  // console.log(`FiltersAsts astTypesStats`, astTypesStats);
  // console.log(`FiltersAsts astPhasesStats`, astPhasesStats);
  // console.log(`FiltersAsts anomalyStats`, anomalyStats);
  // console.log(`FiltersAsts deletePendingStats`, deletePendingStats);
  // console.log(`FiltersAsts 89 propertyTypeStats`, propertyTypeStats);

  const anomalyItems = getItems(anomalyStats);
  // console.log(`FiltersAsts anomalyItems`, anomalyItems);
  const anomalyDetailItems = getItems(anomalyDetailStats);
  // console.log(`FiltersAsts anomalyDetailItems`, anomalyDetailItems);
  const astManufacturerItems = getItems(astManufacturerStats);
  // console.log(`FiltersAsts astManufacturerItems`, astManufacturerItems);
  const astNameItems = getItems(astNameStats);
  // console.log(`FiltersAsts astNameItems`, astNameItems);
  const astStateLocationItems = getItems(astStateLocationStats);
  // console.log(`FiltersAsts astStateLocationItems`, astStateLocationItems);
  const astStateItems = getItems(astStateStats);
  // console.log(`FiltersAsts astStateItems`, astStateItems);
  const cbSizeItems = getItems(cbSizeStats);
  // console.log(`FiltersAsts cbSizeItems`, cbSizeItems);
  const cbCommentItems = getItems(cbCommentStats);
  // console.log(`FiltersAsts cbCommentItems`, cbCommentItems);
  const sealPresenceItems = getItems(sealPresenceStats);
  // console.log(`FiltersAsts sealPresenceItems`, sealPresenceItems);
  const sealCommentItems = getItems(sealCommentStats);
  // console.log(`FiltersAsts sealCommentItems`, sealCommentItems);
  const creatorItems = getItems(creatorStats);
  // console.log(`FiltersAsts creatorItems`, creatorItems);
  const trnCountItems = getItems(trnCountStats);
  // console.log(`FiltersAsts trnCountItems`, trnCountItems);
  const deletePendingItems = getItems(deletePendingStats);
  // console.log(`FiltersAsts deletePendingItems`, deletePendingItems);

  const propertyTypeItems = getItems(propertyTypeStats);
  // console.log(`FiltersAsts propertyTypeItems`, propertyTypeItems);
  const sortedPropertyTypeItems = useMemo(() => {
    return propertyTypeItems.sort((a, b) => a.label.localeCompare(b.label));
  }, [propertyTypeItems]);
  // console.log(`FiltersAsts sortedPropertyTypeItems`, sortedPropertyTypeItems);

  // const serviceConnectionItems = getItems(serviceConnections);
  // console.log(`FiltersAsts serviceConnection`, serviceConnection);
  // const groupedItems = getItems(grouped);
  // console.log(`FiltersAsts groupedItems`, groupedItems);
  const wardItems = getItems(wardStats);
  // console.log(`FiltersAsts wardItems`, wardItems);
  const townItems = getItems(townStats);
  // console.log(`FiltersAsts townItems`, townItems);
  const suburbTownshipItems = getItems(suburbTownshipStats);
  // console.log(`FiltersAsts suburbTownshipItems`, suburbTownshipItems);
  const strNameItems = getItems(strNameStats);
  // console.log(`FiltersAsts strNameItems`, strNameItems);
  const sortedStrNameItems = useMemo(() => {
    return strNameItems.sort((a, b) => a.label.localeCompare(b.label));
  }, [strNameItems]);
  // console.log(`FiltersAsts sortedStrNameItems`, sortedStrNameItems);

  const [filters, setFilters] = useState(initFilters);
  // console.log(`FiltersAsts filters`, filters);

  useEffect(() => {
    return () => {
      setFilters(initFilters);
    };
  }, []);

  const { height } = useWindowDimensions();
  // console.log(`height`, height);

  const [isOpened, setIsOpened] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [activePicker, setActivePicker] = useState("");
  // console.log(`FiltersAsts activePicker`, activePicker);

  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState(initItems);

  // const [access, setAccess] = useState(0);
  // const [noAccessReason, setNoAccessReason] = useState("");
  // const [ward, setWard] = useState("");
  // const [metered, setMetered] = useState("");
  // const [suburbTownship, setSuburbTownship] = useState("");
  // const [serviceConnection, setServiceConnection] = useState("");

  // const { top } = useSafeAreaInsets();
  // const handleProfile = () => {};

  // const { user, isAuthenticated, logout } = useAuth();
  // console.log(`MainLayout user`, user);
  // console.log(`MainLayout isAuthenticated`, isAuthenticated);

  // const { uid, claims, displayName } = user || {};
  // console.log(`MainLayout uid`, uid);
  // console.log(`MainLayout claims`, claims);
  // console.log(`MainLayout displayName`, displayName);

  // const { workbase } = claims || {};
  // console.log(`MainLayout workbase`, workbase);

  const onOpen = useCallback(() => {
    // console.log(`Filter Menu Opened`);
    setIsOpened(true);
  }, []);

  const onClose = useCallback(() => {
    // console.log(`Filter Menu Closed`);
    setIsOpened(false);
  }, []);

  // const menuOptionsHeight = height;
  // console.log(`menuOptionsHeight`, menuOptionsHeight);

  const getFilteredAsts = () => {
    // console.log(
    // 	`getFilteredAsts called ------------------------------------`,
    // 	filters
    // );
    if (!filters?.find((item) => item?.value)) {
      Alert.alert("Warning", "No Filter Selected");
      return;
    }

    const filteredAsts = filterAsts(asts, filters);
    console.log(`filteredAsts?.length`, filteredAsts?.length);

    dataRef.current = [];
    hasMoreRef.current = true;
    setPage((prev) => (prev = 1));
    pageRef.current = 1;
    // loadingRef.current = false;

    setActiveAsts((prev) => (prev = filteredAsts));
    setActiveAstsName("filteredAsts");
    setIsMenuVisible(false);
    setFilters(initFilters);
  };

  return (
    <Menu
      onOpen={onOpen}
      onClose={onClose}
      opened={isMenuVisible}
      onBackdropPress={() => {}}
    >
      <MenuTrigger onPress={() => setIsMenuVisible(true)}>
        <View
          style={[
            styles.pressableTotals,
            {
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isOpened ? "yellow" : "transparent",
            },
          ]}
        >
          <AntDesign
            name="filter"
            size={35}
            color="black"
            style={{ fontWeight: "bold" }}
          />
        </View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 5,
            borderCurve: "continuous",
            // backgroundColor: "blue",
            marginTop: -5,
            marginHorizontal: 0,
            width: "100%",
            height: height - 50,
          },
        }}
      >
        {/* Filter Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // padding: 5,
            backgroundColor: "#EBFFD8",
            height: "50",
          }}
        >
          <FontAwesome5
            name="caret-square-left"
            size={30}
            color="#aaa"
            style={{
              marginLeft: 10,
            }}
            onPress={() => setIsMenuVisible(false)}
          />
          <Text style={{ fontSize: 20 }}>Asts Filter</Text>
        </View>

        {/* Body */}

        <View
          style={{
            justifyContent: "flex-end",
            height: height - 60 - 50 - 40,
          }}
        >
          <ScrollView>
            {/* <FilterMenuItem
							title="astType"
							activePicker={activePicker}
							setActivePicker={setActivePicker}
							items={astTypeItems}
							total={totalAsts}
							setFilters={setFilters}
							filters={filters}
							initFilters={initFilters}
						/>

						<FilterMenuItem
							title="astPhase"
							activePicker={activePicker}
							setActivePicker={setActivePicker}
							items={astPhaseItems}
							total={totalAsts}
							setFilters={setFilters}
							filters={filters}
							initFilters={initFilters}
						/> */}

            <FilterMenuItem
              title="anomaly"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={anomalyItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="anomalyDetail"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={anomalyDetailItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="astManufacturer"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={astManufacturerItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="astName"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={astNameItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="astStateLocation"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={astStateLocationItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="astState"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={astStateItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="cbSize"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={cbSizeItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="cbComment"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={cbCommentItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="sealPresence"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={sealPresenceItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="sealComment"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={sealCommentItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="creator"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={creatorItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="trnCount"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={trnCountItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="deletePending"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={deletePendingItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="propertyType"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={sortedPropertyTypeItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="ward"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={wardItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="town"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={townItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="suburbTownship"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={suburbTownshipItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />

            <FilterMenuItem
              title="strName"
              activePicker={activePicker}
              setActivePicker={setActivePicker}
              items={sortedStrNameItems}
              total={totalAsts}
              setFilters={setFilters}
              filters={filters}
              initFilters={initFilters}
            />
          </ScrollView>
        </View>

        {/* Footer */}

        {/* {value && ( */}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor: "#EBFFD8",
            height: 50,
          }}
        >
          <Pressable
            onPress={getFilteredAsts}
            style={{
              borderWidth: 1,
              padding: 5,
              borderRadius: 7,
              backgroundColor: "black",
            }}
          >
            <Text style={{ color: "white" }}>Get Data</Text>
          </Pressable>
        </View>
        {/* )} */}
      </MenuOptions>
    </Menu>
  );
};

export default FiltersAsts;
