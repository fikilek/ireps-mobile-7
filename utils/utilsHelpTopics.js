import { Text } from "react-native";

// constants
export const constants = {
  dateFormat0: "yyyy MMM dd",
  dateFormat1: "yyyy MMM dd: HH:mm",
  dateFormat2: "yyyy-MMM-dd_HH:mm:ss",
  dateFormat3: "yy MMM dd",
};

export const getHelpTopic = (helpTopic) => {
  switch (helpTopic) {
    case "access.meterAccess":
      return `This describes whether the user has ACCESS to the meter or not. 

			Meter ACCESS is defined as user ability to physically touch the meter with hand.

      NO touch with hand = NO ACCESS.

    	..click to learn more ...`;

    default:
      return <Text>iREPS Help Topic</Text>;
  }
};
