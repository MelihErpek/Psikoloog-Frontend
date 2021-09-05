import React, { useContext, useEffect, useState } from 'react'
import ok from '../Images/ok.png'
import { Button, Navbar, Nav, Form, FormControl, Image, Row, Col, Container, Modal } from 'react-bootstrap';
import { Stepper, Step } from 'react-form-stepper';
import * as Survey2 from "survey-react";
import "survey-react/survey.css";

import AuthContext from "../../Context/AuthContext";

import Login from './Login'
import Register from './Register'
import { Helmet } from "react-helmet";

import axios from 'axios';
Survey2.StylesManager.applyTheme("default");

export default function Home() {

    const { loggedIn, userData } = useContext(AuthContext);
    const [data, setData] = useState();
    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Survey = () => {
        const id = localStorage.getItem("ıd");
        const [isFinished, setIsFinished] = useState(false);
        const [data, setData] = useState(false);
        const json = {
            pages: [
                {
                    title: "",
                    questions: [
                        {
                            type: "radiogroup", name: "yas", title: "Yaşınız Kaçtır?", isRequired: true,
                            choices: ["-18", "18-45", "+45"]
                        }
                    ]
                },
                {
                    title: "",
                    questions: [
                        {
                            type: "radiogroup", name: "opSystem", title: "Yaşınız Kaçtır?", isRequired: true,
                            choices: ["-18", "18-45", "+45"]
                        }
                    ]
                },
            ]
        };
        const survey = new Survey2.Model(json);
        survey.completedHtml = "Test bitmiştir.";
        survey.locale = "tr";
        const getResult = (result) => {
            if (result.data.yas === "-18") console.log("oldu")


            setIsFinished(true);
            setStep(1);
        }
        const Finished = () => {
            useState(async () => {
                const a = await axios.post("https://psikoloog.herokuapp.com/ProfilBul", { id });
                setData(a.data.user)
            }, [])

            return <h1>{data.AdSoyad}</h1>
        }
        return (
            <div>
                {isFinished === false && (
                    <>
                        <Survey2.Survey
                            model={survey}
                            onComplete={getResult}
                        />
                    </>
                )}
                {isFinished === true && (
                    <>
                        <Finished />

                    </>
                )}

            </div>
        )
    }

    const ModalExp = () => {

        return (
            <>
                <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Psikoloog</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Stepper activeStep={step}>
                            <Step label="Testi Doldurun" styleConfig={{
                                activeBgColor: "#038CF9",
                                inactiveBgColor: "rgba(3, 140, 249, 0.4)",
                                completedBgColor: "rgba(3, 140, 249, 0.4)"
                            }} />
                            <Step label="Get Started" styleConfig={{
                                activeBgColor: "#038CF9",
                                inactiveBgColor: "rgba(3, 140, 249, 0.4)",
                                completedBgColor: "rgba(3, 140, 249, 0.4)"
                            }} />
                        </Stepper>
                        {step === 0 && <Survey />}
                        {step === 1 && <Register />}

                    </Modal.Body>
                </Modal>
            </>
        );
    }
    const Comp = () => {
        if (click === true) {
            return <div>
                <Container style={{ height: 200, marginTop: 150 }}>
                    <Row className=" h-100  d-flex justify-content-center   ">
                        <div className=" w-75 ">
                            <div className="text-center " style={{ fontSize: 20, marginTop: 20 }}>
                                <span style={{ backgroundColor: '#B8B3D7' }}>ALANINDA UZMAN PSİKOLOGLARDAN DANIŞMANLIK ALMAK</span>
                                <Row className="d-flex justify-content-center">
                                    <span style={{ backgroundColor: '#B8B3D7' }}> İSTER MİSİNİZ?</span>
                                </Row>
                                <span style={{ backgroundColor: '#B8B3D7' }}>    İHTİYACINIZA EN UYGUN TERAPİSTİ BULMAK İÇİN HEMEN TESTE BAŞLAYIN!</span>
                            </div>
                        </div>
                    </Row>

                </Container>
                <Container >

                    <Row style={{ height: 75 }}>
                        <Col>
                            <div onClick={handleShow} className=" w-75 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#B8B3D7', borderRadius: 15, cursor: 'pointer' }}>
                                <div style={{ fontSize: 20, cursor: 'pointer' }}> BİREYSEL</div>
                            </div>
                        </Col>
                        <Col>
                            <div onClick={handleShow} className=" w-75 h-100 d-flex justify-content-center align-items-center " style={{ backgroundColor: '#B8B3D7', borderRadius: 15, cursor: 'pointer' }}>
                                <div style={{ fontSize: 20, cursor: 'pointer' }}> ÇOCUK / ERGEN</div>
                            </div>
                        </Col>
                        <Col>
                            <div onClick={handleShow} className=" w-75 h-100 d-flex justify-content-center align-items-center " style={{ backgroundColor: '#B8B3D7', borderRadius: 15, cursor: 'pointer' }}>
                                <div style={{ fontSize: 20, cursor: 'pointer' }}> ÇİFT</div>
                            </div>
                        </Col>
                    </Row>


                </Container>
            </div>
        }
        return <div>
            <Container style={{ height: 150, marginTop: 150 }}>
                <Row className=" h-50  d-flex justify-content-center   ">
                    <div className=" w-75 " style={{ backgroundColor: '#B8B3D7', borderRadius: 15 }}>
                        <div className="text-center font-weight-bold" style={{ fontSize: 20, marginTop: 20 }}> PSİKOLOOG İLE İYİ HİSSETMEYE BAŞLA!!!</div>
                    </div>
                </Row>
            </Container>
            <Container style={{ height: 250, marginTop: 50 }}>
                <Row className="font-weight-bold mx-5 h-100 ">

                    <Col className="d-flex justify-content-center rounded-circle ml-5 align-items-center border border-white" style={{ backgroundColor: '#B8B3D7' }}>
                        <div className="w-75">SENİ DAHA İYİ TANIYABİLMEMİZ İÇİN FORMU DOLDUR
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center rounded-circle align-items-center border border-white" style={{ backgroundColor: '#B8B3D7' }}>
                        <div className="w-75">KISA ANKETİ CEVAPLA
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center rounded-circle align-items-center border border-white" style={{ backgroundColor: '#B8B3D7' }}>
                        <div className="w-75">ALGORİTMAMIZ VERDİĞİN BİLGİLERE GÖRE EN UYGUN TERAPİST ADAYLARINI BULSUN
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center rounded-circle mr-5 align-items-center border border-white" style={{ backgroundColor: '#B8B3D7' }}>
                        <div className="w-75">UYGUN GÜN VE SAATİNİ SEÇEREK İYİ HİSSETMEYE BAŞLA!
                        </div>
                    </Col>
                </Row>

                <Image style={{ marginLeft: 450, marginTop: 75, cursor: 'pointer' }} src={ok} rounded onClick={() => { setClick(true) }} />


            </Container>
        </div>

    }
    return (

        <div>




            {loggedIn === false && (
                <>

                    <Comp />
                    <ModalExp />

                </>
            )}
            {loggedIn === true && (
                <>

                  

                </>
            )}

        </div>
    )
}
/*

<div>
            {
                userData.user ?
                    (<>
                        <ul style={{display:'flex'}}>
                            <li style={{ listStyle: 'none', marginLeft: '5px' }}>
                                <a href="/Profil" style={{ textDecoration: 'none', color: 'black' }}>Profil</a>
                            </li>
                            <li style={{ listStyle: 'none', marginLeft: '5px' }}>
                                <a href="/Bildirimler" style={{ textDecoration: 'none', color: 'black' }}>Bildirimler</a>
                            </li>
                            <li style={{ listStyle: 'none', marginLeft: '5px' }}>
                                <a href="/Doktorlar" style={{ textDecoration: 'none', color: 'black' }}>Doktorlar</a>
                            </li>
                        </ul>


                    </>) :
                    (<>
                        <h1>Anasayfa</h1>
                        <a href="/KayıtOl">Kayıt Ol Kullanıcı</a>
                        <h1>-----</h1>
                        <a href="/GirisYap">Giriş Yap</a>
                    </>)
            }

        </div>


*/