export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const getRandomRgbColor = () => {
  const r = Math?.floor(Math?.random() * 256); // Random integer for Red (0-255)
  const g = Math?.floor(Math?.random() * 256); // Random integer for Green (0-255)
  const b = Math?.floor(Math?.random() * 256); // Random integer for Blue (0-255)

  return `rgb(${r}, ${g}, ${b})`; // Returns the RGB color string
};

export const camelCaseToNormal = (text) => {
  if (!text) return;
  const result = text?.replace(/([A-Z])/g, " $1");
  return result?.charAt(0)?.toUpperCase() + result?.slice(1);
};

export const camelCaseToWords = (s) => {
  const result = s?.replace(/([A-Z])/g, " $1");
  return result?.charAt(0)?.toUpperCase() + result?.slice(1);
};

export const capitalizeFirstLetter = (string) => {
  if (typeof string !== "string" || string?.length === 0 || !string) {
    return string; // Return original string if it's not a string or is empty
  }
  return string?.charAt(0)?.toUpperCase() + string.slice(1);
};

export const capitalizeWords = (sentence) => {
  if (typeof sentence !== "string" || sentence?.length === 0 || !sentence) {
    return sentence; // Return original string if it's not a string or is empty
  }
  return sentence
    ?.toLowerCase()
    ?.split(" ")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
};

export const truncateString = (str, maxLength = 15) => {
  // console.log(`truncateString str`, str);
  if (!str || str === undefined || str === null || str === "") return;
  if (str?.length <= maxLength) {
    return str;
  } else {
    return str?.slice(0, maxLength) + "..";
  }
};

export const irepsDictionary = new Map();
// anomalies
irepsDictionary.set("Meter Ok", "Meter Ok");
irepsDictionary.set("Meter Damaged", "Damaged");
irepsDictionary.set("Meter Faulty", "Faulty");
irepsDictionary.set("Meter Illegally Connected", "Illegally Connected");
irepsDictionary.set("Meter Missing", "Missing");
irepsDictionary.set("meterOk", "Meter Ok");
irepsDictionary.set("meterDamaged", "Damaged");
irepsDictionary.set("meterFaulty", "Faulty");
irepsDictionary.set("meterIllegallyConnected", "Illegally Connected");
irepsDictionary.set("meterMissing", "Missing");

// SA Provinces
irepsDictionary.set("LP", "Western Cape");
irepsDictionary.set("WC", "Eastern Cape");
irepsDictionary.set("KZN", "KwaZulu Natal");
irepsDictionary.set("MP", "Mpumalanga");
irepsDictionary.set("GP", "Gauteng");
irepsDictionary.set("FS", "Free State");
irepsDictionary.set("LP", "Limpopo");
irepsDictionary.set("NW", "North West");
irepsDictionary.set("NC", "Northern Cape");

// trns
irepsDictionary.set("audit", "Audit");
irepsDictionary.set("inspection", "Insp");
irepsDictionary.set("installation", "Inst");
irepsDictionary.set("uninstall", "Unins");
irepsDictionary.set("disconnection", "Dscon");
irepsDictionary.set("reconnection", "Recn");
irepsDictionary.set("checkOut", "ChkOut");
irepsDictionary.set("grv", "Grv");
irepsDictionary.set("goodsReceiving", "Grv");
irepsDictionary.set("commissioning", "Comn");
irepsDictionary.set("commission", "Comn");
irepsDictionary.set("decommissioning", "Decom");
irepsDictionary.set("decommission", "Decom");
irepsDictionary.set("checkOutInit", "COIN");
irepsDictionary.set("checkOutConfirm", "Coc");
irepsDictionary.set("checkedOut", "CO");
irepsDictionary.set("checkOutPending", "Cop");
irepsDictionary.set("checkIn", "Ci");
irepsDictionary.set("stores", "Store");
irepsDictionary.set("field", "Field");
irepsDictionary.set("connected", "CNTD");
irepsDictionary.set("lost", "Lost");

// Other
irepsDictionary.set("customerAdr", "Customer Address");
irepsDictionary.set("propertyType", "Property Type");
irepsDictionary.set("noAccess", "No Access");

export const sanitize = (str) => {
  if (str == null || str === undefined || str === "" || !str) return "";
  else return str;
};
