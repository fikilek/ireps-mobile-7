import { useEffect, useState } from "react";

export const initTrnsStats = {
  totalTrns: 0,
  trnsStats: {
    trns: {
      access: 0,
      noAccess: 0,
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
    noAccessReasons: {},
    trnType: {
      audit: 0,
      inspection: 0,
      installation: 0,
      disconnection: 0,
      reconnection: 0,
    },
    trnState: {},
    wards: {},
    towns: {},
    suburbTownships: {},
    strNames: {},
    photos: {},
    voice: {},
    video: {},
  },
};

export const useTrnsStats = (trns) => {
  // console.log(`useTrnsStats trns`, trns);
  const [trnsStats, setTrnsStats] = useState(initTrnsStats);
  // console.log(`useTrnsStats trnsStats`, trnsStats);

  const accessTrns = trns?.filter((trn) => trn?.access?.meterAccess === "yes");
  // console.log(`accessTrns?.length`, accessTrns?.length);

  const noAccessTrns = trns?.filter((trn) => trn?.access?.meterAccess === "no");
  // console.log(`noAccessTrns?.length`, noAccessTrns?.length);

  const propertyType = {};
  const noAccessReason = {};
  const trnType = {};
  const trnState = {};
  const ward = {};
  const town = {};
  const suburbTownship = {};
  const strName = {};
  const photo = {};
  const voice = {};
  const video = {};

  // Grouping trns by propertyType, asts (metered), and trns (no access)

  trns?.forEach((trn, index) => {
    // console.log(`useTrnsStats trn`, trn);

    // Group by propertyType
    const propertyTypeKey = trn?.ast?.erf.propertyType?.type;
    if (!propertyType[propertyTypeKey]) {
      propertyType[propertyTypeKey] = [];
    }
    propertyType[propertyTypeKey].push(trn?.ast?.erf.propertyType?.type);
    // console.log(`propertyType`, propertyType);

    // Group by noAccessReason
    if (
      trn?.access?.noAccessReason &&
      trn?.access?.noAccessReason !== "choose"
    ) {
      const noAccessReasonKey = trn?.access?.noAccessReason;
      if (!noAccessReason[noAccessReasonKey]) {
        noAccessReason[noAccessReasonKey] = [];
      }
      noAccessReason[noAccessReasonKey].push(trn?.access?.noAccessReason);
      // console.log(`noAccessReason`, noAccessReason);
    }

    // Grouped by trnType
    const trnTypeKey = trn?.metadata?.trnType;
    if (!trnType[trnTypeKey]) {
      trnType[trnTypeKey] = [];
    }
    trnType[trnTypeKey].push(trn?.metadata?.trnType);
    // console.log(`trnType`, trnType);

    // Grouped by trnState
    const trnStateKey = trn?.metadata?.trnState;
    if (!trnState[trnStateKey]) {
      trnState[trnStateKey] = [];
    }
    trnState[trnStateKey].push(trn?.metadata?.trnState);
    // console.log(`trnState`, trnState);

    // Group by wards
    const wardKey = trn?.ast?.erf.address?.ward;
    if (!ward[wardKey]) {
      ward[wardKey] = [];
    }
    ward[wardKey].push(trn?.ast?.erf.address?.ward);
    // console.log(`ward`, ward);

    // Group by town
    const townKey = trn?.ast?.erf.address?.town;
    if (!town[townKey]) {
      town[townKey] = [];
    }
    town[townKey].push(trn?.ast?.erf.address?.town);
    // console.log(`town`, town);

    // Group by suburbTownship
    const suburbTownshipKey = trn?.ast?.erf.address?.suburbTownship?.trim();
    if (!suburbTownship[suburbTownshipKey]) {
      suburbTownship[suburbTownshipKey] = [];
    }
    suburbTownship[suburbTownshipKey].push(trn?.ast?.erf.address?.ward);
    // console.log(`suburbTownship`, suburbTownship);

    // Group by street name
    const strNameKey = trn?.ast?.erf.address?.streetAdr?.strName?.trim();
    if (!strName[strNameKey]) {
      strName[strNameKey] = [];
    }
    strName[strNameKey].push(trn?.ast?.erf.address?.streetAdr?.strName?.trim());
    // console.log(`strName`, strName);
  });

  const propertyTypesStats = {};
  Object.entries(propertyType).forEach(([key, value]) => {
    // console.log(`key`, key);
    propertyTypesStats[key] = value?.length;
  });
  // console.log(`useTrnsStats propertyTypesStats`, propertyTypesStats);

  const noAccessReasonStats = {};
  Object.entries(noAccessReason).forEach(([key, value]) => {
    // console.log(`key`, key);
    noAccessReasonStats[key] = value?.length;
  });
  // console.log(`useTrnsStats noAccessReasonStats`, noAccessReasonStats);

  const trnTypeStats = {};
  Object.entries(trnType).forEach(([key, value]) => {
    // console.log(`key`, key);
    trnTypeStats[key] = value?.length;
  });
  // console.log(`useTrnsStats trnTypeStats`, trnTypeStats);

  const trnStateStats = {};
  Object.entries(trnState).forEach(([key, value]) => {
    // console.log(`key`, key);
    trnStateStats[key] = value?.length;
  });
  // console.log(`useTrnsStats trnStateStats`, trnStateStats);

  const wardStats = {};
  Object.entries(ward).forEach(([key, value]) => {
    // console.log(`key`, key);
    wardStats[key] = value?.length;
  });
  // console.log(`useTrnsStats wardStats`, wardStats);

  const townStats = {};
  Object.entries(town).forEach(([key, value]) => {
    // console.log(`key`, key);
    townStats[key] = value?.length;
  });
  // console.log(`useTrnsStats townStats`, townStats);

  const suburbTownshipStats = {};
  Object.entries(suburbTownship).forEach(([key, value]) => {
    // console.log(`key`, key);
    suburbTownshipStats[key] = value?.length;
  });
  // console.log(`useTrnsStats suburbTownshipStats`, suburbTownshipStats);

  const strNameStats = {};
  Object.entries(strName).forEach(([key, value]) => {
    // console.log(`key`, key);
    strNameStats[key] = value?.length;
  });
  // console.log(`useTrnsStats strNameStats`, strNameStats);

  useEffect(() => {
    if (trns) {
      setTrnsStats((trnsStats) => {
        return {
          ...trnsStats,
          totalTrns: trns?.length,
          trnsStats: {
            ...trnsStats.trnsStats,
            trns: {
              ...trnsStats.trnsStats.trns,
              access: accessTrns?.length,
              noAccess: noAccessTrns?.length,
            },
            propertyTypes: propertyTypesStats,
            noAccessReasons: noAccessReasonStats,
            trnType: trnTypeStats,
            trnState: trnStateStats,
            wards: wardStats,
            towns: townStats,
            suburbTownships: suburbTownshipStats,
            strNames: strNameStats,
          },
        };
      });
    }
  }, [trns]);

  return { trnsStats };
};
