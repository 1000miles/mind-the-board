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
    console.error('Error connecting to mongo', err);
  });

const employees = [
  {
    firstName: "Kiran",
    lastName: "Shagoti",
    email: "faker-kiran@email.com",
    phone: "+49 123 456 789",
    jobTitle: "Software Engineer",
    department: "Engineering",
    startingDate: "2019-11-01",
    leavingDate: null,
    confirmed: true,
    contract_signed: true,
    address: {
      address1: "Eichhornstrasse 3",
      address2: "",
      city: "Berlin",
      zip: 10785,
      country: "Germany"
    },
    role: "Admin"
  },
  {
    firstName: "Ninette",
    lastName: "Adhikari",
    email: "faker-ninette@email.com",
    phone: "+41 123 456 789",
    jobTitle: "HR Teamlead",
    department: "HR",
    startingDate: "2019-12-01",
    leavingDate: null,
    confirmed: true,
    contract_signed: false,
    address: {
      address1: "Mittelweg 22",
      address2: "",
      city: "Berlin",
      zip: 12053,
      country: "Germany"
    },
    role: "HR-Admin"
  },
  {
    firstName: "Steve",
    lastName: "Wright",
    email: "faker-steve@email.com",
    phone: "+41 123 456 789",
    jobTitle: "Office Management",
    department: "Office Management",
    startingDate: "2020-01-01",
    leavingDate: "2020-12-31",
    confirmed: false,
    contract_signed: false,
    address: {
      address1: "Oranienstrasse 123",
      address2: "",
      city: "Berlin",
      zip: 10999,
      country: "Germany"
    },
    role: "Employee"
  }
];

Employee.deleteMany()
  .then(() => {
    console.log(`Deleting all employees`);
    Employee.insertMany(employees)
      .then(employee => {
        console.log("Success! Added " + employee.length + " employees in the collection");
        mongoose.connection.close();
      })    
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(`Employees could not be deleted.`, err);
  });


