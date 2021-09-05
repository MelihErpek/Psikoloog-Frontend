import React, { useState, useContext } from 'react'
import ErrorNotice from "../Misc/ErrorNotice"

import { Button, Navbar, Nav, Form, FormControl, Image, Row, Col, Container, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'
import '../../index.css';
export default function Login() {
    const [Mail, setMail] = useState();
    const [Sifre, setSifre] = useState();
    const [error, setError] = useState();


    const history = useHistory();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const User = { Mail, Sifre };
            let userResponse = await axios.post("http://localhost:5000/LoginDoktor", User);

            localStorage.setItem("auth-token", userResponse.data.token);
            localStorage.setItem("ıd", userResponse.data.user._id);
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
                url: "http://localhost:5000/LoginWithGoogle",
                data: { tokenId: response.tokenId }
            })

            localStorage.setItem("auth-token", userResponse.data.token);
            localStorage.setItem("ıd", userResponse.data.user._id);
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
                url: "http://localhost:5000/LoginWithFacebook",
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
                <div style={{marginLeft:50}}>
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
                        <label for="exampleFormControlInput1">E-Mail</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="E-Mail"

                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>


                    <div className="form-group">
                        <label for="exampleFormControlInput1">Parola</label>
                        <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Parola"

                            onChange={(e) => setSifre(e.target.value)}

                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <a href="/SifremiUnuttum">Şifremi Unuttum</a>
                    </div>
                    <Button type="submit" className="w-100 mt-3" variant="primary">Giriş Yap</Button>
                    
                </div>
            </form>

        </div>
    )
}
