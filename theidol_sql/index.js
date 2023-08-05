// app.js
const express = require('express');
const cors = require("cors");
const port = 3000;
const app = express();
const mysql = require('mysql2');
const sqlConfig = require('./mysqlConfig.json');
const createTablesIfNotExist = require("./initTables")

const teams = [
    { team_name: 'Team A', team_description: 'This is Team A description' },
    { team_name: 'Team B', team_description: 'This is Team B description' },
    { team_name: 'Team C', team_description: 'This is Team C description' },
];

const members = [
    { member_name: 'John Doe', team_id: 1 },
    { member_name: 'Jane Smith', team_id: 1 },
    { member_name: 'Michael Johnson', team_id: 1 },
    { member_name: 'Emily Brown', team_id: 2 },
    { member_name: 'Robert Lee', team_id: 2 },
    { member_name: 'William Davis', team_id: 2 },
    { member_name: 'Olivia Wilson', team_id: 3 },
    { member_name: 'Sophia Taylor', team_id: 3 },
    { member_name: 'Ethan Clark', team_id: 3 },
]

app.use(
    cors({
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    })
);

const pool = mysql.createPool(sqlConfig);

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
        createTablesIfNotExist(pool);
        connection.release();
    }
});

app.use(express.json());


app.get('/', (req, res) => {
    res.send("<div>TheIdol Express.js is Online</div>")
})

app.get('/addSampleData', (req, res) => {
    const fetchQuery = `
    INSERT INTO idolschema.team (team_id, team_name) VALUES
    (1, 'Team A'),
    (2, 'Team B'),
    (3, 'Team C'),
    (4, 'Team D'),
    (5, 'Team E'),
    (6, 'Team F'),
    (7, 'Team G'),
    (8, 'Team H'),
    (9, 'Team I'),
    (10, 'Team J');
    `;

    const addMember = `
    INSERT INTO idolschema.member (member_name, team_id) VALUES
    ('John Smith', 1),
    ('Jane Doe', 1),
    ('Michael Johnson', 2),
    ('Emily Williams', 2),
    ('Robert Brown', 3),
    ('Olivia Lee', 3),
    ('William Jones', 4),
    ('Sophia Kim', 4),
    ('David Davis', 5),
    ('Emma Wilson', 5),
    ('Daniel Taylor', 6),
    ('Isabella Anderson', 6),
    ('James Thomas', 7),
    ('Mia Martinez', 7),
    ('Benjamin Miller', 8),
    ('Charlotte Hernandez', 8),
    ('Christopher White', 9),
    ('Amelia Wright', 9),
    ('Andrew Martin', 10),
    ('Ella Taylor', 10),
    ('Matthew Garcia', 1),
    ('Grace Martinez', 1),
    ('Ethan Robinson', 2),
    ('Chloe Moore', 2),
    ('Aiden Hill', 3),
    ('Avery Murphy', 3),
    ('William Turner', 4),
    ('Lily Rivera', 4),
    ('Logan Cooper', 5),
    ('Harper Howard', 5),
    ('Sebastian Ward', 6),
    ('Evelyn Reed', 6),
    ('Ryan Brooks', 7),
    ('Zoey Bailey', 7),
    ('Nathan Foster', 8),
    ('Madison Torres', 8),
    ('Alexander Butler', 9),
    ('Riley Ramirez', 9),
    ('Jackson Simmons', 10),
    ('Layla Russell', 10),
    ('Gabriel Patterson', 1),
    ('Scarlett Thomas', 1),
    ('Emma Sanchez', 2),
    ('Aria Price', 2),
    ('Henry Ross', 3),
    ('Aubrey Powell', 3),
    ('Leo Jenkins', 4),
    ('Sofia Long', 4),
    ('Owen Hughes', 5),
    ('Ellie Richardson', 5);`

    pool.query(fetchQuery, (err, results) => {
        if (err) {

            res.status(500).json({ error: err });
        }
    });

    pool.query(addMember, (err, results) => {
        if (err) {

            res.status(500).json({ error: err });
        }
    });
})

app.get('/api/fetchAllMember', (req, res) => {
    const fetchQuery = `SELECT member_id, member_name, idolschema.member.team_id, idolschema.team.team_name FROM idolschema.member
    JOIN idolschema.team ON idolschema.member.team_id = idolschema.team.team_id;`;

    pool.query(fetchQuery, (err, results) => {
        if (err) {

            res.status(500).json({ error: 'Error fetching data' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/api/fetchAllTeam', (req, res) => {
    const fetchQuery = 'SELECT * FROM idolschema.team';

    pool.query(fetchQuery, (err, results) => {
        if (err) {

            res.status(500).json({ error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

app.put('/api/addNewTeam', (req, res) => {

    const newTeam = req.body.newTeam;
    const fetchQuery = `
    INSERT INTO idolschema.team (team_name) VALUES ('${newTeam}')
    `;

    pool.query(fetchQuery, (err, results) => {
        if (err) {

            res.status(500).json({ error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

app.put('/api/addNewMember', (req, res) => {

    const newMember = req.body.newMember.replace(/[.,]/g, '');
    const newMemberTeamId = req.body.newMemberTeamId;
    const fetchQuery = `
    INSERT INTO idolschema.member (member_name, team_id) VALUES ('${newMember}','${newMemberTeamId}')
    `;

    pool.query(fetchQuery, (err, results) => {
        if (err) {

            res.status(500).json({ error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

app.put('/api/editTeamName/:teamId', (req, res) => {
    const teamId = parseInt(req.params.teamId);
    const updatedTeamName = req.body.newName;
    const fetchQuery = `
    UPDATE idolschema.team
    SET team_name = '${updatedTeamName}'
    WHERE team_id = ${teamId}; 
    `;

    pool.query(fetchQuery, (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

app.put('/api/editMemberName/:memberId', (req, res) => {
    const memberId = parseInt(req.params.memberId);
    const updatedName = req.body.newName;
    const fetchQuery = `
    UPDATE idolschema.member
    SET member_name = '${updatedName}'
    WHERE member_id = ${memberId}; 
    `;

    pool.query(fetchQuery, (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

app.delete('/api/deleteMember/:memberId', (req, res) => {
    const memberId = parseInt(req.params.memberId);
    const DeleteQuery = `
    DELETE FROM idolschema.member WHERE member_id = ?;
`;
    pool.query(DeleteQuery, [memberId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
})
app.delete('/api/deleteTeamName/:teamId', (req, res) => {
    const teamId = parseInt(req.params.teamId);


    const DeleteQuery1 = `
        DELETE FROM idolschema.member WHERE team_id = ?;
    `;

    const DeleteQuery2 = `
    DELETE FROM idolschema.team WHERE team_id = ?;
    `;

    pool.query(DeleteQuery1, [teamId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        }
    });

    pool.query(DeleteQuery2, [teamId], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'failed to delete' });
        }
        res.status(200).json(results);
    });


});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
