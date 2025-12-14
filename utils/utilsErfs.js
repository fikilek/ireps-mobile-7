export const getErfType = (erfNo) => {
	if (!erfNo) return;
	return erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal";
};
