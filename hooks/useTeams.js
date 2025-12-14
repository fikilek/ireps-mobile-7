import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { object, string } from "yup";
import { useAuth } from "../context/authContext";
import { useGetTeamsQuery } from "../redux/teamsSlice";
import { useGetUserByIdQuery } from "../redux/usersSlice";

export const useTeams = () => {
  console.log(`useTeams running -------`);
  const { user } = useAuth();
  // console.log(`user`, user);

  const { uid } = user || {};
  // console.log(`uid`, uid);
  // console.log(`useTeams claims`, claims);

  // const { workbase, spId } = claims || {};
  // console.log(`useTeams workbase`, workbase);
  // console.log(`useTeams spId`, spId);
  const { data } = useGetUserByIdQuery(uid);

  const { serviceProvider } = data || {};

  const { id: spId, name: spName } = serviceProvider || {};

  const { data: teams, isLoading, isError, isFetching } = useGetTeamsQuery();
  // console.log(`useTeams teams?.length`, teams?.length);

  // const [filteredTrns, setFilteredTrns] = useState();
  const [activeTeams, setActiveTeams] = useState(); // Active erfs are the one currently on display
  // console.log(`activeTeams`, activeTeams);

  const [activeTeamsName, setActiveTeamsName] = useState();

  useEffect(() => {
    setActiveTeams(teams); // Default to the first 10 erfs
    setActiveTeamsName("teams");
  }, [teams]);

  const timestamp = Timestamp.now();

  const teamNewFormData = {
    metadata: {
      updatedAtDatetime: timestamp,
      updatedByUser: user?.displayName,
      updatedByUid: user?.uid,

      createdAtDatetime: timestamp,
      createdByUser: user?.displayName,
      createdByUid: user?.uid,

      trnState: "draft",
    },
    teamName: "",
    teamOwner: {
      //Details of the owner of the store. This must come from sp or workbase
      id: spId,
      name: spName,
    },
    members: [],
  };

  const teamValidationSchema = object().shape({
    teamName: string().required("Required"),
    teamOwner: object().shape({
      id: string().required("Required"),
      name: string().required("Required"),
    }),
  });

  return {
    teams,

    activeTeams,
    setActiveTeams,
    activeTeamsName,
    setActiveTeamsName,

    isLoading,
    isError,
    isFetching,
    teamNewFormData,
    teamValidationSchema,
  };
};
