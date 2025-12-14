import { useNetInfo } from "@react-native-community/netinfo";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import FormHeader from "../../components/forms/FormHeader";
import PageSection from "../../components/pageSection/PageSection";
// import { irepsDictionary } from "../../util/utilsCommon"; // Adjust the path as needed
import MediaApp from "../../components/media/MediaApp"; // Adjust the path as needed
import Metadata from "../../components/Metadata"; // Adjust the path as needed
import AstAnomaly from "../../features/asts/AstAnomaly";
import AstData from "../../features/asts/AstData"; // Adjust the path as needed
import AstLocation from "../../features/asts/AstLocation"; // Adjust the path as needed
import AstNormalisation from "../../features/asts/AstNormalisation";
import AstServiceConnection from "../../features/asts/AstServiceConnection"; // Adjust the path as needed
import ErfPropertyType from "../../features/erfs/ErfPropertyType"; // Adjust the path as needed
import ErfSgData from "../../features/erfs/ErfSgData"; // Adjust the path as needed
import ErfStreetAddress from "../../features/erfs/ErfStreetAddress"; // Adjust the path as needed
import TrnsDetails from "../../features/trns/TrnsDetails"; // Adjust the path as needed
import AstState from "./AstState";

const AstDetailsData = (props) => {
  const { ast } = props;
  // console.log(
  //   `AstDetailsData ----ast?.media?.length`,
  //   JSON.stringify(ast?.media?.length, null, 2)
  // );
  // console.log(`AstDetailsData ----title`, title);

  const [selected, setSelected] = useState("");
  // console.log(`AstDetailsData ----selected`, selected);

  // 'isConnected' is a value representing wether there is availability of network connectivity  or not while
  // 'isInternetReachable' indicates wether there is internet or not.
  // These values are controlled by NetInfo library.
  // The functionality is housed in a hook 'useNetworkStatus' to allow sharing of the connectivity status.
  // Using this shared approach, all components interested in network and internet availability
  // can use this hook.
  const netInfo = useNetInfo();
  // console.log(
  //   `TrnFormMeterAudit ----netInfo`,
  //   JSON.stringify(netInfo, null, 2)
  // );

  const { isConnected, isInternetReachable } = netInfo;
  // console.log(`TrnFormMeterAudit ----isConnected`, isConnected);
  // console.log(`TrnFormMeterAudit ----isInternetReachable`, isInternetReachable);

  const {
    anomalies,
    astData,
    erf,
    media,
    trns,
    location,
    serviceConnection,
    metadata,
    normalisation,
  } = ast || {};

  const { address, propertyType, prclKey, erfNo } = erf || {};

  const { meter } = ast?.astData || {};

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <FormHeader
        title={astData?.astNo}
        headerRightRight={meter?.type}
        headerRightLeft={meter?.phase}
        isConnected={isConnected}
      />

      <ScrollView style={{ flex: 1, marginTop: 10, width: "100%" }}>
        <View style={{ flex: 1, gap: 10, width: "100%" }}>
          {/* anomalies */}
          <PageSection
            hl=""
            hr="Anomaly"
            selected={"Anomaly"}
            setSelected={setSelected}
            data={<Text>Anomaly</Text>}
          >
            <AstAnomaly anomalies={anomalies} />
          </PageSection>
          {/* ast state */}
          <PageSection
            hl=""
            hr="Ast State"
            selected={"Ast State"}
            setSelected={setSelected}
            data={<Text>Ast State</Text>}
          >
            <AstState astState={astData?.astState} />
          </PageSection>
          {/* astData */}
          <PageSection
            hl=""
            hr="Ast Data"
            selected={"Ast Data"}
            setSelected={setSelected}
            data={<Text>Street Adt</Text>}
          >
            <AstData astData={astData} />
          </PageSection>

          {/* Street Adr */}
          <PageSection
            hl=""
            hr="Street Address"
            selected={"Street Address"}
            setSelected={setSelected}
            data={<Text>Street Adt</Text>}
          >
            <ErfStreetAddress address={address} />
          </PageSection>

          {/* Property Type */}
          <PageSection
            hl=""
            hr="Property Type"
            selected={"Property Type"}
            setSelected={setSelected}
            // erf={erf}
            // headerOnly={true}
            // data={`${propertyType?.type ? propertyType?.type : ""} ${
            // 	propertyType?.unitName ? ` - ${propertyType?.unitName} ` : ""
            // } ${propertyType?.unitNo ? ` - ${propertyType?.unitNo}` : ""}`}
          >
            <ErfPropertyType propertyType={propertyType} />
          </PageSection>

          {/* Erf/Land Parcel Data */}
          <PageSection
            hl=""
            hr="Erf Data"
            selected={"Erf Data"}
            setSelected={setSelected}
            // erf={erf}
            // headerOnly={true}
            // data={`${propertyType?.type ? propertyType?.type : ""} ${
            // 	propertyType?.unitName ? ` - ${propertyType?.unitName} ` : ""
            // } ${propertyType?.unitNo ? ` - ${propertyType?.unitNo}` : ""}`}
          >
            <ErfSgData prclKey={prclKey} erfNo={erfNo} />
          </PageSection>

          {/* Meter Location */}
          <PageSection
            hl=""
            hr="Meter Location"
            selected={"Meter Location"}
            setSelected={setSelected}
            // ast={ast}
            // headerOnly={true}
            // data={street ? street : "No Data Available"}
          >
            <AstLocation location={location} />
          </PageSection>

          {/* Service Connection */}
          <PageSection
            hl=""
            hr="Service Connection"
            selected={"Service Connection"}
            setSelected={setSelected}
          >
            <AstServiceConnection serviceConnection={serviceConnection} />
          </PageSection>

          {/* Trns */}
          <PageSection
            hl={trns?.length ? trns?.length : 0}
            hr="No Access Trns"
            selected={"No Access Trns"}
            setSelected={setSelected}
            // erf={erf}
          >
            <TrnsDetails trns={trns} />
          </PageSection>

          <PageSection
            hl={""}
            hr="media"
            selected={"media"}
            setSelected={setSelected}
            // erf={erf}
          >
            <MediaApp
              media={media}
              trn={null}
              erf={null}
              ast={ast}
              irepsKeyItem="ast"
            />
          </PageSection>

          {/* Normalisation */}
          <PageSection
            hl=""
            hr="normalisation"
            selected={"normalisation"}
            setSelected={setSelected}
            // ast={ast}
          >
            <AstNormalisation normalisation={normalisation} />
          </PageSection>

          {/* Metadata */}
          <PageSection
            hl=""
            hr="metadata"
            selected={"metadata"}
            setSelected={setSelected}
            // ast={ast}
          >
            <Metadata metadata={metadata} />
          </PageSection>
        </View>
      </ScrollView>
    </View>
  );
};

export default AstDetailsData;
