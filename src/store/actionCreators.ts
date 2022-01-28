import { ADD_NODE, DELETE_NODE, INITIAL } from "./actionTypes";
import { Action, Tree, } from "../types/types";

export const addNode = (parentId: string, title: string): Action => ({ type: ADD_NODE, parentId, title })
export const deleteNode = (id: string): Action => ({ type: DELETE_NODE, id })
export const initNodes = (payload: Tree): Action => ({ type: INITIAL, payload })