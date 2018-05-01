const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const query = `
  SELECT *
    FROM famous_people
    WHERE first_name = $1::text;
`;

function getFound(res) {
  console.log(`Found ${res.rowCount} person(s) by the name '${process.argv[2]}':`);
}

function getPeople(res) {

  for (let row of res.rows) {
    console.log(`${row.first_name} ${row.last_name}, born ${row.birthdate.toISOString().slice(0,10)}`);
  }
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    getFound(result);
    getPeople(result);

    client.end();
  });
});