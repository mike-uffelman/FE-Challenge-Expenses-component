import './SpendingSummary.css'
import {useState, useEffect} from 'react';

function SpendingSummary({data}) {
    
    const total = new Intl.NumberFormat(navigator.languages[0], { style: 'currency', currency: 'USD'}).format(    
        data.transactions
            .map((amt, i) => amt.amount)
            .reduce((prev, cur) => prev + cur, 0)
    )

    const renderTimeframeTotal = <div>{total}</div>

    return (
        <section className='spend__summary'>
            <div className='summary__total'>
                <header className="total__header">Total this period</header>
                <div className="total__amount">{renderTimeframeTotal}</div>
            </div>
            <div className="summary__change">
                <div className='change__amount'>+2.4%</div>    
                <div className='change__header'>from last month</div>
            </div>    
        </section>
    )
}

export default SpendingSummary;