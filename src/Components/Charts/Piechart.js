import { ResponsivePie } from "@nivo/pie";
import React from "react";
import { useAppContext } from "../../Contexts/AppContextProvider";

function PieChart({ data }) {
    const { nivoTheme } = useAppContext();
    return (
        <div className="h-60 lg:h-96">
            <ResponsivePie
                data={data}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: "category10" }}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                }}
                enableArcLinkLabels={true}
                arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
                arcLinkLabelsTextOffset={1}
                arcLinkLabelsOffset={1}
                arcLinkLabelsDiagonalLength={10}
                arcLinkLabelsStraightLength={1}
                arcLinkLabelsThickness={1}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
            />
        </div>
    );
}

export default PieChart;
