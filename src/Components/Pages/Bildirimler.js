import React, { useEffect,useState } from 'react'
import Bildirim from "../Misc/Bildirim"
import axios from "axios"
import moment from "moment";
export default function Bildirimler() {
    const id = localStorage.getItem("ıd");
    const [data,setData]=useState();
    const bildirimGetir =  () => {
        
      return data.map(item=>(<Bildirim
        GonderenKisi={item.gonderenKisiAdSoyad}
        tarih={moment(item.baslangic).format('DD-MM-YYYY')}
        
        saatBaslangic={moment(item.baslangic).format('HH:mm')}
        saatBitis={moment(item.bitis).format('HH:mm')}
    />))
        
    }
    useEffect(() => {
       
         axios.post("https://psikoloog.herokuapp.com/BildirimGetir", { id }).then(json=>setData(json.data.Bildirimler))
    }, [id])
    return (
        <div>
            
             {data ? (<>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'block' }}>
                      {bildirimGetir()}
                    </div>
                    
                </div>
                
            </>) : (<><h1>Bir randevunuz yoktur.</h1></>)}

            
        </div>
    )
}
