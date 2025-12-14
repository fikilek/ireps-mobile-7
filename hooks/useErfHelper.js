import { useAuth } from "../context/authContext";
import { useUpdateErfMutation } from "../redux/erfsSlice";

export const useErfHelper = () => {
  // console.log(`useErfHelper runnning`);

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName } = user || {};
  // console.log(`useErfHelper uid`, uid);
  // console.log(`useErfHelper displayName`, displayName);

  const [
    updateErf,
    { isError: ueError, isLoading: ueIsLoading, isSuccess: ueIsSuccess },
  ] = useUpdateErfMutation({
    uid,
    displayName,
  });

  const updateErfHelper = async (submitData) => {
    // console.log(
    //   `ErfHelper updateErfHelper ----submitData`,
    //   JSON.stringify(submitData, null, 2)
    // );
    if (!submitData) return;

    const { id, strNo, strName, strType } = submitData;

    const erfUpdateResult = await updateErf({
      // erfNo: ,
      displayName: displayName,
      uid: uid,
      id,
      erfData: {
        address: {
          streetAdr: {
            strNo: strNo,
            strName: strName,
            strType: strType,
          },
          street: `${strNo} ${strName} ${strType}`,
        },
        media: submitData?.media,
      },
    });
    console.log(`erfUpdateResult`, erfUpdateResult);
    return erfUpdateResult;
  };

  return {
    updateErfHelper,
    ueError,
    ueIsLoading,
    ueIsSuccess,
  };
};
