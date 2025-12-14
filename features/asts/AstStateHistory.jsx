import { View } from "react-native";
import React from "react";
import AstStateHistoryItem from "./AstStateHistoryItem";

const AstStateHistory = (props) => {
	const { history } = props;
	return (
		<View style={{ marginTop: 5 }}>
			{history &&
				history?.map((historyItem, index) => (
					<AstStateHistoryItem key={index} historyItem={historyItem} />
				))}
		</View>
	);
};

export default AstStateHistory;
