import { useEffect, useState } from "react";

export const initAstsStats = {
  totalAsts: 0,
  astTypesStats: {
    prePaidAsts: 0,
    conventionalAsts: 0,
  },
  astPhasesStats: {
    singlePhaseAsts: 0,
    threePhaseAsts: 0,
  },

  // Asts stats
  anomalyStats: {},
  anomalyDetailStats: {},
  astManufacturerStats: {},
  astNameStats: {},
  astStateLocationStats: {}, //Where ast is location on that state,
  astStateStats: {},
  cbSizeStats: {},
  cbCommentStats: {},
  sealPresenceStats: {},
  sealCommentStats: {},
  creatorStats: {},
  trnCountStats: {},
  deletePendingStats: {},

  // Erfs stats
  propertyTypeStats: {
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
  serviceConnectionStats: {
    "Service Connections": 0,
    "No Service Connection": 0,
    "Not Known": 0,
  },
  groupedStats: {
    "Part Of Group": 0,
  },
  wardStats: {},
  townStats: {},
  suburbTownshipStats: {},
  strNameStats: {},
};

export const useAstsStats = (asts) => {
  // console.log(`useAstsStats asts`, asts);
  const [astsStats, setAstsStats] = useState(initAstsStats);
  // console.log(`useAstsStats astsStats`, astsStats);

  const prePaidAsts = asts?.filter(
    (ast) => ast?.astData?.meter?.type === "pre-paid"
  );
  // console.log(`prePaidAsts?.length`, prePaidAsts?.length);

  const conventionalAsts = asts?.filter(
    (ast) => ast?.astData?.meter?.type === "conventional"
  );
  // console.log(`conventionalAsts?.length`, conventionalAsts?.length);

  const singlePhaseAsts = asts?.filter(
    (ast) => ast?.astData?.meter?.phase === "single"
  );
  // console.log(`singlePhaseAsts?.length`, singlePhaseAsts?.length);

  const threePhaseAsts = asts?.filter(
    (ast) => ast?.astData?.meter?.phase === "three"
  );
  // console.log(`threePhaseAsts?.length`, threePhaseAsts?.length);

  const anomaly = {};
  const anomalyDetail = {};
  const astManufacturer = {};
  const astName = {};
  const astStateLocation = {};
  const astState = {};
  const cbSize = {};
  const cbComment = {};
  const sealPresence = {};
  const sealComment = {};
  const creator = {};
  const trnCount = {};
  const deletePending = {};

  const propertyType = {};
  // const serviceConnections = {};
  // const grouped = {};

  const ward = {};
  const town = {};
  const suburbTownship = {};
  const strName = {};

  // Grouping asts by propertyType, asts (metered), and trns (no access)
  asts?.forEach((ast, index) => {
    // console.log(`useAstsStats erf`, erf);

    // Group by anomaly
    const anomalyKey = ast?.anomalies?.anomaly?.trim();
    if (!anomaly[anomalyKey]) {
      anomaly[anomalyKey] = [];
    }
    anomaly[anomalyKey].push(ast?.anomalies?.anomaly);
    // console.log(`anomaly`, anomaly);

    // Group by anomalyDetail count
    const anomalyDetailKey = ast?.anomalies?.anomalyDetail?.trim();
    if (!anomalyDetail[anomalyDetailKey]) {
      anomalyDetail[anomalyDetailKey] = [];
    }
    anomalyDetail[anomalyDetailKey].push(ast?.anomalies?.anomalyDetail);
    // console.log(`anomalyDetail`, anomalyDetail);

    // Group by Ast Manufacturer
    const astManufacturerKey = ast?.astData?.astManufacturer?.trim();
    if (!astManufacturer[astManufacturerKey]) {
      astManufacturer[astManufacturerKey] = [];
    }
    astManufacturer[astManufacturerKey].push(ast?.astData?.astManufacturer);
    // console.log(`astManufacturer`, astManufacturer);

    // Group by Ast Name
    const astNameKey = ast?.astData?.astName
      ? ast?.astData?.astName?.trim()
      : "No Ast";
    if (!astName[astNameKey]) {
      astName[astNameKey] = [];
    }
    astName[astNameKey].push(ast?.astData?.astName);
    // console.log(`astName`, astName);

    // Group by Ast State Location
    const astStateLocationKey = ast?.astData?.astState?.location?.trim()
      ? ast?.astData?.astState?.location?.trim()
      : "No Location";
    if (!astStateLocation[astStateLocationKey]) {
      astStateLocation[astStateLocationKey] = [];
    }
    astStateLocation[astStateLocationKey].push(ast?.astData?.astName);
    // console.log(`astName`, astName);

    // Group by Ast State
    const astStateKey = ast?.astData?.astState?.state?.trim();
    if (!astState[astStateKey]) {
      astState[astStateKey] = [];
    }
    astState[astStateKey].push(ast?.astData?.astName);
    // console.log(`astName`, astName);

    // Group by CB size
    const cbSizeKey = Number(ast?.astData?.meter?.cb?.size)
      ? Number(ast?.astData?.meter?.cb?.size)
      : "No CB";
    if (!cbSize[cbSizeKey]) {
      cbSize[cbSizeKey] = [];
    }
    cbSize[cbSizeKey].push(ast?.astData?.meter?.cb?.size);
    // console.log(`cbSize`, cbSize);

    // Group by CB Comment
    const cbCommentKey = ast?.astData?.meter?.cb?.comment?.trim()
      ? ast?.astData?.meter?.cb?.comment?.trim()
      : "No CB Comment";
    if (!cbComment[cbCommentKey]) {
      cbComment[cbCommentKey] = [];
    }
    cbComment[cbCommentKey].push(ast?.astData?.astName);
    // console.log(`cbComment`, cbComment);

    // Group by Seal Presence
    const sealPresenceKey = ast?.astData?.meter?.seal?.sealNo?.trim()
      ? "Sealed"
      : "No Seal";
    if (!sealPresence[sealPresenceKey]) {
      sealPresence[sealPresenceKey] = [];
    }
    sealPresence[sealPresenceKey].push(ast?.astData?.astName);
    // console.log(`sealPresence`, sealPresence);

    // Group by Seal Comment
    const sealCommentKey = ast?.astData?.meter?.seal?.comment?.trim()
      ? ast?.astData?.meter?.seal?.comment?.trim()
      : "No Seal Comment";
    if (!sealComment[sealCommentKey]) {
      sealComment[sealCommentKey] = [];
    }
    sealComment[sealCommentKey].push(ast?.astData?.astName);
    // console.log(`sealComment`, sealComment);

    // Group by Creator
    const creatorKey = ast?.metadata?.createdThrough?.creatorTrnName?.trim()
      ? ast?.metadata?.createdThrough?.creatorTrnName?.trim()
      : "Not Available";
    if (!creator[creatorKey]) {
      creator[creatorKey] = [];
    }
    creator[creatorKey].push(ast?.astData?.astName);
    // console.log(`creator`, creator);

    // Group by Trn count
    const trnCountKey = Number(ast?.trns?.length)
      ? Number(ast?.trns?.length)
      : "No Trn";
    if (!trnCount[trnCountKey]) {
      trnCount[trnCountKey] = [];
    }
    trnCount[trnCountKey].push(ast?.trns);
    // trnCount["Has Trn"] = asts?.trns?.length - (noAccessStats?.[0] ? noAccessStats?.[0] : 0);
    // console.log(`trnCount`, trnCount);

    // Grouped by Delete pending
    const deletePendingKey = ast?.deleteAst
      ? ast?.deleteAst
      : "No Pending Delete";
    if (!deletePending[deletePendingKey]) {
      deletePending[deletePendingKey] = [];
    }
    deletePending[deletePendingKey].push(ast?.trns);
    // console.log(`deletePending`, deletePending);

    // Erf stats
    // ------------------------------------------------

    //  propertyType
    const propertyTypeKey = ast?.erf?.propertyType?.type?.trim()
      ? ast?.erf?.propertyType?.type?.trim()
      : "No PropertyType";
    if (!propertyType[propertyTypeKey]) {
      propertyType[propertyTypeKey] = [];
    }
    propertyType[propertyTypeKey].push(ast?.erf?.propertyType?.type);
    // console.log(`propertyType`, propertyType);

    // Grouped by serviceConnection;
    // const serviceConnectionKey = ast?.deleteAst
    // 	? ast?.deleteAst
    // 	: "No Pending Delete";
    // if (!serviceConnection[serviceConnectionKey]) {
    // 	serviceConnection[serviceConnectionKey] = [];
    // }
    // serviceConnection[deletePendingKey].push(ast?.trns);
    // console.log(`serviceConnection`, serviceConnection);

    // Grouped by delete ast;
    // const deleteAstKey = ast?.deleteAst
    // 	? ast?.deleteAst
    // 	: "No Pending Delete";
    // if (!deleteAst[deleteAstKey]) {
    // 	deleteAst[deleteAstKey] = [];
    // }
    // deleteAst[deleteAstKey].push(ast?.trns);
    // console.log(`deleteAst`, deleteAst);

    // Group by wards
    const wardKey = ast?.erf?.address?.ward
      ? ast?.erf?.address?.ward
      : "No Ward";
    if (!ward[wardKey]) {
      ward[wardKey] = [];
    }
    ward[wardKey].push(ast?.erf?.address?.ward);
    // console.log(`ward`, ward);

    // Group by town
    const townKey = ast?.erf?.address?.town?.trim()
      ? ast?.erf?.address?.town?.trim()
      : "No Town";
    if (!town[townKey]) {
      town[townKey] = [];
    }
    town[townKey].push(ast?.erf?.address?.ward);
    // console.log(`town`, town);

    //  Grouped by suburbTownship
    const suburbTownshipKey = ast?.erf?.address?.suburbTownship?.trim()
      ? ast?.erf?.address?.suburbTownship?.trim()
      : "No suburb/Township";
    if (!suburbTownship[suburbTownshipKey]) {
      suburbTownship[suburbTownshipKey] = [];
    }
    suburbTownship[suburbTownshipKey].push(ast?.erf?.address?.ward);
    // console.log(`suburbTownship`, suburbTownship);

    // Group by street name
    const strNameKey = ast?.erf?.address?.streetAdr?.strName?.trim()
      ? ast?.erf?.address?.streetAdr?.strName?.trim()
      : "No Steet Name";
    if (!strName[strNameKey]) {
      strName[strNameKey] = [];
    }
    strName[strNameKey].push(ast?.erf?.address?.ward);
    // console.log(`strName`, strName);
  });

  const anomalyStats = {};
  Object.entries(anomaly).forEach(([key, value]) => {
    // console.log(`key`, key);
    anomalyStats[key] = value?.length;
  });
  // console.log(`useAstsStats anomalyStats`, anomalyStats);

  const anomalyDetailStats = {};
  Object.entries(anomalyDetail).forEach(([key, value]) => {
    // console.log(`key`, key);
    anomalyDetailStats[key] = value?.length;
  });
  // console.log(`useAstsStats anomalyDetailStats`, anomalyDetailStats);

  const astManufacturerStats = {};
  Object.entries(astManufacturer).forEach(([key, value]) => {
    // console.log(`key`, key);
    astManufacturerStats[key] = value?.length;
  });
  // console.log(`useAstsStats astManufacturerStats`, astManufacturerStats);

  const astNameStats = {};
  Object.entries(astName).forEach(([key, value]) => {
    // console.log(`key`, key);
    astNameStats[key] = value?.length;
  });
  // console.log(`useAstsStats astNameStats`, astNameStats);

  const astStateLocationStats = {};
  Object.entries(astStateLocation).forEach(([key, value]) => {
    // console.log(`key`, key);
    astStateLocationStats[key] = value?.length;
  });
  // console.log(`useAstsStats astStateLocationStats`, astStateLocationStats);

  const astStateStats = {};
  Object.entries(astState).forEach(([key, value]) => {
    // console.log(`key`, key);
    astStateStats[key] = value?.length;
  });
  // console.log(`useAstsStats astNameStats`, astNameStats);

  const cbSizeStats = {};
  Object.entries(cbSize).forEach(([key, value]) => {
    // console.log(`key`, key);
    cbSizeStats[key] = value?.length;
  });
  // console.log(`useAstsStats cbSizeStats`, cbSizeStats);

  const cbCommentStats = {};
  Object.entries(cbComment).forEach(([key, value]) => {
    // console.log(`key`, key);
    cbCommentStats[key] = value?.length;
  });
  // console.log(`useAstsStats cbCommentStats`, cbCommentStats);

  const sealPresenceStats = {};
  Object.entries(sealPresence).forEach(([key, value]) => {
    // console.log(`key`, key);
    sealPresenceStats[key] = value?.length;
  });
  // console.log(`useAstsStats sealPresenceStats`, sealPresenceStats);

  const sealCommentStats = {};
  Object.entries(sealComment).forEach(([key, value]) => {
    // console.log(`key`, key);
    sealCommentStats[key] = value?.length;
  });
  // console.log(`useAstsStats sealCommentStats`, sealCommentStats);

  const creatorStats = {};
  Object.entries(creator).forEach(([key, value]) => {
    // console.log(`key`, key);
    creatorStats[key] = value?.length;
  });
  // console.log(`useAstsStats creatorStats`, creatorStats);

  const trnCountStats = {};
  Object.entries(trnCount).forEach(([key, value]) => {
    // console.log(`key`, key);
    trnCountStats[key] = value?.length;
  });
  // console.log(`useAstsStats trnCountStats`, trnCountStats);

  const deletePendingStats = {};
  Object.entries(deletePending).forEach(([key, value]) => {
    // console.log(`key`, key);
    deletePendingStats[key] = value?.length;
  });
  // console.log(`useAstsStats deletePendingStats`, deletePendingStats);

  // Erf Stats ----------------------------------

  // propertyType
  const propertyTypeStats = {};
  Object.entries(propertyType).forEach(([key, value]) => {
    // console.log(`key`, key);
    propertyTypeStats[key] = value?.length;
  });
  // console.log(`useAstsStats 391 propertyTypeStats`, propertyTypeStats);

  // ward
  const wardStats = {};
  Object.entries(ward).forEach(([key, value]) => {
    // console.log(`key`, key);
    wardStats[key] = value?.length;
  });
  // console.log(`useAstsStats wardStats`, wardStats);

  // town
  const townStats = {};
  Object.entries(town).forEach(([key, value]) => {
    // console.log(`key`, key);
    townStats[key] = value?.length;
  });
  // console.log(`useAstsStats townStats`, townStats);

  // suburbTownship
  const suburbTownshipStats = {};
  Object.entries(suburbTownship).forEach(([key, value]) => {
    // console.log(`key`, key);
    suburbTownshipStats[key] = value?.length;
  });
  // console.log(`useAstsStats suburbTownshipStats`, suburbTownshipStats);

  // strName
  const strNameStats = {};
  Object.entries(strName).forEach(([key, value]) => {
    // console.log(`key`, key);
    strNameStats[key] = value?.length;
  });
  // console.log(`useAstsStats strNameStats`, strNameStats);

  useEffect(() => {
    if (asts) {
      setAstsStats((prev) => {
        return {
          ...prev,
          totalAsts: asts?.length,
          astTypesStats: {
            ...prev.astTypesStats,
            prePaidAsts: prePaidAsts?.length,
            conventionalAsts: conventionalAsts?.length,
          },
          astPhasesStats: {
            ...prev.astPhasesStats,
            singlePhaseAsts: singlePhaseAsts?.length,
            threePhaseAsts: threePhaseAsts?.length,
          },
          anomalyStats,
          anomalyDetailStats,
          astManufacturerStats,
          astNameStats,
          astStateLocationStats,
          astStateStats,
          cbSizeStats,
          cbCommentStats,
          sealPresenceStats,
          sealCommentStats,
          creatorStats,
          trnCountStats,
          deletePendingStats,

          propertyTypeStats,
          wardStats,
          townStats,
          suburbTownshipStats,
          strNameStats,
        };
      });
    }
  }, [asts]);

  return { astsStats };
};
