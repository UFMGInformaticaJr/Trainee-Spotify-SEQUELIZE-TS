
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './UserAccountPage.css';
//@ts-ignore
import { InputText } from './InputText.tsx';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#121212',
    color: '#FFFFFF',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const buttonStyle = {
    backgroundColor: '#1EB954',
    color: 'white',
    fontWeight: 'bold',
    display: 'block',
    width: '150px',
    marginBottom: '15px',
};


export default function UserAccountPage() {

    const [openModalEmail, setOpenModalEmail] = React.useState(false);
    const handleOpenModalEmail = () => setOpenModalEmail(true);
    const handleCloseModalEmail = () => setOpenModalEmail(false);

    const [openModalPassword, setOpenModalPassword] = React.useState(false);
    const handleOpenModalPassword = () => setOpenModalPassword(true);
    const handleCloseModalPassword = () => setOpenModalPassword(false);
    return (
        <div className='useraccount-page-background'>
            <div className='useraccount-content'>
                <h1>Minha Conta</h1>
                <div className='margin-bottom20'>
                    <InputText withoutIcon type='text' label='Nome' disabled />
                </div>
                <div className='margin-bottom20'>
                    <InputText withoutIcon type='text' label='Email' disabled />
                </div>
                <Button variant="contained" color="success" sx={buttonStyle} onClick={handleOpenModalEmail}>Editar Email</Button>
                <Button variant="contained" color="success" sx={buttonStyle} onClick={handleOpenModalPassword}>Trocar Senha</Button>
            </div>



            <Modal
                open={openModalEmail}
                onClose={handleCloseModalEmail}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
                        Novo email
                    </Typography>
                    <InputText withoutIcon />
                    <div className='modal-buttons'>
                        <Button variant="contained" color="error" sx={{ color: 'white', fontWeight: 'bold' }} onClick={handleCloseModalEmail}>Cancelar</Button>
                        <Button variant="contained" color="success" sx={{ backgroundColor: '#1EB954', color: 'white', fontWeight: 'bold' }} onClick={handleCloseModalEmail}>Confirmar</Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openModalPassword}
                onClose={handleCloseModalPassword}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '10px' }}>
                        Senha Atual
                    </Typography>
                    <InputText withoutIcon />
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                        Nova Senha
                    </Typography>
                    <InputText withoutIcon />
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                        Confirmar nova Senha
                    </Typography>
                    <InputText withoutIcon />
                    <div className='modal-buttons'>
                        <Button variant="contained" color="error" sx={{ color: 'white', fontWeight: 'bold' }} onClick={handleCloseModalPassword}>Cancelar</Button>
                        <Button variant="contained" color="success" sx={{ backgroundColor: '#1EB954', color: 'white', fontWeight: 'bold' }} onClick={handleCloseModalPassword}>Confirmar</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}