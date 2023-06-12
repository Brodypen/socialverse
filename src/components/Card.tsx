import React from 'react'

type CardProps = {
  creatorName: string
  creatorDescription: string
  creatorURLImage: string
  creatorURL: string
}

const Card = ({creatorName, creatorDescription, creatorURL, creatorURLImage}: CardProps) => {
  return (
    <div>{creatorName}</div>

  )
}

export default Card