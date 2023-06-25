import React from 'react'
import Header from '../components/Header'

const AddCreator = () => {
  const [name, setName] = React.useState('')
  const [imageURL, setImageURL] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [url, setURL] = React.useState('')
  
  return (
    <div className="min-h-screen">
      <Header/>
      AddCreator</div>
  )
}

export default AddCreator