import React from 'react'

const Button = ({ fetchWithGeoLocation, children }) => {

  return (
    <button type='button' onClick={fetchWithGeoLocation}>{children}</button>
  )
}

export default Button