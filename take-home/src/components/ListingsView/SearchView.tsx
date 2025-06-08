import { useState } from "react";
import type { FilterOptions, User } from "../../types";
import { filterOptions } from "../../types";
import { List, AutoSizer } from "react-virtualized";
import type { ListRowProps } from "react-virtualized";

interface Props {
    nullCounts: Record<string, number>;
    users: User[];
    onSearch: (category: FilterOptions, value: string) => unknown;
    onClearUsers: () => unknown;
}

const ROW_HEIGHT = 100;
const ROW_CONTENT_HEIGHT = 90;

const SearchView = ({ nullCounts, users, onSearch, onClearUsers }: Props) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchCategory, setSearchCategory] = useState<FilterOptions>(
        filterOptions.color
    );

    const onClearSearch = () => {
        setSearchValue("");
        onClearUsers();
    };

    const onSearchUser = () => {
        onSearch(searchCategory, searchValue);
    };

    const rowRenderer = ({ index, key, style }: ListRowProps) => {
        const user = users[index];
        return (
            <div key={key} style={{ ...style, height: ROW_HEIGHT }}>
                <div
                    className="text-neutral-300 bg-neutral-700 rounded-md px-4 py-2"
                    style={{
                        height: ROW_CONTENT_HEIGHT,
                        boxSizing: "border-box",
                        padding: "8px", // Add your desired padding here
                    }}
                >
                    <div className="font-bold">
                        {user.first_name} {user.last_name}
                    </div>
                    <div className="text-xs">{user.email}</div>
                    <div className="flex mt-5 text-xs justify-between">
                        <div>{user.country || "N/A"}</div>
                        <div>{user?.color ? user.color : "N/A"}</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="bg-neutral-700 rounded-xl shadow-lg p-6">
                <div className="flex flex-col gap-4 mb-4">
                    <select
                        value={searchCategory}
                        onChange={(e) =>
                            setSearchCategory(e?.target?.value as FilterOptions)
                        }
                        className="px-3 py-2 bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 rounded-md text-sm focus:outline-none focus:border-neutral-500"
                    >
                        <option value={filterOptions.color}>Color</option>
                        <option value={filterOptions.language}>Language</option>
                    </select>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={searchValue}
                            placeholder={`Search ${searchCategory}`}
                            className="flex-1 px-3 py-2 bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 rounded-md text-sm focus:outline-none focus:border-neutral-500"
                            onChange={(e) => setSearchValue(e?.target?.value)}
                        />
                        <button
                            className="text-white-600 px-4 py-2 rounded-md text-sm hover:bg-neutral-800 transition-colors"
                            onClick={onSearchUser}
                        >
                            Search
                        </button>
                        <button
                            className="text-white-600 px-4 py-2 rounded-md text-sm hover:bg-neutral-800 transition-colors"
                            onClick={onClearSearch}
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <div className="text-xs text-neutral-400">
                    Users without data: {nullCounts.color} without color,{" "}
                    {nullCounts.language} without language
                </div>
            </div>
            {!!users.length && (
                <div className="text-sm" style={{ marginTop: 20, height: 250 }}>
                    <div className="mb-2 text-neutral-400">
                        {users.length} Results
                    </div>
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={users.length}
                                rowHeight={ROW_HEIGHT}
                                rowRenderer={rowRenderer}
                                overscanRowCount={3}
                            />
                        )}
                    </AutoSizer>
                </div>
            )}
        </>
    );
};

export default SearchView;
