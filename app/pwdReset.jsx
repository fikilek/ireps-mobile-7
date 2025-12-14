import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";

import { Image } from "expo-image";
import FormControlWrappper from "../../ireps-mobile-7/components/forms/FormControlWrappper";
import BtnForm from "../components/BtnForm";
import BtnRouting from "../components/BtnRouting";
import KeyboardView from "../components/KeyboardView";
import FormContainer from "../components/forms/FormContainer";
import FormTitle from "../components/forms/FormTitle";
import pwdReset from "../context/authContext";

const emailInit = "@gmail.com";

const PwdReset = () => {
  const [isLoading, setIsLoading] = useState(false);

  // const emailRef = useRef("");
  const [email, setEmail] = useState(emailInit);

  const router = useRouter();

  const handlePwdReset = async () => {
    setIsLoading(true);

    const result = await pwdReset(email);
    console.log(`pwdRest ----result`, result);

    if (result.success) {
      setIsLoading(false);
      setEmail(emailInit);
      console.log("pwdReset ----Password reset success, Check your inbox");
      Alert.alert("Password reset success", "Check your inbox");
    } else {
      setIsLoading(false);
      console.log("pwdReset ----failed");
      Alert.alert("Password reset failed");
    }
    router.navigate("index");
  };

  return (
    <KeyboardView>
      <FormContainer>
        <Image
          source={require("../assets/images/login.png")}
          style={{ height: 200 }}
          resizeMode="contain"
        />

        <View style={{ margin: 10 }}>
          {/* Form Title */}
          <FormTitle title="Password Reset" />

          <View style={{ gap: 20 }}>
            {/* Form Input Control - Email */}
            <FormControlWrappper>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Octicons name="mail" size={20} color="gray" />
                <TextInput
                  style={{ fontSize: 14 }}
                  placeholder="Email Address"
                  placeholderTextColor="gray"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  editable={!isLoading}
                />
              </View>
            </FormControlWrappper>

            {/* reset and submit button */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <BtnForm
                handlePress={() => setEmail(emailInit)}
                isLoading={isLoading}
                title={"Reset"}
              />

              {isLoading ? (
                <View style={{ height: 30, width: 40, alignItems: "center" }}>
                  <ActivityIndicator size="large" color="black" />
                </View>
              ) : (
                <BtnForm handlePress={handlePwdReset} title={"Submit"} />
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                textAlign: "right",
                marginRight: 2,
              }}
            >
              Remeber credentials?
            </Text>
            <BtnRouting destinationRoute={"/signin"} title={"Signin"} />
          </View>
        </View>
      </FormContainer>
    </KeyboardView>
  );
};

export default PwdReset;
