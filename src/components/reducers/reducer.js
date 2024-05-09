export const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_LIST_RECURSOS': 
            return {...state, recursosList: action.payload}
        case 'ADD_FAV':
            return {...state, dentistaSelected: [...state.dentistaSelected, action.payload]}
        case 'DEL_FAV':
            return {...state, dentistaSelected: state.dentistaSelected.filter(dentista => dentista.id !== action.payload.id)}
        case 'CHANGE_THEME': 
            return {...state,theme:state.theme=='light'?'dark':'light'}
    }
}   