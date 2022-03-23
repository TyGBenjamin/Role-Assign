// Import constructor class and functions

const Employee = require("./lib/Employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

// Import and require NPM packages

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const jest = require("jest");

// setting paths for data reference

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const output = path.join(OUTPUT_DIR, "team.html");

const DIST_DIR = path.resolve(__dirname, "path");
const distPath = path.join(DIST_DIR, "index.html");

const render = require("./lib/render.js");

let managerCounter = 0;
let Team = [];

// Questions used for inquirer prompt

const addNew = {
  type: "confirm",
  message: "Do you want to add another employee? ",
  name: "addMember",
  choices: ["Yes", "No"],
};

// This function is what starts the initial prompt for inquirer
function start() {
  inquirer.prompt(addNew).then((answer) => {
    if (answer.addMember === true) {
      addRole();
    } else if (answer.addMember === false) {
      if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
        fs.writeFileSync(distPath, render(teamMembers), "utf-8");
        process.exit(0);
      }
    } else {
      fs.writeFileSync(distPath, render(teamMembers), "utf-8");
      process.exit(0);
    }
  });
}

// Function when a user selects add Role
function addRole() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose the employee's role:",
        name: "select",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then((answer) => {
      switch (answer.select) {
        case "Manager":
          if (managerCounter < 1) managerCounter++;
          mangerSwitch();
          break;

        case "Engineer":
          engineerSwitch();
          break;

        case "Intern":
          internSwitch();
          break;

        default:
      }
    });
}
function addManager() {
  inquirer.prompt([
    {
      type: "input",
      message: "Name of manager? ",
      name: "managerName",
      validate: (answer) => {
        if (answer !== "") {
          return true;
        }
        return "Please enter a name.";
      },
    },
    {
      type: "input",
      message: "ID of manager? ",
      name: "managerId",
      validate: (answer) => {
        if (answer !== isNaN(answer)) {
          return true;
        }
        return "Please enter a valid number";
      },
    },

    {
      type: "input",
      message: "Email of manager? ",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "What is thier office number? ",
      name: "officeNumber",
    },
  ]);
}

function addEngineer() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is their name? ",
      name: "engineerName",
    },
    {
      type: "input",
      message: "What the ID of the engineer? ",
      name: "engineerId",
    },

    {
      type: "input",
      message: "Email of engineer? ",
      name: "engineerEmail",
    },
    {
      type: "input",
      message: "Github username of engineer? ",
      name: "Github",
    },
  ]);
}

function addIntern() {
  inquirer.prompt([
    {
      type: "input",
      message: "name of intern? ",
      name: "internName",
    },
    {
      type: "input",
      message: "ID of intern? ",
      name: "internId",
    },

    {
      type: "input",
      message: "Email of intern? ",
      name: "internEmail",
    },
    {
      type: "input",
      message: "School of intern? ",
      name: "school",
    },
  ]);
}

// when a user selects add Manager. the switch method will call this function
function mangerSwitch() {
  addManager().then((answers) => {
    const manager = new Manager(
      answers.managerName,
      answers.managerId,
      answers.managerEmail,
      answers.officeNumber
    );
    Team.push(manager);
    fs.writeFileSync("index.html", generateHTML(results))
      .then(() => console.log("Successfully wrote to index.html"))
      .catch((err) => console.error(err));

    const generateHTML = ({
      managerName,
      managerId,
      managerEmail,
      officeNumber,
    }) =>
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="container sm-3">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${managerName}</h1>
    <p class="lead"> ID: ${managerId}.</p>
    <h3> <span class="badge badge-secondary">Assigned Role</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My email is ${managerEmail}</li>
      <li class="list-group-item"> Telephone: ${officeNumber}</li>
    </ul>
  </div>
</div>
</body>
</html>`;

    start();
  });
}

// when a user selects add Engineer. the switch method will call this function
function engineerSwitch() {
  addEngineer().then((answers) => {
    const engineer = new Engineer(
      answers.engineerName,
      answers.engineerId,
      answers.engineerEmail,
      answers.Github
    );
    Team.push(engineer);

    start();
  });
}

// when a user selects add Intern. the switch method will call this function
function internSwitch() {
  addIntern().then((answers) => {
    const intern = new Intern(
      answers.internName,
      answers.internId,
      answers.internEmail,
      answers.school
    );
    Team.push(intern);
    start();
  });
}

start();

const generateHTML = ({ name, location, github, linkedin }) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="container sm-3">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${name}</h1>
    <p class="lead">I am from ${location}.</p>
    <h3> <span class="badge badge-secondary">Assigned Role</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${github}</li>
      <li class="list-group-item">LinkedIn: ${linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;

// Bonus using writeFileSync as a promise
const init = () => {
  promptUser()
    // Use writeFileSync method to use promises instead of a callback function
    .then((answers) => fs.writeFileSync("index.html", generateHTML(answers)))
    .then(() => console.log("Successfully wrote to index.html"))
    .catch((err) => console.error(err));
};
