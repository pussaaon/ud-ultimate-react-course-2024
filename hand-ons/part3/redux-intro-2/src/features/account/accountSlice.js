const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload, isLoading: false }
        case "account/convertingCurrency":
            return { ...state, isLoading: true }
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

// Account Action Creators
function deposit(amount, currency) {
    if (currency === "USD") return { type: "account/deposit", payload: amount };

    return async (dispatch, getState) => {
        dispatch({ type: "account/convertingCurrency" });

        const host = 'api.frankfurter.app';
        const res = await fetch(
            `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const convertedAmount = data.rates.USD;

        dispatch({ type: "account/deposit", payload: convertedAmount });
    }
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

export default accountReducer;
export { deposit, withdraw, requestLoan, payLoan };