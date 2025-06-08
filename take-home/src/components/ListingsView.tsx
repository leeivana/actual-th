import { useState, useEffect } from "react";
import type { GraphData, FilterOptions, User, ActiveViews } from "../types";
import { filterOptions, activeViews } from "../types";
import {
    fetchListingsByAttribute,
    fetchGroups,
    fetchListingsWithNullAttribute,
    fetchData,
} from "../middleware/middleware";
import { XIcon } from "lucide-react";
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
import { Dialog, Description } from "@headlessui/react";
import { TABS } from "../constants";

export const ListingsView = () => {
    const [users, setUsers] = useState<Array<User>>([]);
    const [countryGroups, setCountryGroups] = useState<GraphData[]>([]);
    const [colorGroups, setColorGroups] = useState<GraphData[]>([]);
    const [totalCounts, setTotalCounts] = useState({
        users: 0,
        countries: 0,
        colors: 0,
        languages: 0,
    });
    const [nullCounts, setNullCounts] = useState({ color: 0, language: 0 });
    const [searchCategory, setSearchCategory] = useState<FilterOptions>(
        filterOptions.color
    );
    const [searchValue, setSearchValue] = useState<string>("");
    const [activeView, setActiveView] = useState<ActiveViews>(
        activeViews.search
    );
    const [modalData, setModalData] = useState<GraphData | null>(null);

    useEffect(() => {
        const { colors, countries } = fetchGroups();
        setCountryGroups(countries);
        setColorGroups(colors);
        onGetNullCounts();
        onGetTotalCounts();
    }, []);

    const onGetTotalCounts = () => {
        const data = fetchData();
        const uniqueCountries = new Set<string>();
        const uniqueColors = new Set<string>();
        const uniqueLanguages = new Set<string>();
        data.forEach((user: User) => {
            if (user.country) uniqueCountries.add(user.country);
            if (user.color) uniqueColors.add(user.color);
            if (user.language) uniqueLanguages.add(user.language);
        });

        setTotalCounts({
            users: data.length,
            countries: uniqueCountries.size,
            colors: uniqueColors.size,
            languages: uniqueLanguages.size,
        });
    };

    const onGetNullCounts = () =>
        setNullCounts({
            color: fetchListingsWithNullAttribute(filterOptions.color),
            language: fetchListingsWithNullAttribute(filterOptions.language),
        });

    const onSearch = () => {
        setUsers(fetchListingsByAttribute(searchCategory, searchValue));
    };

    const onClearSearch = () => {
        setUsers([]);
        setSearchValue("");
    };

    const onHandleBarClick = (data: GraphData) => setModalData(data);

    return (
        <>
            <div className="min-h-screen bg-neutral-800 text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2">
                            User Dashboard
                        </h1>
                        <p>Search, visualize, and analyze your user data</p>
                    </div>

                    <div className="flex justify-center mb-9">
                        <div className="bg-neutral-900 rounded-lg shadow-lg p-1 flex space-x-1">
                            {TABS.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() =>
                                        setActiveView(id as ActiveViews)
                                    }
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                                        activeView === id
                                            ? "bg-neutral-800 text-white shadow-md"
                                            : "text-white-200 hover:bg-neutral-800"
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {activeView === activeViews.analytics && (
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
                                        <div className="font-light">
                                            Total Users
                                        </div>
                                    </div>
                                    <div className="flex bg-neutral-500 w-full justify-center items-center flex-col rounded-md px-5 py-5">
                                        <div className="text-xl font-bold">
                                            {totalCounts.countries}
                                        </div>
                                        <div className="font-light">
                                            Countries
                                        </div>
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
                                        <div className="font-light">
                                            Languages
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeView === activeViews.country && (
                        <div>
                            <div>
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
                            </div>
                        </div>
                    )}
                    {activeView === activeViews.search && (
                        <>
                            <div className="bg-neutral-700 rounded-xl shadow-lg p-6">
                                <div className="flex flex-col gap-4 mb-4">
                                    <select
                                        value={searchCategory}
                                        onChange={(e) =>
                                            setSearchCategory(
                                                e?.target
                                                    ?.value as FilterOptions
                                            )
                                        }
                                        className="px-3 py-2 bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 rounded-md text-sm focus:outline-none focus:border-neutral-500"
                                    >
                                        <option value={filterOptions.color}>
                                            Color
                                        </option>
                                        <option value={filterOptions.language}>
                                            Language
                                        </option>
                                    </select>

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) =>
                                                setSearchValue(e?.target?.value)
                                            }
                                            placeholder={`Search ${searchCategory}`}
                                            className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 rounded-md text-sm focus:outline-none focus:border-neutral-500"
                                        />
                                        <button
                                            onClick={onSearch}
                                            className="text-white-600 px-4 py-2 rounded-md text-sm hover:bg-neutral-800 transition-colors"
                                        >
                                            Search
                                        </button>
                                        <button
                                            onClick={onClearSearch}
                                            className="text-white-600 px-4 py-2 rounded-md text-sm hover:bg-neutral-800 transition-colors"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                                <div className="text-xs text-neutral-400">
                                    Users without data: {nullCounts.color}{" "}
                                    without color, {nullCounts.language} without
                                    language
                                </div>
                            </div>
                            {!!users.length && (
                                <div className="text-sm">
                                    <div className="mt-5 mb-2 text-neutral-400">
                                        {users.length} Results
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {users.map((user) => (
                                            <div
                                                key={user.id}
                                                className="text-neutral-300 bg-neutral-700 rounded-md px-4 py-2"
                                            >
                                                <div className="font-bold">
                                                    {user.first_name}{" "}
                                                    {user.last_name}
                                                </div>
                                                <div className="text-xs">
                                                    {user.email}
                                                </div>
                                                <div className="flex mt-5 text-xs justify-between">
                                                    <div className="">
                                                        {user.country || "N/A"}
                                                    </div>
                                                    <div>
                                                        {user?.color
                                                            ? user.color
                                                            : "N/A"}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Dialog
                open={!!modalData}
                onClose={() => setModalData(null)}
                className="fixed inset-0 z-10 flex items-center justify-center"
            >
                <div
                    className="fixed inset-0 bg-black opacity-30"
                    aria-hidden="true"
                />
                <div className="bg-neutral-800 max-w-md w-full max-h-[50vh] overflow-y-auto rounded p-4 z-20 relative">
                    <Description>
                        <div className="mb-5 text-lg">{modalData?.name}</div>
                        {!!modalData &&
                            (modalData?.users || []).map((user) => (
                                <div
                                    key={user.id}
                                    className="text-sm flex justify-between"
                                >
                                    <div>
                                        {user.first_name} {user.last_name}
                                    </div>
                                    <div className="text-xs">
                                        {user.language || "N/A"}
                                    </div>
                                </div>
                            ))}
                    </Description>
                    <button
                        onClick={() => setModalData(null)}
                        className="absolute top-2 right-2 px-2 py-1"
                    >
                        <XIcon />
                    </button>
                </div>
            </Dialog>
        </>
    );
};
