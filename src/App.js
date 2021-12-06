
import './App.css';
import {initializeApp} from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

const app = initializeApp(firebaseConfig);


function App() {
  
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })
  const provider = new GoogleAuthProvider();
  const handleSignIn = () =>{
      const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const {displayName, photoURL, email} = result.user;
        const signedInUser ={
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);

    }).catch(error =>{
      console.log(error);
      console.log(error.message);
    }) 
  }
  const handleSignOut = () =>{
    const auth = getAuth();
    signOut(auth)
    .then((result) => {
      const signOutUser = {
        isSignedIn: false,
        name:'',
        email:'',
        photo:','
      }
      setUser(signOutUser);
      console.log('Sign-out successful.')// Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleBlur = (event) =>{
     let isFormValid = true;
     if ( event.target.name === 'email'){
        isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
     }
     if(event.target.name ==='password'){
       const isPasswordValid = event.target.value.length > 8;
       const passwordHasNumber =/^[A-Za-z]\w{7,14}$/.test(event.target.value);
       isFormValid = isPasswordValid && passwordHasNumber;
     }
     if(isFormValid){
       const newUserinfo = {...user};
       newUserinfo[event.target.name] = event.target.value;
       setUser(newUserinfo);
     }
  }
  const handleSubmit = () =>{

  }
  return (
    <div className="App">
      { 
        user.isSignedIn ? <button onClick={handleSignOut}
        className='main-button'>Sign Out</button>:
        <button onClick={handleSignIn}
        className='main-button'>Sign in</button>
      }
      {
        user.isSignedIn && <div> 
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""></img>

        </div>
        
      }
      <h1>Our Authentication section</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <form onSubmit={handleSubmit}>
      <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name" required/>
      <br />
      <input type="text" name="email" onBlur={handleBlur} placeholder='Enter Your Email' required/>
      <br />
      <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required/>
      <br />
      <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
