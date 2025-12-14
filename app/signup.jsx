import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";

import { Image } from "expo-image";
import BtnForm from "../components/BtnForm";
import BtnRouting from "../components/BtnRouting";
import FormContainer from "../components/forms/FormContainer";
import FormControlWrappper from "../components/forms/FormControlWrappper";
import FormTitle from "../components/forms/FormTitle";
import KeyboardView from "../components/KeyboardView";
import { useAuth } from "../context/authContext";
import { useUsers } from "../hooks/useUsers";

const Signup = () => {
  console.log(` `);
  console.log(` `);
  console.log(`Signup ---- START START START`);
  console.log(`Signup ---- START START START`);

  const [isLoading, setIsLoading] = useState(false);
  console.log(`Signup ---- isLoading`, isLoading);

  const { userNewFormData } = useUsers();
  console.log(`Signup ---- userNewFormData`, userNewFormData);

  const [signupCredentials, setSignupCredentials] = useState(userNewFormData);

  const { register } = useAuth();

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);
  // console.log(`showPassword`, showPassword);

  const router = useRouter();

  const handleSignup = async () => {
    console.log(`handleSignup signupCredentials`, signupCredentials);

    // check if all fields are completed
    if (
      signupCredentials.surname === "" ||
      signupCredentials.name === "" ||
      signupCredentials.email === "" ||
      signupCredentials.password === "" ||
      signupCredentials.confirmPassword === ""
    ) {
      Alert.alert("Sign Up", "Please fill in all fields");
      return;
    }

    // validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupCredentials.email)) {
      Alert.alert("Sign Up", "Please enter a valid email address");
      return;
    }

    // trim all inputs
    for (const property in signupCredentials) {
      // console.log(`${property}: ${signupCredentials[property]}`);
      signupCredentials[property] = signupCredentials[property].trim();
    }
    // console.log(`signupCredentials after trim`, signupCredentials);

    // check if password and confirm password are the same
    if (signupCredentials.password !== signupCredentials.confirmPassword) {
      Alert.alert("Sign Up", "Password and Confirm Password must match");
      return;
    }

    // make surname and name start with capital letter
    setSignupCredentials((prev) => ({
      ...prev,
      surname:
        signupCredentials.surname.charAt(0).toUpperCase() +
        signupCredentials.surname.slice(1),
    }));
    setSignupCredentials((prev) => ({
      ...prev,
      name:
        signupCredentials.name.charAt(0).toUpperCase() +
        signupCredentials.name.slice(1),
    }));

    // make email lowercase
    setSignupCredentials((prev) => ({
      ...prev,
      email: signupCredentials.email.toLowerCase(),
    }));

    // start signup process
    setIsLoading(true);

    const result = await register(
      signupCredentials.surname,
      signupCredentials.name,
      signupCredentials.email,
      signupCredentials.password,
      signupCredentials.status,
      signupCredentials.workbase
    );
    // console.log(`result`, result);

    if (result.success) {
      setIsLoading(false);
      // console.log("Sign Up", "Sign Up Successful");
      handleReset();
      router.navigate("/(tabs)/erfs");
    } else {
      setIsLoading(false);
      let msg = "";
      if (result.error.includes("invalid-email")) {
        msg = "Invalid email. Please use another email.";
      } else if (result.error.includes("email-already-in-use")) {
        msg = "Email already in use. Please use another email.";
      } else {
        msg = "Sign Up Failed. Please try again.";
      }
      // console.log("Sign Up", msg);
      Alert.alert("Sign Up", msg);
    }
  };

  const handleReset = () => {
    // Handle reset logic here
    setSignupCredentials(userNewFormData);
  };

  const handleChange = (value, valueName) => {
    // console.log("value", value);
    // console.log("valueName", valueName);
    setSignupCredentials((prev) => ({
      ...prev,
      [valueName]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardView>
      <FormContainer>
        {/* signup image */}
        <Image
          source={require("../assets/images/register.png")}
          style={{ height: 200 }}
          contentFit="contain"
        />

        <View style={{ margin: 10 }}>
          {/* Form Title */}
          <FormTitle title="Signup" />

          <View style={{ gap: 20, width: "100%" }}>
            {/* Form Input Control - Surname */}
            <FormControlWrappper>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Ionicons width="20" name="person-add" size={20} color="gray" />
                <TextInput
                  style={{ fontSize: 14 }}
                  placeholder="Surname"
                  placeholderTextColor="gray"
                  onChangeText={(text, property = "surname") =>
                    handleChange(text, property)
                  }
                  value={signupCredentials.surname}
                  editable={!isLoading}
                />
              </View>
            </FormControlWrappper>

            {/* Form Input Control - Name */}
            <FormControlWrappper>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Ionicons
                  width="20"
                  name="person-add-outline"
                  size={20}
                  color="gray"
                />
                <TextInput
                  style={{ fontSize: 14 }}
                  placeholder="Name"
                  placeholderTextColor="gray"
                  onChangeText={(text, property = "name") =>
                    handleChange(text, property)
                  }
                  value={signupCredentials.name}
                  editable={!isLoading}
                />
              </View>
            </FormControlWrappper>

            {/* Form Input Control - Email */}
            <FormControlWrappper>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Octicons width="20" name="mail" size={20} color="gray" />

                <TextInput
                  style={{ fontSize: 14 }}
                  className="flex-1 text-neutral-700"
                  placeholder="Email"
                  placeholderTextColor="gray"
                  onChangeText={(text, property = "email") =>
                    handleChange(text, property)
                  }
                  value={signupCredentials.email}
                  editable={!isLoading}
                />
              </View>
            </FormControlWrappper>

            {/* Form Input Control - Password */}
            <FormControlWrappper>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Octicons width="20" name="lock" size={20} color="gray" />
                <TextInput
                  style={{ fontSize: 14 }}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  onChangeText={(text, property = "password") =>
                    handleChange(text, property)
                  }
                  value={signupCredentials.password}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
              </View>

              <Octicons
                name={showPassword ? "eye" : "eye-closed"}
                size={25}
                color="#aaa"
                style={{
                  marginLeft: 40,
                }}
                onPress={togglePasswordVisibility}
              />
            </FormControlWrappper>

            {/* Form Input Control -  Confirm Password */}
            <FormControlWrappper>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <MaterialIcons
                  width="20"
                  name="password"
                  size={20}
                  color="gray"
                />
                <TextInput
                  style={{ fontSize: 14 }}
                  placeholder="Confirm Password"
                  placeholderTextColor="gray"
                  onChangeText={(text, property = "confirmPassword") =>
                    handleChange(text, property)
                  }
                  value={signupCredentials.confirmPassword}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
              </View>
              <Octicons
                name={showPassword ? "eye" : "eye-closed"}
                size={25}
                color="#aaa"
                style={{
                  marginLeft: 10,
                }}
                onPress={togglePasswordVisibility}
              />
            </FormControlWrappper>

            {/* reset and submit button */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <BtnForm
                handlePress={handleReset}
                isLoading={isLoading}
                title={"Reset"}
              />

              {isLoading ? (
                <View style={{ height: 30, width: 40, alignItems: "center" }}>
                  <ActivityIndicator size="large" color="black" />
                </View>
              ) : (
                <BtnForm handlePress={handleSignup} title={"Submit"} />
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 4,
                justifyContent: "center",
                marginTop: 10,
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
                Already have an account?
              </Text>
              <BtnRouting destinationRoute={"/signin"} title={"Signin"} />
            </View>
          </View>
        </View>
      </FormContainer>
    </KeyboardView>
  );
};

export default Signup;
