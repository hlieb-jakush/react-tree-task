import React, { useContext, useState } from 'react'
import { addNode, deleteNode } from '../../store/actionCreators'
import { GET_PATH } from '../../store/actionTypes'
import { AppStore } from '../../store/context'
import { Node, Tree } from '../../types/types'
import { ButtonControler } from '../ButtonController/ButtonControler'
import Button from '../Button/Buttton'
import './TreeItem.css'

interface TreeItemProps {
    name: string,
    content?: any,
    id: string
}

export const TreeItem = ({ name, content, id }: TreeItemProps) => {


    const [visability, setVisability] = useState(false)

    const { dispatch }: any = useContext(AppStore)

    const addHandler = (id: string) => {
        const title = prompt('please, input title', 'simple title')
        if (title) dispatch(addNode(id, title))
    }

    const deleteHandler = (id: string) => {
        dispatch(deleteNode(id))
    }

    const logHandler = (id: string) => {
        dispatch({ type: GET_PATH, id })
    }

    return (
        <div className='treeItem'>
            <div className='treeItem_body'>
                <span className='treeItem_name'>{name}</span>
                <div className='treeItem_panel'>
                    {content && content.length > 0 && <Button className='button__mr' onClick={() => setVisability(!visability)}>{visability ? '📁 Close' : '📂 Open'}</Button>}
                    <ButtonControler add={() => addHandler(id)} del={() => deleteHandler(id)} log={() => logHandler(id)} />
                </div>

            </div>
            <div className='treeItem_content'>
                {visability && content}
            </div>
        </div>
    )
}