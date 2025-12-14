import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { useDrag } from './DragContext';
/*
  IMPORTANT: replace import below with the mutation hook from your existing teamsApi.
  I assume your RTK slice exports something like:
    const teamsApi = createApi({... endpoints: { updateTeamMembers: builder.mutation(...) }})
    export const { useUpdateTeamMembersMutation } = teamsApi;
*/
// import { useUpdateTeamMembersMutation } from "./teamsApi"; // <-- adjust this path/name
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import {
  useDeleteTeamMutation,
  useUpdateTeamMutation,
} from "../../redux/teamsSlice";
// import { useGetUserByIdQuery } from "../../../redux/usersSlice";
import { useRouter } from "expo-router";
import { truncateString } from "../../utils/utilsCommon";
import { useDrag } from "./DragDropContext";

/**
 * Props:
 *  - team: { id, name, members: [] }  // team object (document)
 */

const DroppableTeam = ({ team }) => {
  const { dragState, update } = useDrag();
  const [layout, setLayout] = useState(null); // LayoutRectangle
  const [localMembers, setLocalMembers] = useState(team.members || []);
  const [animOpacity] = useState(new Animated.Value(1));
  // const [isVisible, setIsVisible] = useState(true);

  // const screen = useWindowDimensions();
  // console.log(`screen`, screen);

  const router = useRouter();

  /*****************
    Start - Get User data
    */
  const { user } = useAuth();
  // console.log(`user`, user);
  const { uid, displayName } = user || {};
  // console.log(`uid`, uid);
  // const { data } = useGetUserByIdQuery(uid);
  // console.log(`Teams data`, data);
  // const {
  //   serviceProvider: { id: spId, name: spName },
  // } = data || {};
  // console.log(`id`, id);
  // console.log(`name`, name);
  /*
        End - Get User data
    ***********/

  // RTK mutation for updating team members
  // Expect the mutation to accept something like: { teamId, members } or { teamId, newMember }
  const [updateTeam, { isLoading, isSuccess, isError, error }] =
    useUpdateTeamMutation();

  const [
    deleteTeam,
    { isError: ctmError, isLoading: ctmIsLoading, isSuccess: ctmIsSuccess },
  ] = useDeleteTeamMutation({
    uid,
    displayName,
  });

  // Helper - returns true if screen coords point inside layout
  const pointInsideLayout = (x, y, layoutRect) => {
    // console.log(`x`, x);
    // console.log(`layoutRect ****************************`);
    // console.log(`layoutRect ****************************`);
    // console.log(`layoutRect ****************************`);
    // console.log(`layoutRect ****************************`);
    // console.log(`layoutRect ****************************`);
    // console.log(`layoutRect ****************************`);
    // console.log(`layoutRect.y`, layoutRect.y);
    // console.log(`layoutRect.height`, layoutRect.height);
    // console.log(
    //   `layoutRect.y+layoutRect.height`,
    //   layoutRect.y + layoutRect.height
    // );

    if (!layoutRect) return false;
    return (
      x >= layoutRect.x - dragState.droppableScrollOffSet.x &&
      x <=
        layoutRect.x - dragState.droppableScrollOffSet.x + layoutRect.width &&
      y >= layoutRect.y - dragState.droppableScrollOffSet.y + 120 &&
      y <=
        layoutRect.y -
          dragState.droppableScrollOffSet.y +
          120 +
          layoutRect.height
    );
  };

  // Track enter / leave - update context.overTeamId accordingly
  useEffect(() => {
    if (!layout) return;
    const { position, isDragging } = dragState;
    const inside = pointInsideLayout(position.x, position.y, layout);

    if (inside && dragState.activeUser) {
      // if just entered, set overTeamId
      if (dragState.overTeamId !== team.id) {
        update({ overTeamId: team.id });
      }
    } else {
      // if pointer left this zone and overTeamId points to this team, clear it
      if (dragState.overTeamId === team.id) {
        update({ overTeamId: null });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragState.position, layout, dragState.isDragging, dragState.activeUser]);

  // Detect drop: transition from dragging -> not dragging while over this team
  const prevDraggingRef = useRef(false);
  useEffect(() => {
    const nowDragging = dragState.isDragging;
    const prevDragging = prevDraggingRef.current;

    // drop detection: previously dragging, now not dragging, and last overTeamId === this team
    if (
      prevDragging &&
      !nowDragging &&
      dragState.overTeamId === team.id &&
      dragState.activeUser
    ) {
      // Start spinner and call mutation to update Firestore

      // Check of the activeUser is already a member of the team and dont drop if already a member
      // console.log(
      //   `handleDrop dragState.activeUser`,
      //   JSON.stringify(dragState.activeUser, null, 2)
      // );

      // console.log(
      //   `handleDrop localMembers`,
      //   JSON.stringify(localMembers, null, 2)
      // );

      const alreadyMember = localMembers?.some(
        (member) => member.id === dragState.activeUser?.id
      );
      // console.log(`alreadyMember`, alreadyMember);

      if (alreadyMember) {
        Alert.alert(`${dragState.activeUser?.name}, Already a member`);
        return;
      }

      handleDrop(dragState.activeUser);
    }

    prevDraggingRef.current = nowDragging;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragState.isDragging, dragState.overTeamId, dragState.activeUser]);

  // handle the drop - compose object and call RTK mutation
  const handleDrop = async (user) => {
    // Visual: the droppable should already show an "active" style because overTeamId === team.id
    // 1. Show spinner - handled by isLoading state
    // 2. Compose the update object that your RTK mutation expects.
    //    Example: pass teamId and newMembers array. Adjust to your API.
    const composed = {
      // teamId: team.id,
      // push the user into members - server should de-duplicate/validate as needed
      // members: [...localMembers, user],
      // optionally add metadata:
      // lastUpdatedAt: new Date().toISOString(),
      displayName,
      uid,
      id: team.id,
      teamData: {
        members: [
          ...localMembers,
          {
            id: user?.id,
            email: user?.email,
          },
        ],
      },
    };
    // console.log(`handleDrop composed`, JSON.stringify(composed, null, 2));

    try {
      await updateTeam(composed).unwrap(); // will set isLoading / isSuccess, etc.
      // on success we'll update local members in the next effect
    } catch (err) {
      console.warn("updateTeamMembers failed", err);
    }
  };

  // When mutation success -> fade away then update local members list to show the new user
  useEffect(() => {
    if (isSuccess) {
      // console.log(`operation succesful`);
      // console.log(`localMembers`, localMembers);
      // console.log(`dragState.activeUser`, dragState.activeUser);
      // animate fade out of droppable (or you could animate other UI)
      Animated.timing(animOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // keep the droppable invisible (or remove it from UI)
        // setIsVisible(false);

        // Also update local member list so UI reflects the newly added member
        // If your app relies on global store for teams, you may refresh the team list from RTK query or dispatch store update.
        if (dragState.activeUser) {
          setLocalMembers((prev) => [...prev, dragState.activeUser]);
          // setLocalMembers((prev) => [localMembers]);
        }

        // Clear drag context's overTeamId and activeUser so future drags reset properly
        update({ overTeamId: null, activeUser: null });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // if (!isVisible) {
  //   // optionally render an empty container if you need layout kept, or return null to remove
  //   return null;
  // }

  // Visual indication when draggable is over this droppable:
  const isHovered = dragState.overTeamId === team.id;

  const handleRemoveMember = async (uid) => {
    // console.log(`uid`, uid);
    // find the index of the uid from the localMember

    // console.log(
    //   `handleRemoveMember localMembers`,
    //   JSON.stringify(localMembers, null, 2)
    // );

    const indexToDelete = localMembers?.findIndex(
      (member) => member.id === uid
    );

    if (indexToDelete === -1) {
      // Element has NOT been found
      // console.log(`Element has NOT been found -indexToDelete: `, indexToDelete);
      return;
    }
    const members = [...localMembers];
    members?.splice(indexToDelete, 1);
    // console.log(`members`, members);
    setLocalMembers((prev) => [...members]);

    const composed = {
      displayName,
      uid,
      id: team.id,
      teamData: {
        members: members,
      },
    };
    // console.log(
    //   `handleRemoveMember composed`,
    //   JSON.stringify(composed, null, 2)
    // );

    try {
      const removeMemberResult = await updateTeam(composed).unwrap(); // will set isLoading / isSuccess, etc.
      // on success we'll update local members in the next effect
    } catch (err) {
      console.warn("updateTeamMembers failed", err);
    }
  };

  const handleEditTeam = (team) => {
    // console.log(`Edit team with teamData: `, team);
    router.navigate({
      pathname: `/admin/teamForm_`,
      params: {
        teamData: JSON.stringify(team),
      },
    });
  };

  const handleDeleteTeam = () => {
    console.log(`Delete  a team with id: `, team?.id);

    Alert.alert(
      `Confirm [${team?.teamName}] Team Delete Action`, // Alert Title
      "Are you sure you want to proceed? This action CANNOT be undone", // Alert Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel", // This style often places the button on the left on iOS
        },
        {
          text: "OK",
          onPress: () => {
            // console.log("OK Pressed - Proceeding with action");
            const deleteTeamResult = deleteTeam(team?.id);
            if (deleteTeamResult?.data) {
              // show alert  and go back
              router.navigate("admin/teams_");
              // display success notice
              Alert.alert(`Team deleted successfully`);
            }
            if (deleteTeamResult?.error) {
              // Show Alert only (Do not reroute - ussr must decide)
              Alert.alert(`Delete team Error `, deleteTeamResult.error);
            }
          },
          style: "default", // Default style for the positive action
        },
      ],
      { cancelable: false } // Optional: prevents dismissing the alert by tapping outside
    );
  };

  return (
    <Animated.View
      onLayout={(e) => setLayout(e.nativeEvent.layout)}
      style={[
        styles.container,
        isHovered ? styles.hovered : styles.idle,
        // { opacity: animOpacity },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerRow}>
          {/* Team edit btn */}
          <FontAwesome
            name="edit"
            size={20}
            color="blue"
            onPress={() => handleEditTeam(team)}
          />

          <Text style={styles.teamName}>
            {truncateString(team.teamName, 16)}
          </Text>
        </View>

        {isLoading ? <ActivityIndicator size="small" /> : null}
        <View>
          {/* Team delete btn */}

          <MaterialIcons
            name="delete-forever"
            size={24}
            color="blue"
            onPress={handleDeleteTeam}
          />
        </View>
      </View>

      <View style={styles.memberList}>
        {localMembers.map((m) => {
          // console.log(`m`, m);
          if (m) {
            return (
              <View
                key={m.id}
                style={[
                  styles.memberItem,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                <View>
                  <Text style={{ fontSize: 12 }}>
                    {truncateString(m.email, 15)}
                  </Text>
                  <Text style={{ fontSize: 9, fontWeight: "700" }}>
                    {m?.serviceProvider?.name}
                  </Text>
                </View>

                <FontAwesome
                  name="remove"
                  size={20}
                  color="black"
                  onPress={() => handleRemoveMember(m.id)}
                />
              </View>
            );
          } else {
            return null;
          }
        })}
      </View>

      {/* Optional: allow pressing the zone to manually add last active user for testing */}
      {/* <TouchableOpacity
        onPress={() => {
          if (dragState.activeUser) handleDrop(dragState.activeUser);
        }}
        style={styles.manualButton}
      >
        <Text style={{ color: "white" }}>Add active user</Text>
      </TouchableOpacity> */}

      {isError && (
        <Text style={styles.errorText}>
          Error updating team: {error?.message || "unknown"}
        </Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // marginVertical: 8,
    // padding: 12,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    alignSelf: "center",
    elevation: 2,
  },
  idle: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  hovered: {
    borderWidth: 2,
    borderColor: "#2ecc71",
    backgroundColor: "#eaffea",
  },
  teamName: {
    fontWeight: "700",
    fontSize: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberList: { margin: 5 },
  memberItem: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: "#dfd5edff",
    marginBottom: 6,
  },
  manualButton: {
    marginTop: 10,
    backgroundColor: "#4fa3ff",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  errorText: { color: "red", marginTop: 8 },
});

export default DroppableTeam;
