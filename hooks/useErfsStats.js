import { useState, useEffect } from "react";

export const initErfsStats = {
	totalErfs: 0,
	erfsStats: {
		erfs: {
			formalErfs: 0,
			fakeErfs: 0,
		},
		propertyTypes: {
			"Residential (t/ship)": 0,
			"Residential (suburb)": 0,
			Flat: 0,
			Townhouse: 0,
			Commercial: 0,
			Industrial: 0,
			Government: 0,
			Hospital: 0,
			Municipality: 0,
			School: 0,
			Church: 0,
			Estate: 0,
			"Vacant Stand": 0,
		},
		metered: {},
		noAccess: {},
		serviceConnections: {
			"Service Connections": 0,
			"No Service Connection": 0,
			"Not Known": 0,
		},
		grouped: {
			"Part Of Group": 0,
		},
		wards: {},
		towns: {},
		suburbTownships: {},
		strNames: {},
	},
};

export const useErfsStats = (erfs) => {
	// console.log(`useErfsStats erfs`, erfs);
	const [erfsStats, setErfsStats] = useState(initErfsStats);
	// console.log(`useErfsStats erfsStats`, erfsStats);

	const fakeErfs = erfs?.filter((erf) => erf?.erfNo?.slice(0, 2) === "FE");
	// console.log(`fakeErfs?.length`, fakeErfs?.length);

	const formalErfs = erfs?.filter((erf) => erf?.erfNo?.slice(0, 2) !== "FE");
	// console.log(`formalErfs?.length`, formalErfs?.length);

	const propertyTypeErfs = {};
	const meteredErfs = {};
	const noAccessErfs = {};
	const serviceConnections = {};
	const grouped = {};

	const wardErfs = {};
	const townErfs = {};
	const suburbTownshipErfs = {};
	const strNameErfs = {};

	// Grouping erfs by propertyType, asts (metered), and trns (no access)

	erfs?.forEach((erf, index) => {
		// console.log(`useErfsStats erf`, erf);

		// Group by propertyType
		const propertyTypeKey = erf?.propertyType?.type;
		// console.log(`propertyTypeKey`, propertyTypeKey);
		if (!propertyTypeErfs[propertyTypeKey]) {
			propertyTypeErfs[propertyTypeKey] = [];
		}
		propertyTypeErfs[propertyTypeKey].push(erf?.propertyType);

		// Group by asts/meters count
		const meteredKey = erf?.asts?.length ? `${erf?.asts?.length}` : "0";
		if (!meteredErfs[meteredKey]) {
			meteredErfs[meteredKey] = [];
		}
		meteredErfs[meteredKey].push(erf?.asts);

		// Grouped by Access
		const noAccessKey = erf?.trns?.length ? `${erf?.trns?.length}` : "0";
		if (!noAccessErfs[noAccessKey]) {
			noAccessErfs[noAccessKey] = [];
		}
		noAccessErfs[noAccessKey].push(erf?.trns);
		// console.log(`noAccessErfs`, noAccessErfs);

		// Group by erfServiceConnections
		// const erfServiceConnectionsKey = erf?.erfServiceConnections?.length
		// 	? `${erf?.erfServiceConnections?.length}`
		// 	: "0";

		// if (!erfsStats.erfsStats.erfServiceConnections[erfServiceConnectionsKey]) {
		// 	erfsStats.erfsStats.erfServiceConnections[erfServiceConnectionsKey] = [];
		// }
		// erfsStats.erfsStats.erfServiceConnections[erfServiceConnectionsKey].push(
		// 	erf?.erfServiceConnections
		// );

		// Group by grouped
		// const groupedKey = erf?.grouped?.length ? "Part Of Group" : "Not Part Of Group";
		// if (!erfsStats.erfsStats.grouped[groupedKey]) {
		// 	erfsStats.erfsStats.grouped[groupedKey] = [];
		// }
		// erfsStats.erfsStats.grouped[groupedKey].push(erf?.grouped);

		// Group by wards
		const wardKey = erf?.address?.ward;
		if (!wardErfs[wardKey]) {
			wardErfs[wardKey] = [];
		}
		wardErfs[wardKey].push(erf?.address?.ward);

		// Group by town
		const townKey = erf?.address?.town;
		if (!townErfs[townKey]) {
			townErfs[townKey] = [];
		}
		townErfs[townKey].push(erf?.address?.ward);

		// Group by suburb/township
		const suburbTownshipKey = erf?.address?.suburbTownship?.trim();
		if (!suburbTownshipErfs[suburbTownshipKey]) {
			suburbTownshipErfs[suburbTownshipKey] = [];
		}
		suburbTownshipErfs[suburbTownshipKey].push(erf?.address?.ward);

		// Group by street name
		const strNameKey = erf?.address?.streetAdr?.strName?.trim();
		if (!strNameErfs[strNameKey]) {
			strNameErfs[strNameKey] = [];
		}
		strNameErfs[strNameKey].push(erf?.address?.ward);
	});

	// console.log(`useErfsStats propertyTypeErfs`, propertyTypeErfs);
	// console.log(`useErfsStats meteredErfs`, meteredErfs);
	// console.log(`useErfsStats noAccessErfs`, noAccessErfs);

	const propertyTypesStats = {};
	Object.entries(propertyTypeErfs).forEach(([key, value]) => {
		// console.log(`key`, key);
		propertyTypesStats[key] = value?.length;
	});
	// console.log(`useErfsStats propertyTypesStats`, propertyTypesStats);

	const meteredErfsStats = {};
	Object.entries(meteredErfs).forEach(([key, value]) => {
		// console.log(`key`, key);
		meteredErfsStats[key] = value?.length;
	});
	meteredErfsStats["allMetered"] =
		erfs?.length - (meteredErfsStats?.[0] ? meteredErfsStats?.[0] : 0);
	// console.log(`useErfsStats meteredErfsStats`, meteredErfsStats);

	// const noAccessStats = { key: "allNoAccess", value: "allNoAccess" };
	const noAccessStats = {};
	Object.entries(noAccessErfs).forEach(([key, value]) => {
		// console.log(`key`, key);
		noAccessStats[key] = value?.length;
	});
	noAccessStats["allNoAccess"] =
		erfs?.length - (noAccessStats?.[0] ? noAccessStats?.[0] : 0);
	// console.log(`useErfsStats noAccessStats`, noAccessStats);

	const wardStats = {};
	Object.entries(wardErfs).forEach(([key, value]) => {
		// console.log(`key`, key);
		wardStats[key] = value?.length;
	});
	// console.log(`useErfsStats wardStats`, wardStats);

	const townStats = {};
	Object.entries(townErfs).forEach(([key, value]) => {
		// console.log(`key`, key);
		townStats[key] = value?.length;
	});
	// console.log(`useErfsStats townStats`, townStats);

	const suburbTownshipStats = {};
	Object.entries(suburbTownshipErfs).forEach(([key, value]) => {
		// console.log(`key`, key);
		suburbTownshipStats[key] = value?.length;
	});
	// console.log(`useErfsStats suburbTownshipStats`, suburbTownshipStats);

	const strNameStats = {};
	Object.entries(strNameErfs).forEach(([key, value]) => {
		// console.log(`key`, key);
		strNameStats[key] = value?.length;
	});
	// console.log(`useErfsStats strNameStats`, strNameStats);

	useEffect(() => {
		if (erfs) {
			setErfsStats((erfsStats) => {
				return {
					...erfsStats,
					totalErfs: erfs?.length,
					erfsStats: {
						...erfsStats.erfsStats,
						erfs: {
							...erfsStats.erfsStats?.erfs,
							formalErfs: formalErfs?.length,
							fakeErfs: fakeErfs?.length,
						},
						propertyTypes: propertyTypesStats,
						metered: meteredErfsStats,
						noAccess: noAccessStats,
						serviceConnections: serviceConnections,
						grouped: grouped,
						wards: wardStats,
						towns: townStats,
						suburbTownships: suburbTownshipStats,
						strNames: strNameStats,
					},
				};
			});
		}
	}, [erfs]);

	return { erfsStats };
};
