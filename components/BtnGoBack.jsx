import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const BtnGoBack = (props) => {
  // const { destination } = props;
  // const destination = false;
  const router = useRouter();
  return (
    <FontAwesome5
      name="caret-square-left"
      size={30}
      color="indigo"
      onPress={() =>
        // destination ? router.navigate('/erfs) : router.back()
        // router.back()
        router.navigate("/erfs")
      }
      // onPress={() => router.back()}
    />
  );
};
