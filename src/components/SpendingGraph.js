import './SpendingGraph.css'
import React, {useState, useEffect, useRef} from 'react'
import {getWeekDay, getDay, getMonth, fixTimeZone, formatAmount} from '../helpers/Helpers';

function SpendingGraph({data, startDate, endDate}) {
    const [graphData, setGraphData] = useState(null)
    const [selected, setSelected] = useState(null)
    const [hovered, setHovered] = useState(null);
    const barHeight = useRef();

    const weekday = Object.keys(data).map(day => day)

    const eachDayArray = Object.values(data)
        .map(day => {
            const dayKey = day.map(key => key.id)
            return day.reduce((acc, curr) => acc + curr.amount, 0)
        })

    const graphBarClick = (i) => {
        if(i === selected) setSelected(!!i);
        else setSelected(i);

        // setSelected(i)
    }

    const graphBarHover = (i) => {
        setHovered(i)
    }

    const renderGraph = 
        eachDayArray.map((trans, i) => {
            const showAmount = i === selected || i === hovered ? 'showAmount' : '';
            const selectedBar = i === selected ? 'selected' : '';
            // const hoveredBar = i === hovered ? 'showAmount': '';

            return (
                <div key={Math.random() * 10000} className='graph-bar__box'>
                      
                    <div 
                        
                        className={`graph-bar--item ${selectedBar}`} 
                        style={{height: `${Math.floor(trans/Math.max.apply(Math, eachDayArray)*100)}%`}}
                        onClick={() => graphBarClick(i)}
                        onMouseEnter={() => graphBarHover(i)}
                        onMouseLeave={() => graphBarHover(null)}

                    >
                        <div className={`graph-bar--amount ${showAmount}`}>
                                {formatAmount(trans)}
                        </div>  
                    </div>
                    
                    <div className='graph-bar__labels' ref={barHeight} >{getWeekDay(new Date(weekday[i]))}</div>
                </div>
            )
    })
    
    const renderHeader = 
        <h2 className='graph__header'>Spending 
            {` ${getMonth(weekday[0])} ${getDay(weekday[0] + 'T00:00:00')} - ${getMonth(weekday.at(-1) + 'T00:00:00')} ${getDay((new Date(weekday.at(-1) + 'T00:00:00')))}`}
        </h2>
    
    useEffect(() => {
        // console.log(weekday)
        // console.log(selected)
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