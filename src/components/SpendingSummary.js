import './SpendingSummary.css'
import {useEffect} from 'react';

function SpendingSummary({data}) {
    
    const dayCountSplit = Object.values(data).length / 2;

    const total = 
        Object.values(data).slice(dayCountSplit)
            .map(day => 
                day.reduce((acc, curr) => acc + curr.amount, 0))
            .reduce((acc, curr) => acc + curr, 0)

    const currenttotal = 
        new Intl.NumberFormat(
            navigator.languages[0], 
            { style: 'currency', currency: 'USD'}
        ).format(total) 

    const spendChange = () => {
        const previousPeriod = 
            Object.values(data)
                .slice(0, dayCountSplit)
                .map(day => day.reduce((acc, curr) => acc + curr.amount, 0))
                .reduce((acc, curr) => acc + curr, 0)

        const changeAmount = 
            Math.round(
                (Number(total) - Number(previousPeriod)) 
                    / Number(previousPeriod) * 100) 

        const string = changeAmount >= 0 ? `+${changeAmount}%` : `${changeAmount}%` 

        return string;

    }

    useEffect(() => {
        // console.log(data);
    }, [])

    return (
        <section className='spend__summary'>
            <div className='summary__total'>
                <header className="total__header">Total this period</header>
                <div className="total__amount">{currenttotal}</div>
            </div>
            <div className="summary__change">
                <div className='change__amount'>{data ? spendChange() : null}</div>    
                <div className='change__header'>from previous {dayCountSplit} days</div>
            </div>    
        </section>
    )
}

export default SpendingSummary;