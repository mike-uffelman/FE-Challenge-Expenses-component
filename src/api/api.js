import {faker} from '@faker-js/faker';


export const fetchAccount = async() => {
    const response = await fetch('./data.json')
    const data = await response.json();
    return data.transactions;
}


// const buildDataSet = () => {
//     let transactions = [];


//     for (let i = 0; i < 600; i++) {
//         let obj = {};
//         obj['date'] = faker.date.between('2021-01-01T00:00:00.000Z', '2023-01-22T00:00:00.000Z');
//         obj['amount'] = Number(faker.finance.amount(0, 1000, 2));
//         obj['vendor'] = faker.company.name();
//         obj['category'] = faker.commerce.department();

//         transactions.push(obj)
//     }

//     return transactions;
// }

// console.log(buildDataSet())