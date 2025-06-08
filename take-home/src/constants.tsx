import type { Tab } from "./types";
import { activeViews } from "./types";
import { Search, MapPin, PieChartIcon } from "lucide-react";

export const NO_COUNTRY = "No Country";
export const NO_COLOR = "No Color";

export const TABS: Tab[] = [
    {
        id: activeViews.search,
        label: "Search",
        icon: Search,
    },
    {
        id: activeViews.country,
        label: "Countries",
        icon: MapPin,
    },
    {
        id: activeViews.analytics,
        label: "Analytics",
        icon: PieChartIcon,
    },
];
