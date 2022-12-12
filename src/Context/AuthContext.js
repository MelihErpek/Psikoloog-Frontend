import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const Deneme = createContext();

function AuthContextProvider(props) {
  
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,  
    
  });
  
  let token = localStorage.getItem("auth-token");
  async function getLoggedIn() {
    
    const loggedInRes = await axios.post("https://psikoloog-backend.vercel.app/loggedIn",null,
    { headers: { "x-auth-token": token } });
    /*const loggedInRes = await axios.get(
      "https://mern-auth-template-tutorial.herokuapp.com/auth/loggedIn"
    );*/
    
    setLoggedIn(loggedInRes.data);
    if (loggedInRes.data) {

      const userRes = await axios.get("https://psikoloog-backend.vercel.app/log", {
        headers: { "x-auth-token": token },
      });
      setUserData({
        token,
        user: userRes.data,
      });
    }
  }

  useEffect(() => {
    getLoggedIn();
    
  }, []);

  return (
    <Deneme.Provider value={{ userData,setUserData,loggedIn, getLoggedIn,setLoggedIn }}>
      {props.children}
    </Deneme.Provider>
  );
}

export default Deneme;
export { AuthContextProvider };
