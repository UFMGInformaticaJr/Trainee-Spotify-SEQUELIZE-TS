/* eslint-disable @typescript-eslint/no-unused-vars */
interface Artist{
    name: string;
    age: number;
    style: string;
}

export default Artist;


interface ArtistProps{
    artists: Artist[];
}


interface palco{
    largura: number;
    altura: number;
}

interface palcoCompleto extends palco{
    comprimento: number;
}