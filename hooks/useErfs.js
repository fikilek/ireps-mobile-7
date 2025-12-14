import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useGetErfsQuery } from "../redux/erfsSlice";
import { useGetUserByIdQuery } from "../redux/usersSlice";

export const useErfs = () => {
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
    data: erfs,
    isLoading,
    isError,
    isFetching,
  } = useGetErfsQuery(workbase);
  // console.log(`useErfs erfs?.length`, erfs?.length);

  const fakeErfs = erfs?.filter((erf) => erf?.erfNo?.slice(0, 2) === "FE");
  // console.log(`fakeErfs?.length`, fakeErfs?.length);

  const formalErfs = erfs?.filter((erf) => erf?.erfNo?.slice(0, 2) !== "FE");
  // console.log(`formalErfs?.length`, formalErfs?.length);

  const [activeErfs, setActiveErfs] = useState(); // Active erfs are the one currently on display
  // console.log(`activeErfs`, activeErfs);

  const [activeErfsName, setActiveErfsName] = useState();

  useEffect(() => {
    setActiveErfs((prev) => (prev = erfs)); // Default to the first 10 erfs
    setActiveErfsName("erfs");
  }, [erfs]);

  const filterErfs = (erfs, filterArray) => {
    // console.log(
    // 	`filterErfs running ------------------------------------filterArray `,
    // 	filterArray
    // );
    if (!filterArray) return erfs;

    let filterResult = [];

    // filterArray.forEach((item) => {
    // console.log(`Running loop for item iiiiiiiiiiiiiiiiiiiiiiiiii`, item);
    // extract key and value from item
    // const { key, value } = item;
    // console.log(`filterErfs key`, key);
    // console.log(`filterErfs value`, value);

    // if (key === "ward") {
    // 	filterResult = erfs.filter((erf) => erf.address.ward === value);
    // }
    // console.log(`filterResult after ward`, filterResult);

    // convert the filterArray to an object for easier access

    const filterObject = Object.fromEntries(
      filterArray.map((item) => [item.key, item.value])
    );
    // console.log(`filterObject`, filterObject);

    // Get the keys of the filterObject
    // const filterKeys = Object.keys(filterObject);
    // console.log(`filterKeys`, filterKeys);

    // Get the object in filterArray that has the key "propertyType"
    // const propertyTypeFilter = filterArray.find(
    // 	(item) => item.key === "propertyType"
    // );
    // console.log(`propertyTypeFilter`, propertyTypeFilter);
    // const { key, value } = propertyTypeFilter || {};

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

    if (key === "propertyType") {
      value = filterObject[key];
      // console.log(`filterErfs propertyType key`, key);
      // console.log(`filterErfs propertyType value`, value);
      // Filter by propertyType
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = erfs.filter((erf) => erf.propertyType?.type === value);
      } else {
        filterResult = erfs.filter(
          (erf) =>
            erf.propertyType?.type === null ||
            erf.propertyType?.type === "" ||
            erf.propertyType?.type === undefined
        );
      }
      // console.log(`filterResult after propertyType`, filterResult?.length);
    }
    // console.log(`filterErfs propertyTypeFilter`, propertyTypeFilter);

    if (key === "metered") {
      value = filterObject[key];
      // console.log(`filterErfs metered key`, key);
      // console.log(`filterErfs metered value`, value);

      if (value === "allMetered") {
        filterResult = erfs.filter((erf) => Number(erf.asts?.length) > 0);
      }
      if (
        value !== undefined &&
        value !== "undefined" &&
        value !== "allMetered" &&
        value !== null &&
        value !== "" &&
        value !== 0
      ) {
        filterResult = erfs.filter(
          (erf) => Number(erf.asts?.length) === Number(value)
        );
      }
      if (
        value === 0 ||
        value === "0" ||
        value === undefined ||
        value === "undefined"
      ) {
        filterResult = erfs.filter(
          (erf) => Boolean(erf?.asts?.length) === false
        );
      }
      // console.log(`filterResult after metered`, filterResult?.length);
    }

    if (key === "noAccess") {
      value = filterObject[key];
      // console.log(`filterErfs noAccess key`, key);
      // console.log(`filterErfs noAccess value`, value);

      if (value === "allNoAccess") {
        // console.log(`value is allNoAccess`, value);
        filterResult = erfs.filter((erf) => Number(erf.trns?.length) > 0);
      }
      if (
        value !== undefined &&
        value !== "undefined" &&
        value !== "allNoAccess"
      ) {
        // console.log(`value is defined or not empty`, value);
        filterResult = erfs.filter(
          (erf) => Number(erf.trns?.length) === Number(value) // ['1', '2', etc]
        );
      }
      if (
        value === 0 ||
        value === "0" ||
        value === undefined ||
        value === "undefined"
      ) {
        // console.log(`value is undefined or 0 or "0"`, value);
        filterResult = erfs.filter(
          (item, index) => Boolean(item?.trns?.length) === false
        );
      }
      // console.log(`filterResult after nnnnnn noAccess`, filterResult?.length);
    }

    // key = "serviceConnections";
    // value = filterObject[key];
    // 	if (value) {
    // 		filterResult = erfs.filter((erf) => erf.group === value);
    // 	}
    // 	console.log(`filterResult after serviceConnections`, filterResult);
    // }

    // key = "grouped";
    // value = filterObject[key];
    // if (key === "grouped") {
    // 	if (value) {
    // 		filterResult = erfs.filter((erf) => erf.group === value);
    // 	}
    // 	console.log(`filterResult after grouped`, filterResult);

    if (key === "wards") {
      value = filterObject[key];
      // console.log(`filterErfs wards key`, key);
      // console.log(`filterErfs wards value`, value);
      if (value) {
        filterResult = erfs.filter((erf) => erf?.address?.ward === value);
      }
      // console.log(`filterResult after wards`, filterResult?.length?.length);
    }

    if (key === "towns") {
      value = filterObject[key];
      // console.log(`filterErfs towns key`, key);
      // console.log(`filterErfs towns value`, value);
      if (value) {
        filterResult = erfs.filter(
          (erf) => erf?.address?.town?.trim() === value?.trim()
        );
      }
      // console.log(`filterResult after towns`, filterResult?.length?.length);
    }

    if (key === "suburbTownships") {
      value = filterObject[key];
      // console.log(`filterErfs suburbTownships key`, key);
      // console.log(`filterErfs suburbTownships value`, value);
      // console.log(
      // 	`filterErfs suburbTownships filterResult?.length`,
      // 	filterResult?.length
      // );

      if (value) {
        filterResult = erfs.filter(
          (erf) => (erf?.address?.suburbTownship).trim() === value?.trim()
        );
      }
      // console.log(`filterResult after suburbTownships`, filterResult?.length);
    }

    if (key === "strNames") {
      value = filterObject[key];
      // console.log(`filterErfs strNames key`, key);
      // console.log(`filterErfs strNames value`, value);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = erfs.filter(
          (erf) => erf?.address?.streetAdr?.strName?.trim() === value?.trim()
        );
      } else {
        filterResult = erfs.filter(
          (erf) =>
            erf?.address?.streetAdr?.strName === null ||
            erf?.address?.streetAdr?.strName === "" ||
            erf?.address?.streetAdr?.strName === undefined ||
            erf?.address?.streetAdr?.strName === "undefined"
        );
      }

      // console.log(`filterResult after strNames`, filterResult?.length);
    }

    return filterResult;
  };

  return {
    erfs,
    formalErfs,
    fakeErfs,

    activeErfs,
    setActiveErfs,

    activeErfsName,
    setActiveErfsName,

    filterErfs,

    isLoading,
    isError,
    isFetching,
  };
};

export const getErfType = (erf) => {
  if (!erf) return;
  const { erfNo } = erf;
  if (!erfNo) return;
  return erf?.erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal";
};
