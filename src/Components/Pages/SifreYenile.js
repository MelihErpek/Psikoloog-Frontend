import React, { useState } from 'react'
import ErrorNotice from "../Misc/ErrorNotice"
import axios from 'axios'

export default function SifreYenile(params) {
    

    const [Sifre,setSifre]=useState();
    const [error,setError] = useState();
    const id = params.match.params.id;
    const submit = async (e) => {
        e.preventDefault();
        try {
            const User = { Sifre ,id};
            await axios.post("https://psikoloog.herokuapp.com/SifreYenile", User);


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
                        <label for="exampleFormControlInput1">Parola</label>
                        <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Parola"

                            onChange={(e) => setSifre(e.target.value)}

                        />
                    </div>
                   

                    <input type="submit" value="Şifre Yenile" />
                </div>
            </form>
        </div>
    )
}
