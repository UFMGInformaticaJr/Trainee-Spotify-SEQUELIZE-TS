import {React, useState} from 'react';
import './ArtistsPage.css'
import axios from 'axios';
import { useEffect } from 'react';


function ArtistCard({name, imgName}){
    return(
        <div className='artist-card'>
            <div className='circle'>
                <img alt='imagem' className='circle' src={imgName}/>
            </div>
            
            <div className='texts'>
                <p>{name}</p>
                <p>Artista</p>
            </div>
        </div>
    );
}

export default function ArtistPage (){

    const [artists, setArtists] =  useState([]);
    

    useEffect(()=>{
        const api = axios.create({
            baseURL : 'http://localhost:3030/api',
            withCredentials : true
        });
        api.get('/artists').then((response)=>{
            console.log(response)
            setArtists(response.data);
        })
    }, []);

    function testeAPI(){
                // api.post('/users/logout').then((response)=>{console.log(response)})

                // api.post('/users/login',      
                //     new URLSearchParams({
                //         email: 'admin@gmail.com',
                //         password: 123456
                //     }),
                // ).then((response)=>{console.log(response)})
    }

    return(
        <div className='artists-page-background'>
            <h1 onClick={()=> testeAPI()}>Artistas</h1>
            <div className='artists-container'>
               { artists.map((item, index)=>{
                    return <ArtistCard name={item.name} imgName={item.image} key={index}/>
               }) }
            </div>
        </div>
    );
}