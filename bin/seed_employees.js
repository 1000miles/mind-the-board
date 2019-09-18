const mongoose = require("mongoose");
const Employee = require("../models/Employee");

mongoose
  .connect('mongodb://localhost/mind-the-board', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const employees = [
  {
    firstName: "Kiran",
    lastName: "Shagoti",
    email: "faker-kiran@email.com",
    startingDate: "2019-11-01",
    leavingDate: undefined,
    department: "Ops",
    jobTitle: "Software Engineer",
    role: "Admin",
    confirmed: true,
    contract_signed: true,
  },
  {
    firstName: "Ninette",
    lastName: "Adhikari",
    email: "faker-ninette@email.com",
    startingDate: "2019-12-01",
    leavingDate: undefined,
    department: "HR",
    jobTitle: "HR Teamlead",
    role: "HR-Admin",
    confirmed: true,
    contract_signed: true,
  },
  {
    firstName: "Steve",
    lastName: "Wright",
    email: "faker-steve@email.com",
    startingDate: "2020-01-01",
    leavingDate: "2020-12-31",
    department: "Office Management",
    jobTitle: "Office Management",
    role: "Employee",
    confirmed: true,
    contract_signed: true,
  }
]

Employee.insertMany(employees)
  .then(employee => {
    console.log("Success! Added " + employee.length + " employees in the collection");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
