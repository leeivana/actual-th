import { useState, useEffect } from "react";
import type { GraphData, User, ActiveViews, FilterOptions } from "../../types";
import { filterOptions, activeViews } from "../../types";
import {
    fetchListingsByAttribute,
    fetchGroups,
    fetchListingsWithNullAttribute,
    fetchData,
} from "../../middleware/middleware";
import { TABS } from "../../constants";
import AnalyticsView from "./AnalyticsView";
import CountryView from "./CountryView";
import SearchView from "./SearchView";
import Modal from "./Modal";

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

    const onSearch = (searchCategory: FilterOptions, searchValue: string) => {
        setUsers(fetchListingsByAttribute(searchCategory, searchValue));
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
                        <AnalyticsView
                            colorGroups={colorGroups}
                            totalCounts={totalCounts}
                            onHandleBarClick={onHandleBarClick}
                        />
                    )}
                    {activeView === activeViews.country && (
                        <CountryView
                            countryGroups={countryGroups}
                            onHandleBarClick={onHandleBarClick}
                        />
                    )}
                    {activeView === activeViews.search && (
                        <SearchView
                            users={users}
                            nullCounts={nullCounts}
                            onSearch={onSearch}
                            onClearUsers={() => setUsers([])}
                        />
                    )}
                </div>
            </div>
            <Modal modalData={modalData} onSetModalData={setModalData} />
        </>
    );
};
