import './SpendingGraph.css'
import React, {useState, useEffect, useRef} from 'react'
import {getWeekDay, getDay, getMonth, fixTimeZone, formatAmount} from '../helpers/Helpers';

function SpendingGraph({data, startDate, endDate}) {
    const [graphData, setGraphData] = useState(null)
    const [hovered, setHovered] = useState(null)
    const barHeight = useRef();

    const weekday = Object.keys(data).map(day => day)

    const eachDayArray = Object.values(data)
        .map(day => {
            const dayKey = day.map(key => key.id)
            return day.reduce((acc, curr) => acc + curr.amount, 0)
        })

    

    const renderGraph = 
        eachDayArray.map((trans, i) => {
            console.log(trans)
            return (
                <div key={Math.random() * 10000} className='graph-bar__box'>
                    <div 
                        
                        className='graph-bar--item' 
                        style={{height: `${Math.floor(trans/Math.max.apply(Math, eachDayArray)*100)}%`}}
                    >
                        <div className='graph-bar--amount'>
                            {trans === 0 ? '' : formatAmount(trans)}

                        </div>
                    </div>

                    <div className='graph-bar__labels' ref={barHeight} >{getWeekDay(new Date(weekday[i]))}</div>

                </div>
            )
    })
    
    const renderHeader = 
        <div>
            {`${getMonth(weekday[0])} ${getDay(weekday[0] + 'T00:00:00')} - ${getMonth(weekday.at(-1) + 'T00:00:00')} ${getDay((new Date(weekday.at(-1) + 'T00:00:00')))}`}
        </div>
    
    useEffect(() => {
        // console.log(weekday)
    },[])

    return (
        <section className='graph__container'>
            {/* <h4 className='graph__header'>Spending - Last {getDay(data.at(-1).date) - getDay(data[0].date) + 1} days</h4> */}
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