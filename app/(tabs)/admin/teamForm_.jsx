import { useLocalSearchParams } from "expo-router";
import PageWrapper from "../../../components/page/PageWrapper.jsx";
import TeamForm from "../../../features/teams/TeamForm.jsx";
import { useTeams } from "../../../hooks/useTeams.js";

const TeamForm_ = () => {
  const { teamNewFormData, teamValidationSchema } = useTeams();
  // console.log(`TeamForm_ teamNewFormData`, teamNewFormData);
  // console.log(`TeamForm_ teamValidationSchema`, teamValidationSchema);

  const { teamData } = useLocalSearchParams();
  // console.log(`TeamForm_ teamData`, JSON.stringify(teamData, null, 2));
  // console.log(`TeamForm_ typeof newStore`, typeof newStore);
  // console.log(`TeamForm_ newStore`, newStore);

  // const parsedNewStore = newStore;
  // console.log(`TeamForm_ parsedNewStore`, parsedNewStore);

  let formData = {};
  if (teamData === undefined) {
    // console.log(`new nnnnnnnnnnnnnnnnnnnnn`);
    formData = { ...teamNewFormData };
  } else {
    // console.log(`existing eeeeeeeeeeeeeeeeeee`);
    formData = { ...JSON.parse(teamData) };
  }

  // console.log(`TeamForm_ formData`, JSON.stringify(formData, null, 2));
  return (
    <PageWrapper>
      <TeamForm formData={formData} validationSchema={teamValidationSchema} />
    </PageWrapper>
  );
};

export default TeamForm_;
