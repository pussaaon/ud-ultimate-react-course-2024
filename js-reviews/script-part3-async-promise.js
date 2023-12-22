// Promise to fullfill the async request
fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then((data) => console.log(data));

// Async/Await
async function getTodos() {
    // js will hold on this line until the fetch is done
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();

    return data;
}
// getTodo() will return as Promise. To get the data, we need to use .then() or await.
// But in React, we usually hanle this with stage management
const todos = getTodos();
console.log(todos);