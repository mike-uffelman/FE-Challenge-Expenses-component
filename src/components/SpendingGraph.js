import './SpendingGraph.css'
import React, {useState, useEffect, useRef} from 'react'
import {getMonth, getDay, getWeekDay, formatAmount, buildDates, logDates, buildGraphData} from '../helpers/Helpers';

function SpendingGraph({data, startDate, endDate}) {
    const [graphData, setGraphData] = useState(null)
    const barHeight = useRef();
    // need data for time period then map over to create the bar graph

    // const cleanedData = data.filter(a => new Date(a.date) > new Date(Date.now() - 7*86400000)).sort((a, b) => new Date(b.date) - new Date(a.date))
    
    console.log('%c', 'color: white', Object.values(data))

    const weekday = Object.keys(data).map(day => day)

    const eachDayArray = Object.values(data)
        .map(day => {
            const dayKey = day.map(key => key.id)
            return day.reduce((acc, curr) => acc + curr.amount, 0)
        })

    

    const renderGraph = 
        // let maxSpend = Math.max.apply(Math, eachDayArray.map(trans => trans.amount))
        // let minSpend = Math.min.apply(Math, eachDayArray.map(trans => trans.amount))    
            eachDayArray.map((trans, i) => {
                console.log(eachDayArray, trans)
            return (
                <div  className='graph-bar__box'>
                    <div 
                        ref={barHeight} 
                        className='graph-bar--item' 
                        style={{height: `${Math.floor(trans/Math.max.apply(Math, eachDayArray)*100)}%`}}
                    >
                        {/* {formatAmount(trans)} */}
                    </div>

                    {/* <div className='graph-bar__labels'>{getWeekDay(weekday)}</div> */}
                    <div className='graph-bar__labels'>{getWeekDay(new Date(weekday[i]))}</div>

                </div>
            )
    })
    
    // ${Math.floor((300/(Math.max.apply(Math, Object.values(data).map(day => day.reduce((acc, cur) => acc + cur.amount, 0)))))*100)}%`


    // const renderHeader = 
        // <div>
        //     {`${getMonth(data[0].date)} ${getDay(data[0].date) + 1} - ${getMonth(data.at(-1).date)} ${getDay(data.at(-1).date) + 1}`}
        // </div>

    
    useEffect(() => {
        // logDates(data);
        // let end = new Date(Date.now())
        // buildGraphData(data, end, null, 14)
        // buildDates(data);
        console.log(data)
        // setGraphData(Object.values(data))

    },[])
    
    // logDates();

    return (
        <section className='graph__container'>
            {/* <h4 className='graph__header'>Spending - Last {getDay(data.at(-1).date) - getDay(data[0].date) + 1} days</h4> */}
            {/* <div>{renderHeader}</div> */}
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