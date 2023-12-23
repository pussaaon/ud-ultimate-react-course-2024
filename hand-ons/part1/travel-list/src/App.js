
const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
];



const App = function () {
    return (
        <div className="app">
            <Header />
            <Form />
            <PackingList />
            <Status items={initialItems} />
        </div>);
}

const Header = function () {
    return (
        <h1>🏝️ Far Away 🧳</h1>
    );
}

const Form = function () {

    function handleSubmit(e) {
        e.preventDefault();

    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select>
                {Array.from({ length: 20 }, (c, i) => i + 1).map(item =>
                    <option key={item} value={item}>{item}</option>
                )}
            </select>
            <input type="text" placeholder="Item" />
            <button>Add</button>
        </form>
    );
}

const PackingList = function () {
    return (
        <div className="list">
            <ul>
                {initialItems.map(
                    item => <Item key={item.id} item={item} />)}
            </ul>
        </div>
    );
}

const Item = function ({ item }) {
    return (
        <li>
            <input type="checkbox"
                value={item.packed} />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity}
                {item.description}
            </span>
            <button>&times;</button>
        </li>
    );
}

const Status = function ({ items }) {

    const numItems = items.length;
    const numPacked = items.filter(item => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);

    return (
        <footer className="stats">
            <em>
                {percentage === 100
                    ? "You got everything! Ready to go fly ✈️"
                    : `You have ${numItems} items on your list, and you already packed
                    ${numPacked} (${percentage}%).`}
            </em>
        </footer>
    );
}

export default App;