import data from "../mock-data/MOCK_DATA.json";
import type { User, GraphData, FilterOptions, GraphInfo } from "../types";
import { NO_COLOR, NO_COUNTRY } from "../constants";

// Fetches all data
export const fetchData = (): User[] => {
    return data as User[];
};

// Fetches listings by specific color or language
export const fetchListingsByAttribute = (
    attribute: FilterOptions,
    value: string
): User[] => {
    if (!value) {
        return data as User[];
    }

    return (data as User[])?.filter(
        (listing: User) =>
            listing[attribute]?.toLowerCase() === value?.toLocaleLowerCase()
    );
};

// Fetches all unique countries and colors from the listings
export const fetchGroups = (): GraphInfo => {
    const countryMap: Record<string, Partial<GraphData>> = {};
    const colorMap: Record<string, Partial<GraphData>> = {};
    (data as User[]).forEach((listing: User) => {
        let { country, color } = listing;
        if (!country) country = NO_COUNTRY;
        if (!color) color = NO_COLOR;

        if (!countryMap[country]) countryMap[country] = { count: 0, users: [] };
        countryMap[country].count!++;
        countryMap[country].users!.push(listing);

        if (!colorMap[color]) colorMap[color] = { count: 0, users: [] };
        colorMap[color].count!++;
        colorMap[color].users!.push(listing);
    });

    return {
        countries: Object.entries(countryMap).map(([country, info]) => ({
            name: country,
            count: info.count!,
            users: info.users!,
        })),
        colors: Object.entries(colorMap).map(([country, info]) => ({
            name: country,
            count: info.count!,
            users: info.users!,
        })),
    };
};

// Fetches listings with null values for a specific attribute
export const fetchListingsWithNullAttribute = (
    attribute: FilterOptions
): number => {
    return data?.filter((listing) => listing[attribute] === null).length;
};
