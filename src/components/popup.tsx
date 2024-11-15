import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IPopup } from '../models/popup';
const Popup = (popup: IPopup) => {
return (
    <>
    <Modal
        open={popup.lancer}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        >
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                color: 'black'
            }}
            >
            <h2 id="modal-title">{popup.titre}</h2>
            <p id="modal-description">{popup.message}</p>
            <Button variant="contained" onClick={popup.Click}>Recommencer</Button>
        </Box>
        </Modal>
    </>
)
}
export default Popup
