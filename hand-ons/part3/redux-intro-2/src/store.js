import { createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload }
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case "account/payLoan":
            return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan }
        default: return state;
    }
}

// Action Creators
function deposit(amount) {
    return { type: "account/deposit", payload: amount }
}

function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
}

function requestLoan(purpose, amount) {
    return { type: "account/requestLoan", payload: { purpose, amount } }
}

function payLoan() {
    return { type: "account/payLoan" }
}


const store = createStore(accountReducer);

store.dispatch(deposit(1000));

console.log(store.getState());

store.dispatch(requestLoan("Buy a car", 5000));

console.log(store.getState());

store.dispatch(payLoan());

console.log(store.getState());