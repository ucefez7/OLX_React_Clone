import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

const Create = () => {

  const {firebase}= useContext(FirebaseContext)
  const {user}= useContext(AuthContext)
  const [name,setName]= useState('');
  const [category,setCategory]= useState('');
  const [price,setPrice]= useState('')
  const [image,setImage]= useState('')
  const [error, setError] = useState(null); 
  const history= useHistory()
  const [isLoading, setIsLoading] = useState(false);

  const date= new Date()

  const handleSubmit=()=>{

    if (!name.trim() || !category.trim() || !price.trim() || !image) {
      setError('Please fill out all fields');
      return;
    }
    
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt: date.toDateString()
        })
        history.push('/')
      })
    }).catch((err)=>{
      setIsLoading(false); 
      setError(err.message); 
    })
  }
  


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} id="fname" name="Price" />
            <br />
            {error && <p className="error text-danger">{error}</p>} 
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])}
            type="file" />
            <br />
            {isLoading ? (
              <ColorRing />
            ) : (
              <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
            )}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
