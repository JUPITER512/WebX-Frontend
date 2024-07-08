import React from 'react'
import { useRecoilState } from 'recoil'
const Input = ({id='', type,recoilAtom,classes='',name='',maxLength=''}) => {

  const [value,changeValue]=useRecoilState(recoilAtom)  
  const handleChange=(e)=>{
    changeValue(e.target.value)
  }
  return (
    <input maxLength={maxLength} name={name} id={id} type={type}  onChange={(e)=>{handleChange(e)}} value={value} className={classes} />
  )
}

export default Input