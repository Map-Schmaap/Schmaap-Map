import React from 'react'
import Button from '../UI/Button'
import classes from './PinList.module.css'

const PinList = (props) => {
  const pinListArr = props.user.pins.map(pin => {
    return (
        <li>
          <Button>{pin.name}</Button>
        </li>
    )
  })
  
  return (
    <ul>
      {pinListArr}
    </ul>
  )
}

export default PinList