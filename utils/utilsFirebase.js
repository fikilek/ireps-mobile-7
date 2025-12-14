import { format } from "date-fns";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { auth } from "../config/fbConfig";

export const convertFromTimestamp = (ts, dateFormat) => {
  if (!ts) return;
  // console.log(`ts`, ts);

  const timestamp = new Timestamp(ts?.seconds, ts?.nanoseconds);
  // console.log(`timestamp`, timestamp);

  const newDate = timestamp?.toDate();
  // console.log(`newDate`, newDate);

  const ndf = format(newDate, dateFormat);
  // console.log(`ndf`, ndf);

  return ndf;
};

export const checkEmailAvailability = async (email) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length === 0) {
      console.log("Email is not taken.");
      return true;
    } else {
      console.log("Email is already taken.");
      return false;
    }
  } catch (error) {
    console.error("Error checking email availability:", error);
    // Handle specific errors, e.g., network issues
    return false;
  }
};
