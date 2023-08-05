const createTablesIfNotExist = (pool) => {
  const createTeamTableQuery = `
      CREATE TABLE IF NOT EXISTS team (
        team_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
        team_name VARCHAR(50) NOT NULL UNIQUE,
        team_description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

  const createMemberTableQuery = `
      CREATE TABLE IF NOT EXISTS member (
        member_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
        member_name VARCHAR(50) NOT NULL,
        team_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (team_id) REFERENCES team(team_id)
      )
    `;

  const initDatas = `
  INSERT INTO idolschema.team (team_id, team_name, team_description, created_at)
VALUES
    (101, 'Team Alpha', 'This is Team Alpha'),
    (102, 'Team Beta', 'Team Beta handles product development'),
    (103, 'Team Gamma', 'Team Gamma focuses on marketing'),
    (104, 'Team Delta', 'Team Delta manages customer support'),
    (105, 'Team Epsilon', 'Team Epsilon works on research');

    
    INSERT INTO idolschema.member (member_id, member_name, team_id)
VALUES
    (1, 'John Doe', 101),
    (2, 'Jane Smith', 101),
    (3, 'Mike Johnson', 102),
    (4, 'Emily Brown', 102),
    (5, 'Alex Wilson', 103);
    `

  pool.query(createTeamTableQuery, (err) => {
    if (err) {
      console.error('Error creating team table:', err);
    } else {
      console.log('Team table created or already exists');
    }
  });

  pool.query(createMemberTableQuery, (err) => {
    if (err) {
      console.error('Error creating member table:', err);
    } else {
      console.log('Member table created or already exists');
    }
  });
}

module.exports = createTablesIfNotExist