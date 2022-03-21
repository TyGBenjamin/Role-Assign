const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const jest = require("jest");

let Team = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const output = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRender");

let managerCounter = 0;

const teamMembers = {
  Manager: [
    {
      type: "input",
      message: "Name of manager? ",
      name: "managerName",
    },
    {
      type: "input",
      message: "ID of manager? ",
      name: "managerId",
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
  ],

  Engineer: [
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
  ],

  Intern: [
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
  ],
};

function start() {
  inquirer.prompt(addNew).then((answer) => {
    if (answer.addMember == true) {
      addRole();
    } else {
      fs.writeFileSync(output, render(Team), "utf-8");
      process.exit(0);
    }
  });
}
const addNew = {
  type: "confirm",
  message: "Do you want to add another employee? ",
  name: "addMember",
  choices: ["Yes", "No"],
};

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

// function addRole() {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         message: "Choose the employee's role:",
//         name: "employeeChoice",
//         choices: ["Manager", "Engineer", "Intern"],
//       },
//     ])
//     .then((answer) => {
//       if (answer.employeeChoice === "Manager" && managerCounter < 1) {
//         managerCounter++;
//         // console.log("hey boss")
//         inquirer.prompt(teamMembers.Manager).then((results) => {
//           const manager = new Manager(
//             results.managerName,
//             results.managerId,
//             results.managerEmail,
//             results.officeNumber
//           );
//           Team.push(manager);
//           start();
//         });
//       } else if (answer.employeeChoice === "Engineer") {
//         inquirer.prompt(teamMembers.Engineer).then((results) => {
//           const engineer = new Engineer(
//             results.engineerName,
//             results.engineerId,
//             results.engineerEmail,
//             results.Github
//           );
//           Team.push(engineer);

//           start();
//         });
//       } else if (answer.employeeChoice === "Intern") {
//         inquirer.prompt(teamMembers.Intern).then((results) => {
//           const intern = new Intern(
//             results.internName,
//             results.internId,
//             results.internEmail,
//             results.school
//           );
//           Team.push(intern);
//           start();
//         });
//       } else {
//         start();
//       }
//     });
// }

function mangerSwitch() {
  inquirer.prompt(teamMembers.Manager).then((results) => {
    const manager = new Manager(
      results.managerName,
      results.managerId,
      results.managerEmail,
      results.officeNumber
    );
    Team.push(manager);
    start();
  });
}

function engineerSwitch() {
  inquirer.prompt(teamMembers.Engineer).then((results) => {
    const engineer = new Engineer(
      results.engineerName,
      results.engineerId,
      results.engineerEmail,
      results.Github
    );
    Team.push(engineer);

    start();
  });
}

function internSwitch() {
  inquirer.prompt(teamMembers.Intern).then((results) => {
    const intern = new Intern(
      results.internName,
      results.internId,
      results.internEmail,
      results.school
    );
    Team.push(intern);
    start();
  });
}

start();
