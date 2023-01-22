

function AccountSummary({data}) {

    const total = data ? `${data.map(amt => amt.amount).reduce((prev, cur) => prev.amount + cur.amount, 0)}` : 'asdf';


    // const renderAccount = <div>{total}</div>

    // const renderAccount = data.map(account => {
    //     return (
    //         <div key={account.date}>
    //             <div>{data ? account.date : 'fetching...'}</div>
    //             <div>{data ? `$ ${account.amount.toFixed(2)}` : undefined}</div>
    //         </div>
            
    //     )
    // })


    return <div>{data.map(amt => amt.amount).reduce((prev, cur) => prev.amount + cur.amount, 0)}</div>
}

export default AccountSummary;





// get value to show up.......