import React from 'react';
import './MusicList.css';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';

type Music = {
  musicName: string;
  artist: string;
  album: string;
}

interface Litem {
  musicName: string;
  artist: string;
  album: string;
  number: number;
  setMusicArray: (musicArray: Music[]) => void;
  musicArray: Music[];
}

function Header() {
  return (
    <header>
      <img className='capa' src="assets/Front.jpg" alt='imagem' />
      <div className="titulos">
        <h5>Playlist</h5>
        <h1>Daily Mix 1</h1>
        <h5>Red Hot Chili Peppers, Coldplay e mais</h5>
        <h5>Spotify - 50 músicas <span>1h 7min</span></h5>
      </div>
    </header>
  );
}

function IconsSection() {

  const [liked, setLiked] = useState(false);

  return (
    <section>
      <div className="icons">
        <PlayCircleFilledWhiteIcon htmlColor='#1FDF64' sx={{ fontSize: '60px' }} />
        <div style={{ alignSelf: 'center' }} onClick={() => {
          if (liked) setLiked(false)
          else setLiked(true)
        }
        }>
          {
            liked ? <FavoriteIcon className='white-icon' htmlColor='#1FDF64' sx={{ fontSize: '35px' }} />
              : <FavoriteBorderOutlinedIcon className='white-icon' htmlColor='#C8C9CF' sx={{ fontSize: '35px' }} />
          }
        </div>
        <DownloadForOfflineOutlinedIcon htmlColor='#C8C9CF' className='white-icon' sx={{ fontSize: '35px' }} />
        <MoreHorizOutlinedIcon htmlColor='#C8C9CF' className='white-icon' sx={{ fontSize: '35px' }} />
      </div>
    </section>
  );
}


function HeaderList() {
  return (
    <div>
      <div className='header-list'>
        <div className="first flex">
          <p>#</p>
          <p>TÍTULO</p>
        </div>
        <p>ÁLBUM</p>
        <AccessTimeIcon sx={{ position: 'relative', top: '-4px' }} />
      </div>
      <hr />
    </div>
  );
}


function ListItem({ setMusicArray, musicArray, number, album, artist, musicName }: Litem) {

  const [liked, setLiked] = useState(false);

  return (
    <div className='list-item'>
      <div className="first flex">
        <p>{number}</p>
        <div className="music">
          <p>{musicName}</p>
          <p>{artist}</p>
        </div>
      </div>
      <p className='album'>{album}</p>
      <div className="list-icons flex">
        <div onClick={() => {
          if (liked) setLiked(false)
          else setLiked(true)
        }
        }>
          {
            liked ? <FavoriteIcon htmlColor='#1FDF64' />
              : <FavoriteBorderOutlinedIcon htmlColor='#C8C9CF' />
          }
        </div>
        <div onClick={() => {
          let tempArray = musicArray.filter((music, index) => { return index !== number - 1 });
          setMusicArray(tempArray);
        }}>
          <DeleteIcon htmlColor='#C8C9CF' className='delete-icon' />
        </div>
      </div>
    </div>
  );
}

function App() {


  const [musicArray, setMusicArray] = useState([
    {
      musicName: 'The Zephyr Song',
      artist: 'Red Hot Chili Peppers',
      album: 'By The Way',
    },
    {
      musicName: 'Talk',
      artist: 'Coldplay',
      album: 'X&Y',
    },
    {
      musicName: 'Firmamento',
      artist: 'Cidade Negra',
      album: 'Cidade Negra Acústico MTV',
    },

  ]);

  return (
    <div className='gradient-background'>
      <Header />
      <IconsSection />
      <HeaderList />
      {
        musicArray.map((item, index) => {
          return <ListItem musicArray={musicArray} setMusicArray={setMusicArray} musicName={item.musicName} artist={item.artist} album={item.album} number={index + 1} key={index} />
        })
      }
    </div>
  );
}


export default App;
