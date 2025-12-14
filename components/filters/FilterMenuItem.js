import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MenuOption } from "react-native-popup-menu";
import { camelCaseToNormal, camelCaseToWords } from "../../utils/utilsCommon";

export const FilterMenuItem = (props) => {
  const {
    title,
    setActivePicker,
    activePicker,
    items,
    total,
    setFilters,
    filters,
    initFilters,
  } = props;
  // console.log(`FilterMenuItem running ---------------------title`, title);
  // console.log(`FilterMenuItem total`, total);
  // console.log(`FilterMenuItem filters`, filters);
  // console.log(`FilterMenuItem activePicker`, activePicker);
  // console.log(`FilterMenuItem title`, title);
  // const [isOpened, setIsOpened] = useState(false);
  // const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  // console.log(`FilterMenuItem options`, options);
  // console.log(`FilterMenuItem value`, value);

  useEffect(() => {
    // console.log(`FilterMenuItem filter`, filters);
    // console.log(`FilterMenuItem items`, items);
    // console.log(`FilterMenuItem total`, total);

    if (filters) {
      const filteredItem = filters?.find((item) => item?.value);
      // console.log(`FilterMenuItem filteredItem`, filteredItem);
      if (filteredItem) {
        const { key } = filteredItem;
        // console.log(`FilterMenuItem key`, key);
        // console.log(`FilterMenuItem value`, value);

        // If the key is NOT the same as the title, disable the dropdown
        if (key !== title) {
          setIsDisabled(true);
          // console.log(`FilterMenuItem isDisabled`, isDisabled);
        } else {
          setIsDisabled(false);
          // console.log(`FilterMenuItem isDisabled`, isDisabled);
        }
      } else {
        setIsDisabled(false);
        // console.log(`FilterMenuItem isDisabled`, isDisabled);
      }
    }
  }, [filters, items, title]);

  useEffect(() => {
    setOptions(items);
  }, [items]);

  // console.log(`FilterMenuItem title`, title);
  // console.log(`FilterMenuItem activePicker`, activePicker);
  // console.log(`FilterMenuItem open`, open);
  // console.log(`FilterMenuItem items`, items);
  // console.log(`FilterMenuItem value`, value);
  // console.log(`FilterMenuItem options`, options);

  useEffect(() => {
    if (title !== activePicker) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [activePicker]);

  const openPicker = (e) => {
    // console.log(`openPicker called with e ---------------------`, e);
    // console.log(`openPicker title`, title);
    // console.log(`openPicker activePicker`, activePicker);
    // console.log(`openPicker open`, open);
    // console.log(`openPicker value`, value);
    // console.log(`openPicker options`, options);
    setOpen(e);

    if (e) {
      setActivePicker(title);
    } else {
      setActivePicker("");
    }
  };

  useEffect(() => {
    // console.log(` - - - - -   `);
    // console.log(` - - - - -   `);
    // console.log(`START useEffect title =======================  `, title);
    // console.log(`selected value`, value);

    if (value) {
      // console.log(`FilterMenuItem value`, value);
      // console.log(`FilterMenuItem title`, title);
      // update the filter array.
      setFilters((prevFilters) => {
        // console.log(`prevFilters`, prevFilters);
        // find the index of the key in the previous filters
        const indexOfKey = prevFilters?.findIndex((f) => f.key === title);
        // console.log(`indexOfKey`, indexOfKey);
        // update the array at the index to the new value
        if (indexOfKey !== -1) {
          const newFilters = [...prevFilters];
          newFilters[indexOfKey] = { key: title, value: value };
          // console.log(`newFilters`, newFilters);
          setFilters(newFilters);
        }
      });
    }
    // else {
    // 	console.log(`No selected value: ${value}`);
    // }

    // console.log(`END useEffect title =======================  `, title);
  }, [value]);

  const resetFilters = () => {
    // console.log(`resetFilters called`);
    setValue(null);
    setFilters(initFilters);
  };

  return (
    <MenuOption
    // customStyles={{
    // 	optionWrapper: {},
    // }}
    // onPress={() => console.log("MenuOption pressed")}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: 40,
          backgroundColor: value ? "mediumspringgreen" : "transparent",
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontWeight: value ? "bold" : "",
            // fontSize: value ? 17 : 15,
            color: value ? "blue" : "",
            paddingLeft: 5,
          }}
        >
          {camelCaseToWords(title)}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {value && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 50,
                height: 50,
                // backgroundColor: "lightgray",
              }}
            >
              <AntDesign
                name="close"
                size={30}
                color="#aaa"
                style={{
                  // marginLeft: 10,
                  // height: "40",
                  backgroundColor: "white",
                }}
                onPress={resetFilters}
                borderWidth={2}
                borderColor="#6495ed"
                borderRadius={10}
              />
            </View>
          )}

          {/* <View style={{ zIndex: open ? 1000 : 0 }}> */}
          <DropDownPicker
            disabled={isDisabled}
            dropDownDirection="TOP"
            itemSeparator={true}
            open={open}
            value={value}
            items={options}
            setOpen={openPicker}
            setValue={setValue}
            setItems={setOptions}
            searchable={false}
            placeholder={"Select Filter"}
            searchPlaceholder={"searchPlaceholder"}
            // onChangeValue={onChangeValue}
            // style={{ backgroundColor: "yellow" }}
            style={{
              minHeight: 35,
            }}
            listMode="MODAL"
            modalTitle={`${camelCaseToNormal(title)} [${total}]`}
            // scrollViewProps={{
            // 	nestedScrollEnabled: true,
            // }}
            // dropDownContainerStyle={{ padding: 0, margin: 0 }}
            containerStyle={{
              width: 170,
              // padding: 2,
              // margin: 0,
            }}
            // itemStyle={{ justifyContent: "center", padding: 0, margin: 0 }}
            // itemProps={{ height: 10 }}
            // containerProps={{ height: 50 }}
            // labelProps={{}}
            // labelStyle={{ fontWeight: "bold" }}
            // props={{			fontSize: 5,			}}
            // searchContainerStyle={{				borderBottomColor: "#dfdfdf",				}}
            // searchPlaceholderTextColor="re?d"
            dropDownContainerStyle={{ backgroundColor: "#dfdfdf" }}
            listItemContainer={{ height: 100 }}
            // selectedItemContainerStyle={{
            // 	backgroundColor: "#ADEED9",
            // }}
            listItemLabelStyle={{ color: "#000" }}
            placeholderStyle={{
              // fontWeight: "bold",
              // textAlign: "center",
              // backgroundColor: "lightgray",
              color: isDisabled ? "lightgray" : "#000",
            }}
          />
        </View>
      </View>
    </MenuOption>
  );
};
