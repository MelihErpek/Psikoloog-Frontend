import React, { useState } from "react";
import Home from './Components/Pages/Home'
import Register from './Components/Pages/Register'
import Room from './Components/Pages/Room'
import Login from './Components/Pages/Login'
import DoktorGiris from './Components/Pages/LoginDoktor'
import Profil from './Components/Pages/Profil2'
import LostPW from './Components/Pages/SifremiUnuttum'
import SifreYenile from './Components/Pages/SifreYenile'
import Bildirimler from './Components/Pages/Bildirimler'
import DigerProfil from './Components/Pages/DigerProfil'
import Doktorlar from './Components/Pages/Doktorlar'
import Survey from './Components/Pages/Survey'
import NavBar from './Components/PartialPage/NavBar'
import arkaplan from './Components/Images/arkaplan.png'
import UserContext from "./Context/UserContext";
import AdminContext from "./Context/AdminContext";
import { AuthContextProvider } from "./Context/AuthContext";
import { AdminContextProvider } from "./Context/AdminContext";
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";
function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,

  });
  const [adminData, setAdminData] = useState({
    token: undefined,
    user: undefined,

  });
  /* useEffect(() => {
 
     const checkLoggedIn = async () => {
       let token = localStorage.getItem("auth-token");
 
 
       if (token === '') {
         console.log("token yok")
         localStorage.setItem("auth-token", "");
         token = "";
       }
 
       const tokenRes = await Axios.post(
         "http://localhost:5000/tokenIsValid",
         null,
         { headers: { "x-auth-token": token } }
       );
      
       if (tokenRes.data) {
 
         const userRes = await Axios.get("http://localhost:5000/", {
           headers: { "x-auth-token": token },
         });
         setUserData({
           token,
           user: userRes.data,
         });
       }
       
     };
     checkLoggedIn();
     
   },[]);*/

  return (
    <div style={{
      backgroundImage: `url(${arkaplan})`, backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }}>
      <Router>
        <AuthContextProvider>
          <AdminContextProvider>
            <UserContext.Provider value={{ userData, setUserData }}>
              <AdminContext.Provider value={{ adminData, setAdminData }}>
                <NavBar />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/Profil/:id" exact component={DigerProfil} />
                  <Route path="/KayıtOl" exact component={Register} />
                  <Route path="/GirisYap" exact component={Login} />
                  <Route path="/DoktorGirisYap" exact component={DoktorGiris} />
                  <Route path="/Profil" exact component={Profil} />
                  <Route path="/Doktorlar" exact component={Doktorlar} />
                  <Route path="/SifremiUnuttum" exact component={LostPW} />
                  <Route path="/Randevular" exact component={Bildirimler} />
                  <Route path="/SifreYenile/:id" exact component={SifreYenile} />
                  <Route path="/Survey" exact component={Survey} />
                  <Route path="/room/:roomID" component={Room} />
                </Switch>
              </AdminContext.Provider>
            </UserContext.Provider>
          </AdminContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
