const Sequelize = require('sequelize');

const sequelize = new Sequelize('ejercicio', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


class Person extends Sequelize.Model {}
Person.init({
  firstName: Sequelize.STRING,
  lastName:Sequelize.STRING
}, { sequelize, modelName: 'user' });


const Model = Sequelize.Model;
class User extends Model {}
User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'user'
});

/* insertamos un usuario */
sequelize.sync()
  .then(() => Person.create({
    firstName: 'Florencia',
    lastName: 'Masita'
  }))
  .then (() => User.update({ firstName: "Florcha" }, {
    where: {
      lastName: 'Masita'
    }
  }).then(() => {
    console.log("Done");
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
