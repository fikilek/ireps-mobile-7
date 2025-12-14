import { useNetInfo } from "@react-native-community/netinfo";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import MediaApp from "../../components/media/MediaApp";
import Metadata from "../../components/Metadata";
import PageSection from "../../components/pageSection/PageSection";
// import AstsDetails from "../../features/asts/AstsDetails";
import ErfPropertyType from "../../features/erfs/ErfPropertyType";
import ErfSgData from "../../features/erfs/ErfSgData";
import ErfStreetAddress from "../../features/erfs/ErfStreetAddress";
// import TrnsDetails from "../../features/trns/TrnsDetails";

const ErfDetails = (props) => {
  // console.log(`ErfDetails props`, props);

  const { erf } = props;

  const [setSelected] = useState("");
  // console.log(`selected ---------------------------`, selected);

  const { address, propertyType, erfNo, prclKey, metadata, media, trns, asts } =
    erf || {};
  // console.log(`ErfDet?ails trns`, trns);
  // console.log(`ErfDetails metadata`, metadata);
  // console.log(`ErfDetails address`, address);
  // console.log(`ErfDetails propertyType`, propertyType);

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

  return (
    <View style={{ height: "100%", width: "100%" }}>
      {/* <FormHeader
        title={`Erf Details`}
        headerRightRight={""}
        headerRightLeft={""}
        isConnected={isConnected}
      /> */}

      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={{ flex: 1, gap: 10, width: "100%" }}>
          {/* Street Adr */}
          <PageSection
            hl=""
            hr="Address"
            selected={"Address"}
            setSelected={setSelected}
          >
            <ErfStreetAddress address={address} />
          </PageSection>

          {/* Property Type */}
          <PageSection
            hl=""
            hr="Property Type"
            selected={"Property Type"}
            setSelected={setSelected}
          >
            <ErfPropertyType propertyType={propertyType} />
          </PageSection>

          {/* Asts */}
          <PageSection
            hr="Asts (Meters)"
            hl={asts?.length ? asts?.length : 0}
            selected={"Asts (Meters)"}
            setSelected={setSelected}
          >
            {/* <AstsDetails asts={asts} /> */}
          </PageSection>

          {/* Trns - These are NO ACCESS trns */}
          <PageSection
            hl={trns?.length ? trns?.length : 0}
            hr="No Access Trns"
            selected={"No Access Trns"}
            setSelected={setSelected}
          >
            {/* <TrnsDetails trns={trns} /> */}
          </PageSection>

          {/* Billing */}
          {/* <PageSection
						title="billing"
						selected={selected}
						setSelected={setSelected}
						erf={erf}
					>
						<Billing billing={billing} />
					</PageSection> */}

          {/* Media */}
          <PageSection
            hl={""}
            hr="Media"
            selected={"Media"}
            setSelected={setSelected}
          >
            <MediaApp
              media={media}
              trn={null}
              erf={erf}
              ast={null}
              irepsKeyItem="erf"
            />
          </PageSection>

          {/* SG data */}
          <PageSection
            hl=""
            hr="SgData"
            selected={"SgData"}
            setSelected={setSelected}
          >
            <ErfSgData prclKey={prclKey} erfNo={erfNo} />
          </PageSection>

          {/* metadata */}
          <PageSection
            hl=""
            hr="Metadata"
            selected={"Metadata"}
            setSelected={setSelected}
          >
            <Metadata metadata={metadata} />
          </PageSection>
        </View>
      </ScrollView>
    </View>
  );
};

export default ErfDetails;
