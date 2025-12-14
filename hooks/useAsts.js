import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useGetAstsQuery } from "../redux/astsSlice";
import { useGetUserByIdQuery } from "../redux/usersSlice";

export const useAsts = () => {
  // console.log(`useErfs running`);

  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid } = user || {};
  // console.log(`uid`, uid);
  // console.log(`useErfs claims`, claims);

  const { data } = useGetUserByIdQuery(uid);
  // console.log(`data`, data);

  const { workbase } = data || {};
  // console.log(`workbase`, workbase);

  const {
    data: asts,
    isLoading,
    isError,
    isFetching,
  } = useGetAstsQuery({
    lmMetro: workbase,
    uid,
  });
  // console.log(`asts?.length`, asts?.length);

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

  const [activeAsts, setActiveAsts] = useState(); // Active erfs are the one currently on display
  // console.log(`activeAsts?.length`, activeAsts?.length);

  const [activeAstsName, setActiveAstsName] = useState();
  // console.log(`activeAstsName`, activeAstsName);

  useEffect(() => {
    setActiveAsts(asts); // Default to the first 10 erfs
    setActiveAstsName("asts");
  }, [asts]);

  const checkDuplicate = async (meterNumber) => {
    // This function should check if the scanned meterNumber already exists in the asts collection
    return asts?.some((ast) => ast?.astData?.astNo === meterNumber);
  };

  const filterAsts = (asts, filterArray) => {
    // console.log(
    //   `filterErfs running ------------------------------------filterArray `,
    //   filterArray
    // );
    if (!filterArray) return asts;

    let filterResult = [];

    const filterObject = Object.fromEntries(
      filterArray.map((item) => [item.key, item.value])
    );
    // console.log(`filterObject`, filterObject);

    // From filterArray get the object where the value in not null or undefined
    const propertyTypeFilter = filterArray.find((item) => {
      return (
        item.value !== null && item.value !== undefined && item.value !== ""
      );
    });
    // console.log(`propertyTypeFilter`, propertyTypeFilter);

    let key = propertyTypeFilter?.key;
    // console.log(`filterErfs propertyTypeFilter key`, key);
    let value = "";

    // anomaly
    if (key === "anomaly") {
      value = filterObject[key];
      // console.log(`filterErfs propertyType key`, key);
      // console.log(`filterErfs propertyType value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = asts.filter(
          (ast) => ast?.anomalies?.anomaly?.trim() === value?.trim()
        );
      }
      console.log(`filterResult after anomaly`, filterResult?.length);
    }

    // anomalyDetail
    if (key === "anomalyDetail") {
      value = filterObject[key];
      // console.log(`filterErfs propertyType key`, key);
      // console.log(`filterErfs propertyType value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = asts.filter(
          (ast) => ast?.anomalies?.anomalyDetail?.trim() === value?.trim()
        );
      }
      console.log(`filterResult after anomalyDetail`, filterResult?.length);
    }

    // astManufacturer
    if (key === "astManufacturer") {
      value = filterObject[key];
      // console.log(`filterErfs propertyType key`, key);
      // console.log(`filterErfs propertyType value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = asts.filter(
          (ast) => ast?.astData?.astManufacturer?.trim() === value?.trim()
        );
      }
      console.log(`filterResult after astManufacturer`, filterResult?.length);
    }

    // astName
    if (key === "astName") {
      value = filterObject[key];
      // console.log(`filterErfs propertyType key`, key);
      // console.log(`filterErfs propertyType value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = asts.filter(
          (ast) => ast?.astData?.astName?.trim() === value?.trim()
        );
      }
      // console.log(`filterResult after astName`, filterResult?.length);
    }

    // astStateLocation
    if (key === "astStateLocation") {
      value = filterObject[key];
      // console.log(`filterErfs astStateLocation key`, key);
      // console.log(`filterErfs astStateLocation value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "No Location"
      ) {
        filterResult = asts.filter(
          (ast) => ast?.astData?.astState?.location?.trim() === value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.astData?.astState?.location === null ||
            ast?.astData?.astState?.location === "" ||
            ast?.astData?.astState?.location === undefined ||
            ast?.astData?.astState?.location === "undefined"
        );
      }
      // console.log(`filterResult after astStateLocation`, filterResult?.length);
    }

    // astState
    if (key === "astState") {
      value = filterObject[key];
      // console.log(`filterErfs astState key`, key);
      // console.log(`filterErfs astState value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "No State"
      ) {
        filterResult = asts.filter(
          (ast) => ast?.astData?.astState?.state?.trim() === value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.astData?.astState?.state === null ||
            ast?.astData?.astState?.state === "" ||
            ast?.astData?.astState?.state === undefined ||
            ast?.astData?.astState?.state === "undefined"
        );
      }
      // console.log(`filterResult after astState`, filterResult?.length);
    }

    // cbSize
    if (key === "cbSize") {
      value = filterObject[key];
      // console.log(`filterErfs cbSize key`, key);
      // console.log(`filterErfs cbSize value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "No CB"
      ) {
        filterResult = asts.filter(
          (ast) => Number(ast?.astData?.meter?.cb?.size) === Number(value)
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.astData?.meter?.cb?.size === null ||
            ast?.astData?.meter?.cb?.size === "" ||
            ast?.astData?.meter?.cb?.size === undefined ||
            ast?.astData?.meter?.cb?.size === "undefined"
        );
      }
      // console.log(`filterResult after? cbSize`, filterResult?.length);
    }

    // cbComment
    if (key === "cbComment") {
      value = filterObject[key];
      // console.log(`filterErfs cbComment key`, key);
      // console.log(`filterErfs cbComment value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "No CB Comment"
      ) {
        filterResult = asts.filter(
          (ast) => ast?.astData?.meter?.cb?.comment?.trim() === value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.astData?.meter?.cb?.comment === null ||
            ast?.astData?.meter?.cb?.comment === "" ||
            ast?.astData?.meter?.cb?.comment === undefined ||
            ast?.astData?.meter?.cb?.comment === "undefined"
        );
      }
      // console.log(`filterResult after? cbComment`, filterResult?.length);
    }

    // sealPresence
    if (key === "sealPresence") {
      value = filterObject[key];
      // console.log(`filterErfs sealPresence key`, key);
      // console.log(`filterErfs sealPresence value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value === "Sealed" &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "No Seal"
      ) {
        filterResult = asts.filter(
          (ast) =>
            ast?.astData?.meter?.seal?.sealNo !== null &&
            ast?.astData?.meter?.seal?.sealNo !== "" &&
            ast?.astData?.meter?.seal?.sealNo !== undefined &&
            ast?.astData?.meter?.seal?.sealNo !== "undefined"
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.astData?.meter?.seal?.sealNo === null ||
            ast?.astData?.meter?.seal?.sealNo === "" ||
            ast?.astData?.meter?.seal?.sealNo === undefined ||
            ast?.astData?.meter?.seal?.sealNo === "undefined"
        );
      }
      // console.log(`filterResult after? sealPresence`, filterResult?.length);
    }

    // sealComment
    if (key === "sealComment") {
      value = filterObject[key];
      // console.log(`filterErfs sealComment key`, key);
      // console.log(`filterErfs sealComment value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "No Seal Comment"
      ) {
        filterResult = asts.filter(
          (ast) => ast?.astData?.meter?.seal?.comment?.trim() === value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.astData?.meter?.seal?.comment === null ||
            ast?.astData?.meter?.seal?.comment === "" ||
            ast?.astData?.meter?.seal?.comment === undefined ||
            ast?.astData?.meter?.seal?.comment === "undefined"
        );
      }
      // console.log(`filterResult after? sealComment`, filterResult?.length);
    }

    // Ast Creator
    if (key === "creator") {
      value = filterObject[key];
      // console.log(`filterErfs creator key`, key);
      // console.log(`filterErfs creator value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "Not Available"
      ) {
        filterResult = asts.filter(
          (ast) =>
            ast?.metadata?.createdThrough?.creatorTrnName?.trim() ===
            value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.metadata?.createdThrough?.creatorTrnName === null ||
            ast?.metadata?.createdThrough?.creatorTrnName === "" ||
            ast?.metadata?.createdThrough?.creatorTrnName === undefined ||
            ast?.metadata?.createdThrough?.creatorTrnName === "undefined"
        );
      }
      // console.log(`filterResult after? creator`, filterResult?.length);
    }

    // Ast Trns Count
    if (key === "trnCount") {
      value = filterObject[key];
      // console.log(`filterErfs trnCount key`, key);
      // console.log(`filterErfs trnCount value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "Not Trn"
      ) {
        filterResult = asts.filter(
          (ast) => Number(ast?.trns?.length) === Number(value)
        );
      } else {
        filterResult = asts.filter(
          (ast) => ast?.trns === undefined || ast?.trns === null
        );
      }
      // console.log(`filterResult after? trnCount`, filterResult?.length);
    }

    // Delete Pending
    if (key === "deletePending") {
      value = filterObject[key];
      // console.log(`filterErfs deletePending key`, key);
      // console.log(`filterErfs deletePending value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "No Pending Delete"
      ) {
        filterResult = asts.filter(
          (ast) => ast?.deleteAst?.trim() === value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.deleteAst === null ||
            ast?.deleteAst === "" ||
            ast?.deleteAst === undefined ||
            ast?.deleteAst === "undefined"
        );
      }
      // console.log(`filterResult after? deletePending`, filterResult?.length);
    }

    // PropertyType
    if (key === "propertyType") {
      value = filterObject[key];
      // console.log(`filterErfs propertyType key`, key);
      // console.log(`filterErfs propertyType value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "No PropertyType"
      ) {
        filterResult = asts.filter(
          (ast) => ast?.erf?.propertyType?.type?.trim() === value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.erf?.propertyType?.type === null ||
            ast?.erf?.propertyType?.type === "" ||
            ast?.erf?.propertyType?.type === undefined ||
            ast?.erf?.propertyType?.type === "undefined"
        );
      }
      // console.log(`filterResult after: propertyType`, filterResult?.length);
    }

    // Ward
    if (key === "ward") {
      value = filterObject[key];
      // console.log(`filterErfs ward key`, key);
      // console.log(`filterErfs ward value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null
      ) {
        filterResult = asts.filter(
          (ast) => ast?.erf?.address?.ward?.trim() === value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.erf?.address?.ward === null ||
            ast?.erf?.address?.ward === "" ||
            ast?.erf?.address?.ward === undefined ||
            ast?.erf?.address?.ward === "undefined"
        );
      }
      // console.log(`filterResult after: wars`, filterResult?.length);
    }

    // Town
    if (key === "town") {
      value = filterObject[key];
      // console.log(`filterErfs town key`, key);
      // console.log(`filterErfs town value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = asts.filter(
          (ast) => ast?.erf?.address?.town?.trim() === value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.erf?.address?.town === null ||
            ast?.erf?.address?.town === "" ||
            ast?.erf?.address?.town === undefined ||
            ast?.erf?.address?.town === "undefined"
        );
      }
      // console.log(`filterResult after: town`, filterResult?.length);
    }

    // suburbTownship
    if (key === "suburbTownship") {
      value = filterObject[key];
      // console.log(`filterErfs suburbTownship key`, key);
      // console.log(`filterErfs suburbTownship value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = asts.filter(
          (ast) => ast?.erf?.address?.suburbTownship?.trim() === value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.erf?.address?.suburbTownship === null ||
            ast?.erf?.address?.suburbTownship === "" ||
            ast?.erf?.address?.suburbTownship === undefined ||
            ast?.erf?.address?.suburbTownship === "undefined"
        );
      }
      // console.log(`filterResult after: suburbTownship`, filterResult?.length);
    }

    // strName
    if (key === "strName") {
      value = filterObject[key];
      // console.log(`filterErfs strName key`, key);
      // console.log(`filterErfs strName value`, value);
      // console.log(`filterErfs asts?.length`, asts?.length);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = asts.filter(
          (ast) =>
            ast?.erf?.address?.streetAdr?.strName?.trim() === value?.trim()
        );
      } else {
        filterResult = asts.filter(
          (ast) =>
            ast?.erf?.address?.streetAdr?.strName === null ||
            ast?.erf?.address?.streetAdr?.strName === "" ||
            ast?.erf?.address?.streetAdr?.strName === undefined ||
            ast?.erf?.address?.streetAdr?.strName === "undefined"
        );
      }
      // console.log(`filterResult after: strName`, filterResult?.length);
    }

    return filterResult;
  };

  return {
    asts,
    prePaidAsts,
    conventionalAsts,
    singlePhaseAsts,
    threePhaseAsts,

    activeAsts,
    setActiveAsts,

    activeAstsName,
    setActiveAstsName,

    filterAsts, //Method to filters Asts

    isLoading,
    isError,
    isFetching,
    checkDuplicate,
  };
};
