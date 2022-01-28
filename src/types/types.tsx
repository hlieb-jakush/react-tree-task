export type Tree = Node[]

export type Node = {
    name: string,
    id?: string,
    children?: Tree
}

export type InputsValues = {
    [key: string]: HTMLInputElement | null;
}

export type Action = {
    type: string,
    id?: string,
    title?: string,
    parentId?: string,
    payload?: Tree
}

export type State = {
    nodes: Node[],
    path?: string
}




