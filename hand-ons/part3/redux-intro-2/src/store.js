import { createStore, combineReducers } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createAt: "",
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

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/create":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createAt: action.payload.createAt
            }
        case "customer/updateName":
            return { ...state, fullName: action.payload }
        default: return state;
    }
}

// Account Action Creators
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

// Customer Action Creators
function createCustomer(fullName, nationalID) {
    return {
        type: "customer/create",
        payload: { fullName, nationalID, createAt: new Date().toISOString() }
    }
}

function updateName(fullName) {
    return {
        type: "customer/updateName",
        payload: fullName
    }
}
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});
const store = createStore(rootReducer);

store.dispatch(deposit(1000));

console.log(store.getState());

store.dispatch(requestLoan("Buy a car", 5000));

console.log(store.getState());

store.dispatch(payLoan());

console.log(store.getState());

store.dispatch(createCustomer("Jamie", "123456789"));

console.log(store.getState());

store.dispatch(deposit(1000));

store.dispatch(deposit(500));