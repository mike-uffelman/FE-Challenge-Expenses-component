import './SpendingGraph.css'
import React, {useState, useEffect, useRef} from 'react'
import {getWeekDay, getDay, getMonth, formatAmount} from '../helpers/Helpers';

function SpendingGraph({currentData, asdf}) {
    const [selected, setSelected] = useState(null);
    const [hovered, setHovered] = useState(null);
    const clickEl = useRef();

    const weekday = Array.from(new Set(currentData.map(day => day.map(d => d.date)).flat()))

    const graphData = Object.values(currentData)
        .map(day => {
            return day.reduce((acc, curr) => acc + curr.amount, 0)
        })

    // setSelected graph bar
    const graphBarClick = (i, e) => {
        if(i === selected) setSelected(null);
        else setSelected(i);
    }

    // setHovered graph bar 
    const graphBarHover = (i) => {
        setHovered(i)
    }

    // on click away from graph canvas remove selected and hovered states
    useEffect(() => {
        const handler = (e) => {
            if(!clickEl) return;
            if(!clickEl.current.contains(e.target)) {
                setSelected(null)
                setHovered(null)
            }
        }

        document.addEventListener('click', handler, true);

        return () => document.removeEventListener('click', handler)
    }, [])

    // const dateHeader = ` ${getMonth(weekday[0] + 'T00:00:00')} ${getDay(weekday[0] + 'T00:00:00')} to ${getMonth(weekday.at(-1) + 'T00:00:00')} ${getDay((new Date(weekday.at(-1) + 'T00:00:00')))}`

    // render the graph header - dynamic date range display
    const renderHeader = <h2 className='graph__header'>Spending - {` ${getMonth(weekday[0] + 'T00:00:00')} ${getDay(weekday[0] + 'T00:00:00')} to ${getMonth(weekday.at(-1) + 'T00:00:00')} ${getDay((new Date(weekday.at(-1) + 'T00:00:00')))}`}</h2>

    // map over the date range transactions to display a bar graph
    const renderGraph = 
        graphData.map((trans, i) => {
            const showAmount = i === selected || i === hovered ? 'showAmount' : '';
            const selectedBar = i === selected ? 'selected' : '';

            return (
                <section className='graph-bar__box' key={i+1}>
                
                    <button
                        key={Math.random() * 10000} // key here allows for keyboard tabbing of each graph bar
                        className={`graph-bar--item ${selectedBar}`} 
                        style={{height: `${Math.floor(trans/Math.max.apply(Math, graphData)*100)}%`}}
                        onClick={() => graphBarClick(i)}
                        onMouseEnter={() => graphBarHover(i)}
                        onMouseLeave={() => graphBarHover(null)}
                        onFocus={() => graphBarHover(i)}
                        onTouchEnd={() => graphBarClick(i)}
                    >
                        <div className={`graph-bar--amount ${showAmount}`}>
                                {formatAmount(trans)}
                        </div>  
                    </button>
                    
                    <div className='graph-bar__labels' >{graphData.length > 7 ? `${new Date(weekday[i] + "T00:00:00").getMonth() + 1}/${getDay(weekday[i] + 'T00:00:00')}` : getWeekDay(new Date(weekday[i]))}</div>
                </section>
            )
    })

    return (
        <section className={`graph__container ${asdf}`}>
            <div>{renderHeader}</div>
            <div className='graph__canvas' ref={clickEl}>
                {renderGraph}        
            </div>
        </section>
    )
}

export default SpendingGraph;