import {faker} from '@faker-js/faker';


export const fetchAccount = async() => {
    const response = await fetch('./data.json')
    const data = await response.json();
    return data.transactions;
}


// function to generate transaction data------------------

// const buildDataSet = () => {
//     let transactions = [];

//     for (let i = 0; i < 600; i++) {
//         let obj = {};
//         obj['id'] = faker.datatype.uuid()
//         obj['date'] = faker.date.between('2022-01-01', '2023-02-16');
//         obj['amount'] = Number(faker.finance.amount(0, 100, 2));
//         obj['vendor'] = faker.company.name();
//         obj['category'] = faker.commerce.department();

//         const timeZoneOffset = new Date(obj['date']).getTimezoneOffset();
//         obj['date'] = new Date(obj['date'].getTime() - (timeZoneOffset*60*1000)).toISOString().split('T')[0];    

//         transactions.push(obj)
//     }
        
//     return transactions
// }

// console.log(buildDataSet())