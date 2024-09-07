import { ResponsiveBar } from "@nivo/bar";
import { mockBarData as data } from "../../data/dummy";
import { Header } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

const Bar = () => {
    const { currentColor } = useStateContext();

  return (
    <div className="m-2 mt-24 bg-white border-2 border-gray-200 md:m-10 md:p-10 rounded-3xl dark:border-gray-700">
        <Header category="Chart" title="Bar" />
        <ResponsiveBar
        data={data}
        theme={{
            // added
            axis: {
            domain: {
                line: {
                stroke: currentColor,
                },
            },
            legend: {
                text: {
                fill: currentColor,
                },
            },
            ticks: {
                line: {
                stroke: currentColor,
                strokeWidth: 1,
                },
                text: {
                fill: currentColor,
                },
            },
            },
            legends: {
            text: {
                fill: currentColor,
            },
            },
        }}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
            {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
            },
            {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
            },
        ]}
        borderColor={{
            from: "color",
            modifiers: [["darker", "1.6"]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend:  "country", // changed
            legendPosition: "middle",
            legendOffset: 32,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "food", // changed
            legendPosition: "middle",
            legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
        }}
        legends={[
            {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
                {
                on: "hover",
                style: {
                    itemOpacity: 1,
                },
                },
            ],
            },
        ]}
        role="application"
        barAriaLabel={function (e) {
            return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
        }}
        />
    
  </div>
  );
};

export default Bar;
