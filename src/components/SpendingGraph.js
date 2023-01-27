import './SpendingGraph.css'
import React, {useState, useEffect, useRef} from 'react'
import {getMonth, getDay, getWeekDay, formatAmount} from '../helpers/Helpers';

function SpendingGraph({data, startDate, endDate}) {
    const [graphData, setGraphData] = useState(null)
    const barHeight = useRef();
    // need data for time period then map over to create the bar graph

    // const cleanedData = data.filter(a => new Date(a.date) > new Date(Date.now() - 7*86400000)).sort((a, b) => new Date(b.date) - new Date(a.date))
    
    console.log(data)

    const renderGraph = data.transactions.map((trans, i) => {
        // const totalSpend = data.transactions.reduce((prev, curr) => prev + curr.amount, 0);
        console.log(trans, i)
        // console.log(trans.amount);
        // console.log(totalSpend);
        // barHeight.current.style.height = `${trans.amount}%`


        return (
            <div className=''>
                <div ref={barHeight} className='graph-bar-height'>{formatAmount(trans.amount)}</div>

                <div className=''>{getWeekDay(trans.date)}</div>
            </div>
        )
    })
    
    const renderHeader = 
        <div>
            {`${getMonth(data.startDate)} ${getDay(data.startDate)} - ${getMonth(data.endDate)} ${getDay(data.endDate)}`}
        </div>

    
    // useEffect(() => {
    //     const cleanedData = filterSortData(data, endDate, filterDays)
    //     console.log(cleanedData);
    // }, [])
    
    // logDates();

    return (
        <section className='graph__container'>
            <h4 className='graph__header'>Spending - Last 7 days</h4>
            <div>{renderHeader}</div>
            <div className='graph__canvas'>
                {renderGraph}        
            </div>

        </section>
    )
}

export default SpendingGraph;


// document.querySelectorAll('.temp-bars--low').forEach(bar => {
//     bar.style.width = `${bar.dataset.lowTemp}%`
//     bar.style.backgroundColor = `hsl(${Math.abs((bar.dataset.lowTemp / 100) * 300 - 300)}, 80%, 60%)`
// });