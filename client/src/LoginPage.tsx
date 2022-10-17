import './Login.css'
import { Button } from "@mui/material";
import { InputText } from "./InputText";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import React from "react";

const buttonStyle = {
    backgroundColor: 'white', 
    color: 'black', 
    width: '220px', 
    borderRadius: '20px', 
    fontWeight: 'bold'
}; 

export default function LoginPage(){

    return(
        <div className="login-wrapper">
            <h1>Ispotify®</h1>
            <h2>Música para todos.</h2>
            <div className="text-input">
                <InputText label="Email" type="text"/>
                <div className="input-icon"><EmailOutlinedIcon sx={{alignSelf: 'center'}}/></div>
            </div>
            <div className="text-input">
                <InputText label="Senha" type="password"/>
                <div className="input-icon"><HttpsOutlinedIcon sx={{alignSelf: 'center'}}/></div>
            </div>
            <div className="login-button">
                <Button variant="contained" color="success" sx={buttonStyle} >Entrar</Button>
            </div>
            <h4>NÃO TEM UMA CONTA? <span>INSCREVA-SE</span></h4>
        </div>
    );
};