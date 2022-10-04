import React from "react";
import './Input.css'

interface UInput{ 
    label: string;
    type: string;
}

export function InputText(input: UInput, {withoutIcon = false, disabled = false}){
    return(
        <>
            {
            !withoutIcon ? (
                <input type={input.type} placeholder={input.label} className="input-text  width90"/>
            ) : (
                <input type={input.type} placeholder={input.label} disabled={disabled} className="input-text width100"/>
            )
        }
        </>
    );
}
