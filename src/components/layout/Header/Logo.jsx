import React from 'react'

export default function Logo({src= '', alt= 'logo', className = ''}) {
  return (
    <div>
      <img src={src} alt={alt} className={className} />
    </div>
  )
}
