import react from 'react';
import './TopNavBar.css';


export default function TopNavBar(){
    return(
        <nav className='navtop'>
            <ul className='nav-list'>
                <li>Playlists</li>
                <li>Podcasts</li>
                <li>Artistas</li>
                <li>Álbuns</li>
            </ul>
        </nav>
    );
}