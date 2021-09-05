import React, { useState, useEffect } from 'react'
import { Button, Navbar, Nav, Form, FormControl, Image, Row, Col, Container, Modal, Card } from 'react-bootstrap';
import axios from 'axios';

export default function Doktorlar() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState();
    const [ID, setID] = useState("");
    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setID(id);
        setShow(true);
    }

    const What = () => {

        /*
        <div style={{ display: 'flex' }}>
                    <img src={item.Fotograf} style={{ height: 150, width: 150, marginLeft: 15 }} alt="heys" />

                    <div style={{ display: 'block' }}>
                        <div style={{ height: 40 }}></div>
                        <a style={{ fontSize: 22.5, color: 'black', textDecoration: 'none' }} href={"/Profil/" + item._id}>{item.AdSoyad}</a>



                    </div>

                </div>
                <hr style={{ width: 500, marginLeft: 0 }}></hr> 
        */
        return data.user.map(item =>


            <div style={{ marginLeft: '20%', marginTop: '5%' }}>
                <Card border="light" style={{ width: '22rem' }}>
                    <Card.Header style={{ backgroundColor: '#73FF73' }} className="font-weight-bold">
                        Danışmanın
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="d-flex justify-content-center " style={{ cursor: 'pointer' }}>
                            <Image onClick={() => handleShow(item._id)} src={item.Fotograf} style={{ height: 150, width: 150 }} roundedCircle fluid />
                        </Card.Title>
                        <hr />
                        <Card.Text className="d-flex justify-content-center text-success font-weight-bold">

                            <div style={{ cursor: 'pointer' }} onClick={() => handleShow(item._id)}>{item.AdSoyad}</div>
                        </Card.Text>
                    </Card.Body>
                </Card>


            </div>
        )



    }
    const ModalExp = () => {
        if (data.user[0]._id === ID) {
            setModalData(data.user[0])
        }
        if (data.user[1]._id === ID) {
            setModalData(data.user[1])
        }
        return (
            <>
                {modalData &&
                    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton >
                            <Image src={modalData.Fotograf} style={{ height: 100, width: 100, border: '3px solid gray' }} roundedCircle fluid />
                            <div className="mt-3 ml-3">
                                <Row style={{fontSize:12.5}}>Eşleştiğin Danışman</Row>
                                <Row className=" font-weight-bold" style={{fontSize:25}}> {modalData.AdSoyad}</Row>

                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            <a href={"/Profil/" + modalData._id}>
                                <Button className="w-100 mt-3" variant="primary">Profile Git</Button>
                            </a>
                        </Modal.Body>
                    </Modal>
                }

            </>
        );
    }

    useEffect(() => {

        axios.get("https://psikoloog.herokuapp.com/DoktorBul").then(json => setData(json.data));


    }, [])
    return (
        <div>
            {data.user ? (<>
                <Row>
                    <What />
                    <ModalExp />

                </Row>

            </>) : (<></>)}

        </div>
    )
}
