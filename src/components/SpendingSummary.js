import './SpendingSummary.css'

function SpendingSummary({currentData, priorData}) {
    const sumTotal = (data) => {
        return Object.values(data)
            .map(day => 
                day.reduce((acc, curr) => acc + curr.amount, 0))
            .reduce((acc, curr) => acc + curr, 0)
    }

    const currenttotal = 
        new Intl.NumberFormat(
            navigator.languages[0], 
            { style: 'currency', currency: 'USD'}
        ).format(sumTotal(currentData)) 

    const spendChange = () => {
        console.log(priorData, currentData)
        if(!priorData || !currentData) return null;
        
        const changeAmount = 
            
                (
                    (Number(sumTotal(currentData)) - Number(sumTotal(priorData))) 
                    / Number(sumTotal(priorData)) * 100
                ).toFixed(1); 

                    

        return changeAmount >= 0 ? `+${changeAmount}%` : `${changeAmount}%` 
    }

    return (
        <section className='spend__summary'>
            <div className='summary__total'>
                <header className="total__header">Total this period</header>
                <div className="total__amount">{currenttotal}</div>
            </div> 
            <div className="summary__change">
                <div className='change__amount'>{sumTotal(currentData) + sumTotal(priorData) === 0 ? 'no data' : spendChange() }</div>    
                <div className='change__header'>from previous {priorData.length} days</div>
            </div>
                
        </section>
    )
}

export default SpendingSummary;