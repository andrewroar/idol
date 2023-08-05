# Idol Management API

This is a Node.js and Express.js based API for managing idol teams and their members. The API interacts with a MySQL database to store and retrieve data. You can use this API to perform CRUD (Create, Read, Update, Delete) operations on idol teams and their members.

## Prerequisites

Before running the API, make sure you have the following installed:

- Node.js (https://nodejs.org)
- MySQL server

## Installation

1. Clone the repository or download the source code.

2. Navigate to the project folder and install the required dependencies using npm:

```bash
npm install
```

3. Create a MySQL database and update the connection configuration:

Create a new database for the API and update the `mysqlConfig.json` file with your database connection details.

```json
// mysqlConfig.json
{
  "host": "your_database_host",
  "user": "your_database_user",
  "password": "your_database_password",
  "database": "idolschema"
}
```

## Database Initialization

The API automatically creates the required database tables if they do not exist. When you run the API for the first time, the tables will be created in the specified database.

## Usage

Run the API using the following command:

```bash
node app.js
```

The API will start running on `http://localhost:3000`.

## Endpoints

The API provides the following endpoints for managing idol teams and members:

- `GET /api/fetchAllTeam`: Fetch all teams and their information.
- `GET /api/fetchAllMember`: Fetch all members with their respective teams.
- `PUT /api/addNewTeam`: Add a new team with a provided team name.
- `PUT /api/addNewMember`: Add a new member to a specific team.
- `PUT /api/editTeamName/:teamId`: Edit the name of a team with the provided `teamId`.
- `PUT /api/editMemberName/:memberId`: Edit the name of a member with the provided `memberId`.
- `DELETE /api/deleteMember/:memberId`: Delete a member with the provided `memberId`.
- `DELETE /api/deleteTeamName/:teamId`: Delete a team with the provided `teamId`, along with all its members.

## Adding Sample Data

You can add sample data for teams and members using the `/addSampleData` endpoint. When you access this endpoint, it will populate the database with sample data for 10 teams and 50 members.

```bash
GET /addSampleData
```

## Team and Member Data Format

The team data contains two properties: `team_name` and `team_description`.

The member data contains two properties: `member_name` and `team_id`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Feel free to use and modify this API as per your requirements. If you have any questions or need assistance, feel free to contact me. Happy coding!
