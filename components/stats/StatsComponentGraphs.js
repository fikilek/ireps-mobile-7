import { ScrollView, View } from "react-native";

// import { BarChart, PieChart } from "react-native-chart-kit";
import { BarChart, PieChart } from "react-native-gifted-charts";

// const chartConfig = {
//   backgroundColor: "#000000",
//   backgroundGradientFrom: "#1E2923",
//   backgroundGradientTo: "#08130D",
//   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//   style: {
//     borderRadius: 16,
//   },
// };

const StatsComponentGraphs = (props) => {
  // const { data: data_ } = props;
  const { data } = props;

  // const dataset = [];
  // data?.forEach((item) => {

  //   const key = dictionaryObj[item.label]['key']
  //   const label = dictionaryObj[item.label]['label']

  //   dataset?.push({
  //       label: key,
  //       value: item.vale,
  //     });
  // });

  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       data: dataset1,
  //     },
  //   ],
  // };

  // const chartConfigPie = {
  //   backgroundColor: "#000000",
  //   backgroundGradientFrom: "#1E2923",
  //   backgroundGradientTo: "#08130D",
  //   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //   // style: {
  //   // 	borderRadius: 2,
  //   // },
  // };

  // const pieData = data?.map((item) => {
  //   const key = item?.key;
  //   const value = item?.value;
  //   return {
  //     name: key,
  //     erfs: value,
  //     color: getRandomRgbColor(),
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   };
  // });
  // console.log(`pieData`, pieData);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginVertical: 10,
        // backgroundColor: "yellow",
        marginHorizontal: 5,
      }}
    >
      <ScrollView
        style={{ backgroundColor: "white", padding: 15 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <BarChart
          // horizontal
          barWidth={22}
          noOfSections={4}
          barBorderRadius={4}
          frontColor="lightgray"
          data={data}
          // yAxisThickness={1}
          // xAxisThickness={1}
          showValuesAsTopLabel={true}
        />
      </ScrollView>
      <View style={{ flex: 1, margin: 5, padding: 20 }}>
        <PieChart
          showText
          textColor="black"
          radius={120}
          textSize={12}
          // showTextBackground
          textBackgroundRadius={26}
          data={data}
        />
      </View>
    </View>
  );
};

export default StatsComponentGraphs;
