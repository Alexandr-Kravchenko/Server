import moment from 'moment';
import pool from './db.js';

moment.locale('ru');
const allMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

function formatMap(list) {
    let employeeMap = new Map();
    list.forEach((user) => {
        let birthDate = new Date(user.birthday);
        let birthMonth = birthDate.getMonth();
        if (employeeMap.has(birthMonth)) {
            let tempEmployees = employeeMap.get(birthMonth);
            tempEmployees.push({ ...user, birthday: birthDate });
            employeeMap.set(birthMonth, tempEmployees);
        } else {
            employeeMap.set(birthMonth, [{ ...user, birthday: birthDate }]);
        }
    })
    return employeeMap;
}

function formatList(map, plan) {
    let result = [];
    let currentMonth = new Date().getMonth();
    for (const [key, value] of map) {
        for (let i = 0; i <= plan; i += 1) {
            let month = ((currentMonth + 1) + i) % 12 - 1;
            if (key === month) {
                result.push(sortByDay(value));
            }
        }
    }

    let sortedArray = sortByMonth(result);
    result = [];

    sortedArray.forEach(employees => {
        if (employees[0].birthday.getMonth() >= currentMonth) result.push(employees);
    })

    sortedArray.forEach(employees => {
        if (employees[0].birthday.getMonth() < currentMonth) result.push(employees);
    })

    return result;
}

function sortByDay(employees) {
    return employees.sort((current, next) => {
        return current.birthday.getDate() > next.birthday.getDate() ? 1 : -1;
    });
}

function sortByMonth(employees) {
    return employees.sort((current, next) => {
        return current[0].birthday.getMonth() > next[0].birthday.getMonth() ? 1 : -1;
    });
}

function formatStr(array) {
    const result = array.map((employees) => {
        let currentDate = new Date();
        let year = currentDate.getMonth() <= employees[0].birthday.getMonth() ? currentDate.getFullYear() : currentDate.getFullYear() + 1;
        let text = `${allMonths[employees[0].birthday.getMonth()]} ${year}\n`
        return text + employees.map((emp, index) => {
            let date = currentDate.getMonth() <= employees[index].birthday.getMonth() ? currentDate : currentDate.setFullYear(currentDate.getFullYear() + 1);
            let formatedDay = emp.birthday.getDate().toLocaleString(undefined, { minimumIntegerDigits: 2 });
            let formatedAge = moment(emp.birthday).from(date, true); // true - without 'ago'
            return `(${formatedDay}) - ${emp.name} (${formatedAge})`
        }).join('\n');
    });
    return result.join('\n');
}

function main(employees, plan = 0) {
    plan = plan % 13;
    return console.log(formatStr(formatList(formatMap(employees), plan)));
}

async function getData(plan = 0) {
    return await pool
        .query('SELECT * FROM employees')
        .then(data => {
            main(data.rows, plan);
            process.exit();
        })
        .catch(err => console.log(err));
}

let plan = process.argv[2];

getData(plan);
