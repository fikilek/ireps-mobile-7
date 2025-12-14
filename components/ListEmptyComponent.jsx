import { View, Text, StyleSheet } from "react-native";

export const ListEmptyComponent = (props) => {
	const { msg } = props;
	return (
		<View style={styles.container}>
			{msg && <Text style={styles.msg}>{msg}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		margin: 1,
		borderWidth: 1,
		borderColor: "lightgrey",
		borderRadius: 10,
	},
	msg: {
		fontSize: 20,
		margin: 10,
		padding: 5,
		color: "orange",
	},
});
