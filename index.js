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

// prompts that run when add Manager is selected
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

// prompts that run when add Engineer is selected
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

// prompts that run when add Intern is selected
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
