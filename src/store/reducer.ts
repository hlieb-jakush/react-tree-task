import { uid } from "react-uid"
import { Action, State, Node, Tree } from "../types/types"
import { ADD_NODE, DELETE_NODE, GET_PATH, INITIAL } from "./actionTypes"

export const initialState = { nodes: [] }

function reducer(state: State, action: any): State {
    let treeWalker: Function
    switch (action.type) {
        case ADD_NODE:
            treeWalker = (node: Node) => {
                if (!Array.isArray(node)) {
                    if (node.id === action.parentId) {
                        if (!node.children) node.children = []
                        const newNode: Node = { name: action.title }
                        newNode.id = uid(newNode)
                        node.children = [...node.children, newNode]
                        return node
                    }

                    if (node.children) treeWalker(node.children)

                    return node
                } else {
                    const array = []

                    for (let subNode of node) {
                        array.push(treeWalker(subNode))
                    }

                    return array
                }
            }
            return {
                ...state,
                nodes: [...state.nodes.map(i => treeWalker(i))]
            }
        case DELETE_NODE:
            treeWalker = (node: Node) => {
                if (node.children) node.children = node.children.filter((subNode: Node) => treeWalker(subNode))
                return node.id !== action.id
            }
            return {
                ...state,
                nodes: [...state.nodes.filter(node => treeWalker(node))]
            }
        case GET_PATH:
            treeWalker = (tree: Tree, path: any) => {
                path = path || []
                tree.forEach(node => {
                    if (node.id === action.id) {
                        console.log(path.concat(node.name).join(' > '))
                    }
                    if (node.children) {
                        return treeWalker(node.children, path.concat(node.name))
                    }
                })
            }
            return {
                ...state,
                path: treeWalker([...state.nodes], null)
            }
        case INITIAL:
            treeWalker = (node: Node) => {

                if (!Array.isArray(node)) {
                    if (!node.id) node.id = uid(node)
                    if (node.children) treeWalker(node.children)
                    return node
                }

                if (Array.isArray(node)) {
                    let array = []

                    for (let subNode of node) {
                        if (!subNode.id) subNode.id = uid(subNode)
                        if (subNode.children) {
                            array.push(treeWalker(subNode.children))
                        } else {
                            array.push(subNode)
                        }
                    }
                    return array
                }
            }
            return {
                ...state,
                nodes: [...action.payload.map((node: Node) => treeWalker(node))]
            }
        default:
            return state
    }
}

export default reducer