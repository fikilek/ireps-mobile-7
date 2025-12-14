import { Timestamp } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import uuid from "react-native-uuid";
import { lazy, number, object, string } from "yup";
import { useAuth } from "../../ireps-mobile-7/context/authContext";
import { useGetTrnsQuery } from "../../ireps-mobile-7/redux/trnsSlice";
import { useGetUserByIdQuery } from "../redux/usersSlice";

export const useTrns = (filterKeyRef, filterValueRef) => {
  console.log(`useTrns running ---------`);
  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid } = user || {};
  // console.log(`uid`, uid);

  const { data } = useGetUserByIdQuery(uid);
  // console.log(`data`, data);

  const { workbase } = data || {};
  // console.log(`workbase`, workbase);

  const timestamp = Timestamp.now();

  // console.log(`astMeter`);
  const {
    data: trns,
    isLoading,
    isError,
    isFetching,
  } = useGetTrnsQuery(workbase);
  // console.log(`trns?.length`, trns?.length);
  // console.log(`useTrns isError`, isError);

  const accessTrns = trns?.filter((trn) => trn?.access?.meterAccess === "yes");
  // console.log(`accessTrns?.length`, accessTrns?.length);

  const noAccessTrns = trns?.filter((trn) => trn?.access?.meterAccess === "no");
  // console.log(`noAccessTrns?.length`, noAccessTrns?.length);

  // const [filteredTrns, setFilteredTrns] = useState();
  const [activeTrns, setActiveTrns] = useState(); // Active trns are the one currently on display
  // console.log(`activeTrns`, activeTrns);

  const [activeTrnsName, setActiveTrnsName] = useState();
  // console.log(`activeTrnsName`, activeTrnsName);

  useEffect(() => {
    setActiveTrns(trns); // Default to the first 10 trns
    setActiveTrnsName("trns");
  }, [trns, workbase]);

  const filterTrns = (trns, filterArray) => {
    // console.log(`trns`, trns);
    // console.log(
    //   `filterTrns running ------------------------------------filterArray `,
    //   filterArray
    // );
    if (!filterArray) return trns;

    let filterResult = [];

    // filterArray.forEach((item) => {
    // console.log(`Running loop for item iiiiiiiiiiiiiiiiiiiiiiiiii`, item);
    // extract key and value from item
    // const { key, value } = item;
    // console.log(`filterTrns key`, key);
    // console.log(`filterTrns value`, value);

    // if (key === "ward") {
    // 	filterResult = trns.filter((erf) => erf.address.ward === value);
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
    const typeFilter = filterArray.find((item) => {
      return (
        item.value !== null && item.value !== undefined && item.value !== ""
      );
    });
    // console.log(`typeFilter`, typeFilter);

    let key = typeFilter?.key;
    if (filterKeyRef) {
      filterKeyRef.current = key;
    }
    // console.log(`filterTrns propertyTypeFilter key`, key);
    let value = "";

    if (key === "propertyType") {
      value = filterObject[key];
      if (filterValueRef) {
        filterValueRef.current = value;
      }
      // console.log(`filterTrns propertyType key`, key);
      // console.log(`filterTrns propertyType value`, value);
      // Filter by propertyType
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = trns.filter(
          (trn) => trn?.ast?.erf?.propertyType?.type?.trim() === value?.trim()
        );
      }
      // console.log(`filterResult after propertyType`, filterResult?.length);
    }
    // console.log(`filterTrns propertyTypeFilter`, propertyTypeFilter);

    if (key === "noAccessReasons") {
      value = filterObject[key];
      if (filterValueRef) {
        filterValueRef.current = value;
      }
      // console.log(`filterTrns noAccess key`, key);
      // console.log(`filterTrns noAccess value`, value);

      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = trns.filter(
          (trn) => trn?.access?.noAccessReason?.trim() === value?.trim()
        );
      }

      // console.log(`filterResult after nnnnnn noAccess`, filterResult?.length);
    }

    if (key === "trnType") {
      value = filterObject[key];
      if (filterValueRef) {
        filterValueRef.current = value;
      }
      // console.log(`filterTrns noAccess key`, key);
      // console.log(`filterTrns noAccess value`, value);

      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = trns.filter(
          (trn) => trn?.metadata?.trnType?.trim() === value?.trim()
        );
      }

      // console.log(`filterResult after nnnnnn noAccess`, filterResult?.length);
    }

    if (key === "trnState") {
      value = filterObject[key];
      if (filterValueRef) {
        filterValueRef.current = value;
      }
      // console.log(`filterTrns noAccess key`, key);
      // console.log(`filterTrns noAccess value`, value);

      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = trns.filter(
          (trn) => trn?.metadata?.trnState?.trim() === value?.trim()
        );
      }

      // console.log(`filterResult after nnnnnn noAccess`, filterResult?.length);
    }

    if (key === "wards") {
      value = filterObject[key];
      if (filterValueRef) {
        filterValueRef.current = value;
      }
      // console.log(`filterTrns wards key`, key);
      // console.log(`filterTrns wards value`, value);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = trns.filter(
          (trn) => trn?.ast?.erf?.address?.ward?.trim() === value?.trim()
        );
      }
      // console.log(`filterResult after wards`, filterResult?.);
    }

    if (key === "towns") {
      value = filterObject[key];
      if (filterValueRef) {
        filterValueRef.current = value;
      }
      // console.log(`filterTrns towns key`, key);
      // console.log(`filterTrns towns value`, value);
      if (value) {
        filterResult = trns.filter(
          (trn) => trn?.ast?.erf?.address?.town?.trim() === value?.trim()
        );
      }
      // console.log(`filterResult after towns`, filterResult?.length?.length);
    }

    if (key === "suburbTownships") {
      value = filterObject[key];
      if (filterValueRef) {
        filterValueRef.current = value;
      }
      // console.log(`filterTrns suburbTownships key`, key);
      // console.log(`filterTrns suburbTownships value`, value);
      // console.log(
      // 	`filterTrns suburbTownships filterResult?.length`,
      // 	filterResult?.length
      // );

      if (value) {
        filterResult = trns.filter(
          (trn) =>
            trn?.ast?.erf?.address?.suburbTownship?.trim() === value?.trim()
        );
      }
      // console.log(`filterResult after suburbTownships`, filterResult?.length);
    }

    if (key === "strNames") {
      value = filterObject[key];
      if (filterValueRef) {
        filterValueRef.current = value;
      }
      // console.log(`filterTrns strNames key`, key);
      // console.log(`filterTrns strNames value`, value);
      if (
        value &&
        value !== "undefined" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        filterResult = trns.filter(
          (trn) =>
            trn?.ast?.erf?.address?.streetAdr?.strName?.trim() === value?.trim()
        );
      }

      // console.log(`filterResult after strNames`, filterResult?.length);
    }

    return filterResult;
  };

  const access = {
    meterAccess: "", // ['yes', 'no']
    noAccessReason: "", //['', '', ''] - reuquired if access === 'no
  };

  const metadata = {
    createdAtDatetime: timestamp,
    createdByUser: user?.displayName,
    createdByUid: user?.uid,

    updatedAtDatetime: timestamp,
    updatedByUser: user?.displayName,
    updatedByUid: user?.uid,

    trnType: "",
    trnNo: "",
    trnState: "draft",
    irepsKeyItem: "trn",
  };

  const astMeter = {
    astData: {
      astId: uuid.v4(),
      astNo: "",
      astCatergory: "meter", // [ 'pole', 'box', 'meter', 'curcuit breaker', 'seal'],
      astState: {
        state: "state",
        id: "id",
        name: "name",
        comment: "comment",
      },
      astManufacturer: "",
      astName: "",
      meter: {
        phase: "", // ['single', 'three', ]
        type: "", // ['pre-paid', 'conventional']
        keypad: {
          serialNo: "",
          comment: "",
        },
        cb: {
          size: "",
          comment: "",
        },
        seal: {
          sealNo: "",
          comment: "",
        },
      },
    },
    location: {
      address: "123 Fiki Street", // ast exact or nearest address. 'gcBt'n used to collect data
      gps: {
        lat: "1234", // long - Required
        lng: "5678", // long - Required
      },
      placement: "", // ['Pole Top', 'Pole Bottom', 'Kiosk', 'Meter Room', 'Indoors', 'Boundary Wall (Outside)', 'Boundary Wall (Inside)', House Wall] - Required
      premises: "", // ['inside', 'outside'] - Required
      insideBox: "", // ['yes', 'no'] - Required
    },
    anomalies: {
      anomaly: "", // ['', '', '', '', '', ''] - required
      anomalyDetail: "", // ['', '', '', '', '', ''] - required based on 'anomaly'
    },
    erf: {
      erfNo: "",
      erfId: "",
      address: "",
      propertyType: {},
    },
    serviceConnection: {
      status: "", // ['connected','disconnected', 'incomplete', 'no service connection']
      comment: "", // ['','','',]
      offGridSupply: "", //['yes','no',]
    },
    // tidStatus: {
    //   status: "",
    //   statusComment: "",
    // },
    // astSp: {
    //   id: "",
    //   name: "",
    // },
  };

  const trnsNewFormData = useMemo(
    () => ({
      meter: {
        checkInInit: {
          access,
          metadata: {
            ...metadata,
            trnType: "checkInInit",
          },
          ast: astMeter,
        },
        audit: {
          access,
          metadata: {
            ...metadata,
            trnType: "audit",
            trnId: "",
            astId: "",
            erfId: "",
            newTrn: true,
          },
          ast: {
            ...astMeter,
            normalisation: {
              actionTaken: "none", //['none','Disconnected', 'Existing Uninstalled', 'Existing Uninstalled and New Installed']
              comment: "",
              newInstallation: "",
            },
          },
        },
        inspection: {
          access,
          instructions: {
            instruction: "choose",
          },
          metadata: {
            ...metadata,
            trnType: "inspection",
            newTrn: true,
          },
          ast: {
            ...astMeter,
            normalisation: {
              actionTaken: "choose", //['none','Disconnected', 'Existing Uninstalled', 'Existing Uninstalled and New Installed']
              comment: "",
              newInstallation: "",
            },
          },
        },
        installation: {
          access,
          metadata: {
            ...metadata,
            trnType: "installation",
          },
          ast: astMeter,
        },
        grv: {
          access: {
            meterAccess: "yes", // ['yes', 'no']
            noAccessReason: "", //['', '', ''] - reuquired if access === 'no
          },
          metadata: {
            ...metadata,
            trnType: "grv",
          },
          ast: {
            ...astMeter,
            astData: {
              ...astMeter.astData,
              astState: {
                ...astMeter.astData.astState,
                state: "stores",
              },
            },
          },
        },
        checkOutInit: {
          access: {
            meterAccess: "yes", // ['yes', 'no']
            noAccessReason: "", //['', '', ''] - reuquired if access === 'no
          },
          metadata: {
            updatedAtDatetime: Timestamp.now(),
            updatedByUser: user?.displayName,
            updatedByUid: user?.uid,
            createdAtDatetime: Timestamp.now(),
            createdByUser: user?.displayName,
            createdByUid: user?.uid,
            trnHistory: 0, // how many times transaction has been updated
            trnType: "checkOutInit", //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit', grv]
            trnNo: "",
            // trnId: uuid.v4(),
            trnState: "draft",
          },
        },
      },
    }),
    []
  );

  const accessValidationSchema = object().shape({
    meterAccess: string()
      .required("Required")
      .notOneOf(["choose", ""], "Required"),
    noAccessReason: string().when("meterAccess", (meterAccess, schema) => {
      if (meterAccess[0] === "no") {
        return schema
          ?.required("Required")
          ?.notOneOf(["choose", ""], "Required");
      }
      if (meterAccess[0] === "yes") {
        return schema.notRequired();
      }
    }),
  });

  const metadataValidatiomSchema = lazy((v, { context }) => {
    return object().shape({
      // updatedAtDatetime: date().notRequired(),
      updatedByUser: string().when("meterAccess", (meterAccess, schema) => {
        if (meterAccess[0] === "no") {
          return schema.notRequired();
        }
        if (meterAccess[0] === "yes") {
          return schema?.required("Required");
        }
      }),
      updatedByUid: string().when("meterAccess", (meterAccess, schema) => {
        if (meterAccess[0] === "no") {
          return schema.notRequired();
        }
        if (meterAccess[0] === "yes") {
          return schema?.required("Required");
        }
      }),
      // createdAtDatetime: date().notRequired(),
      createdByUser: string().when("meterAccess", (meterAccess, schema) => {
        if (meterAccess[0] === "no") {
          return schema.notRequired();
        }
        if (meterAccess[0] === "yes") {
          return schema?.required("Required");
        }
      }),
      createdByUid: string().when("meterAccess", (meterAccess, schema) => {
        if (meterAccess[0] === "no") {
          return schema.notRequired();
        }
        if (meterAccess[0] === "yes") {
          return schema?.required("Required");
        }
      }),
      // trnHistory: number().required("Required"), // how many times transaction has been updated
      trnType: string().when("meterAccess", (meterAccess, schema) => {
        if (meterAccess[0] === "no") {
          return schema.notRequired();
        }
        if (meterAccess[0] === "yes") {
          return schema?.required("Required");
        }
      }),
      // trnNo: string().required("Required"),
      // trnId: string().required("Required"),
      // trnState: string().required("Required"),
    });
  });

  const normalisationValidatiomSchema = lazy((v, { context }) => {
    return object().shape({
      // updatedAtDatetime: date().notRequired(),
      actionTaken: string().when("meterAccess", (meterAccess, schema) => {
        if (meterAccess[0] === "no") {
          return schema.notRequired();
        }
        if (meterAccess[0] === "yes") {
          return schema?.required("Required");
        }
      }),
      comment: string().notRequired(),
      newInstallation: string().when("meterAccess", (meterAccess, schema) => {
        const { actionTaken } = context?.ast?.normalisation;
        // console.log(`Context comment:`, comment);
        if (meterAccess[0] === "no") {
          return schema.notRequired();
        }
        if (
          meterAccess[0] === "yes" &&
          actionTaken === "Existing Uninstalled and New Installed"
        ) {
          return schema?.required("Required");
        } else return schema;
      }),
    });
  });

  const astValidationSchema = object().shape({
    astData: lazy((v, { context }) => {
      return object().shape({
        astId: string().when("meterAccess", (meterAccess_, schema) => {
          const { meterAccess } = context.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (meterAccess === "yes") {
            return schema.required("Required");
          } else return schema;
        }),
        astNo: string().when("meterAccess", (meterAccess_, schema) => {
          const { meterAccess } = context.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (meterAccess === "yes") {
            return schema.required("Required");
          } else return schema;
        }),
        astCatergory: string().when("meterAccess", (meterAccess_, schema) => {
          const { meterAccess } = context.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (meterAccess === "yes") {
            return schema.required("Required");
          } else return schema;
        }),
        astState: object().shape({
          id: string().when("meterAccess", (meterAccess_, schema) => {
            const { meterAccess } = context.access;
            if (meterAccess === "no") {
              return schema.notRequired();
            }
            if (meterAccess === "yes") {
              return schema.required("Required");
            } else return schema;
          }),
          name: string().when("meterAccess", (meterAccess_, schema) => {
            const { meterAccess } = context.access;
            if (meterAccess === "no") {
              return schema.notRequired();
            }
            if (meterAccess === "yes") {
              return schema.required("Required");
            } else return schema;
          }),
          state: string().when("meterAccess", (meterAccess_, schema) => {
            const { meterAccess } = context.access;
            if (meterAccess === "no") {
              return schema.notRequired();
            }
            if (meterAccess === "yes") {
              return schema.required("Required");
            } else return schema;
          }),
          comment: string().notRequired(),
        }),
        astManufacturer: string().when(
          "meterAccess",
          (meterAccess_, schema) => {
            const { meterAccess } = context.access;
            if (meterAccess === "no") {
              return schema.notRequired();
            }
            if (meterAccess === "yes") {
              return schema.required("Required");
            } else return schema;
          }
        ),
        astName: string().when("meterAccess", (meterAccess_, schema) => {
          const { meterAccess } = context.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (meterAccess === "yes") {
            return schema.required("Required");
          } else return schema;
        }),
        meter: object().shape({
          phase: string().when("meterAccess", (meterAccess_, schema) => {
            const { meterAccess } = context.access;
            if (meterAccess === "no") {
              return schema.notRequired();
            }
            if (meterAccess === "yes") {
              return schema.required("Required");
            } else return schema;
          }),
          type: string().when("meterAccess", (meterAccess_, schema) => {
            const { meterAccess } = context.access;
            if (meterAccess === "no") {
              return schema.notRequired();
            }
            if (meterAccess === "yes") {
              return schema.required("Required");
            } else return schema;
          }),
          keypad: object().shape({
            serialNo: string().when("meterAccess", (meterAccess_, schema) => {
              // console.log(
              //   `Installation validation schema context`,
              //   JSON.stringify(context, null, 2)
              // );
              const { comment } = context?.ast?.astData?.meter?.keypad;
              // console.log(`Context comment:`, comment);
              const { meterAccess } = context.access;
              if (meterAccess === "no") {
                return schema.notRequired();
              }
              if (meterAccess === "yes") {
                if (
                  !comment ||
                  comment === "" ||
                  comment === "choose" ||
                  comment === "undefined" ||
                  comment === undefined
                ) {
                  return schema.required("Required");
                } else {
                  return schema.notRequired();
                }
              } else return schema;
            }),
            comment: string().when("meterAccess", (meterAccess_, schema) => {
              // console.log(
              //   `Installation validation schema context`,
              //   JSON.stringify(context, null, 2)
              // );
              const { serialNo } = context?.ast?.astData?.meter?.keypad;
              // console.log(`Context comment:`, comment);
              const { meterAccess } = context.access;
              if (meterAccess === "no") {
                return schema.notRequired();
              }
              if (meterAccess === "yes" && serialNo) {
                return schema.oneOf(["choose"], "Not Required");
              } else return schema;
            }),
          }),
          cb: object().shape({
            size: string().when("meterAccess", (meterAccess_, schema) => {
              // console.log(
              //   `Installation validation schema context`,
              //   JSON.stringify(context, null, 2)
              // );
              const { comment } = context?.ast?.astData?.meter?.cb;
              // console.log(`Context comment:`, comment);
              const { meterAccess } = context.access;
              if (meterAccess === "no") {
                return schema.notRequired();
              }
              if (meterAccess === "yes") {
                if (
                  !comment ||
                  comment === "" ||
                  comment === "choose" ||
                  comment === "undefined" ||
                  comment === undefined
                ) {
                  return schema
                    .required("Required")
                    .matches(/^[0-9]*$/, "Only Numbers");
                } else {
                  return schema.notRequired();
                }
              } else return schema;
            }),
            comment: string().when("meterAccess", (meterAccess_, schema) => {
              // console.log(
              //   `Installation validation schema context`,
              //   JSON.stringify(context, null, 2)
              // );
              const { size } = context?.ast?.astData?.meter?.cb;
              // console.log(`Context comment:`, comment);
              const { meterAccess } = context.access;
              if (meterAccess === "no") {
                return schema.notRequired();
              }
              if (meterAccess === "yes" && size) {
                return schema.oneOf(["choose"], "Not Required");
              } else return schema;
            }),
          }),
          seal: object().shape({
            sealNo: string().when("meterAccess", (meterAccess_, schema) => {
              // console.log(
              //   `Installation validation schema context`,
              //   JSON.stringify(context, null, 2)
              // );
              const { comment } = context?.ast?.astData?.meter?.seal;
              // console.log(`Context comment:`, comment);
              const { meterAccess } = context.access;
              if (meterAccess === "no") {
                return schema.notRequired();
              }
              if (meterAccess === "yes") {
                if (
                  !comment ||
                  comment === "" ||
                  comment === "choose" ||
                  comment === "undefined" ||
                  comment === undefined
                ) {
                  return schema.required("Required");
                } else {
                  return schema.notRequired();
                }
              } else return schema;
            }),
            comment: string().when("meterAccess", (meterAccess_, schema) => {
              // console.log(
              //   `Installation validation schema context`,
              //   JSON.stringify(context, null, 2)
              // );
              const { sealNo } = context?.ast?.astData?.meter?.seal;
              // console.log(`Context comment:`, comment);
              const { meterAccess } = context.access;
              if (meterAccess === "no") {
                return schema.notRequired();
              }
              if (meterAccess === "yes" && sealNo) {
                return schema.oneOf(["choose"], "Not Required");
              } else return schema;
            }),
          }),
        }),
      });
    }),
    location: lazy((v, { context }) => {
      return object().shape({
        address: string().when("meterAccess", (meterAccess_, schema) => {
          const { meterAccess } = context.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (meterAccess === "yes") {
            return schema.required("Required");
          } else {
            return schema;
          }
        }),
        gps: object().shape({
          lat: number().when("meterAccess", (meterAccess_, schema) => {
            const { meterAccess } = context.access;
            if (meterAccess === "no") {
              return schema.notRequired();
            }
            if (meterAccess === "yes") {
              return schema.required("Required");
            } else {
              return schema;
            }
          }),
          lng: number().when("meterAccess", (meterAccess_, schema) => {
            const { meterAccess } = context.access;
            if (meterAccess === "yes") {
              return schema.required("Required");
            } else {
              return schema.notRequired();
            }
          }),
        }),

        placement: string().when("meterAccess", (meterAccess_, schema) => {
          const { meterAccess } = context.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (meterAccess === "yes") {
            return schema.required("Required");
          } else {
            return schema;
          }
        }),
      });
    }),
    anomalies: lazy((v, { context }) => {
      return object().shape({
        anomaly: string().when("meterAccess", (meterAccess_, schema) => {
          const { meterAccess } = context.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (meterAccess === "yes") {
            return schema
              .required("Required")
              .notOneOf(["choose", ""], "Required");
          } else {
            return schema;
          }
        }),
        anomalyDetail: string().when("anomaly", (meterAccess_, schema) => {
          const { anomaly } = context?.ast?.anomalies;
          // console.log(`anomaly`, anomaly)
          // console.log(`meterAccess_`, meterAccess_);
          const { meterAccess } = context?.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (
            !anomaly ||
            anomaly === "" ||
            anomaly === "choose" ||
            anomaly === null ||
            anomaly === undefined
          ) {
            return schema.notRequired();
          } else {
            return schema.required("Required").notOneOf(["choose"], "Required");
          }
        }),
      });
    }),
    serviceConnection: lazy((v, { context }) => {
      return object().shape({
        status: string().when("meterAccess", (meterAccess_, schema) => {
          const { meterAccess } = context.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (meterAccess === "yes") {
            return schema
              .required("Required")

              .notOneOf(["choose", ""], "Required");
          } else {
            return schema;
          }
        }),
        comment: string().when("meterAccess", (meterAccess_, schema) => {
          // console.log(
          //   `Installation validation schema context`,
          //   JSON.stringify(context, null, 2)
          // );
          const { status } = context?.ast?.serviceConnection;
          // console.log(`Context comment:`, comment);
          const { meterAccess } = context.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (meterAccess === "yes" && status !== "choose" && status) {
            return schema
              .required("Required")
              .notOneOf(["", "choose"], "Required");
          } else return schema;
        }),

        offGridSupply: string().when("meterAccess", (meterAccess_, schema) => {
          const { meterAccess } = context.access;
          if (meterAccess === "no") {
            return schema.notRequired();
          }
          if (meterAccess === "yes") {
            return schema
              .required("Required")
              .oneOf(["yes", "no"], "Required")
              .notOneOf(["choose", ""], "Required");
          } else {
            return schema;
          }
        }),
      });
    }),
  });

  const trnsValidationSchema = useMemo(
    () => ({
      meter: {
        // checkin: object().shape({
        // 	astData: object().shape({
        // 		astNo: string().required("Required"),
        // 		astName: string().required("Required"),
        // 		astManufacturer: string().required("Required"),
        // 		astState: string().required("Required"),
        // 		meter: object().shape({
        // 			phase: string().required("Required"),
        // 			type: string().required("Required"),
        // 		}),
        // 	}),

        // 	location: object().shape({
        // 		address: string().required("Required"),
        // 		gps: object().shape({
        // 			lat: number().required("Required"),
        // 			lng: number().required("Required"),
        // 		}),
        // 	}),
        // 	// metadata: lazy((v, { context }) => {
        // 	// 	return object().shape({
        // 	// 		// updatedAtDatetime: date().notRequired(),
        // 	// 		updatedByUser: string().notRequired(),
        // 	// 		updatedByUid: string().notRequired(),
        // 	// 		// createdAtDatetime: date().notRequired(),
        // 	// 		createdByUser: string().notRequired(),
        // 	// 		createdByUid: string().notRequired(),
        // 	// 		trnHistory: number().notRequired(), // how many times transaction has been updated
        // 	// 		trnType: string().notRequired(), //['installation', 'commissioning', 'vending', 'missing', 'found', 'disconnection', 'reconnection', 'sale', 'decomissioning', "dispose", 'inspection', 'audit']
        // 	// 		trnNo: string().notRequired(),
        // 	// 		trnId: string().notRequired(),
        // 	// 		trnState: string().notRequired(),
        // 	// 	});
        // 	// }),
        // }),
        audit: object().shape({
          access: accessValidationSchema,
          metadata: metadataValidatiomSchema,
          ast: object().shape({
            astData: lazy((v, { context }) => {
              return object().shape({
                astId: string().when("meterAccess", (meterAccess_, schema) => {
                  const { meterAccess } = context.access;
                  if (meterAccess === "no") {
                    return schema.notRequired();
                  }
                  if (meterAccess === "yes") {
                    return schema.required("Required");
                  } else return schema;
                }),
                astNo: string().when("meterAccess", (meterAccess_, schema) => {
                  const { meterAccess } = context.access;
                  if (meterAccess === "no") {
                    return schema.notRequired();
                  }
                  if (meterAccess === "yes") {
                    return schema.required("Required");
                  } else return schema;
                }),
                astCatergory: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }
                ),
                astState: object().shape({
                  id: string().when("meterAccess", (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }),
                  name: string().when("meterAccess", (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }),
                  state: string().when(
                    "meterAccess",
                    (meterAccess_, schema) => {
                      const { meterAccess } = context.access;
                      if (meterAccess === "no") {
                        return schema.notRequired();
                      }
                      if (meterAccess === "yes") {
                        return schema.required("Required");
                      } else return schema;
                    }
                  ),
                  comment: string().notRequired(),
                }),
                astManufacturer: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }
                ),
                astName: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }
                ),
                meter: object().shape({
                  phase: string().when(
                    "meterAccess",
                    (meterAccess_, schema) => {
                      const { meterAccess } = context.access;
                      if (meterAccess === "no") {
                        return schema.notRequired();
                      }
                      if (meterAccess === "yes") {
                        return schema.required("Required");
                      } else return schema;
                    }
                  ),
                  type: string().when("meterAccess", (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }),
                  keypad: object().shape({
                    serialNo: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { comment } =
                          context?.ast?.astData?.meter?.keypad;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes") {
                          if (
                            !comment ||
                            comment === "" ||
                            comment === "choose" ||
                            comment === "undefined" ||
                            comment === undefined
                          ) {
                            return schema.required("Required");
                          } else {
                            return schema.notRequired();
                          }
                        } else return schema;
                      }
                    ),
                    comment: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { serialNo } =
                          context?.ast?.astData?.meter?.keypad;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes" && serialNo) {
                          return schema.oneOf(["choose"], "Not Required");
                        } else return schema;
                      }
                    ),
                  }),
                  cb: object().shape({
                    size: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { comment } = context?.ast?.astData?.meter?.cb;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes") {
                          if (
                            !comment ||
                            comment === "" ||
                            comment === "choose" ||
                            comment === "undefined" ||
                            comment === undefined
                          ) {
                            return schema
                              .required("Required")
                              .matches(/^[0-9]*$/, "Only Numbers");
                          } else {
                            return schema.notRequired();
                          }
                        } else return schema;
                      }
                    ),
                    comment: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { size } = context?.ast?.astData?.meter?.cb;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes" && size) {
                          return schema.oneOf(["choose"], "Not Required");
                        } else return schema;
                      }
                    ),
                  }),
                  seal: object().shape({
                    sealNo: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { comment } = context?.ast?.astData?.meter?.seal;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes") {
                          if (
                            !comment ||
                            comment === "" ||
                            comment === "choose" ||
                            comment === "undefined" ||
                            comment === undefined
                          ) {
                            return schema.required("Required");
                          } else {
                            return schema.notRequired();
                          }
                        } else return schema;
                      }
                    ),
                    comment: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { sealNo } = context?.ast?.astData?.meter?.seal;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes" && sealNo) {
                          return schema.oneOf(["choose"], "Not Required");
                        } else return schema;
                      }
                    ),
                  }),
                }),
              });
            }),
            location: lazy((v, { context }) => {
              return object().shape({
                address: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else {
                      return schema;
                    }
                  }
                ),
                gps: object().shape({
                  lat: number().when("meterAccess", (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else {
                      return schema;
                    }
                  }),
                  lng: number().when("meterAccess", (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else {
                      return schema.notRequired();
                    }
                  }),
                }),

                placement: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else {
                      return schema;
                    }
                  }
                ),
              });
            }),
            anomalies: lazy((v, { context }) => {
              return object().shape({
                anomaly: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema
                        .required("Required")
                        .notOneOf(["choose", ""], "Required");
                    } else {
                      return schema;
                    }
                  }
                ),
                anomalyDetail: string().when(
                  "anomaly",
                  (meterAccess_, schema) => {
                    const { anomaly } = context?.ast?.anomalies;
                    // console.log(`anomaly`, anomaly)
                    // console.log(`meterAccess_`, meterAccess_);
                    const { meterAccess } = context?.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (
                      !anomaly ||
                      anomaly === "" ||
                      anomaly === "choose" ||
                      anomaly === null ||
                      anomaly === undefined
                    ) {
                      return schema.notRequired();
                    } else {
                      return schema
                        .required("Required")
                        .notOneOf(["choose"], "Required");
                    }
                  }
                ),
              });
            }),
            serviceConnection: lazy((v, { context }) => {
              return object().shape({
                status: string().when("meterAccess", (meterAccess_, schema) => {
                  const { meterAccess } = context.access;
                  if (meterAccess === "no") {
                    return schema.notRequired();
                  }
                  if (meterAccess === "yes") {
                    return schema
                      .required("Required")

                      .notOneOf(["choose", ""], "Required");
                  } else {
                    return schema;
                  }
                }),
                comment: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    // console.log(
                    //   `Installation validation schema context`,
                    //   JSON.stringify(context, null, 2)
                    // );
                    const { status } = context?.ast?.serviceConnection;
                    // console.log(`Context comment:`, comment);
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (
                      meterAccess === "yes" &&
                      status !== "choose" &&
                      status
                    ) {
                      return schema
                        .required("Required")
                        .notOneOf(["", "choose"], "Required");
                    } else return schema;
                  }
                ),

                offGridSupply: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema
                        .required("Required")
                        .oneOf(["yes", "no"], "Required")
                        .notOneOf(["choose", ""], "Required");
                    } else {
                      return schema;
                    }
                  }
                ),
              });
            }),
            normalisation: normalisationValidatiomSchema,
          }),
        }),
        inspection: object().shape({
          access: accessValidationSchema,
          instructions: object().shape({
            instruction: string()
              .required("Required")
              .notOneOf(["choose", ""], "Required"),
          }),

          metadata: metadataValidatiomSchema,
          ast: object().shape({
            astData: lazy((v, { context }) => {
              return object().shape({
                astId: string().when("meterAccess", (meterAccess_, schema) => {
                  const { meterAccess } = context.access;
                  if (meterAccess === "no") {
                    return schema.notRequired();
                  }
                  if (meterAccess === "yes") {
                    return schema.required("Required");
                  } else return schema;
                }),
                astNo: string().when("meterAccess", (meterAccess_, schema) => {
                  const { meterAccess } = context.access;
                  if (meterAccess === "no") {
                    return schema.notRequired();
                  }
                  if (meterAccess === "yes") {
                    return schema.required("Required");
                  } else return schema;
                }),
                astCatergory: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }
                ),
                astState: object().shape({
                  id: string().when("meterAccess", (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }),
                  name: string().when("meterAccess", (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }),
                  state: string().when(
                    "meterAccess",
                    (meterAccess_, schema) => {
                      const { meterAccess } = context.access;
                      if (meterAccess === "no") {
                        return schema.notRequired();
                      }
                      if (meterAccess === "yes") {
                        return schema.required("Required");
                      } else return schema;
                    }
                  ),
                  comment: string().notRequired(),
                }),
                astManufacturer: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }
                ),
                astName: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }
                ),
                meter: object().shape({
                  phase: string().when(
                    "meterAccess",
                    (meterAccess_, schema) => {
                      const { meterAccess } = context.access;
                      if (meterAccess === "no") {
                        return schema.notRequired();
                      }
                      if (meterAccess === "yes") {
                        return schema.required("Required");
                      } else return schema;
                    }
                  ),
                  type: string().when("meterAccess", (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else return schema;
                  }),
                  keypad: object().shape({
                    serialNo: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { comment } =
                          context?.ast?.astData?.meter?.keypad;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes") {
                          if (
                            !comment ||
                            comment === "" ||
                            comment === "choose" ||
                            comment === "undefined" ||
                            comment === undefined
                          ) {
                            return schema.required("Required");
                          } else {
                            return schema.notRequired();
                          }
                        } else return schema;
                      }
                    ),
                    comment: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { serialNo } =
                          context?.ast?.astData?.meter?.keypad;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes" && serialNo) {
                          return schema.oneOf(["choose"], "Not Required");
                        } else return schema;
                      }
                    ),
                  }),
                  cb: object().shape({
                    size: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { comment } = context?.ast?.astData?.meter?.cb;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes") {
                          if (
                            !comment ||
                            comment === "" ||
                            comment === "choose" ||
                            comment === "undefined" ||
                            comment === undefined
                          ) {
                            return schema
                              .required("Required")
                              .matches(/^[0-9]*$/, "Only Numbers");
                          } else {
                            return schema.notRequired();
                          }
                        } else return schema;
                      }
                    ),
                    comment: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { size } = context?.ast?.astData?.meter?.cb;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes" && size) {
                          return schema.oneOf(["choose"], "Not Required");
                        } else return schema;
                      }
                    ),
                  }),
                  seal: object().shape({
                    sealNo: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { comment } = context?.ast?.astData?.meter?.seal;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes") {
                          if (
                            !comment ||
                            comment === "" ||
                            comment === "choose" ||
                            comment === "undefined" ||
                            comment === undefined
                          ) {
                            return schema.required("Required");
                          } else {
                            return schema.notRequired();
                          }
                        } else return schema;
                      }
                    ),
                    comment: string().when(
                      "meterAccess",
                      (meterAccess_, schema) => {
                        // console.log(
                        //   `Installation validation schema context`,
                        //   JSON.stringify(context, null, 2)
                        // );
                        const { sealNo } = context?.ast?.astData?.meter?.seal;
                        // console.log(`Context comment:`, comment);
                        const { meterAccess } = context.access;
                        if (meterAccess === "no") {
                          return schema.notRequired();
                        }
                        if (meterAccess === "yes" && sealNo) {
                          return schema.oneOf(["choose"], "Not Required");
                        } else return schema;
                      }
                    ),
                  }),
                }),
              });
            }),
            location: lazy((v, { context }) => {
              return object().shape({
                address: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else {
                      return schema;
                    }
                  }
                ),
                gps: object().shape({
                  lat: number().when("meterAccess", (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else {
                      return schema;
                    }
                  }),
                  lng: number().when("meterAccess", (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else {
                      return schema.notRequired();
                    }
                  }),
                }),

                placement: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema.required("Required");
                    } else {
                      return schema;
                    }
                  }
                ),
              });
            }),
            anomalies: lazy((v, { context }) => {
              return object().shape({
                anomaly: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema
                        .required("Required")
                        .notOneOf(["choose", ""], "Required");
                    } else {
                      return schema;
                    }
                  }
                ),
                anomalyDetail: string().when(
                  "anomaly",
                  (meterAccess_, schema) => {
                    const { anomaly } = context?.ast?.anomalies;
                    // console.log(`anomaly`, anomaly)
                    // console.log(`meterAccess_`, meterAccess_);
                    const { meterAccess } = context?.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (
                      !anomaly ||
                      anomaly === "" ||
                      anomaly === "choose" ||
                      anomaly === null ||
                      anomaly === undefined
                    ) {
                      return schema.notRequired();
                    } else {
                      return schema
                        .required("Required")
                        .notOneOf(["choose"], "Required");
                    }
                  }
                ),
              });
            }),
            serviceConnection: lazy((v, { context }) => {
              return object().shape({
                status: string().when("meterAccess", (meterAccess_, schema) => {
                  const { meterAccess } = context.access;
                  if (meterAccess === "no") {
                    return schema.notRequired();
                  }
                  if (meterAccess === "yes") {
                    return schema
                      .required("Required")

                      .notOneOf(["choose", ""], "Required");
                  } else {
                    return schema;
                  }
                }),
                comment: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    // console.log(
                    //   `Installation validation schema context`,
                    //   JSON.stringify(context, null, 2)
                    // );
                    const { status } = context?.ast?.serviceConnection;
                    // console.log(`Context comment:`, comment);
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (
                      meterAccess === "yes" &&
                      status !== "choose" &&
                      status
                    ) {
                      return schema
                        .required("Required")
                        .notOneOf(["", "choose"], "Required");
                    } else return schema;
                  }
                ),

                offGridSupply: string().when(
                  "meterAccess",
                  (meterAccess_, schema) => {
                    const { meterAccess } = context.access;
                    if (meterAccess === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess === "yes") {
                      return schema
                        .required("Required")
                        .oneOf(["yes", "no"], "Required")
                        .notOneOf(["choose", ""], "Required");
                    } else {
                      return schema;
                    }
                  }
                ),
              });
            }),
            normalisation: lazy((v, { context }) => {
              return object().shape({
                // updatedAtDatetime: date().notRequired(),
                actionTaken: string().when(
                  "meterAccess",
                  (meterAccess, schema) => {
                    if (meterAccess[0] === "no") {
                      return schema.notRequired();
                    }
                    if (meterAccess[0] === "yes") {
                      return schema?.required("Required");
                    }
                  }
                ),
                comment: string().notRequired(),
                newInstallation: string().when(
                  "meterAccess",
                  (meterAccess, schema) => {
                    const { actionTaken } = context?.ast?.normalisation;
                    // console.log(`Context comment:`, comment);
                    if (meterAccess[0] === "no") {
                      return schema.notRequired();
                    }
                    if (
                      meterAccess[0] === "yes" &&
                      actionTaken === "Existing Uninstalled and New Installed"
                    ) {
                      return schema?.required("Required");
                    } else return schema;
                  }
                ),
              });
            }),
          }),
        }),
        installation: object().shape({
          access: accessValidationSchema,
          metadata: metadataValidatiomSchema,
          ast: astValidationSchema,
        }),
        grv: object().shape({
          access: object().shape({
            meterAccess: string().notRequired(),
            noAccessReason: string().notRequired(),
          }),
          metadata: object().shape({
            // createdAtDatetime: date().notRequired(),
            createdByUser: string().required("Required"),
            createdByUid: string().required("Required"),
            // updatedAtDatetime: date().notRequired(),
            updatedByUser: string().required("Required"),
            updatedByUid: string().required("Required"),
            trnType: string().required("Required"),
            trnState: string().required("Required"),
          }),
          ast: object().shape({
            astData: lazy((v, { context }) => {
              return object().shape({
                astId: string().required("Required"),
                astNo: string().required("Required"),
                astCatergory: string().required("Required"),
                astState: object().shape({
                  state: string().required("Required"),
                  location: string().notRequired(),
                }),
                astManufacturer: string().required("Required"),
                astName: string().required("Required"),
                meter: object().shape({
                  phase: string().required("Required"),
                  type: string().required("Required"),
                  keypad: object().shape({
                    serialNo: string().notRequired(),
                    comment: string().notRequired(),
                  }),
                  cb: object().shape({
                    size: string().notRequired(),
                    comment: string().notRequired(),
                  }),
                  seal: object().shape({
                    sealNo: string().notRequired(),
                    comment: string().notRequired(),
                  }),
                }),
              });
            }),
            location: lazy((v, { context }) => {
              return object().shape({
                address: string().notRequired(),
                gps: object().shape({
                  lat: number().notRequired(),
                  lng: number().notRequired(),
                }),
                placement: string().notRequired(),
                premises: string().notRequired(),
                insideBox: string().notRequired(),
              });
            }),
            anomalies: lazy((v, { context }) => {
              return object().shape({
                anomaly: string().notRequired(),
                anomalyDetail: string().notRequired(),
              });
            }),
            // erf: lazy((v, { context }) => {
            //   return object().shape({
            //     erfNo: string().notRequired(),
            //     erfId: string().notRequired(),
            //     address: string().notRequired(),
            //     propertyType: string().notRequired(),
            //   });
            // }),
            serviceConnection: lazy((v, { context }) => {
              return object().shape({
                configuration: string().notRequired(),
                offGridSupply: string().notRequired(),
              });
            }),
            tidStatus: lazy((v, { context }) => {
              return object().shape({
                status: string().notRequired(),
                statusComment: string().notRequired(),
              });
            }),
            // astSp: lazy((v, { context }) => {
            //   return object().shape({
            //     id: string().notRequired(),
            //     name: string().notRequired(),
            //   });
            // }),
          }),
        }),
        checkOutInit: object().shape({
          access: object().shape({
            meterAccess: string().notRequired(),
            noAccessReason: string().notRequired(),
          }),
          metadata: object().shape({
            // createdAtDatetime: date().notRequired(),
            createdByUser: string().required("Required"),
            createdByUid: string().required("Required"),
            // updatedAtDatetime: date().notRequired(),
            updatedByUser: string().required("Required"),
            updatedByUid: string().required("Required"),
            trnType: string().required("Required"),
            trnState: string().required("Required"),
          }),
          ast: object().shape({
            astData: object().shape({
              astId: string().required("Required"),
              astNo: string().required("Required"),
              astCatergory: string().required("Required"),
              astState: object().shape({
                id: string().required("Required"),
                name: string().required("Required"),
                state: string().required("Required"),
                comment: string().notRequired(),
              }),
              astManufacturer: string().notRequired(),
              astName: string().notRequired(),
              meter: object().shape({
                phase: string().notRequired(),
                type: string().notRequired(),
                keypad: object().shape({
                  serialNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
                cb: object().shape({
                  size: string().notRequired(),
                  comment: string().notRequired(),
                }),
                seal: object().shape({
                  sealNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
              }),
            }),
            // location: lazy((v, { context }) => {
            //   return object().shape({
            //     address: string().notRequired(),
            //     gps: object().shape({
            //       lat: number().notRequired(),
            //       lng: number().notRequired(),
            //     }),
            //     placement: string().notRequired(),
            //     premises: string().notRequired(),
            //     insideBox: string().notRequired(),
            //   });
            // }),
            // anomalies: lazy((v, { context }) => {
            //   return object().shape({
            //     anomaly: string().notRequired(),
            //     anomalyDetail: string().notRequired(),
            //   });
            // }),
            // erf: lazy((v, { context }) => {
            //   return object().shape({
            //     erfNo: string().notRequired(),
            //     erfId: string().notRequired(),
            //     address: string().notRequired(),
            //     propertyType: string().notRequired(),
            //   });
            // }),
            // serviceConnection: lazy((v, { context }) => {
            //   return object().shape({
            //     configuration: string().notRequired(),
            //     offGridSupply: string().notRequired(),
            //   });
            // }),
            // tidStatus: lazy((v, { context }) => {
            //   return object().shape({
            //     status: string().notRequired(),
            //     statusComment: string().notRequired(),
            //   });
            // }),
            // astSp: lazy((v, { context }) => {
            //   return object().shape({
            //     id: string().required("Required"),
            //     name: string().required("Required"),
            //   });
            // }),
          }),
        }),
        checkOutConfirm: object().shape({
          access: object().shape({
            meterAccess: string().notRequired(),
            noAccessReason: string().notRequired(),
          }),
          metadata: object().shape({
            // createdAtDatetime: date().notRequired(),
            createdByUser: string().required("Required"),
            createdByUid: string().required("Required"),
            // updatedAtDatetime: date().notRequired(),
            updatedByUser: string().required("Required"),
            updatedByUid: string().required("Required"),
            trnType: string().required("Required"),
            trnState: string().required("Required"),
          }),
          ast: object().shape({
            astData: object().shape({
              astId: string().required("Required"),
              astNo: string().required("Required"),
              astCatergory: string().required("Required"),
              astState: object().shape({
                id: string().required("Required"),
                name: string().required("Required"),
                state: string().required("Required"),
                comment: string().required("Required"),
              }),
              astManufacturer: string().notRequired(),
              astName: string().notRequired(),
              meter: object().shape({
                phase: string().notRequired(),
                type: string().notRequired(),
                keypad: object().shape({
                  serialNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
                cb: object().shape({
                  size: string().notRequired(),
                  comment: string().notRequired(),
                }),
                seal: object().shape({
                  sealNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
              }),
            }),
          }),
        }),
        commission: object().shape({
          access: object().shape({
            meterAccess: string().notRequired(),
            noAccessReason: string().notRequired(),
          }),
          metadata: object().shape({
            // createdAtDatetime: date().notRequired(),
            createdByUser: string().required("Required"),
            createdByUid: string().required("Required"),
            // updatedAtDatetime: date().notRequired(),
            updatedByUser: string().required("Required"),
            updatedByUid: string().required("Required"),
            trnType: string().required("Required"),
            trnState: string().required("Required"),
          }),
          ast: object().shape({
            astData: object().shape({
              astId: string().required("Required"),
              astNo: string().required("Required"),
              astCatergory: string().required("Required"),
              astState: object().shape({
                id: string().required("Required"),
                name: string().required("Required"),
                state: string().required("Required"),
                comment: string()
                  .required("Required")
                  ?.notOneOf(["choose", ""], "Required"),
              }),
              astManufacturer: string().notRequired(),
              astName: string().notRequired(),
              meter: object().shape({
                phase: string().notRequired(),
                type: string().notRequired(),
                keypad: object().shape({
                  serialNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
                cb: object().shape({
                  size: string().notRequired(),
                  comment: string().notRequired(),
                }),
                seal: object().shape({
                  sealNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
              }),
            }),
          }),
        }),
        disconnection: object().shape({
          access: object().shape({
            meterAccess: string().notRequired(),
            noAccessReason: string().notRequired(),
          }),
          metadata: object().shape({
            // createdAtDatetime: date().notRequired(),
            createdByUser: string().required("Required"),
            createdByUid: string().required("Required"),
            // updatedAtDatetime: date().notRequired(),
            updatedByUser: string().required("Required"),
            updatedByUid: string().required("Required"),
            trnType: string().required("Required"),
            trnState: string().required("Required"),
          }),
          ast: object().shape({
            astData: object().shape({
              astId: string().required("Required"),
              astNo: string().required("Required"),
              astCatergory: string().required("Required"),
              astState: object().shape({
                id: string().required("Required"),
                name: string().required("Required"),
                state: string().required("Required"),
                comment: string()
                  .required("Required")
                  ?.notOneOf(["choose", ""], "Required"),
              }),
              astManufacturer: string().notRequired(),
              astName: string().notRequired(),
              meter: object().shape({
                phase: string().notRequired(),
                type: string().notRequired(),
                keypad: object().shape({
                  serialNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
                cb: object().shape({
                  size: string().notRequired(),
                  comment: string().notRequired(),
                }),
                seal: object().shape({
                  sealNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
              }),
            }),
          }),
        }),
        reconnection: object().shape({
          access: object().shape({
            meterAccess: string().notRequired(),
            noAccessReason: string().notRequired(),
          }),
          metadata: object().shape({
            // createdAtDatetime: date().notRequired(),
            createdByUser: string().required("Required"),
            createdByUid: string().required("Required"),
            // updatedAtDatetime: date().notRequired(),
            updatedByUser: string().required("Required"),
            updatedByUid: string().required("Required"),
            trnType: string().required("Required"),
            trnState: string().required("Required"),
          }),
          ast: object().shape({
            astData: object().shape({
              astId: string().required("Required"),
              astNo: string().required("Required"),
              astCatergory: string().required("Required"),
              astState: object().shape({
                id: string().required("Required"),
                name: string().required("Required"),
                state: string().required("Required"),
                comment: string().notRequired(),
              }),
              astManufacturer: string().notRequired(),
              astName: string().notRequired(),
              meter: object().shape({
                phase: string().notRequired(),
                type: string().notRequired(),
                keypad: object().shape({
                  serialNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
                cb: object().shape({
                  size: string().notRequired(),
                  comment: string().notRequired(),
                }),
                seal: object().shape({
                  sealNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
              }),
            }),
          }),
        }),
        uninstall: object().shape({
          access: object().shape({
            meterAccess: string().notRequired(),
            noAccessReason: string().notRequired(),
          }),
          metadata: object().shape({
            // createdAtDatetime: date().notRequired(),
            createdByUser: string().required("Required"),
            createdByUid: string().required("Required"),
            // updatedAtDatetime: date().notRequired(),
            updatedByUser: string().required("Required"),
            updatedByUid: string().required("Required"),
            trnType: string().required("Required"),
            trnState: string().required("Required"),
          }),
          ast: object().shape({
            astData: object().shape({
              astId: string().required("Required"),
              astNo: string().required("Required"),
              astCatergory: string().required("Required"),
              astState: object().shape({
                id: string().required("Required"),
                name: string().required("Required"),
                state: string().required("Required"),
                comment: string()
                  .required("Required")
                  ?.notOneOf(["choose", ""], "Required"),
              }),
              astManufacturer: string().notRequired(),
              astName: string().notRequired(),
              meter: object().shape({
                phase: string().notRequired(),
                type: string().notRequired(),
                keypad: object().shape({
                  serialNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
                cb: object().shape({
                  size: string().notRequired(),
                  comment: string().notRequired(),
                }),
                seal: object().shape({
                  sealNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
              }),
            }),
          }),
        }),
        lost: object().shape({
          access: object().shape({
            meterAccess: string().notRequired(),
            noAccessReason: string().notRequired(),
          }),
          metadata: object().shape({
            // createdAtDatetime: date().notRequired(),
            createdByUser: string().required("Required"),
            createdByUid: string().required("Required"),
            // updatedAtDatetime: date().notRequired(),
            updatedByUser: string().required("Required"),
            updatedByUid: string().required("Required"),
            trnType: string().required("Required"),
            trnState: string().required("Required"),
          }),
          ast: object().shape({
            astData: object().shape({
              astId: string().required("Required"),
              astNo: string().required("Required"),
              astCatergory: string().required("Required"),
              astState: object().shape({
                id: string().notRequired(),
                name: string().notRequired(),
                state: string().required("Required"),
                comment: string()
                  .required("Required")
                  ?.notOneOf(["choose", ""], "Required"),
              }),
              astManufacturer: string().notRequired(),
              astName: string().notRequired(),
              meter: object().shape({
                phase: string().notRequired(),
                type: string().notRequired(),
                keypad: object().shape({
                  serialNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
                cb: object().shape({
                  size: string().notRequired(),
                  comment: string().notRequired(),
                }),
                seal: object().shape({
                  sealNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
              }),
            }),
          }),
        }),
        found: object().shape({
          access: object().shape({
            meterAccess: string().notRequired(),
            noAccessReason: string().notRequired(),
          }),
          metadata: object().shape({
            // createdAtDatetime: date().notRequired(),
            createdByUser: string().required("Required"),
            createdByUid: string().required("Required"),
            // updatedAtDatetime: date().notRequired(),
            updatedByUser: string().required("Required"),
            updatedByUid: string().required("Required"),
            trnType: string().required("Required"),
            trnState: string().required("Required"),
          }),
          ast: object().shape({
            astData: object().shape({
              astId: string().required("Required"),
              astNo: string().required("Required"),
              astCatergory: string().required("Required"),
              astState: object().shape({
                id: string().notRequired(),
                name: string().notRequired(),
                state: string().required("Required"),
                comment: string()
                  .required("Required")
                  ?.notOneOf(["choose", ""], "Required"),
              }),
              astManufacturer: string().notRequired(),
              astName: string().notRequired(),
              meter: object().shape({
                phase: string().notRequired(),
                type: string().notRequired(),
                keypad: object().shape({
                  serialNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
                cb: object().shape({
                  size: string().notRequired(),
                  comment: string().notRequired(),
                }),
                seal: object().shape({
                  sealNo: string().notRequired(),
                  comment: string().notRequired(),
                }),
              }),
            }),
          }),
        }),
        vend: object().shape({
          access: object().shape({
            meterAccess: string().notRequired(),
            noAccessReason: string().notRequired(),
          }),
          metadata: object().shape({
            // createdAtDatetime: date().notRequired(),
            createdByUser: string().required("Required"),
            createdByUid: string().required("Required"),
            // updatedAtDatetime: date().notRequired(),
            updatedByUser: string().required("Required"),
            updatedByUid: string().required("Required"),
            trnType: string().required("Required"),
            trnState: string().required("Required"),
          }),
          ast: object().shape({
            astData: object().shape({
              astId: string().required("Required"),
              astNo: string().required("Required"),

              meter: object().shape({
                type: string().notRequired(),
              }),
            }),
          }),
          vending: object().shape({
            amount: number()
              .required("Required")
              .min(10, "R10 min required")
              .positive("Only Positive values"),
            comment: string().notRequired(),
          }),
        }),
      },
    }),
    []
  );

  const trnAllowed = (trnName, state) => {
    const astState = {
      stores: ["checkOutInit", "dispose", "lost"],
      checkOutPending: ["checkIn", "checkOutConfirm", "lost"],
      checkedOut: ["checkIn", "install", "lost"],
      field: ["commission", "inspection", "lost", "uninstall", "lost"],
      connected: ["disconnection", "inspection", "vend", "uninstall", "lost"],
      disconnected: ["reconnection", "inspection", "uninstall", "lost"],
      missing: ["recovered", "found"],
      disposed: [],
    };
    const hasTrn = astState[state]?.find((trn) => trn === trnName);
    return hasTrn;
  };

  return {
    trns,
    accessTrns,
    noAccessTrns,

    activeTrns,
    setActiveTrns,
    activeTrnsName,
    setActiveTrnsName,

    filterTrns, //Method to filters Trns

    isLoading,
    isError,
    isFetching,
    trnsNewFormData,
    trnsValidationSchema,

    trnAllowed,
  };
};
