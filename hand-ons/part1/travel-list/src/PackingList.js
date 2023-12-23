import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {

    const [sortBy, setSortBy] = useState("input");

    let sortedItems;

    if (sortBy === "input") sortedItems = items;
    if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "status") sortedItems = items.slice().sort((a, b) => b.packed - a.packed);

    return (
        <div className="list">
            <ul>
                {sortedItems.map(
                    item => <Item
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onToggleItem={onToggleItem}
                        item={item} />)}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="input">Sort by Input Order</option>
                    <option value="description">Sort by Description</option>
                    <option value="status">Sort by Packed Status</option>
                </select>
                <button onClick={onClearList}>Clear List</button>
            </div>
        </div>
    );
};
