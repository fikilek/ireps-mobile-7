import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "../context/authContext";

const Ireps = () => {
  const { logout, initials } = useAuth();

  const router = useRouter();

  const goToProfile = () => {
    router.navigate({
      pathname: `/admin/userProfile_`,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
        marginTop: 30,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          // gap: 5,
        }}
      >
        <Text style={{ fontSize: 100, color: "grey" }}>
          {" "}
          <Text
            style={{
              color: "blue",
              fontWeight: "bold",
            }}
          >
            i
          </Text>
          REPS
        </Text>
        <Text style={{ fontSize: 12 }}>
          <Text
            style={{
              fontSize: 17,
              color: "blue",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            i
          </Text>
          nteligent{" "}
          <Text
            style={{
              fontSize: 15,
              color: "blue",
              fontWeight: "bold",
            }}
          >
            R
          </Text>
          evenue{" "}
          <Text
            style={{
              fontSize: 15,
              color: "blue",
              fontWeight: "bold",
            }}
          >
            E
          </Text>
          nhancement and{" "}
          <Text
            style={{
              fontSize: 15,
              color: "blue",
              fontWeight: "bold",
            }}
          >
            P
          </Text>
          rotection{" "}
          <Text
            style={{
              fontSize: 15,
              color: "blue",
              fontWeight: "bold",
            }}
          >
            S
          </Text>
          olution
        </Text>
        <Text style={{ fontSize: 23 }}>welcome page</Text>
      </View>
      <View
        style={{
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 20 }}>Onboarding process</Text>
        <Text style={{ fontSize: 20 }}>What is iREPS?</Text>
        <Text style={{ fontSize: 20 }}>Why iREPS?</Text>
        <Text style={{ fontSize: 20 }}>Some iREPS Stats</Text>
        <Text style={{ fontSize: 20 }}>iREPS Roadmap</Text>
      </View>
      <View
        style={{
          position: "relative",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => logout()}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            width: 200,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "blue",
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Singout</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={goToProfile}
        style={{
          position: "absolute",
          right: 10,
          // bottom: 5,
          top: 10,
          padding: 5,
          // borderWidth: 1,
          borderRadius: 10,
          // width: 200,
          // height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "beige",
        }}
      >
        <Text style={{ fontSize: 20, color: "blue" }}>{initials}</Text>
      </Pressable>
    </View>
  );
};

export default Ireps;
