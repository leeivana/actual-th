### Description
React app that allows users to search and analytize data (no backend, everything is handled in-memory using a local JSON dataset)

#### Summary
<img width="1430" alt="Screenshot 2025-06-09 at 12 11 47 AM" src="https://github.com/user-attachments/assets/46b02f02-0344-453e-aa2f-e8a3a923f121" />

#### Search
<img width="1439" alt="Screenshot 2025-06-09 at 12 10 24 AM" src="https://github.com/user-attachments/assets/90805b7b-a7e9-4cc4-a1be-98ebb3f27e71" />

#### Countries Graph
<img width="1431" alt="Screenshot 2025-06-09 at 12 10 51 AM" src="https://github.com/user-attachments/assets/45fa474c-c89d-4c35-8b60-b27c49f9e18f" />

#### Graph Modal
<img width="1430" alt="Screenshot 2025-06-09 at 12 11 13 AM" src="https://github.com/user-attachments/assets/d61b3b2b-f67b-4803-9b13-b1f10c348230" />

#### Color Graph
<img width="1427" alt="Screenshot 2025-06-09 at 12 11 33 AM" src="https://github.com/user-attachments/assets/fa081b09-6b41-4df0-bd37-867fe649ee5b" />

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Recharts](https://recharts.org/) – for data visualization
- [react-virtualized](https://github.com/bvaughn/react-virtualized) – for efficient list rendering
- [@headlessui/react](https://headlessui.com/) – for accessible, unstyled UI primitives
- [lucide-react](https://lucide.dev/) – for beautiful, customizable icons

## Features

- **Search and Filter**: Find all users by color or language
- **Group by Country & Color**: View users organized and visualized by country and color.

## Middleware logic
#### `fetchData(): User[]`
Returns the full list of users from `MOCK_DATA.json`.

#### `fetchListingsByAttribute(attribute: FilterOptions, value: string): User[]`
Filters user listings by a given attribute (`color` or `language`) and value.

**Params:**
- `attribute`: `"color"` | `"language"`
- `value`: the string value to match (case-insensitive)

**Returns:** Filtered list of users.

#### `fetchGroups(): GraphInfo`
Groups all user listings by `country` and `color`, and returns counts and users for each group.

**Returns:**
```ts
{
  countries: Array<{ name: string, count: number, users: User[] }>,
  colors: Array<{ name: string, count: number, users: User[] }>
}
```


