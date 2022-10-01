import React from "react";
import './SignUpPage.css'
import { Button } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import {InputText} from './InputText.js';

const buttonStyle = {
    backgroundColor: '#1EB954', 
    color: 'white', 
    width: '220px', 
    borderRadius: '20px', 
    fontWeight: 'bold'
};

export default function SignUpPage(){
    return(
        <div className="signup-wrapper">
            <h2>Inscrever-se em uma <br/>conta grátis do</h2>
            <h1>Ispotify®</h1>
            <div className="text-input">
                <InputText label="Email" type="text"/>
                <div className="input-icon"><EmailOutlinedIcon sx={{alignSelf: 'center'}}/></div>
            </div>
            <div className="text-input">
                <InputText label="Crie uma senha" type="password"/>
                <div className="input-icon"><HttpsOutlinedIcon sx={{alignSelf: 'center'}}/></div>
            </div>
            <div className="text-input">
                <InputText label="Como devemos chamar você?" type="text"/>
                <div className="input-icon"><AccountCircleOutlinedIcon sx={{alignSelf: 'center'}}/></div>
            </div>
            <div className="signup-button">
                <Button variant="contained" color="success" sx={buttonStyle} >CADASTRAR</Button>
            </div>
            <h4>Já é usuário do ISpotify? <span>FAÇA LOGIN</span></h4>
        </div>
    );
};