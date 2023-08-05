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


export default function EditTeamModel(props) {

    const handleOpen = () => props.setOpen(true);
    const handleClose = () => props.setOpen(false);


    const deleteTeam = async () => {
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");



        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,

        };
        try {
            const response = await fetch(`http://localhost:3000/api/deleteTeamName/${props.team.team_id}`, requestOptions)

            console.log(response)
            setTimeout(function () {
                console.log("delay")
                props.refreshPage()
                handleClose()
            }, 3000);

            return
        } catch (error) {
            console.log(error)
            handleClose()
            return null
        }


    }


    return (

        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div>            <Box sx={style}>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Delete Team: {props.team && <p>{props.team.team_name}</p>}

                </Typography>
                <Button onClick={deleteTeam}>Delete</Button>
            </Box>

            </div>

        </Modal >
    )
}
