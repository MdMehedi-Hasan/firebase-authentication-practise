import "./App.css";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./initializeApp.init";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [info, setInfo] = useState({});
  const logIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const user = result.user;
        setInfo(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setInfo({});
      })
      .catch((error) => {
        setInfo({});
      });
  };
  return (
    <div className="App">
      {!info.uid ? (
        <button onClick={logIn}>Log in by gmail</button>
      ) : (
        <>
          <h1>Hello {info.displayName}! Hope you are fine</h1>
          <p>Email address : {info.email}</p>
          <img src={info.photoURL} alt="" /> <br />
          <button onClick={handleSignOut}>Sign out</button>
        </>
      )}
    </div>
  );
}

export default App;
