import React from "react";
import './Input.css'


export function InputText({label, type, withoutIcon = false, disabled = false}){
    return(
        <>
            {
            !withoutIcon ? (
                <input type={type} placeholder={label} className="input-text  width90"/>
            ) : (
                <input type={type} placeholder={label} disabled={disabled} className="input-text width100"/>
            )
        }
        </>
    );
}