import React, { useState, useEffect } from 'react'
import { Button, Navbar, Nav, Form, FormControl, Image, Row, Col, Container, Modal, Card } from 'react-bootstrap';
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import CalendarDeneme from 'react-calendar';
import axios from 'axios';
import moment from "moment";
import 'moment/locale/tr';
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../../index.css';
moment.locale('tr');
const localizer = momentLocalizer(moment);

export default function DigerProfil(params) {
    let id = params.match.params.id;
    const [value, onChange] = useState(new Date());
    const [baslangic, setBaslangic] = useState();
    const [bitis, setBitis] = useState();
    const [data, setData] = useState();
    const [tarihler, setTarihler] = useState([]);
    const [gercekTarihBaslangic, setGercekTarihBaslangic] = useState();
    const [gercekTarihBitis, setGercekTarihBitis] = useState();
    let newDate = new Date();
    let events = [


    ];
    const submit = async (e) => {
        e.preventDefault();
        const gonderenKisi = localStorage.getItem("ıd");

        const gonderilenKisi = data.user._id;
        const baslangic = gercekTarihBaslangic;
        const bitis = gercekTarihBitis;
        try {
            await axios.post("https://psikoloog.herokuapp.com/BildirimGonder", { gonderenKisi, gonderilenKisi, baslangic, bitis })
        }
        catch {

        }

    }
    const getir = async () => {

        try {
            await axios.post("https://psikoloog-backend.vercel.app/ProfilBul", { id }).then((json => setData(json.data) + json.data.user.Randevular.map(item => tarihEkle(item))));
        } catch (err) {
            alert("Bu Mail Daha Önce Kullanılmıştır Lütfen Farklı Bir Mail Belirleyiniz")
        }

    };
    const tarihEkle = (item) => {

        events.push({
            id: item._id,
            title: 'yeni',
            start: new Date(moment(item.baslangic).get('year'), moment(item.baslangic).get('month'), moment(item.baslangic).get('date'), moment(item.baslangic).get('hour'), moment(item.baslangic).get('minute'), 0),
            end: new Date(moment(item.bitis).get('year'), moment(item.bitis).get('month'), moment(item.bitis).get('date'), moment(item.bitis).get('hour') + 1, moment(item.bitis).get('minute'), 0),
        })
        setTarihler(events);

    }

    let bildirim = (start, end) => {

        setGercekTarihBaslangic(
            start.start
        )
        setGercekTarihBitis(
            start.end
        )

        console.log(moment(start.start).format('DD-MM-YYYY HH:mm'));
    }

    const Profil = () => {
        console.log("value", value);
        return <>

            <Card className="w-25">
                <Card.Header>Danışmanın</Card.Header>
                <Card.Body >
                    <div className="d-flex justify-content-center align-items-center">
                        <Image src={data.Fotograf} style={{ height: 100, width: 100, border: '3px solid gray' }} roundedCircle fluid />
                    </div>
                    <Card.Text className="mt-3 font-weight-bold d-flex justify-content-center align-items-center" style={{ fontSize: 25 }}>
                        {data.user.AdSoyad}
                    </Card.Text>

                </Card.Body>

            </Card>
            <Card className="w-25">
                <Card.Header>Takvim</Card.Header>
                <Card.Body >
                    <Row>
                        <Col>
                            <CalendarDeneme
                                onChange={onChange}
                                value={value}
                                showNavigation={true}
                                view='month'

                            />
                        </Col>
                        <Col>
                            <Row>
                                
                            </Row>
                            <Row>
                                
                               
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>

            </Card>


        </>

    }


    const Takvim = () => {

        return <Calendar
            selectable
            events={tarihler}
            localizer={localizer}
            defaultView={Views.WEEK}
            views={['week']}
            step={30}
            defaultDate={new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())}
            scrollToTime={new Date(1970, 1, 1, 6)}
            min={moment('8:00', 'h:mma').toDate()}
            max={moment('20:00', 'h:mma').toDate()}
            onSelectSlot={bildirim}
        />
    }
    useEffect(() => {
        getir();

    }, [])
    return (
        <div>
            {data ? (<>
                <Container fluid>
                    <Profil />
                </Container>

                {gercekTarihBaslangic ? (<>
                    <form className="form" onSubmit={submit}>
                        <h1>Başlangıç:{moment(gercekTarihBaslangic).format('DD-MM-YYYY HH:mm')}
                        </h1>
                        <h1>Bitiş:{moment(gercekTarihBitis).format('DD-MM-YYYY HH:mm')}</h1>

                        <input type="submit" value="Yolla" />
                    </form>



                </>) : (<> </>)}

            </>) : (<></>)}

        </div>
    )
}
