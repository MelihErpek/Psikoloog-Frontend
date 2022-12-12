import React, { useContext, useState, useEffect } from 'react'
import AuthContext from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
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
    const [tarih, setTarih] = useState();
    const [gercekTarihBaslangic, setGercekTarihBaslangic] = useState();
    const [gercekTarihBitis, setGercekTarihBitis] = useState();
    const [tarihler, setTarihler] = useState([]);
    const history = useHistory();
    const [value, onChange] = useState(new Date());
    console.log(value);
    let newDate = new Date();
    let events = [
        {
            id: 3,
            title: '',
            start: new Date(2021, 2, 11, 7, 0, 0),
            end: new Date(2021, 2, 11, 10, 30, 0),
            resourceId: 4,
        },
        {
            id: 3,
            title: '',
            start: new Date(2021, 2, 12, 15, 0, 0),
            end: new Date(2021, 2, 12, 16, 0, 0),
            resourceId: 5,
        }

    ];
    let a = (start, end) => {
        /*console.log(moment(start.slots[0]).format('DD-MM-YYYY HH:mm'));
        console.log(moment(start.end).format('DD-MM-YYYY HH:mm'));
        console.log(moment(start.slots[0]).get('hour'))*/

        setTarih(
            moment(start.start).format('DD-MM-YYYY HH:mm'),
        )
        setGercekTarihBaslangic(
            start.start
        )
        setGercekTarihBitis(
            start.end
        )


    }
    const submit = async (e) => {
        e.preventDefault();
        let Mail = userData.user.Mail;
        try {
            const tarih2 = { Mail, gercekTarihBaslangic, gercekTarihBitis };

            await axios.post("https://psikoloog-backend.vercel.app/Calendar", tarih2);
        } catch (err) {
            alert("Bu Mail Daha Önce Kullanılmıştır Lütfen Farklı Bir Mail Belirleyiniz")
        }
    };

    const getir = async () => {

        let id = localStorage.getItem("ıd");

        try {

            await axios.post("https://psikoloog-backend.vercel.app/TarihGetir", { id }).then(json => json.data.tarihler.map(item => deneme(item)));

        } catch (err) {
            alert("Bu Mail Daha Önce Kullanılmıştır Lütfen Farklı Bir Mail Belirleyiniz")
        }

    };

    const deneme = (item) => {



        events.push({
            id: item._id,
            title: 'yeni',
            start: new Date(moment(item.baslangic).get('year'), moment(item.baslangic).get('month'), moment(item.baslangic).get('date'), moment(item.baslangic).get('hour'), moment(item.baslangic).get('minute'), 0),
            end: new Date(moment(item.bitis).get('year'), moment(item.bitis).get('month'), moment(item.bitis).get('date'), moment(item.bitis).get('hour') + 1, moment(item.bitis).get('minute'), 0),
        });



        setTarihler(events);
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
            style={{ height: 800 }}
            onSelectSlot={a}
            min={moment('8:00', 'h:mma').toDate()}
            max={moment('20:00', 'h:mma').toDate()}
        />
    }
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
    useEffect(() => {
        getir();


    }, [])

    return (
        <div>
            {
                userData.user ?
                    (<>

                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'block' }}>
                                <img src={userData.user.Fotograf} alt="Logo" style={{ height: 400, width: 400 }} />
                                <h1>{userData.user.AdSoyad}</h1>
                                <h1>{userData.user.Mail}</h1>
                                <button onClick={logout}>ÇıkışYap</button>
                            </div>

                            <Takvim />
                            <CalendarDeneme
                                onChange={onChange}
                                value={value}
                                showNavigation={true}
                                view='month'
                                next2AriaLabel="Jump forwards"
                            />
                            {tarih ? (<>
                                <form className="form" onSubmit={submit}>
                                    <h1>baslangic:{tarih}
                                    </h1>


                                    <input type="submit" value="Yolla" />
                                </form>
                                <form className="form" onSubmit={getir}>
                                    <input type="submit" value="Getir"></input>

                                </form>


                            </>) : (<> </>)}
                        </div>
                    </>) :
                    (<>
                        <button onClick={logout}>ÇıkışYap</button>
                    </>)
            }
        </div>
    )
}
