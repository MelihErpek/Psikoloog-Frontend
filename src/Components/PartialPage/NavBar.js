import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import logo from '../Images/logo.png'
import { Button, Navbar, Nav, Form, FormControl, Image, Row, Col, Container } from 'react-bootstrap';
export default function NavBar() {
    const { loggedIn } = useContext(AuthContext);
    const history = useHistory();
    return (
        <div>
            {loggedIn === false && (
                <>

                    <Navbar >
                        <Image className="mr-auto" onClick={()=>{history.push("/")}} src={logo} style={{ height: "4rem" ,cursor:"pointer"}} rounded />
                        <Nav >
                            <Nav.Link href="/NasilCalisir">
                                <Button variant="secondary" > <div style={{ color: '#B38AD2' }}>NASIL ÇALIŞIR</div></Button>
                            </Nav.Link>
                            <Nav.Link href="/Hakkimizda">
                                <Button variant="secondary"><div style={{ color: '#B38AD2' }}>HAKKIMIZDA</div></Button>
                            </Nav.Link>
                            <Nav.Link href="/SSS">
                                <Button variant="secondary"><div style={{ color: '#B38AD2' }}>S.S.S</div></Button>
                            </Nav.Link>
                            <Nav.Link href="/GirisYap">
                                <Button variant="secondary"><div style={{ color: '#B38AD2' }}>GİRİŞ YAP</div></Button>
                            </Nav.Link>
                            <Nav.Link href="/BizeUlasin">
                                <Button variant="secondary"><div style={{ color: '#B38AD2' }}>BİZE ULAŞIN</div></Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar>
                </>
            )}
            {loggedIn === true && (
                <>

                    <Navbar >
                        <Image className="mr-auto" style={{ cursor: 'pointer' }} onClick={()=>{history.push("/")}} src={logo} style={{ height: "4rem" ,cursor:"pointer"}} rounded />
                        <Nav >
                            <Nav.Link href="/Profil">
                                <Button variant="secondary" > <div style={{ color: '#B38AD2' }}>PROFİLİM</div></Button>
                            </Nav.Link>
                            <Nav.Link href="/Doktorlar">
                                <Button variant="secondary"><div style={{ color: '#B38AD2' }}>DOKTORLAR</div></Button>
                            </Nav.Link>
                            <Nav.Link href="/Randevular">
                                <Button variant="secondary"><div style={{ color: '#B38AD2' }}>RANDEVULARIM</div></Button>
                            </Nav.Link>
                            
                        </Nav>
                    </Navbar>
                </>
            )}

        </div>
    )
}
