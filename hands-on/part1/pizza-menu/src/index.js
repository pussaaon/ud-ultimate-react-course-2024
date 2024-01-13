import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import pizzaData from './data.js';

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    )
}

const Header = function () {
    return <header className="header"><h1>Fast React Pizza Co.</h1></header >
}

const Menu = function () {
    return (
        <div className="menu">
            <h2>Our Menu</h2>
            {
                pizzaData.length === 0 ?
                    <p>No pizzas available</p> :
                    pizzaData.length > 0 && (
                        <>
                            <p>
                                Authentic Italian cuisine. 6 creative dishes to choose from.
                                All from our stone oven, all organic, all delicious.
                            </p>
                            <ul className="pizzas">
                                {pizzaData.map(pizza => <Pizza pizzaObj={pizza} key={pizza.name} />)}
                            </ul>
                        </>
                    )
            }
        </div>
    );
}

function Pizza({ pizzaObj }) {
    // examples of multiple conditional rendering
    // if (pizzaObj.soldOut) return null;

    return (
        <li className={`pizza ${pizzaObj.soldOut && "sold-out"}`}>
            <img src={pizzaObj.photoName} alt={pizzaObj.name} />
            <div>
                <h3>{pizzaObj.name}</h3>
                <p>{pizzaObj.ingredient}</p>
                <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price * 1.07}</span>
            </div>
        </li >
    );
}

const Footer = function () {
    //return React.createElement('footer', null, 'Best Pizza in Town');
    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;

    return (
        <footer>
            {isOpen && <Order closeHour={closeHour} />}
        </footer>
    )
}

const Order = function ({ closeHour }) {
    return (
        <div className="order">
            <p>We are open until {closeHour}:00. Come visit us or order online.</p>
            <button className="btn">Order</button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>);