import react from 'react';
import './SideBar.css';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import AlbumIcon from '@mui/icons-material/Album';
import { AccountCircleRounded } from '@mui/icons-material';

export default function SideBar(){

    let navigate = useNavigate();

    return(
        <nav className='side-bar'>
            <h2>iSpotify®</h2>
            <ul>
                <div className='with-icon'>
                    <AlbumIcon className='icon'/>
                    <li onClick={() => navigate('/artists')}>Artistas</li>
                </div>
                <div className='with-icon'>
                    <FavoriteIcon className='icon'/>
                    <li onClick={() => navigate('/curtidas')}>Músicas curtidas</li>
                </div>
                <div className='with-icon'>
                    <AccountCircleRounded className='icon'/>
                    <li onClick={() => navigate('/useraccount')}>Minha Conta</li>
                </div>
                <div className='with-icon logout'>
                    <LogoutIcon className='icon'/>
                    <li>Logout</li>
                </div>
            </ul>
        </nav>
    );
}