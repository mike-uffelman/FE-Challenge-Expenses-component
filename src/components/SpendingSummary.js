import './SpendingSummary.css'
import {useState, useEffect} from 'react';

function SpendingSummary({data}) {
    
    const total = 
        Object.values(data).slice(7)
            .map(day => 
                day.reduce((acc, curr) => acc + curr.amount, 0))
            .reduce((acc, curr) => acc + curr, 0)

    const currenttotal = new Intl.NumberFormat(navigator.languages[0], { style: 'currency', currency: 'USD'}).format(total) 

    const spendChange = () => {
        const endIndex = Object.values(data).length / 2;
        const previousPeriod = Object.values(data).slice(0, endIndex).map(day => day.reduce((acc, curr) => acc + curr.amount, 0)).reduce((acc, curr) => acc + curr, 0)

        console.log(previousPeriod, total);

        return `${Math.round((Number(total) - Number(previousPeriod)) / Number(previousPeriod) * 100)}%`;

    }

    // const change = <div>{spendChange}</div>


    useEffect(() => {
        console.log(data);
        // console.log('%cHALF DATA', 'color: magenta', Object.values(data).slice(0, (Object.values(data).length) / 2))
        // spendChange(data)
        
    }, [])

    // const renderTimeframeTotal = <div>{total}</div>

    return (
        <section className='spend__summary'>
            <div className='summary__total'>
                <header className="total__header">Total this period</header>
                <div className="total__amount">{currenttotal}</div>
            </div>
            <div className="summary__change">
                <div className='change__amount'>{data ? spendChange() : null}</div>    
                <div className='change__header'>from last month</div>
            </div>    
        </section>
    )
}

export default SpendingSummary;