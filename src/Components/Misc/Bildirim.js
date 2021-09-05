import React from "react";

export default function Bildirimler(props) {
    return (
        <div className="error-notice">
            <div style={{display:'flex'}}>
                <h3>{props.GonderenKisi} isimli kişi {props.tarih} tarihinde {props.saatBaslangic} - {props.saatBitis} tarihleri arasında randevu talep etti.</h3>
                

            </div>


        </div>
    );
}