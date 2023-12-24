import { useState } from "react";
import "./styles.css";

const faqs = [
    {
        title: "Where are these chairs assembled?",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
    },
    {
        title: "How long do I have to return my chair?",
        text:
            "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
    },
    {
        title: "Do you ship to countries outside the EU?",
        text:
            "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
    }
];

export default function App() {
    return (
        <div>
            <Accordion />
        </div>
    );
}

function Accordion() {

    const [currOpen, setCurrOpen] = useState(null);

    function handleCurrOpen(index) {
        if (currOpen === index) {
            setCurrOpen(null);
            return;
        }
        setCurrOpen(index);
    }


    return <div className="accordion">
        {faqs.map((el, i) => (
            <AccordionItem
                number={i}
                key={i}
                title={el.title}
                text={el.text}
                isOpen={currOpen === i}
                onOpen={handleCurrOpen}
            />
        ))}
    </div>;
}

function AccordionItem({ number, title, text, isOpen, onOpen }) {
    return (
        <div className={`item ${isOpen ? "open" : ""}`}
            onClick={() => onOpen(number)}>
            <p className="number">{number <= 9 ? `0${number + 1}` : number + 1}</p>
            <p className="title">{title}</p>
            <p className="icon">
                {isOpen ? '-' : '+'}
            </p>
            {isOpen && <div className="content-box">
                {text}
            </div>}

        </div >
    );
}