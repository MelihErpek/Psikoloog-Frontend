import React, { useState } from 'react'
import * as Survey2 from "survey-react";
import "survey-react/survey.css";
import axios from "axios";
Survey2.StylesManager.applyTheme("default");
export default function Survey() {
    const id = localStorage.getItem("ıd");
    const [isFinished, setIsFinished] = useState(false);
    const [data,setData] = useState(false);
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
            {
                title: "What language(s) are you currently using?",
                questions: [
                    {
                        type: "radiogroup", name: "langs", title: "Please select from the list",
                        colCount: 4, isRequired: true,
                        choices: ["Javascript", "Java", "Python", "CSS", "PHP", "Ruby", "C++", "C",
                            "Shell", "C#", "Objective-C", "R", "VimL", "Go", "Perl", "CoffeeScript",
                            "TeX", "Swift", "Scala", "Emacs Lisp", "Haskell", "Lua", "Clojure",
                            "Matlab", "Arduino", "Makefile", "Groovy", "Puppet", "Rust", "PowerShell"]
                    }
                ]
            },
            {
                title: "Please enter your name and e-mail",
                questions: [
                    { type: "text", name: "name", title: "Name:" },
                    { type: "text", name: "email", title: "Your e-mail" }]
            }]
    };
    const survey = new Survey2.Model(json);
    survey.completedHtml = "Test bitmiştir.";
    survey.locale = "tr";
    const getResult = (result) => {
        if (result.data.yas === "-18") console.log("oldu")
        
       
        setIsFinished(true);
    }
    const Finished =() =>{
        useState(async()=>{
             const a = await axios.post("https://psikoloog.herokuapp.com/ProfilBul", { id });
             setData(a.data.user)
        },[])

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
                    <Finished/>

                </>
            )}

        </div>
    )
}
