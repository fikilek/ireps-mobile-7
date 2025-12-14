import { View } from "react-native";
import React from "react";
import StatsDataItem from "./StatsDataItem";

const StatsComponentData = (props) => {
	const { data } = props;
	// console.log(`data`, data);
	return (
		<View>
			{data?.map((item, index) => (
				<StatsDataItem key={index} item={item} />
			))}
		</View>
	);
};

export default StatsComponentData;
