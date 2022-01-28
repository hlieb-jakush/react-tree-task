import React, { useReducer } from 'react'
import { AppStore } from './store/context'
import reducer, { initialState } from './store/reducer'
import { initNodes } from './store/actionCreators'
import { getNodes } from './store/selectors'
import { Node, State, Tree } from './types/types'
import { TreeItem } from './components/TreeItem/TreeItem'
import Button from './components/Button/Buttton'
import './App.css'

interface ProviderValue {
  state: State,
  dispatch: React.Dispatch<any>
}


function App() {

  const tree = [
    {
      name: "guitars",
      children: [
        {
          name: "acoustic",
          children: [
            { name: "Kremona" },
            { name: "Epiphone" },
            { name: "Gibson" },
            { name: "Yamaha" },
          ],
        },
        {
          name: "electric",
          children: [
            {
              name: "Fender",
              children: [
                {
                  name: "Telecaster",
                },
                {
                  name: "Stratocaster",
                },
                {
                  name: "Jaguar",
                },
              ],
            },
            {
              name: "Gibson",
              children: [
                {
                  name: "Les Paul",
                },
                {
                  name: "SG",
                },
                {
                  name: "ES-335",
                },
                {
                  name: "ES-339",
                },
              ],
            },
          ],
        },
        { name: "acoustic bass" },
        { name: "electric bass" },
      ],
    },
  ]

  const treeWalker = (node: Node) => {
    if (!node) return
    if (!Array.isArray(node) && !node.children) {
      return <TreeItem name={node.name} key={node.id} id={node.id} />
    }

    if (!Array.isArray(node) && node.children) {
      return <TreeItem name={node.name} content={treeWalker(node.children)} key={node.id} id={node.id} />
    }

    if (Array.isArray(node)) {
      let array = []

      for (let subNode of node) {
        if (subNode.children) {
          array.push(<TreeItem name={subNode.name} content={treeWalker(subNode.children)} key={subNode.id} id={subNode.id} />)
        } else {
          array.push(<TreeItem name={subNode.name} key={subNode.id} id={subNode.id} />)
        }
      }

      return array
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const asycFetch = (tree: Tree) => {
    new Promise((res, rej) => {
      setTimeout(() => res(tree), 1500)
    }).then((response: any) => dispatch(initNodes(response)))
  }

  return (
    <AppStore.Provider value={{ state, dispatch }}>
      <main className='app_main'>
        {getNodes(state) && getNodes(state).length
          ? getNodes(state).map(node => treeWalker(node))
          : <Button onClick={() => asycFetch(tree)}>Fetch data</Button>}
      </main>
    </AppStore.Provider >
  )
}

export default App;