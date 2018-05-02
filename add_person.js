const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


function getFound(i) {
  console.log(`Found ${i} person(s) by the name '${process.argv[2]}':`);
}

function getPeople(res) {
  for (i = 0; i < res.length; i++) {
    console.log(`${res[i].first_name} ${res[i].last_name}, born ${res[i].birthdate.toISOString().slice(0,10)}`);
  }
  getFound(i);
}

// == FIND Match ==
// knex.select('*')
// .from('famous_people')
// .where('first_name', '=', process.argv[2])// $1::text
// .then(function(rows) {
//   getPeople(rows);
// })
// .catch(function(err) {
//   console.error(err)
// })
// .finally(()=>{
//   knex.destroy();
// });

// == INSERT ==
const fname = process.argv[2];
const lname = process.argv[3];
const dob = new Date(process.argv[4]); // form: yyyy/mm/dd

knex('famous_people').insert({first_name: fname, last_name: lname, birthdate: dob})
.catch(function(err) {
  console.error(err)
})
.finally(function(){
  knex.destroy();
});

// == DEL ==
// knex('famous_people')
// .where('id', 7)
// .del()
// .catch(function(err) {
//   console.error(err)
// })
// .finally(()=>{
//   knex.destroy();
// });
