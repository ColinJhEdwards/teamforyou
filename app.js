const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const team = [];

const addManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the managers name?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the managers email?",
      },
      {
        type: "input",
        name: "managerID",
        message: "What is the managers employee ID?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the managers office number?",
      },
    ])
    .then((res) => {
      const manager = new Manager(
        res.managerName,
        res.managerEmail,
        res.managerID,
        res.managerOfficeNumber
      );
      team.push(manager);
      crossRoads();
    });
};

const crossRoads = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "whatDo",
        message: "What type of team member would you like to add?",
        choices: ["Engineer", "Intern", "Done"],
      },
    ])
    .then((res) => {
      switch (res.whatDo) {
        case "Engineer":
          return addEngineer();
        case "Intern":
          return addIntern();
        default:
          return buildTeam();
      }
    });
};

const addEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the engineers name?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineers email?",
      },
      {
        type: "input",
        name: "engineerID",
        message: "What is the engineers employee ID?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineers github username?",
      },
    ])
    .then((res) => {
      const engineer = new Engineer(
        res.engineerName,
        res.engineerEmail,
        res.engineerID,
        res.engineerGithub
      );
      team.push(engineer);
      crossRoads();
    });
};

const addIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the interns name?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the interns email?",
      },
      {
        type: "input",
        name: "internID",
        message: "What is the interns employee ID?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What school does the intern attend?",
      },
    ])
    .then((res) => {
      const intern = new Intern(
        res.internName,
        res.internEmail,
        res.internID,
        res.internSchool
      );
      team.push(intern);
      crossRoads();
    });
};

const buildTeam = () => {
  fs.writeFileSync(outputPath, render(team), "utf-8");
};

addManager();
