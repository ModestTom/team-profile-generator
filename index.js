const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const layout = require('./src/layout.js');
const inquirer = require('inquirer');
const fs = require('fs');
const employees = [];
console.log(employees);

init = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What role of team member would you like to add?',
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'role',
        },
    ])
    .then(({role}) => {
        switch (role) {
            case 'Manager':
                initManager(role);
                break;
            case 'Engineer':
                initEngineer(role);
                break;
            case 'Intern':
                initIntern(role);
                break;
        }
    });
};

initManager = (role) => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the managers name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is the managers ID?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the managers email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the team managers office number?',
            name: 'officeNumber',
        }
    ])        
    .then((answer) => {
        const manager = new Manager(answer.name, role, answer.id, answer.email, answer.officeNumber);
        console.log(manager);
        employees.push(manager);
        cont();
    });
};

initEngineer = (role) => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the engineers name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is the engineers ID?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the engineers email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What is the engineers github username?',
            name: 'github',
        },
    ])
    .then((answer) => {
        const engineer = new Engineer(answer.name, role, answer.id, answer.email, answer.github);
        employees.push(engineer);
        cont();
    });
};

initIntern = (role) => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the interns name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is the interns ID?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the interns email?',
            name: 'email',
        },
        {
            type: 'input',
            message: 'What school is the intern attending?',
            name: 'school',
        },
    ])
    .then((answer) => {
        const intern = new Intern(answer.name, role, answer.id, answer.email, answer.school);
        employees.push(intern);
        cont();
    });
};

cont = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to add another employee?',
            choices: ['Yes', 'No'],
            name: 'cont',
        },
    ])
    .then((answer) => {
        switch(answer.cont) {
            case 'Yes':
                init();
                break;
            case 'No':
                generateHtml(employees);
                console.log(employees);
                break;
        }
    });
};

generateHtml = (employees) => {
    const generateLayout = layout(employees);
    fs.writeFile('./dist/index.html', generateLayout, err => {
        if(err) {
            throw err;
        }
        console.log('index.html has generated successfully');
    });
};

init();