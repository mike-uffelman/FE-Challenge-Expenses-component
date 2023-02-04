const weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getMonth = (date) => month[new Date(date).getMonth()];
export const getDay = (date) => new Date(date).getDate();
export const getWeekDay = (date) => weekday[(new Date(date).getDay() + 1) % 7];

export const formatAmount = (amount) => {
    return new Intl.NumberFormat(navigator.languages[0], { style: 'currency', currency: 'USD'}).format(amount)
}


export const filterSortData = (data, endingDate, daysBack) => {
    if (!data) return;
    let endDate = new Date(endingDate);
    let startDate = new Date(Date.now() - daysBack*86400000);

    // filters and sorts transactions within date range and descending order
    const filterSort = 
        data
            .filter(a => new Date(a.date) > new Date(startDate) && new Date(a.date) <= new Date(endDate))
            .sort((a, b) => new Date(a.date) - new Date(b.date))
    
    // console.log(filterSort)

    const cleanedData = {
        'startDate': startDate,
        'endDate': endDate,
        'transactions': filterSort
    }


    return cleanedData;
}

//! CLEAN UP TEST FUNCTIONS BELOW--------------------------


// export const logDates = (data, endingDate, startingDate, filterDays = 7) => {
//     console.log('%cSTART LOGDATES FUNCTION...............', 'color:orange')
//     console.log(data.endDate)
//     let endDate = new Date(data.endDate);
//     let startDate = new Date(endDate)
//     let daysArray = []

//     // const cleanData = data.filter(a => new Date(a.date) > new Date(Date.now() - 7*86400000)).sort((a, b) => new Date(b.date) - new Date(a.date))

//     const transactions = [
//         {
//             "date": "2023-01-24",
//             "amount": 319.84,
//             "vendor": "Cartwright, Heaney and Spinka",
//             "category": "Home"
//         },
//         {
//             "date": "2023-01-25",
//             "amount": 400.03,
//             "vendor": "Thompson - Roberts",
//             "category": "Electronics"
//         },
//         {
//             "date": "2023-01-29",
//             "amount": 12.01,
//             "vendor": "Reynolds - Feil",
//             "category": "Toys"
//         },
//         {
//             "date": "2023-01-27",
//             "amount": 720.76,
//             "vendor": "Weissnat Inc",
//             "category": "Jewelery"
//         },
//         {
//             "date": "2023-01-20",
//             "amount": 1000,
//             "vendor": "Weissnat Inc",
//             "category": "Jewelery"
//           }
//       ]

//     // build dateRange
//     for (let i = new Date(startDate.setDate(startDate.getDate() - (filterDays - 1)));
//              i <= endDate; 
//              i.setDate(i.getDate() + 1)) {

//                 let testDate = new Date(i.getFullYear(), i.getMonth(), i.getDate()) 
//                 console.log(testDate.toDateString())

//                 daysArray.push(new Date(i))

                
//     }
//     console.log(daysArray)

//     daysArray.map(days =>  {
//         const timeZoneOffset = days.getTimezoneOffset();
//         days = new Date(days.getTime() - (timeZoneOffset*60*1000))
//         return days.toISOString().split('T')[0]


//     })
//     console.log('DAYSARRAY: ', daysArray)


   
//     let completeRangeData = [];
//     let zeroSpendDays = daysArr.filter(day => !transactions.map(trans => trans.date).includes(day));


//     transactions.forEach(trans => completeRangeData.push(trans))

//     completeRangeData.push(zeroSpendDays.map(day => {
//         return {
//             "date": day,
//             "amount": 0
//         }
//     }))

//     console.log(completeRangeData.flat())
    
//     console.log('%cEND LOGDATES FUNCTION------------------', 'color: orange')
// }

// ------------ filter daysRange by transactions to get final array for mapping ------------
// const transactions = [
//     {
//       "date": "2023-01-24",
//       "amount": 319.84,
//       "vendor": "Cartwright, Heaney and Spinka",
//       "category": "Home"
//     },
//     {
//       "date": "2023-01-25",
//       "amount": 400.03,
//       "vendor": "Thompson - Roberts",
//       "category": "Electronics"
//     },
//     {
//       "date": "2023-01-29",
//       "amount": 12.01,
//       "vendor": "Reynolds - Feil",
//       "category": "Toys"
//     },
//     {
//       "date": "2023-01-27",
//       "amount": 720.76,
//       "vendor": "Weissnat Inc",
//       "category": "Jewelery"
//     }
//   ]
//   const transactionsDates = [
//       "2023-01-24",
//       "2023-01-25",
//       "2023-01-22",
//       "2023-01-27",
//   ]

//   const daysArr = [
//     "2023-01-23",
//     "2023-01-24",
//     "2023-01-25",
//     "2023-01-26",
//     "2023-01-27",
//     "2023-01-28",
//     "2023-01-29"
//   ]

  



// const testFunctions = (transactions, daysArr) => {
//     let completeRangeData = [];
//     let zeroSpendDays = daysArr.filter(day => !transactions.map(trans => trans.date).includes(day));

//     transactions.forEach(trans => completeRangeData.push(trans))

//     completeRangeData.push(zeroSpendDays.map(day => {
//         return {
//             "date": day,
//             "amount": 0
//         }
//     }))

//     console.log(completeRangeData.flat())
// }

// testFunctions(transactions, daysArr);

export const fixTimeZone = (day) => {
    const timeZoneOffset = day.getTimezoneOffset();
    day = new Date(day.getTime() - (timeZoneOffset*60*1000))
    return day.toISOString().split('T')[0];
}


export const buildGraphData = (data, endingDate, startingDate, filterDays) => {
    if(!data) return;
    const endDate = new Date(endingDate);
    const startDate = new Date(endingDate);

    // build date range
    let daysArray = [];

    for (let i = new Date(startDate.setDate(startDate.getDate() - (filterDays - 1)));
             i <= new Date(endDate); 
             i.setDate(i.getDate() + 1)) {
                // let testDate = new Date(i.getFullYear(), i.getMonth(), i.getDate()) 
                daysArray.push(new Date(i))
    }

    // console.log(daysArray)

    const dateRange = daysArray.map(days =>  {
        const timeZoneOffset = days.getTimezoneOffset();
        days = new Date(days.getTime() - (timeZoneOffset*60*1000))
        return days.toISOString().split('T')[0];
    })

    

    // console.log('%cbuilding new function=-----------', 'background-color: yellow; color: black; font-size: 1.5rem', dateRange)
    // check data against build date range

    // combine zero spend days with transaction days

    // sort zero spend and transactions by date

    // return 


    //  onsole.log(filterSortTransactions)




    const dateRangeData = compareTransactionsAndDates(dateRange, data)


    
        
    const filterSortTransactions = 
        dateRangeData
            .filter(a => new Date(a.date) >= new Date(dateRange[0]) && new Date(a.date) <= new Date(dateRange.at(-1)))
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .reduce((accumulator, current) => {
                let key = current.date
                // const match = transactions.find(trans => trans.date === current.date)
                // console.log(match)
        
                if(!accumulator[key]) {
                    accumulator[key] = [];
        
                }
                accumulator[key].push(current)
                return accumulator;
            }, {})
    //  console.log(filterSortTransactions)    
    
    return filterSortTransactions;

    
        // filter and sort transactions by date range
    
    
}

const compareTransactionsAndDates = (dateRange, data) => {
    // console.log(data)
    let completeRangeData = [];
    let zeroSpendDays = dateRange.filter(day => !data.map(trans => trans.date).includes(day));

    data.forEach(trans => completeRangeData.push(trans))

    completeRangeData.push(zeroSpendDays.map(day => {
        return {
            "date": day,
            "amount": 0
        }
    }))

    // console.log(completeRangeData.flat())
    return completeRangeData.flat()
}


// test combining transactions on same date using reduce
const transactions = [
    {
      "id": "658d9e57-05b3-4273-9c5f-63f5a5624cb6",
      "date": "2023-01-25",
      "amount": 114.6,
      "vendor": "Haag, Kovacek and Goldner",
      "category": "Kids"
    },
    {
      "id": "ebfc36ca-eea8-4719-b66c-c3ff3eb75f44",
      "date": "2023-01-25",
      "amount": 203.39,
      "vendor": "Jaskolski Inc",
      "category": "Toys"
    },
    {
      "date": "2023-01-26",
      "amount": 0
    },
    {
      "id": "8f5ea49e-1316-44b5-abb1-3e7d3937d2f4",
      "date": "2023-01-27",
      "amount": 398.86,
      "vendor": "Mayert - Terry",
      "category": "Toys"
    },
    {
      "id": "4bbbedfa-cea4-4e6b-a94f-141b5e5503f8",
      "date": "2023-01-27",
      "amount": 431.49,
      "vendor": "Anderson, Sipes and Keeling",
      "category": "Shoes"
    },
    {
      "date": "2023-01-28",
      "amount": 0
    },
    {
      "date": "2023-01-29",
      "amount": 0
    },
    {
      "id": "fcde042e-f5d5-4408-bea3-aad44f672997",
      "date": "2023-01-30",
      "amount": 255.39,
      "vendor": "Upton - Barrows",
      "category": "Health"
    },
    {
      "date": "2023-01-31",
      "amount": 0
    }
  ]


const combineTransactions = () => {
    return transactions.reduce((accumulator, current) => {
        let key = current.date
        // const match = transactions.find(trans => trans.date === current.date)
        // console.log(match)

        if(!accumulator[key]) {
            accumulator[key] = [];

        }
        accumulator[key].push(current)
        return accumulator;
    }, {})

}

// console.log('%c combine transactions function using reduce', 'color: blue; font-size: 1.5rem; background-color: white',  combineTransactions());


const data1 = {
    "2023-01-25": [
      {
        "id": "658d9e57-05b3-4273-9c5f-63f5a5624cb6",
        "date": "2023-01-25",
        "amount": 114.6,
        "vendor": "Haag, Kovacek and Goldner",
        "category": "Kids"
      },
      {
        "id": "ebfc36ca-eea8-4719-b66c-c3ff3eb75f44",
        "date": "2023-01-25",
        "amount": 203.39,
        "vendor": "Jaskolski Inc",
        "category": "Toys"
      }
    ],
    "2023-01-26": [
      {
        "date": "2023-01-26",
        "amount": 0
      }
    ],
    "2023-01-27": [
      {
        "id": "8f5ea49e-1316-44b5-abb1-3e7d3937d2f4",
        "date": "2023-01-27",
        "amount": 398.86,
        "vendor": "Mayert - Terry",
        "category": "Toys"
      },
      {
        "id": "4bbbedfa-cea4-4e6b-a94f-141b5e5503f8",
        "date": "2023-01-27",
        "amount": 431.49,
        "vendor": "Anderson, Sipes and Keeling",
        "category": "Shoes"
      }
    ],
    "2023-01-28": [
      {
        "date": "2023-01-28",
        "amount": 0
      }
    ],
    "2023-01-29": [
      {
        "date": "2023-01-29",
        "amount": 0
      }
    ],
    "2023-01-30": [
      {
        "id": "fcde042e-f5d5-4408-bea3-aad44f672997",
        "date": "2023-01-30",
        "amount": 255.39,
        "vendor": "Upton - Barrows",
        "category": "Health"
      }
    ],
    "2023-01-31": [
      {
        "date": "2023-01-31",
        "amount": 0
      }
    ]
  }

  const sumRangeAmounts = () => {
    const result = Object.values(data1).map(day => day.reduce((acc, curr) => acc + curr.amount, 0)).reduce((acc, curr) => acc + curr, 0)

    return result;
  }

//   console.log('%c sumRangeAmount Test: ', 'color: magenta; background-color: white; font-size: 2rem;', sumRangeAmounts())