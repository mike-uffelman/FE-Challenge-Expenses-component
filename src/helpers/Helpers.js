const weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getMonth = (date) => month[new Date(date).getMonth()];
export const getDay = (date) => new Date(date).getDate();
export const getWeekDay = (date) => weekday[(new Date(date).getDay() + 1) % 7];

export const formatAmount = (amount) => {
    return new Intl.NumberFormat(navigator.languages[0], { style: 'currency', currency: 'USD'}).format(amount)
}

// removes the timezone from the date and returns a date string to simplify the date
export const fixTimeZone = (day) => {
    const timeZoneOffset = day.getTimezoneOffset();
    day = new Date(day.getTime() - (timeZoneOffset*60*1000))
    return day.toISOString().split('T')[0];
}

// returns the start of the prior period for spend change calculation
const getPriorPeriodStart = (endingDate, startingDate) => {
    const end = new Date(endingDate);
    const start = new Date(startingDate);
    let daysBack = (end - start) / (1000* 60 * 60 * 24)

    const pastPeriodStart = 
        new Date(
            new Date(start)
                .setDate(new Date(start).getDate() - daysBack))

    return fixTimeZone(pastPeriodStart)
}

// creates an array for all days between prior period start and current end date
const getAllDaysInRange = (endingDate, priorPeriodStart) => {
    let daysArray = [];
    for (let i = new Date(priorPeriodStart+'T00:00:00');
        i <= new Date(endingDate+'T00:00:00'); 
        i.setDate(i.getDate() + 1)) {
            daysArray.push(new Date(i))
        }

    return daysArray;
}

// compares the desired date range with all transactions, if transaction(s) exist for a day uses the transaction otherwise uses the zero spend day to build new array
const getZeroSpendDays = (dateRange, data) => {
    let completeRangeData = [];
    const zeroSpendDays = dateRange.filter(day => !data.map(trans => trans.date).includes(day));

    completeRangeData.push(zeroSpendDays.map(day => {
        return {
            "date": day,
            "amount": 0
        }
    }))
    return completeRangeData.flat()
}

const reduceDailyTransactions = (data) => {
    return data
        .reduce((accumulator, current) => {
            let key = current.date
            if(!accumulator[key]) accumulator[key] = [];
            accumulator[key].push(current)
            return accumulator;
        }, {})
}

const getFilteredTransactions = (dateRange, data) => {
    return data
            .filter(a => {
                return new Date(a.date) >= new Date(dateRange[0]) && new Date(a.date) <= new Date(dateRange.at(-1))
            })

}

const combineZeroAndTransactions = (zeroSpend, filteredTransactions) => {
    return [...zeroSpend, ...filteredTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));
}

export const buildGraphData = (data, endingDate, startingDate) => {
    if(!data) return;

    // get prior period start date
    const priorPeriodStartDate = getPriorPeriodStart(endingDate, startingDate)
    
    // get a dateRange array of days from prior period start to current end date
    const allDaysInRange = getAllDaysInRange(endingDate, priorPeriodStartDate)

    // stringify and set dates to "YYYY-MM-DD" format
    const dateRange = allDaysInRange.map(day => fixTimeZone(day))
    
    // compare the desired date range to the transactions to identify zero spend days (i.e. does not exist)
    const zeroSpendDays = getZeroSpendDays(dateRange, data)
    
    // filter all transactions with our desired date range, return only transactions within range
    const filteredTransactions = getFilteredTransactions(dateRange, data)

    // combine zero spend and filtered date transactions, and sort
    const combineTransactions = combineZeroAndTransactions(zeroSpendDays, filteredTransactions)

    // reduce each day down to a single object with array of transactions, i.e. combine multi-transaction days into one with a list of transactions
    const reduceDownDates = reduceDailyTransactions(combineTransactions); 

    console.log(reduceDownDates)
    return reduceDownDates
}

