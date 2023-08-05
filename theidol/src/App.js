import './App.css';
import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ViewTeamModal from './components/viewTeamModal';
import EditTeamModel from "./components/editTeamModal"
import DeleteTeamModel from "./components/deleteTeamModal"
import AddTeamModel from "./components/addTeamModal"
import AddMemberModel from "./components/addMemberModal"
import EditMemberModal from "./components/editMemberModal"
function App() {
  const [targetTeam, setTargetTeam] = useState({})
  const [targetMember, setTargetMember] = useState({})
  const [teamMembers, setTeamMembers] = useState([])
  const [team, setTeam] = useState([])
  const [openViewTeamModal, setOpenViewTeamModal] = useState(false)
  const [openEditTeamModal, setOpenEditTeamModal] = useState(false)
  const [openDeleteTeamModal, setOpenDeleteTeamModal] = useState(false)
  const [openAddTeamModal, setOpenAddTeamModal] = useState(false)
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false)
  const [openEditMemberModal, setOpenEditMemberModal] = useState(false)
  const fetchFromSql = async (url, method) => {
    const myHeaders = new Headers();

    const requestOptions = {
      method: method,
      headers: myHeaders,
    };
    try {
      const response = await fetch(url, requestOptions)
      const json = await response.json()

      return json
    } catch (error) {

      return []
    }
  }

  const refreshPage = async () => {
    setTeam(await fetchFromSql("http://localhost:3000/api/fetchAllTeam", "GET"))
    setTeamMembers(await fetchFromSql("http://localhost:3000/api/fetchAllMember", "GET"))
  }

  const deleteMember = async () => {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,

    };
    try {
      const response = await fetch(`http://localhost:3000/api/deleteMember/${targetMember.member_id}`, requestOptions)
      console.log(response)
      setTimeout(function () {
        refreshPage()
      }, 2000);

      return
    } catch (error) {
      console.log(error)
      return null
    }
  }


  useEffect(() => {

    const init = async () => {

      refreshPage()
    }


    init()
  }, [])
  const columns = [
    { field: 'member_id', headerName: 'ID', width: 140 },
    {
      field: 'member_name', headerName: 'Name', width: 400, renderCell: (params) => {
        return <div>{params.row.member_name}

          <button class="small-button" onClick={() => {
            setTargetMember({ member_id: params.row.member_id, member_name: params.row.member_name })
            setOpenEditMemberModal(true)
          }}>Edit</button>
          <button class="small-button" onClick={() => {
            setTargetMember({ member_id: params.row.member_id, member_name: params.row.member_name })
            deleteMember()
          }}>Delete</button></div>
      }
    },
    { field: 'team_id', headerName: 'Team ID', width: 200 },
    {
      field: 'team_name', headerName: 'Team', width: 400, renderCell: (params) => {
        return <div>{params.row.team_name}
          <button class="small-button" onClick={() => {
            setTargetTeam({ team_id: params.row.team_id, team_name: params.row.team_name })
            setOpenViewTeamModal(true)
          }}>View</button>
          <button class="small-button"
            onClick={() => {
              setTargetTeam({ team_id: params.row.team_id, team_name: params.row.team_name })
              setOpenEditTeamModal(true)
            }}>Edit</button>
          <button class="small-button" onClick={() => {
            setTargetTeam({ team_id: params.row.team_id, team_name: params.row.team_name })
            setOpenDeleteTeamModal(true)
          }}>Delete</button></div>
      }
    }
    ,

  ];


  const rows = teamMembers

  return (
    <div className="App">

      <p>Hello World</p>

      <div style={{ height: 400, width: '80%', margin: "50px auto 0 auto" }}>
        <DataGrid
          rows={rows}
          getRowId={(row) => row.member_id}
          columns={columns}

          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
        <Button variant="contained" style={{ margin: "10px" }} onClick={() => { setOpenAddTeamModal(true) }}>Add Team</Button>
        <Button variant="contained" style={{ margin: "10px" }} onClick={() => { setOpenAddMemberModal(true) }}>Add Member</Button>
      </div>

      <ViewTeamModal open={openViewTeamModal} setOpen={setOpenViewTeamModal} team={targetTeam} member={teamMembers.filter(member => { return member.team_id == targetTeam.team_id })} />
      <EditTeamModel open={openEditTeamModal} setOpen={setOpenEditTeamModal} team={targetTeam} refreshPage={refreshPage} />
      <EditMemberModal open={openEditMemberModal} setOpen={setOpenEditMemberModal} member={targetMember} refreshPage={refreshPage} />
      <DeleteTeamModel open={openDeleteTeamModal} setOpen={setOpenDeleteTeamModal} team={targetTeam} refreshPage={refreshPage} />
      <AddTeamModel open={openAddTeamModal} setOpen={setOpenAddTeamModal} refreshPage={refreshPage} />
      <AddMemberModel open={openAddMemberModal} setOpen={setOpenAddMemberModal} team={team} refreshPage={refreshPage} />
    </div>

  );
}

export default App;
