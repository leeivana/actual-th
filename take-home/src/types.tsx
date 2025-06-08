import type { LucideIcon } from "lucide-react";

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    country?: string;
    language?: string;
    color?: string;
}

export const filterOptions = {
    color: "color",
    language: "language",
} as const;

export type FilterOptions = (typeof filterOptions)[keyof typeof filterOptions];

export const activeViews = {
    search: "search",
    country: "country",
    analytics: "analytics",
} as const;

export type ActiveViews = (typeof activeViews)[keyof typeof activeViews];

export type Tab = {
    id: ActiveViews | string;
    label: string;
    icon: LucideIcon;
};

export interface GraphData {
    name: string;
    count: number;
    users: User[];
}

export interface GraphInfo {
    colors: GraphData[];
    countries: GraphData[];
}
