
const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



// getDay("2022-06-05T04:00:00.000Z")

export const getMonth = (date) => {
    return month[new Date(date).getMonth()]
}

export const getDay = (date) => {
    return new Date(date).getDate()
}

export const getWeekDay = (date) => {
    return weekday[new Date(date).getDay() - 1]
}

export const formatAmount = (amount) => {
    return new Intl.NumberFormat(navigator.languages[0], { style: 'currency', currency: 'USD'}).format(amount)
}


export const filterSortData = (data, endingDate, daysBack) => {
    if (!data) return;

    let endDate = new Date(endingDate);
    let startDate = new Date(Date.now() - daysBack*86400000);

    // startDate = new Date(startDate.setDate(startDate.getDate() - 6))

    // let days = (endDate - startDate) / 86400000;

    // console.log(days)

    const filterSort = data.filter(a => new Date(a.date) >= new Date(startDate) && new Date(a.date) <= new Date(endDate)).sort((a, b) => new Date(a.date) - new Date(b.date))

    
    const cleanedData = {
        'startDate': startDate,
        'endDate': endDate,
        'transactions': filterSort
    }


    // console.log(filteredAndSortedData)
    return cleanedData;
}

export const logDates = () => {
    let endDate = new Date();
    let startDate = new Date(endDate)
    let daysArray = []

    // const cleanData = data.filter(a => new Date(a.date) > new Date(Date.now() - 7*86400000)).sort((a, b) => new Date(b.date) - new Date(a.date))

    const data = [
        {
          "date": "2023-01-24",
          "amount": 319.84,
          "vendor": "Cartwright, Heaney and Spinka",
          "category": "Home"
        },
        {
          "date": "2023-01-20",
          "amount": 400.03,
          "vendor": "Thompson - Roberts",
          "category": "Electronics"
        },
        {
          "date": "2023-01-21",
          "amount": 12.01,
          "vendor": "Reynolds - Feil",
          "category": "Toys"
        },
        {
          "date": "2023-01-19",
          "amount": 720.76,
          "vendor": "Weissnat Inc",
          "category": "Jewelery"
        }
      ]

    for (let i = new Date(startDate.setDate(startDate.getDate() - 6));
             i <= endDate; 
             i.setDate(i.getDate() + 1)) {
                // console.log(i);
        // let arr = new Array(i)
        daysArray.push(new Date(i.getFullYear(), i.getMonth(), i.getDate()))
    }

    console.log(daysArray);

    // const newDataArray = daysArray.map((day) => {
        
    //     // console.log(`${month[day.getMonth()]} ${day.getDate()}, ${day.getFullYear()}`);

    //     // console.log('day of month: ', new Date(day).getDate())

    //     return data.map((transaction) => {
    //         // if(new Date(day).getDate() === new Date(transaction.date).getDate()) {
    //         //     console.log('it matches')
    //         // }
    //         // console.log('transaction day: ', new Date(transaction.date).getDate())
    //         const arrDate = new Date(day);
    //         const transDate = new Date(transaction.date);

    //         if(
    //             arrDate.getDate() === transDate.getDate() && 
    //             arrDate.getFullYear() === transDate.getFullYear()
    //         ) {
    //             return transaction;
    //         } else {
    //             return {"date": new Date(day), "amount": 0};
    //         }

    //     })
    // })

    let newTestArr = [];

    for (let i = 0; i < daysArray; i++) {
        console.log('hello')

        for (let j = 0; j < data.length; j++) {
            if(new Date(daysArray[i]).getDate() === new Date(data[j].date).getDate()) {

                newTestArr.push(data[j]);
            } else {
                newTestArr.push({'date': daysArray[i], 'amount': 0});
            }
            return newTestArr;
        }
        return newTestArr;
    }

    console.log(newTestArr);
    // const newDataArray = daysArray.map(day => {
            // let arrNewTest = [];

            // for(let i = 0; i < data.length; i++){
            //     if(new Date(day).getDate() === new Date(data[i].date).getDate()) {
            //         return data[i];
            //     //     console.log(transaction);
            //     //     // combinedArr.push(transaction)
            //     //     // return combinedArr;
            //     } else {
            //         return {'date': day, 'amount': 0};
            //     }
            // }

            // return data.map(transaction => {
            //     if(new Date(day).getDate() === new Date(transaction.date).getDate()) {
            //         return transaction;
            //     //     console.log(transaction);
            //     //     // combinedArr.push(transaction)
            //     //     // return combinedArr;
            //     } else {
            //         return {'date': day, 'amount': 0};
            //     }

            // })

            // data.filter(transaction => {
            //     if(new Date(day).getDate() === new Date(transaction.date).getDate()) {
            //         return transaction;
            //     } else {
            //         return day
            //     }
                // if(
                //     new Date(day).getDate() === transDate.getDate() && 
                //     new Date(day).getFullYear() === transDate.getFullYear()
                // ) {
                //     arr;
                // } else {
                //     return {"date": new Date(day), "amount": 0};
                // }    
            // })
            

        // })

    // console.log(newDataArray);

    // let asdf = daysArray.reduce((transactions, date) => {
        
    //     transactions.date = date
        
    //     return transactions;
    // }, {})

    // console.log(asdf)
    // console.log(daysArray);

    // daysArray.map((day, {data}) => {
        
    //     console.log(day)
    //     console.log(data);
    // })
}