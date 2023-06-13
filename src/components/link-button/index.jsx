import React from 'react'
import './index.css'

export default function LinkButton(props) {
  return (
    <button {...props} className='link-button' style={props.disabled ? {color: 'rgba(0,0,0,.88)',disabled: 'disabled',cursor:'not-allowed'}:{}}></button>
  )
}
