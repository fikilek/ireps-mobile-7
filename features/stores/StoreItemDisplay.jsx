import { View, Text } from "react-native";
import React from "react";

const StoreItemDisplay = (props) => {
	const { title, data } = props;
	return (
		<View
			style={{
				margin: 3,
				padding: 3,
				width: 100,
				backgroundColor: "lightblue",
			}}
		>
			<Text>{data}</Text>
		</View>
	);
};

export default StoreItemDisplay;
