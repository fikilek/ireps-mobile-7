import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { object, string } from "yup";
import { useAuth } from "../context/authContext";
import { useGetSpsQuery } from "../redux/spsSlice";

export const useSps = () => {
  // console.log(`useSps running`);
  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid, claims } = user || {};
  // console.log(`uid`, uid);
  // console.log(`useSps claims`, claims);

  const { workbase, spId } = claims || {};
  // console.log(`useSps workbase`, workbase);
  // console.log(`useSps spId`, spId);

  const {
    data: sps,
    isLoading,
    isError,
    isFetching,
  } = useGetSpsQuery({
    // spId: spId,
  });
  // console.log(`sps`, sps);

  // const [filteredTrns, setFilteredTrns] = useState();
  const [activeSps, setActiveSps] = useState(); // Active erfs are the one currently on display
  // console.log(`activeSps`, activeSps);

  const [activeSpsName, setActiveSpsName] = useState();

  useEffect(() => {
    setActiveSps(sps); // Default to the first 10 erfs
    setActiveSpsName("sps");
  }, [sps]);

  const timestamp = Timestamp.now();

  const spsNewFormData = {
    registeredName: "RSTE Utility Services Pty Ltd",
    registeredId: "",
    tradingName: "RSTE",
    status: "pending", // ['pending','active','blocked','']
    metadata: {
      updatedAtDatetime: timestamp,
      updatedByUser: user?.displayName,
      updatedByUid: user?.uid,
      createdAtDatetime: timestamp,
      createdByUser: user?.displayName,
      createdByUid: user?.uid,
      trnHistory: 0, // how many times transaction has been updated
    },
    address: {
      lmMetro: "COJ",
      town: "Jozi",
      suburbTownship: "Ormonder",
      streetAdr: {
        strNo: "23",
        strName: "Weed",
        strType: "Street",
      },
      systemAdr: "",
      gps: {
        latitude: "-123456",
        longitude: "567890",
      },
    },
    officeComms: {
      phone: "011 3334 1234",
      emailAdr: "info@gmail.com",
      whatsApp: "082 123 1234",
    },
    // clients: [{ id: "", name: "", type: "" }],
    contactPerson: {
      surname: "Kentane",
      name: "Sveve",
      emailAdr: "svevev@gmail.com",
      cellNo: "081 222 3456",
      whatsAppNo: "081 222 3456",
      position: "Manager", // ['manager, supervisor', etc]
    },
    subContractor: [{ id: "", name: "" }],
    clients: [{ id: "", name: "" }],
  };

  const spsValidationSchema = object().shape({
    registeredName: string().required("Required"),
    registeredId: string().notRequired(),
    tradingName: string().required("Required"),
    officeComms: object().shape({
      phone: string().required("Required"),
      emailAdr: string().required("Required"),
      whatsApp: string().required("Required"),
    }),
    address: object().shape({
      lmMetro: string().notRequired("Required"),
      town: string().notRequired("Required"),

      suburbTownship: string().notRequired(),

      streetAdr: object().shape({
        strNo: string().required("Required"),
        strName: string().required("Required"),
        strType: string().required("Required"),
      }),
      systemAdr: string().notRequired(),
      gps: object().shape({
        latitude: string().notRequired(),
        longitude: string().notRequired(),
      }),
    }),
    // clients: object().shape({
    //   id: string().notRequired(), //id of sp or workbase
    //   name: string().required(), // name of sp or workbase
    //   type: string().notRequired(), //sp or workbase
    // }),
    contactPerson: object().shape({
      surname: string().required("Required"),
      name: string().required("Required"),
      emailAdr: string().required("Required"),
      cellNo: string().notRequired(),
      whatsAppNo: string().notRequired(),
      position: string().notRequired(),
    }),
  });

  return {
    sps,

    activeSps,
    setActiveSps,
    activeSpsName,
    setActiveSpsName,

    isLoading,
    isError,
    isFetching,
    spsNewFormData,
    spsValidationSchema,
  };
};
