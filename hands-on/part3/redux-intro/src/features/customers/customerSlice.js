const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createAt: ""
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createAt: action.payload.createAt }
        case "account/updateName":
            return { ...state, fullName: action.payload }
        default:
            return state;
    }
}

function createCustomer(fullName, nationalID) {
    return { type: 'customer/createCustomer', payload: { fullName, nationalID, createdAt: new Date().toISOString() } }
}

function updateName(fullName) {
    return { type: 'account/updateName', payload: fullName }
}

export default customerReducer;
export { createCustomer, updateName }