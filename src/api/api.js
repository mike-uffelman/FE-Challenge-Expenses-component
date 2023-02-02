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
//         obj['id'] = faker.datatype.uuid()
//         obj['date'] = faker.date.between('2022-01-01', '2023-01-28');
//         obj['amount'] = Number(faker.finance.amount(0, 500, 2));
//         obj['vendor'] = faker.company.name();
//         obj['category'] = faker.commerce.department();

//         transactions.push(obj)
//     }

//     return transactions;
// }

// console.log(buildDataSet())