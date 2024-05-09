import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducers/reducer";

const IntegraContext = createContext()

export const useIntegraStates = () => useContext(IntegraContext)

const initialState = {
    token:null,
    recursosList:[],
    reservasList:[],
    prestamosList:[],
    devolucionesList:[],
    usuario:null,
    usuariosList:[]
}

// eslint-disable-next-line react/prop-types
export function ContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    //console.log(state)
    return (
        <IntegraContext.Provider value={{state, dispatch}}>
            {children}
        </IntegraContext.Provider>
    )
}