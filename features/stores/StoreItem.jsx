import { View, Text } from "react-native";
import React from "react";
import StoreItemDisplay from "./StoreItemDisplay";

const StoreItem = (props) => {
	const { ast } = props;
	const { astData } = ast || {};
	const { astNo, meter, astManufacturer } = astData || {};
	return (
		<View style={{ flexDirection: "row" }}>
			<StoreItemDisplay title={"Meter Number"} data={astNo} />
			<StoreItemDisplay title={"Type"} data={meter?.type} />
			<StoreItemDisplay title={"Phase"} data={meter?.phase} />
			<StoreItemDisplay title={"Brand"} data={astManufacturer} />
		</View>
	);
};

export default StoreItem;
