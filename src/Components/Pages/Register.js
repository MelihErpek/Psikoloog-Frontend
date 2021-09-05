import React, { useState, useContext } from 'react'
import AuthContext from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import ErrorNotice from "../Misc/ErrorNotice"
import axios from 'axios'

export default function Register() {
    const [AdSoyad, setAdSoyad] = useState();
    const [Mail, setMail] = useState();
    const [Sifre, setSifre] = useState();
    const [baseImage, setbaseImage] = useState();
    const [error, setError] = useState();
    const { userData, setUserData, setLoggedIn } = useContext(AuthContext);
    const history = useHistory();
    const uploadImage = async (e) => {

        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setbaseImage(base64);
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        })
    }


    const submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = { AdSoyad, Mail, Sifre, baseImage };
            const User = { Mail, Sifre };
            await axios.post("https://psikoloog.herokuapp.com/Register", newUser).then(setError("Başarıyla Kayıt Olundu."));
            let userResponse = await axios.post("https://psikoloog.herokuapp.com/Login", User);

            localStorage.setItem("auth-token", userResponse.data.token);
            localStorage.setItem("ıd", userResponse.data.user._id);
            setLoggedIn(true);
            history.push("/Doktorlar")




        } catch (err) {

            setError(err.response.data.hata)

        }



    };



    const responseSuccessGoogle = async (response) => {
        try {

            //await axios.post("http://localhost:5000/LoginWithGoogle",data).then(response=>console.log(response));
            let userResponse = await axios({
                method: "POST",
                url: "https://psikoloog.herokuapp.com/LoginWithGoogle",
                data: { tokenId: response.tokenId }
            })

            let userResponse2 = await axios({
                method: "POST",
                url: "https://psikoloog.herokuapp.com/LoginWithGoogle",
                data: { tokenId: response.tokenId }
            })

            localStorage.setItem("auth-token", userResponse2.data.token);
            localStorage.setItem("ıd", userResponse2.data.user._id);
            setLoggedIn(true);
            history.push("/Doktorlar")
        }
        catch (err) {
            setError(err.response.data.hata)
        }

    }
    const responseFailGoogle = () => {

    }

    const responseFacebook = async (response) => {
        try {
            console.log(response)
            //await axios.post("http://localhost:5000/LoginWithGoogle",data).then(response=>console.log(response));
            let userResponse = await axios({
                method: "POST",
                url: "https://psikoloog.herokuapp.com/LoginWithFacebook",
                data: { accessToken: response.accessToken, userID: response.userID }
            })

            localStorage.setItem("auth-token", userResponse.data.token);
            localStorage.setItem("ıd", userResponse.data.user._id);
            history.push("/Profil")
        }
        catch (err) {
            setError(err.response.data.hata)
        }
    }

    return (
        <div>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap' }} >
                <GoogleLogin
                    clientId="109597581602-qbhc5vt9tehonl2r25c84ljqj2c93k73.apps.googleusercontent.com"
                    buttonText="Continue With Google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseFailGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="btnGoogle"
                />
                <div style={{ marginLeft: 50 }}>
                    <FacebookLogin
                        appId="2936344436623558"
                        autoLoad={false}
                        callback={responseFacebook}
                        icon="fa-facebook"
                        cssClass="btnFacebook"
                        textButton="Continue With Facebook"
                    />
                </div>
            </div>
            <form className="form" onSubmit={submit}>
                <div className="mx-auto ">

                    <div className="form-group">
                        <label for="exampleFormControlInput1">Ad Soyad</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Ad Soyad"

                            onChange={(e) => setAdSoyad(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">E-posta Adresi</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="E-Posta Adresi"

                            onChange={(e) => setMail(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Parola</label>
                        <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Parola"

                            onChange={(e) => setSifre(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Profil Fotoğrafı</label>
                        <input type="file" className="form-control" id="exampleFormControlInput1"

                            onChange={(e) => uploadImage(e)}

                        />
                    </div>
                    <Button type="submit" className="w-100 mt-3" variant="primary">Get Started</Button>
                </div>
            </form>
        </div>
    )
}
