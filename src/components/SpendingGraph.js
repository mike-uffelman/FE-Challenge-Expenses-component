import './SpendingGraph.css'
import React, {useState, useEffect, useRef} from 'react'
import {getWeekDay, getDay, getMonth, formatAmount} from '../helpers/Helpers';

function SpendingGraph({data}) {
    const [selected, setSelected] = useState(null)
    const [hovered, setHovered] = useState(null);
    const clickEl = useRef();

    const weekday = Object.keys(data).map(day => day)

    const eachDayArray = Object.values(data)
        .map(day => {
            return day.reduce((acc, curr) => acc + curr.amount, 0)
        })

    const graphBarClick = (i) => {
        if(i === selected) setSelected(null);
        else setSelected(i);
    }

    const graphBarHover = (i) => {
        setHovered(i)
    }

    useEffect(() => {
        const handler = (e) => {
            if(!clickEl) return;
            if(!clickEl.current.contains(e.target)) {
                setSelected(null)
            }
        }

        document.addEventListener('click', handler, true);

        return () => {
            document.removeEventListener('click', handler)
        }
    }, [])

    const renderGraph = 
        eachDayArray.map((trans, i) => {
            const showAmount = i === selected || i === hovered ? 'showAmount' : '';
            const selectedBar = i === selected ? 'selected' : '';

            return (
                <section key={Math.random() * 10000} className='graph-bar__box'>
                      
                    <button 
                        className={`graph-bar--item ${selectedBar}`} 
                        style={{height: `${Math.floor(trans/Math.max.apply(Math, eachDayArray)*100)}%`}}
                        onClick={() => graphBarClick(i)}
                        onMouseEnter={() => graphBarHover(i)}
                        onMouseLeave={() => graphBarHover(null)}
                        // ref={focusedEl}
                    >
                        <div className={`graph-bar--amount ${showAmount}`}>
                                {formatAmount(trans)}
                        </div>  
                    </button>
                    
                    <div className='graph-bar__labels' >{getWeekDay(new Date(weekday[i]))}</div>
                </section>
            )
    })
    
    const renderHeader = 
        <h2 className='graph__header'>Spending - 
            {` ${getMonth(weekday[0])} ${getDay(weekday[0] + 'T00:00:00')} to ${getMonth(weekday.at(-1) + 'T00:00:00')} ${getDay((new Date(weekday.at(-1) + 'T00:00:00')))}`}
        </h2>

    return (
        <section className='graph__container'>
            <div>{renderHeader}</div>
            <div className='graph__canvas' ref={clickEl}>
                {renderGraph}        
            </div>
        </section>
    )
}

export default SpendingGraph;