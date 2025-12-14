import { useCallback, useEffect, useRef, useState } from "react";

export const useInfiteScroll = (activeData) => {
  const [page, setPage] = useState(1);
  // console.log(`useState page`, page);

  const dataRef = useRef([]);
  // console.log(`useState dataRef.current?.length`, dataRef.current?.length);

  const pageRef = useRef(1);
  // console.log(`useState pageRef.current`, pageRef.current);

  const hasMoreRef = useRef(true);
  // console.log(`useState hasMoreRef?.current`, hasMoreRef?.current);

  const fetchData = useCallback(async () => {
    // console.log(`fetchData ---- STARTED running  **********************`);

    if (!hasMoreRef.current) {
      // console.log(`fetchData --- Return - there is NO MORE TO FETCH`);
      return;
    }
    if (activeData?.length === 0) {
      // console.log(`fetchData --- Return  - there is NO ACTIVEDATA`);
      return;
    }
    if (activeData === undefined) {
      // console.log(`fetchData --- Return  - ACTIVEDATA is undefined`);
      return;
    }
    if (activeData === null) {
      // console.log(`fetchData --- Return  - ACTIVEDATA is null`);
      return;
    }

    try {
      const startIndex = (page - 1) * 10; // Assuming 10 items per page
      const endIndex = startIndex + 10;
      const newItems = activeData?.slice(startIndex, endIndex);
      if (newItems?.length === 0) {
        hasMoreRef.current = false;
      } else {
        dataRef.current = [...dataRef.current, ...newItems];
        setPage((prevPage) => prevPage + 1);
        pageRef.current = pageRef.current + 1;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // console.log(`fetchData --  FINISHED running  ******************`);
    }
  }, [page, activeData]);

  useEffect(() => {
    fetchData();
  }, [activeData]); // Initial data fetch

  const onEndReached = async ({ distanceFromEnd }) => {
    if (distanceFromEnd < 0) return;
    if (page === pageRef.current) {
      await fetchData();
    }
  };

  return {
    onEndReached,
    dataRef,
    page,
    setPage,
    pageRef,
    hasMoreRef,
  };
};
