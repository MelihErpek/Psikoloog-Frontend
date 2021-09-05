import React, { useContext, useState, useEffect } from 'react'
import AuthContext from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { Row, Col, Container, Image , Button} from 'react-bootstrap';
import { Calendar, momentLocalizer, Views  } from "react-big-calendar";
import CalendarDeneme from 'react-calendar';
import axios from 'axios';
import moment from "moment";
import 'moment/locale/tr';
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../../index.css';
moment.locale('tr');
const localizer = momentLocalizer(moment);
export default function Profil() {
    //const { userData, setUserData } = useContext(UserContext);
    const { userData, setUserData, setLoggedIn } = useContext(AuthContext);
    const history = useHistory();
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        setLoggedIn(false);
        localStorage.setItem("auth-token", "");
        localStorage.setItem("ıd", "");
        history.push("/");
    }
    return (
        <div>
            {
                userData.user ?
                    (<>


                        <Container>
                            <Row className="d-flex justify-content-center mt-3">
                                <Col className="d-flex justify-content-center" xs={12} sm={{ span: 2 }}>
                                    <img className="img-fluid rounded-circle" src={userData.user.Fotograf} style={{ height: 150, width: 800, border: '5px solid gray' }} alt="" />
                                </Col>
                                <Col className="justify-content-center  mt-3" xs={10} sm={4}>
                                    <Row>
                                        <div style={{ fontSize: 30, marginLeft: 50, fontWeight: 'bold', color: 'black' }}>
                                            {userData.user.AdSoyad}
                                        </div>
                                    </Row>
                                    <div style={{ height: 15 }}></div>
                                    <Row>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ marginLeft: 50, fontSize: 15 }}>{userData.user.Mail}</div>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div style={{ display: 'flex',marginLeft: 50 }}>
                                            <Button type="submit" onClick={logout} className="w-100 mt-3" variant="primary">Çıkış Yap</Button>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </>) :
                    (<>
                    </>)
            }
        </div>
    )
}
