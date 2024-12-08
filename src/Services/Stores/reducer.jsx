// Initial
export const ReducerInit = {
    data: [],
    single: {},
    error: null,
    loading: false
}

// Reducer
export const Reducer = ( state, action ) => {
    switch (action.type) {
        case "LOADING":
            return {
                data: {...state?.data},
                single: {...state?.single},
                error: false,
                loading: true
            }
        case "SUCCESS":
            return {
                data: {...state?.data, [action.name]: action.payload},
                single: {...state?.single, [action.name]: {}},
                error: false,
                loading: false,
            }
        case "SINGLE":
            return {
                data: {...state?.data},
                single: {...state?.single, [action.name]: action.payload},
                error: false,
                loading: false,
            }
        case "ERRORS":
            return {
                data: {...state?.data, [action.name]: []},
                single: {...state?.single, [action.name]: {}},
                error: action.error,
                loading: false,
            }
        default:
            return state;
    }
}