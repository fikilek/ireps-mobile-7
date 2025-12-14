import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const PageWrapper = (props) => {
  const { children } = props;
  return (
    <SafeAreaProvider style={{ flex: 1, padding: 5 }}>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PageWrapper;
