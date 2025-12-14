import { View } from "react-native";
import TeamsTeamHeader from "./TeamsTeamHeader";

const TeamsTeam = (props) => {
  const { teamId, teamName, editTeam, deleteTeam, children } = props;
  return (
    <View key={teamId}>
      <TeamsTeamHeader
        title={teamName}
        editTeam={editTeam}
        deleteTeam={deleteTeam}
      />
      {children}
    </View>
  );
};

export default TeamsTeam;
