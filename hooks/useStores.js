import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { object, string } from "yup";
import { useAuth } from "../context/authContext";
import { useGetStoresQuery } from "../redux/storesSlice";
import { useGetUserByIdQuery } from "../redux/usersSlice";

export const useStores = () => {
  // console.log(`useStores running`);
  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid, claims } = user || {};
  // console.log(`uid`, uid);
  // console.log(`useStores claims`, claims);

  // const { workbase, spId } = claims || {};
  // console.log(`useStores workbase`, workbase);
  // console.log(`useStores spId`, spId);
  const { data } = useGetUserByIdQuery(uid);

  const { serviceProvider, workbases, workbase } = data || {};

  const { id: spId, name: spName } = serviceProvider || {};

  const {
    data: stores,
    isLoading,
    isError,
    isFetching,
  } = useGetStoresQuery({
    spId: spId,
  });
  // console.log(`stores`, stores);

  // const [filteredTrns, setFilteredTrns] = useState();
  const [activeStores, setActiveStores] = useState(); // Active erfs are the one currently on display
  // console.log(`activeStores`, activeStores);

  const [activeStoresName, setActiveStoresName] = useState();

  useEffect(() => {
    setActiveStores(stores); // Default to the first 10 erfs
    setActiveStoresName("stores");
  }, [stores]);

  const timestamp = Timestamp.now();

  const storesNewFormData = {
    metadata: {
      updatedAtDatetime: timestamp,
      updatedByUser: user?.displayName,
      updatedByUid: user?.uid,
      createdAtDatetime: timestamp,
      createdByUser: user?.displayName,
      createdByUid: user?.uid,
      trnHistory: 0, // how many times transaction has been updated
      trnState: "draft",
    },
    storeName: "",
    address: {
      country: "South Africa",
      province: "Gauteng",
      dm: "COJ",
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
    office: {
      phone: "011 3334 1234",
      emailAdr: "infor@gmail.com",
    },
    owner: {
      //Details of the owner of the store. This must come from sp or workbase
      id: spId,
      name: spName,
      type: "", //['sp', 'workbase']
    },
    contacts: {
      surname: "Kent",
      name: "Fik",
      emailAdr: "@gmail.com",
      cellNo: "081 222 3456",
      whatsAppNo: "081 222 3456",
      position: "Manager", // ['manager, supervisor', etc]
    },
  };

  const storesValidationSchema = object().shape({
    storeName: string().required("Required"),
    address: object().shape({
      country: string().notRequired(),
      province: string().notRequired(),
      dm: string().notRequired(),

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
    office: object().shape({
      phone: string().required("Required"),
      emailAdr: string().required("Required"),
    }),
    owner: object().shape({
      id: string().notRequired("Required"),
      name: string().required("Required"),
      type: string().notRequired("Required"),
    }),
    contacts: object().shape({
      surname: string().required("Required"),
      name: string().required("Required"),
      emailAdr: string().required("Required"),
      cellNo: string().notRequired(),
      whatsAppNo: string().notRequired(),
      position: string().notRequired(),
    }),
  });

  return {
    stores,

    activeStores,
    setActiveStores,
    activeStoresName,
    setActiveStoresName,

    isLoading,
    isError,
    isFetching,
    storesNewFormData,
    storesValidationSchema,
  };
};
