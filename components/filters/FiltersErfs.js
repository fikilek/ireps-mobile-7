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
  { key: "metered", value: "" }, //['0', '1', '3', '4', '5', 'allMetered']
  { key: "noAccess", value: "" }, //['0', '1', '3', 'allNoAccess'  ]
  { key: "serviceConnections", value: "" }, //['0', '1', '3', 'allNoAccess'  ]
  { key: "grouped", value: "" }, //['0', '1', '3', 'allNoAccess'  ]
  { key: "wards", value: "" }, //['1', '3', '4', '5']
  { key: "towns", value: "" }, //['"Marble Hall', '' ,'']
  { key: "suburbTownships", value: "" }, //['"Marble Hall', '' ,'']
  { key: "strNames", value: "" }, //['"Marble Hall', '' ,'']
];

const getItems = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    label: `${key} - (${value})`,
    value: key,
  }));
};

const FiltersErfs = (props) => {
  // console.log(`FiltersErfs running --------------------------------`);
  const {
    erfsStats,
    filterErfs,
    erfs,
    setActiveErfs,
    setActiveErfsName,
    dataRef,
    hasMoreRef,
    setPage,
    pageRef,
    // loadingRef,
  } = props;
  // console.log(`erfsStats`, erfsStats);
  // console.log(`totalErfs`, totalErfs);

  const { erfsStats: stats, totalErfs } = erfsStats || {};

  const {
    propertyTypes,
    metered,
    noAccess,
    serviceConnections,
    grouped,
    wards,
    towns,
    suburbTownships,
    strNames,
  } = stats || {};

  const propertyTypeItems = getItems(propertyTypes);
  // console.log(`FiltersErfs propertyTypeItems`, propertyTypeItems);
  const sortedPropertyTypeItems = useMemo(() => {
    return propertyTypeItems.sort((a, b) => a.label.localeCompare(b.label));
  }, [propertyTypeItems]);
  const meteredItems = getItems(metered);
  // console.log(`FiltersErfs meteredItems`, meteredItems);
  const noAccessItems = getItems(noAccess);
  // console.log(`FiltersErfs noAccessItems`, noAccessItems);
  // const serviceConnectionItems = getItems(serviceConnections);
  // console.log(`FiltersErfs serviceConnection`, serviceConnection);
  // const groupedItems = getItems(grouped);
  // console.log(`FiltersErfs groupedItems`, groupedItems);
  const wardItems = getItems(wards);
  // console.log(`FiltersErfs wardItems`, wardItems);
  const townItems = getItems(towns);
  // console.log(`FiltersErfs townItems`, townItems);
  const suburbTownshipItems = getItems(suburbTownships);
  // console.log(`FiltersErfs suburbTownshipItems`, suburbTownshipItems);
  const strNameItems = getItems(strNames);
  // console.log(`FiltersErfs strNameItems`, strNameItems);
  const sortedStrNameItems = useMemo(() => {
    return strNameItems.sort((a, b) => a.label.localeCompare(b.label));
  }, [strNameItems]);
  // console.log(`FiltersErfs sortedStrNameItems`, sortedStrNameItems);

  const [filters, setFilters] = useState(initFilters);
  // console.log(`FiltersErfs filters`, filters);

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
  // console.log(`FiltersErfs activePicker`, activePicker);

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

  const getFilteredErfs = () => {
    // console.log(
    // 	`getFilteredErfs called ------------------------------------`,
    // 	filters
    // );
    if (!filters?.find((item) => item?.value)) {
      Alert.alert("Warning", "No Filter Selected");
      return;
    }

    const filteredErfs = filterErfs(erfs, filters);
    // console.log(`filteredErfs?.length`, filteredErfs?.length);

    dataRef.current = [];
    hasMoreRef.current = true;
    setPage((prev) => (prev = 1));
    pageRef.current = 1;
    // loadingRef.current = false;

    setActiveErfs((prev) => (prev = filteredErfs));
    setActiveErfsName("filteredErfs");
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
          <Text style={{ fontSize: 20 }}>Erfs Filter</Text>
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
            total={totalErfs}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="metered"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={meteredItems}
            total={totalErfs}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="noAccess"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={noAccessItems}
            total={totalErfs}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          {/* <FilterMenuItem
						title="serviceConnections"
						activePicker={activePicker}
						setActivePicker={setActivePicker}
						items={serviceConnectionItems}
						total={totalErfs}
						setFilters={setFilters}
						filters={filters}
						initFilters={initFilters}
					/> */}

          {/* <FilterMenuItem
						title="grouped"
						activePicker={activePicker}
						setActivePicker={setActivePicker}
						items={groupedItems}
						total={totalErfs}
						setFilters={setFilters}
						filters={filters}
						initFilters={initFilters}
					/> */}

          <FilterMenuItem
            title="wards"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={wardItems}
            total={totalErfs}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="towns"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={townItems}
            total={totalErfs}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="suburbTownships"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={suburbTownshipItems}
            total={totalErfs}
            setFilters={setFilters}
            filters={filters}
            initFilters={initFilters}
          />

          <FilterMenuItem
            title="strNames"
            activePicker={activePicker}
            setActivePicker={setActivePicker}
            items={sortedStrNameItems}
            total={totalErfs}
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
            onPress={getFilteredErfs}
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

export default FiltersErfs;
