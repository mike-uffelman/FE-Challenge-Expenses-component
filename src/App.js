// import {useEffect, useState} from 'react'
// import { fetchAccount } from './api/api';
// import AccountSummary from "./components/AccountSummary";

function App() {
    // const [accountData, setAccountData] = useState(null)

    // useEffect(() => {
    //     const doit = async () => {
    //         const data = await fetchAccount();
    //         console.log(data)
    //         setAccountData(data);
    //     }
    //     doit();
    //     // setAccountData(data);
    // }, [])

    return (
        <div>
            <div>Expense Summary</div>
            {/* {accountData ? <AccountSummary data={accountData}/> : undefined}    */}
        </div>
        
    )
}

export default App;