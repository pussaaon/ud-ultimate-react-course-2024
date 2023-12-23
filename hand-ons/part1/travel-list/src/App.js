import { useState } from "react";
import Header from "./Header";
import Status from "./Status";
import PackingList from "./PackingList";
import Form from "./Form";

const App = function () {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems(items => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItems(items => items.filter(item => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems(items => items.map(
            item => item.id === id
                ? { ...item, packed: !item.packed }
                : item));
    }

    function handleClearList() {
        const confirmed = window.confirm("Are you sure you want to clear the list?");
        if (confirmed) setItems([]);
    }

    return (
        <div className="app">
            <Header />
            <Form onAddItems={handleAddItems} />
            <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList} />
            <Status items={items} />
        </div>);
}

export default App;