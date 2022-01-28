import { createContext } from "react"
import { State } from "../types/types"

interface ProviderValue {
    state?: State,
    dispatch?: React.Dispatch<any>
}

export const AppStore = createContext<ProviderValue>({ state: undefined, dispatch: undefined })