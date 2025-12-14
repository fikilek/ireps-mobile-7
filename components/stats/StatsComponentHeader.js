import { View, Text } from "react-native";
import React from "react";

const StatsComponentHeader = (props) => {
	const { title, total } = props;
	return (
		<View
			style={{
				margin: 5,
				backgroundColor: "white",
				padding: 5,
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<Text style={{ fontSize: 22, fontWeight: "bold" }}>{title}</Text>
			<Text style={{ fontSize: 22, fontWeight: "bold" }}>Total: {total}</Text>
		</View>
	);
};

export default StatsComponentHeader;
