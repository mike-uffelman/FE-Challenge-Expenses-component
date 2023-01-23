import './AccountSummary.css';

function AccountSummary({data}) {

    const total = new Intl.NumberFormat(navigator.languages[0], { style: 'currency', currency: 'USD'}).format(    
        data.map(amt => amt.amount).reduce((prev, cur) => prev + cur, 0)
    )
    
    const renderAccount = <div>{total}</div>

    return (
        <section className="account-summary">
            <div className='summary'>
                <header className="summary__header">My balance</header>
                <div className="summary__detail">{renderAccount}</div>
            </div>
            <div className="logo"></div>    
        </section>
    )
}

export default AccountSummary;