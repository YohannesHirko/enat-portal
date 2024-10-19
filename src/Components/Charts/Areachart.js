import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { useAppContext } from "../../Contexts/AppContextProvider";

function Areachart({ data, options }) {
    const { nivoTheme } = useAppContext();
    return (
        <div className=" h-16 lg:w-48 md:w-36 w-24">
            <ResponsiveLine
                {...options}
                curve="natural"
                data={data}
                theme={nivoTheme}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                xScale={{ type: "point" }}
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={null}
                enableGridX={false}
                enableGridY={false}
                colors={{ scheme: "nivo" }}
                enablePoints={true}
                pointSize={4}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableArea={true}
                areaOpacity={0.05}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[]}
            />
        </div>
    );
}

export default Areachart;
