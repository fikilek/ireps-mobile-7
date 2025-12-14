import { View, Text } from "react-native";
import React from "react";

const StatsComponent = (props) => {
	const { children } = props;
	return (
		<View
			style={{
				borderWidth: 1,
				margin: 5,
				backgroundColor: "cornsilk",
				borderRadius: 5,
			}}
		>
			{children}
		</View>
	);
};

export default StatsComponent;
