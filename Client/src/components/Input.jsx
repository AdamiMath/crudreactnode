import React from 'react'
import styles from './input.module.css'

const Input = ({type, onChange, value}) => {


  return (
   
    <input type={type} value={value} onChange={onChange} />
    
  )
}

export default Input