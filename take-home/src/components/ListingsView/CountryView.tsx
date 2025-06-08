import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    BarChart,
} from "recharts";
import type { GraphData } from "../../types";

const CountryView = ({
    countryGroups,
    onHandleBarClick,
}: {
    countryGroups: GraphData[];
    onHandleBarClick: (graphData: GraphData) => unknown;
}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryGroups}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="count"
                    fill="#2F2F2F"
                    onClick={onHandleBarClick}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CountryView;
