import { KeyboardAvoidingView, Platform } from "react-native";

const KeyboardView = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
