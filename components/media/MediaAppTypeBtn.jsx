import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const MediaAppTypeBtn = (props) => {
	const { label, icon, setMode, mode } = props;
	const onPress = () => {
		console.log(`Button pressed: ${label}`);
		setMode((prev) => (prev = label));
	};
	return (
		<Pressable
			onPress={onPress}
			style={{
				flex: 1,
				flexDirection: "row",
				gap: 10,
				padding: 5,
				alignItems: "center",
				justifyContent: "center",
				// width: "100%",
				borderColor: "gray",
				borderWidth: 1,
				borderRadius: 5,
				backgroundColor: label === mode ? "yellow" : "#f0f0f0",
				height: 50,
			}}
		>
			{icon ? icon : <AntDesign name="icon" size={15} color="black" />}
		</Pressable>
	);
};

export default MediaAppTypeBtn;
