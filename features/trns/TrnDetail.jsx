import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import DataDetailWrapper from "../../components/DataDetailWrapper.jsx";
import DataDisplayComponent from "../../components/DataDisplayComponent";
import { getAction } from "../../components/page/PageRowTrnsBtn.jsx";
import {
  useDeleteTrnMutation,
  useGetTrnByIdQuery,
} from "../../redux/trnsSlice.js";
import { convertFromTimestamp } from "../../utils/utilsFirebase.js"; // Adjust the path as needed

const TrnDetail = (props) => {
  console.log(`TrnDetail ----props`, JSON.stringify(props, null, 2));
  const { trn } = props;
  console.log(`TrnDetail ----trn`, JSON.stringify(trn, null, 2));
  const { trnId, trnType } = trn || {};

  const router = useRouter();

  const displays = "trnsDisplays";
  // if (!trn) return;

  const {
    data: trnData,
    // error,
    // isLoading,
    // isFetching,
  } = useGetTrnByIdQuery(trnId);
  console.log(`TrnDetail ----trnData`, JSON.stringify(trnData, null, 2));

  const [deleteTrn, { isError, isLoading, isFetching, isSuccess }] =
    useDeleteTrnMutation();
  // console.log(`isError`, isError);
  // console.log(`isLoading`, isLoading);
  // console.log(`isFetching`, isFetching);
  // console.log(`isSuccess`, isSuccess);

  // passs trnType to getTrnData
  const newAction = getAction(trnType);
  // console.log(`TrnDetail newAction`, newAction);

  const { erfNo } = trn?.ast?.erf || "";

  const onPressOpen = () => {
    console.log(`TrnDetail ----displays`, displays);
    console.log(`TrnDetail ----newAction`, newAction);
    if (newAction) {
      router.navigate({
        pathname: `/${displays}/${newAction}`,
        params: {
          trn: JSON.stringify(trnData),
          irepsKeyItem: "trn",
          erfNo: erfNo,
          erfType: erfNo?.slice(0, 2) === "FE" ? "Fake" : "Formal",
          trnType: trn?.metadata?.trnType || "",
        },
      });
    }
  };

  // const onPressDelete = async () => {
  //   // console.log(`Delete trn`);
  //   const deleteResult = await deleteTrn(trnId);
  //   // console.log(`Delete result`, deleteResult?.data);
  //   Alert.alert(`Delete Success`, `${deleteResult?.data}`);
  // };

  return (
    <DataDetailWrapper>
      <DataDisplayComponent label="Trn Type" data={trn?.trnType} />
      <DataDisplayComponent
        label="No Access Reason"
        data={trn?.noAccessReason}
      />
      {/* Created */}
      <DataDisplayComponent
        label="Created At Datetime"
        data={convertFromTimestamp(trn?.createdAtDatetime, "yyyy-MMM-dd HH:mm")}
      />
      <DataDisplayComponent label="Created By User" data={trn?.createdByUser} />
      {/* Updated */}
      <DataDisplayComponent
        label="Updated At Datetime"
        data={convertFromTimestamp(trn?.updatedAtDatetime, "yyyy-MMM-dd HH:mm")}
      />
      <DataDisplayComponent label="Updated By User" data={trn?.updatedByUser} />
      <View style={{ flexDirection: "row", gap: 5 }}>
        <TouchableOpacity
          onPress={onPressOpen}
          style={{
            // width,
            flex: 1,
            borderWidth: 2,
            borderRadius: 5,
            alignItems: "center",
            // borderColor: "lightblue",
            backgroundColor: "lightblue",
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {isLoading ? (
            ""
          ) : (
            <>
              <Ionicons
                name="open"
                size={24}
                color="black"
                onPress={onPressOpen}
              />

              <Text>Open Trn</Text>
            </>
          )}
        </TouchableOpacity>

        {/* <View
          style={{
            // width,
            flex: 1,
            borderWidth: 2,
            borderRadius: 5,
            alignItems: "center",
            borderColor: isSuccess ? "green" : "red",
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {isLoading ? (
            <View style={styles.containerCenter}>
              <ActivityIndicator size="small" />
            </View>
          ) : (
            <>
              {isSuccess ? (
                <Text>Trn Deleted</Text>
              ) : (
                <>
                  <TouchableOpacity onPress={onPressDelete}>
                    <Text>Delete Trn</Text>
                  </TouchableOpacity>
                  <MaterialCommunityIcons
                    name="delete-forever-outline"
                    size={24}
                    color="red"
                    onPress={onPressDelete}
                  />
                </>
              )}
            </>
          )}
        </View> */}
      </View>
    </DataDetailWrapper>
  );
};

export default TrnDetail;
