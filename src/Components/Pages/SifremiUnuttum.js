import React, { useState } from 'react'
import ErrorNotice from "../Misc/ErrorNotice"
import axios from 'axios'
export default function SifremiUnuttum() {
    const [Mail,setMail] = useState();
    const [error,setError] = useState();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const User = { Mail };
            await axios.post("https://psikoloog-backend.vercel.app/SifremiUnuttum", User);


        } catch (err) {

            setError(err.response.data.hata)
        }



    };

    return (
        <div>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <form className="form" onSubmit={submit}>
                <div className="mx-auto w-25">

                    <div className="form-group">
                        <label for="exampleFormControlInput1">E-Mail</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="E-Mail"

                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>


                   

                    <input type="submit" value="Mail Gönder" />
                </div>
            </form>
        </div>
    )
}
