import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";

import { styles } from "../../utils/utilsGlobalStyles";
import { FilterMenuItem } from "./FilterMenuItem";

export const initFilters = [
  { key: "propertyType", value: "" }, //['school', 'church', 'commercial', 'industrial', 'residential (t/ship)', 'residential (suburb)', 'flat', 'townhouse', 'government', 'hospital', 'municipality', 'estate', 'vacant stand'],
  { key: "trnType", value: "" }, // ['audit','inspection','','',]
  { key: "noAccessReasons", value: "" }, //['reason1', 'reason2', 'reason3', etc  ]
  { key: "trnState", value: "" }, //['draft', 'valid', 'submitted'  ]
  { key: "wards", value: "" }, //['1', '3', '4', '5']
  { key: "towns", value: "" }, //['town1', 'town2' ,'town3', etc]
  { key: "suburbTownships", value: "" }, //['tship1', 'tship2' ,'tship3', etc]
  { key: "strNames", value: "" }, //['strName1', 'strName2' ,'strName3', etc]
  { key: "photos", value: "" }, //['0', '1' ,'2', etc]
  { key: "voice", value: "" }, //['0', '1' ,'2', etc]
  { key: "video", value: "" }, //['0', '1' ,'2', etc]
];

const getItems = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    label: `${key} - (${value})`,
    value: key,
  }));
};

const FiltersTrns = (props) => {
  // console.log(`FiltersTrns running --------------------------------`);
  const {
    trnsStats,
    filterTrns,
    trns,
    setActiveTrns,
    setActiveTrnsName,
    dataRef,
    hasMoreRef,
    setPage,
    pageRef,
  } = props;
  // console.log(`trnsStats`, trnsStats);
  // console.log(`totalTrns`, totalTrns);

  const { trnsStats: stats, totalTrns } = trnsStats || {};

  const {
    propertyTypes,
    noAccessReasons,
    trnType,
    trnState,
    wards,
    towns,
    suburbTownships,
    strNames,
    photos,
    voices,
    videos,
  } = stats || {};

  const propertyTypeItems = getItems(propertyTypes);
  // console.log(`FiltersTrns propertyTypeItems`, propertyTypeItems);
  const sortedPropertyTypeItems = useMemo(() => {
    return propertyTypeItems.sort((a, b) => a.label.localeCompare(b.label));
  }, [propertyTypeItems]);

  const trnTypeItems = getItems(trnType);
  // console.log(`FiltersTrns trnTypeItems`, trnTtrnTypeItemsype);

  const noAccessReasonsItems = getItems(noAccessReasons);
  // console.log(`FiltersTrns noAccessReasonsItems`, noAccessReasonsItems);

  const trnStateItems = getItems(trnState);
  // console.log(`FiltersTrns trnStateItems`, trnStateItems);

  const wardItems = getItems(wards);
  // console.log(`FiltersTrns wardItems`, wardItems);

  const townItems = getItems(towns);
  // console.log(`FiltersTrns townItems`, townItems);

  const suburbTownshipItems = getItems(suburbTownships);
  // console.log(`FiltersTrns suburbTownshipItems`, suburbTownshipItems);
  const sortedSuburbTownshipItems = useMemo(() => {
    return suburbTownshipItems.sort((a, b) => a.label.localeCompare(b.label));
  }, [suburbTownshipItems]);
  // console.log(`FiltersTrns sortedSuburbTownshipItems`, sortedSuburbTownshipItems);

  const strNameItems = getItems(strNames);
  // console.log(`FiltersTrns strNameItems`, strNameItems);
  const sortedStrNameItems = useMemo(() => {
    return strNameItems.sort((a, b) => a.label.localeCompare(b.label));
  }, [strNameItems]);
  // console.log(`FiltersTrns sortedStrNameItems`, sortedStrNameItems);

  const [filters, setFilters] = useState(initFilters);
  // console.log(`FiltersTrns filters`, filters);

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
  // console.log(`FiltersTrns activePicker`, activePicker);

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

  const getFilteredTrns = () => {
    // console.log(
    // 	`getFilteredTrns called ------------------------------------`,
    // 	filters
    // );
    if (!filters?.find((item) => item?.value)) {
      Alert.alert("Warning", "No Filter Selected");
      return;
    }

    const filteredTrns = filterTrns(trns, filters);
    // console.log(`filteredTrns?.length`, filteredTrns?.length);

    dataRef.current = [];
    hasMoreRef.current = true;
    setPage((prev) => (prev = 1));
    pageRef.current = 1;

    setActiveTrns((prev) => (prev = filteredTrns));
    setActiveTrnsName("filteredTrns");
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
            // marginHorizontal: 0,
            width: "100%",
            // height: height - 60,
          },
        }}
      >
        {/* Filter Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
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
          <Text style={{ fontSize: 20 }}>Trns Filter</Text>
        </View>

        {/* Body */}
        <View
          style={{
            justifyContent: "flex-end",
            height: height - 60 - 50 - 50,
          }}
        >
          <FilterMenuItem
            title="propertyType"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={sortedPropertyTypeItems}
            total={totalTrns}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="noAccessReasons"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={noAccessReasonsItems}
            total={totalTrns}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="trnType"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={trnTypeItems}
            total={totalTrns}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="trnState"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={trnStateItems}
            total={totalTrns}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="wards"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={wardItems}
            total={totalTrns}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="towns"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={townItems}
            total={totalTrns}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="suburbTownships"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={sortedSuburbTownshipItems}
            total={totalTrns}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="strNames"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={sortedStrNameItems}
            total={totalTrns}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />
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
            onPress={getFilteredTrns}
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

export default FiltersTrns;
