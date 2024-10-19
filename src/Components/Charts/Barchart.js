import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useAppContext } from "../../Contexts/AppContextProvider";

function Barchart({ data, keys, indexBy, options, xAxis, yAxis }) {
    const { nivoTheme } = useAppContext();

    return (
        <div className=" h-60">
            <ResponsiveBar
                {...options}
                data={data}
                keys={keys}
                indexBy={indexBy}
                margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
                innerPadding={1}
                borderRadius={6}
                axisTop={null}
                axisRight={null}
                theme={nivoTheme}
                axisBottom={{
                    ...xAxis,
                    tickSize: 0,
                    tickPadding: 8,
                    tickRotation: 0,
                }}
                axisLeft={{
                    ...yAxis,
                    tickSize: 0,
                    tickPadding: 3,
                    tickRotation: 0,
                    legendPosition: "middle",
                    legendOffset: -33,
                }}
                enableLabel={false}
                labelSkipWidth={7}
                labelSkipHeight={12}
                legends={[]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={(e) =>
                    e.id +
                    ": " +
                    e.formattedValue +
                    " in country: " +
                    e.indexValue
                }
            />
        </div>
    );
}

export default Barchart;
