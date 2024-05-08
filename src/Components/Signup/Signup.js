import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom'



export default function Signup() {
  const history= useHistory()

  const [username, setUsername]= useState('')
  const [email, setEmail]= useState('')
  const [phone, setPhone]= useState('')
  const [password, setPassword]= useState('')
  const {firebase}= useContext(FirebaseContext)
  const [errMessage, setErrMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  let handleSubmit=(e)=>{
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          setIsLoading(false);
          history.push('/login')
        })
      })
    }).catch((err) => {
      setIsLoading(false);
      setErrMessage(err.message)
      console.error('Signup error:', err);
    })
  }

  return (
    <div>
       {isLoading ?
        <ColorRing />
        :
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <p style={{ color: 'red' }}>{errMessage}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>history.push('/login')}>Login</a>
      </div>
}
    </div>
  );
}
