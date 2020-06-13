let initialState = {
    data: [],
    'STOCKS.LIST': [],
    'EQUITY_ORDER.HISTORY': [],
    'EQUITY_ORDER.CANCEL': [],
    'EQUITY_ORDER.MODIFY': []
}

let reducer = (state = initialState, action) => {
    return { ...state, [action.type]: action.data };
};

export default reducer;