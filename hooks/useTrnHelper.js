import { useAuth } from "../context/authContext";
import { useCreateTrnMutation, useUpdateTrnMutation } from "../redux/trnsSlice";

export const useTrnHelper = () => {
  // console.log(`useTrnHelper runnning`);

  const { user } = useAuth();
  // console.log(`MainLayout user`, user);

  const { uid, displayName } = user || {};
  // console.log(`useTrnHelper uid`, uid);
  // console.log(`useTrnHelper displayName`, displayName);

  const [
    createTrn,
    { isError: ctError, isLoading: ctIsLoading, isSuccess: ctIsSuccess },
  ] = useCreateTrnMutation({
    uid,
    displayName,
  });

  const [
    updateTrn,
    { isError: utError, isLoading: utIsLoading, isSuccess: utIsSuccess },
  ] = useUpdateTrnMutation({
    uid,
    displayName,
  });

  const createTrnHelper = async (submitData) => {
    // console.log(
    //   `TrnHelper createTrnHelper runnning - submitData - erfNo: `,
    //   submitData?.ast?.erf?.erfNo
    // );
    // Remove submitData.metadata.newTrn
    delete submitData?.metadata?.newTrn;
    // Create a new Trn
    const createTrnResult = await createTrn({
      displayName,
      uid,
      trnData: {
        ...submitData,
        metadata: {
          ...submitData.metadata,
          newTrn: false,
        },
      },
      id: submitData?.metadata?.trnId,
    });
    console.log(
      `createTrnResult for erf [${submitData?.ast?.erf?.erfNo}] : `,
      createTrnResult
    );
    return createTrnResult;
  };

  const updateTrnHelper = async (submitData) => {
    // console.log(
    //   `TrnHelper updateTrnHelper runnning - submitData - erfNo: `,
    //   submitData?.ast?.erf?.erfNo
    // );
    // Remove submitData.metadata.newTrn
    delete submitData?.metadata?.newTrn;
    // Create a new Trn
    const updateTrnResult = await updateTrn({
      displayName,
      uid,
      trnData: {
        ...submitData,
        metadata: {
          ...submitData.metadata,
        },
      },
      id: submitData?.metadata?.trnId,
    });
    console.log(
      `updateTrnResult for erf [${submitData?.ast?.erf?.erfNo}] : `,
      updateTrnResult
    );
    return updateTrnResult;
  };

  return {
    createTrnHelper,
    ctError,
    ctIsLoading,
    ctIsSuccess,
    updateTrnHelper,
    utError,
    utIsLoading,
    utIsSuccess,
  };
};
