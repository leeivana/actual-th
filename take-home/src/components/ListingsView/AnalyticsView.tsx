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
import type { GraphData, TotalCounts } from "../../types";

interface Props {
    colorGroups: GraphData[];
    totalCounts: TotalCounts;
    onHandleBarClick: (graphData: GraphData) => unknown;
}

const AnalyticsView = ({
    colorGroups,
    totalCounts,
    onHandleBarClick,
}: Props) => {
    return (
        <div className="flex flex-col">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={colorGroups}>
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
            <div className="flex flex-col">
                <div className="mb-5">Summary</div>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex bg-neutral-600 w-full justify-center items-center flex-col rounded-md px-5 py-5">
                        <div className="text-xl font-bold">
                            {totalCounts.users}
                        </div>
                        <div className="font-light">Total Users</div>
                    </div>
                    <div className="flex bg-neutral-500 w-full justify-center items-center flex-col rounded-md px-5 py-5">
                        <div className="text-xl font-bold">
                            {totalCounts.countries}
                        </div>
                        <div className="font-light">Countries</div>
                    </div>
                    <div className="flex bg-neutral-700 w-full justify-center items-center flex-col rounded-md px-5 py-5">
                        <div className="text-xl font-bold">
                            {totalCounts.colors}
                        </div>
                        <div className="font-light">Colors</div>
                    </div>
                    <div className="flex bg-neutral-600 w-full justify-center items-center flex-col rounded-md px-5 py-5">
                        <div className="text-xl font-bold">
                            {totalCounts.languages}
                        </div>
                        <div className="font-light">Languages</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsView;
