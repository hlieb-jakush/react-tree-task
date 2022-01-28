import React from 'react'
import Button from '../Button/Buttton'
import './ButtonControler.css'

interface ButtonControlerProps {
    add: () => void,
    del: () => void,
    log: () => void
}

export const ButtonControler = ({ add, del, log }: ButtonControlerProps) => {
    return (
        <div className='buttonControler'>
            <Button onClick={add}>➕ Add child</Button>
            <Button onClick={del}>🗑️ Delete node</Button>
            <Button onClick={log}>🔍 Log path</Button>
        </div>
    )
}