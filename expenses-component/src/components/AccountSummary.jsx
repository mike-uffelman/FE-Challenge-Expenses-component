import './AccountSummary.css';

function AccountSummary({data}) {


    // sums total transactions
    // const total = new Intl.NumberFormat(navigator.languages[0], { style: 'currency', currency: 'USD'}).format(    
    //     data.map(amt => amt.amount).reduce((prev, cur) => prev + cur, 0)
    // )

    // render the account balance (arbitrary for demo)
    const balance = 13774.63;

    const renderBalance = (balance) => {
        return new Intl.NumberFormat(navigator.languages[0], { style: 'currency', currency: 'USD'}).format(balance)
    }
    
    // const renderAccount = <div>{total}</div>

    return (
        <section className="account-summary">
            <div className='summary'>
                <header className="summary__header">My balance</header>
                {/* <div className="summary__detail">{renderAccount}</div> */}
                <div className="summary__detail">{renderBalance(balance)}</div>

            </div>
            <div className="logo"></div>    
        </section>
    )
}

export default AccountSummary;