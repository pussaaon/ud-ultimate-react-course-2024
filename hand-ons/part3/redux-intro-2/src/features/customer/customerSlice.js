const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createAt: "",
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

export default customerReducer;
export { createCustomer, updateName }