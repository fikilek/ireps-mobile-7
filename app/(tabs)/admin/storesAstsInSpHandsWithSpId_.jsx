import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import StoresAstsInSpHands from "../../../features/stores/StoresAstsInSpHands";
import { useGetAstsBySpQuery } from "../../../redux/astsSlice";
import { useGetSpByIdQuery } from "../../../redux/spsSlice";
import { styles } from "../../../utils/utilsGlobalStyles";

const StoresAstsInSpHands_ = () => {
  const { spId } = useLocalSearchParams();

  //Get all ast with the sp
  const {
    data: asts,
    isLoading,
    isError,
    isFetching,
  } = useGetAstsBySpQuery({
    spId: spId,
    skip: spId ? true : false,
  });
  // console.log(`Store asts?.length`, asts?.length);

  // Get the Sp by spId
  const { data: sp } = useGetSpByIdQuery({
    spId: spId,
  });
  // console.log(`Service Provider sp`, sp);

  if (isError) {
    return (
      <View style={styles.containerCenter}>
        <Text
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          Error in fetching Asts
        </Text>
      </View>
    );
  }

  if (isFetching || isLoading) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size="large" style={{ paddingVertical: 20 }} />
      </View>
    );
  }

  return <StoresAstsInSpHands asts={asts} spName={sp?.tradingName} />;
};

export default StoresAstsInSpHands_;
