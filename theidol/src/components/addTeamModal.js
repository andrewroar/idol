import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function AddTeamModal(props) {

    const [newTeam, setNewTeam] = useState(null)
    const handleOpen = () => props.setOpen(true);
    const handleClose = () => props.setOpen(false);
    const addTeam = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "newTeam": newTeam
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch(`http://localhost:3000/api/addNewTeam`, requestOptions)
        props.refreshPage()
        handleClose()

    }

    return (


        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div>
                <Box sx={style}>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Add Team:
                        <TextField id="outlined-basic" label="New Name" variant="outlined" onChange={(event) => {

                            setNewTeam(event.target.value);
                        }} />

                        <Button onClick={addTeam}>Add</Button>
                    </Typography>
                </Box>

            </div>

        </Modal >
    )
}
