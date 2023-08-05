import { useState, useEffect } from "react";
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import Option, { optionClasses } from '@mui/base/Option';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    zIndex: 1,
    p: 4,
    display: "flex",
    flexDirection: "column"
};


export default function AddMemberModal(props) {
    const defaultId = props.team[0] ? props.team[0].team_id : null
    const [newMember, setNewMember] = useState(null)
    const [newMemberTeamId, setNewMemberTeamId] = useState(defaultId)
    const handleOpen = () => props.setOpen(true);
    const handleClose = () => props.setOpen(false);


    const addMember = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "newMember": newMember,
            "newMemberTeamId": newMemberTeamId
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch(`http://localhost:3000/api/addNewMember`, requestOptions)
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


                    <TextField id="outlined-basic" label="New Member Name" variant="outlined" onChange={(event) => {
                        setNewMember(event.target.value);
                    }} />



                    <Select
                        style={{ margin: "20px", zIndex: 2 }}
                        defaultValue={defaultId}
                        onChange={(event) => {
                            setNewMemberTeamId(event.target.value)
                        }}
                    >{props.team.map(team => {
                        return <MenuItem key={team.team_id} value={team.team_id}>
                            {team.team_name}
                        </MenuItem>

                    })}</Select>


                    <Button onClick={addMember}>Add</Button>
                </Box>

            </div>

        </Modal >
    )
}
