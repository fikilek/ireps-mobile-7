import { ScrollView, StyleSheet, Text, View } from "react-native";
// import { DragProvider } from './DragContext';
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { useSps } from "../../hooks/useSps";
import { useUsers } from "../../hooks/useUsers";
import { useGetTeamsByOwnerIdQuery } from "../../redux/teamsSlice";
import { useGetUserByIdQuery } from "../../redux/usersSlice";
import { useDrag } from "./DragDropContext";
import DraggableUser from "./DraggableUser";
import DroppableTeam from "./DroppableTeam";
import TeamsHeaderSp from "./TeamsHeaderSp";
import TeamsHeaderTeams from "./TeamsHeaderTeams";
import TeamsSp from "./TeamsSp";
import TeamsWrapper from "./TeamsWrapper";

/**
 * Example usage - supply real data from your store / query.
 */
const Teams = () => {
  const router = useRouter();
  const { update } = useDrag();
  /*****************
    Start - Get User data
    */
  const { user } = useAuth();
  // console.log(`user`, user);
  const { uid, displayName } = user || {};
  // console.log(`uid`, uid);
  const { data } = useGetUserByIdQuery(uid);
  // console.log(`Teams data`, data);
  const {
    serviceProvider: { id: spId, name: spName },
  } = data || {};
  // console.log(`id`, id);
  // console.log(`name`, name);
  /*
        End - Get User data
    ***********/

  // Get all teams
  const {
    data: activeTeams = [],
    isLoading: isLoadingTeams,
    isError: isErrorteams,
  } = useGetTeamsByOwnerIdQuery(spId);
  // console.log(`Teams activeTeams?.length`, activeTeams?.length);
  // console.log(
  //   `TrnFormMeterCheckOutConfirm activeUsers`,
  //   JSON.stringify(activeUsers, null, 2)
  // );
  // Get all serice poroviders
  const { sps } = useSps();
  // console.log(`sps`, sps);

  // Get all users
  // const { data: users } = useGetUsersQuery();
  const { activeUsers, isLoading, isError, isFetching } = useUsers();
  // console.log(`activeUsers`, activeUsers);
  // console.log(
  //   `TrnFormMeterCheckOutConfirm activeUsers`,
  //   JSON.stringify(activeUsers, null, 2)
  // );

  const handleAddTeam = () => {
    console.log(`Create a team`);
    router.navigate(`/admin/teamForm_`);
  };

  const handleScroll = (event) => {
    update({
      droppableScrollOffSet: event.nativeEvent.contentOffset,
    });
  };

  return (
    <TeamsWrapper>
      {/* Droppable(s) */}
      <View style={styles.droppables}>
        <TeamsHeaderTeams title={"Teams"} onPress={handleAddTeam} />
        <ScrollView onScroll={handleScroll}>
          <View style={styles.droppables}>
            {activeTeams.map((t) => (
              <DroppableTeam key={t.id} team={t} />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Draggable(s) */}
      <View style={styles.draggables}>
        <TeamsHeaderSp title={"Service Providers"} />
        <ScrollView>
          <View style={styles.draggables}>
            <View style={{ gap: 5 }}>
              {sps?.map((sp) => {
                // Get subcontractors
                const { subContractors, id: spId } = sp || {};
                // console.log(`subContractors`, subContractors);
                // console.log(`spId`, subContraspIdctors);
                let subsCount = 0;
                const subs = subContractors?.map((sub) => {
                  return (
                    <View key={sub?.id}>
                      <Text style={{ fontSize: 12 }}>
                        {++subsCount} - {sub?.name}
                      </Text>
                    </View>
                  );
                });

                // Get users for each service provider
                const spUsers = activeUsers?.filter(
                  (user) => user.serviceProvider?.id === spId
                );

                const users = spUsers?.map((user) => {
                  return <DraggableUser key={user.id} user={user} />;
                });

                return (
                  <View key={sp.id}>
                    <TeamsSp
                      spId={sp.id}
                      tradingName={sp.tradingName}
                      subs={subs}
                      totalSpSubs={
                        subContractors?.length ? subContractors?.length : 0
                      }
                      users={users}
                      totalSpUsers={spUsers?.length ? spUsers?.length : 0}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </TeamsWrapper>
  );
};

export default Teams;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  draggables: {
    margin: 0,
    padding: 0,
    flex: 1,
    gap: 5,
  },
  droppables: { gap: 5, flex: 1 },
});
