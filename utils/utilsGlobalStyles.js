import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  flexHorizontalCenter: { flex: 1, alignItems: "center" },
  pressableTotals: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#3D74B6",
    height: 55,
    // justifyContent: "space-between",
    padding: 2,
    margin: 0,
    // width:60,},
  },
  totalsWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // height: "100%",
    padding: 0,
    margin: 0,
  },
  totalsHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 0,
    margin: 0,
    // backgroundColor:
    // 	activeAstsName === "asts" ? "yellow" : null,
  },
  totalsTotal: {
    width: "100%",
    // fontSize: 18,
    paddingHorizontal: 5,
    borderRadius: 5,
    margin: 0,
    textAlign: "center",
  },
  roundIconContainer: {
    width: 60, // Set equal width and height for a square
    height: 60,
    borderRadius: 30, // Half of the width/height to make it a circle
    backgroundColor: "lightblue", // Background color for the circle
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  btnAddMore: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 4,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  pageHeader: {
    flex: 1,
    // alignContent: "center",
    // justifyContent: "center",
  },
});
