import React from 'react'
import { CreatorType } from '../types/collection'


const CreatorCard = ({creator} : {creator: CreatorType}) => {
  return (
    <div>{creator.name}</div>

  )
}

export default CreatorCard