import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "../../../context/authContext";
import { useGetSpsQuery } from "../../../redux/spsSlice";
import { useGetUserByIdQuery } from "../../../redux/usersSlice";

const StoresAstsInSpHands_ = () => {
  const router = useRouter();

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);
  const { uid } = user || {};
  // console.log(`MainLayout uid`, uid);
  const { data } = useGetUserByIdQuery(uid);

  const { serviceProvider } = data || {};
  const { id: spId, name: spName } = serviceProvider || {};
  // console.log(`spId`, spId);
  // console.log(`spName`, spName);
  // console.log(`fde86e77-ba53-4d64-90f8-6aeeff23ef12`);

  // Get all sps that are clients of the user
  const { data: sps } = useGetSpsQuery();
  // console.log(`sps`, sps);
  // console.log(`StoresAstsInSpHands_ sps?.length`, sps?.length);
  // console.log(`StoresAstsInSpHands_ sps`, JSON.stringify(sps, null, 2));

  // Filter out current sp
  const updatedSubs = sps?.filter((sp) => sp?.id !== spId);
  // console.log(`StoresAstsInSpHands_ updatedSubs?.length`, updatedSubs?.length);

  // Iterate through the updatedSubs and check for a match with userSpId
  const clients = [];
  updatedSubs?.forEach((sp) => {
    // console.log(`checking subContractors of [${sp?.tradingName}] `);
    const { subContractors } = sp || {};
    // console.log(`subContractors`,subContractors)
    // console.log(
    //   `StoresAstsInSpHands_ subContractors?.length`,
    //   JSON.stringify(subContractors?.length, null, 2)
    // );

    if (!subContractors) return;
    subContractors?.map((sub) => {
      if (sub?.id === spId) {
        // console.log(
        //   `[${sub?.name} - ${name}  ] is a subContractor of [${sp?.tradingName}]`
        // );
        clients?.push(sp);
      }
    });
  });
  // console.log(`clients`, clients);

  const navigayeToSp = (spId, spNm) => {
    router.navigate({
      pathname: `admin/storesAstsInSpHandsWithSpId_`,
      params: {
        spId: spId,
      },
    });
  };

  if (!clients || clients?.lenght === 0) {
    router.navigate({
      pathname: `admin/storesAstsInSpHandsWithSpId_`,
      params: {
        spId: spId,
      },
    });
    return;
  }

  return (
    <View
      style={{
        // flex: 1,
        width: "60%",
        height: "70%",
        backgroundColor: "lightgrey",
        // justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 5,
      }}
    >
      <View style={{ padding: 5, gap: 10, borderBottomWidth: 1 }}>
        <Text>
          User has access to asts (meters) from Service Provider(s) listed
          below.
        </Text>
        <Text>Press / Click on to choose.</Text>
      </View>
      <View style={{ width: "100%", padding: 5, flex: 1 }}>
        <Pressable
          onPress={() => navigayeToSp(spId, spName)}
          style={{
            borderRadius: 5,
            margin: 10,
            padding: 5,
            justifyContent: "center",
            backgroundColor: "lightblue",
          }}
        >
          <Text style={{ fontSize: 15 }}>{spName}</Text>
        </Pressable>
        {clients?.map((client, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => navigayeToSp(client?.id, client?.tradingName)}
              style={{
                borderRadius: 5,
                margin: 10,
                padding: 5,
                justifyContent: "center",
                backgroundColor: "lightblue",
              }}
            >
              <Text style={{ fontSize: 15 }}>{client?.tradingName}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default StoresAstsInSpHands_;
