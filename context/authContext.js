import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, functions } from "../config/fbConfig"; // Adjust the import based on your project structure

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [initials, setInitials] = useState("");
  const [user, setUser] = useState(null);
  const [hasFullAccess, setHasFullAccess] = useState(null);
  // console.log(`AuthContextProvider user`, user);
  // console.log(`AuthContextProvider user`, JSON.stringify(user, null, 2));
  const displayName = user?.displayName;

  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  // const { uid, claims } = user || {};
  // // console.log(`MainLayout uid`, uid);

  // // const { workbase } = claims || {};
  // // console.log(`MainLayout workbase`, workbase);

  // const { data: userData } = useGetUserByIdQuery(uid);

  // const { status, serviceProvider, workbases, workbase } = userData || {};

  // const { id: spId, name: spName } = serviceProvider || {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log(`onAuthStateChanged`, onAuthStateChanged);
      // console.log(`onAuthStateChanged user`, JSON.stringify(user, null, 2));
      // console.log(`onAuthStateChanged user`, user);

      if (user) {
        const idToken = await auth.currentUser.getIdTokenResult(true);
        setUser({
          ...user,
          claims: idToken.claims.roles,
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (displayName) {
      const firstLetterSurname = displayName
        .split(" ")[0]
        .slice(0, 1)
        .toUpperCase();
      const firstLetterName = displayName
        .split(" ")[1]
        .slice(0, 1)
        .toUpperCase();
      setInitials(`${firstLetterSurname}${firstLetterName}`);
    }
  }, [displayName]);

  // useEffect(() => {
  //   if (!user || !userData) return;
  //   if (
  //     status !== "pending" &&
  //     status !== "" &&
  //     status !== null &&
  //     spId &&
  //     spName &&
  //     workbases &&
  //     workbases?.length !== 0
  //   ) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  const logon = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, data: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      router.push("/signin");
    }
  };

  const register = async (surname, name, email, password, status, workbase) => {
    // console.log(`surname`, surname);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      console.log(`user`, user);
      const displayName = `${name} ${surname}`;
      // Update user display name at firebase auth
      await updateProfile(user, {
        displayName,
      });

      // update claims with workbase using onCall cloud function
      const updateUserWorkbase = await httpsCallable(
        functions,
        "updateUserWorkbase"
      );
      // console.log(`updateUserWorkbase`, updateUserWorkbase);

      // console.log(`workbase`, workbase);
      const wbResult = await updateUserWorkbase({
        roles: {
          workbase,
        },
      });

      // Add user to users collection in Firestore
      const timestamp = Timestamp.now();
      await setDoc(doc(db, "users", user?.uid), {
        uid: user?.uid,
        surname,
        name,
        email,
        status,
        workbase,
        metadata: {
          updatedAtDatetime: timestamp,
          updatedByUser: displayName,
          updatedByUid: user?.uid,
          createdAtDatetime: timestamp,
          createdByUser: displayName,
          createdByUid: user?.uid,
        },
      });
      console.log("User signed up and added to Firestore:", user);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log(`user signed out auth:`, auth);
      return { success: true };
    } catch (error) {
      console.error("Error signing out:", error.message);
      return { success: false, error: error.message };
    }
  };

  const updateWorkbase = async (workbase) => {
    // console.log(`workbase`, workbase);
    // const { newWorkbase: workbase, password } = userCredentials;
    try {
      // const credential = EmailAuthProvider.credential(
      //   auth.currentUser.email,
      //   password
      // );
      // console.log(`credential`, credential);
      // const userCredential = await reauthenticateWithCredential(
      //   auth.currentUser,
      //   credential
      // );
      // console.log(`userCredential`, userCredential);
      // const idToken = await auth.currentUser.getIdTokenResult(true);
      // console.log(`idToken`, idToken);
      // update claims with workbase using onCall cloud function
      // console.log(`workbase`, workbase)
      const updateUserWorkbase = httpsCallable(functions, "updateUserWorkbase");
      const wbResult = await updateUserWorkbase({
        roles: {
          workbase,
        },
      });
      // console.log(`wbUpdate?.data`, wbResult?.data);
      console.log(
        `AuthContextProvider wbResult?.data?.userRecord?.customClaims?.roles`,
        JSON.stringify(wbResult?.data?.userRecord?.customClaims?.roles, null, 2)
      );

      return wbResult;
      // const docRef = doc(db, "users", user.uid);
      // const datetime = Timestamp.now();
      // await updateDoc(docRef, {
      //   "metadata.updatedByName": user.displayName,
      //   "metadata.updatedByUid": user.uid,
      //   "metadata.updatedAtDatetime": datetime,
      //   workbase: workbase,
      // });
    } catch (error) {
      console.log(`wbUpdate Error: `, error.message);
      return error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        logon,
        register,
        logout,
        updateWorkbase,
        initials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return value;
};

export const getDisplayInitials = (displayName) => {
  if (!displayName) return;
  // split the string on blank space
  let displayInitials = "";
  displayName?.split(" ").forEach((item) => {
    displayInitials = displayInitials?.concat(item?.charAt(0)?.toUpperCase());
  });
  return displayInitials;
};
