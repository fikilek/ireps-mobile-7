import { View } from "react-native";
import TeamsSpHeader from "./TeamsSpHeader";
import TeamsSpSubs from "./TeamsSpSubs";
import TeamsSpUsers from "./TeamsSpUsers";

const TeamsSp = (props) => {
  const { spId, tradingName, subs, totalSpSubs, users, totalSpUsers } = props;
  return (
    <View
      key={spId}
      style={{
        borderWidth: 1,
        backgroundColor: "aliceblue",
        gap: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: "lightgrey",
        elevation: 5,
      }}
    >
      <TeamsSpHeader title={tradingName} />
      {/* Subs */}
      <TeamsSpSubs title={"Subs"} subs={subs} totalSubs={totalSpSubs} />
      {/* Users */}
      <TeamsSpUsers title={"Users"} users={users} spUsers={totalSpUsers} />
    </View>
  );
};

export default TeamsSp;
