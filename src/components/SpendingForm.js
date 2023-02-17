import './SpendingForm.css';

import {IconContext} from 'react-icons';
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import {useState} from 'react';

function SpendingForm({startDate, endDate, onSubmit}) {
    const [formOpen, setFormOpen] = useState(false);
    const [startingDate, setStartingDate] = useState(startDate);
    const [endingDate, setEndingDate] = useState(endDate)

    // form open/close control handler
    const toggleForm = () => {
        setFormOpen(!formOpen)
    }

    // form submit event handler, calls onSubmit with start and end dates, closes form
    const submitDates = (e) => {
        e.preventDefault();
        onSubmit(startingDate, endingDate)
        setFormOpen(false)
    }

    // conditional icon rendering based on if form is open
    const optionsIcon = formOpen ? <AiOutlineUp  /> : <AiOutlineDown />

    const renderForm = () => {
        const isOpen = formOpen ? 'isOpen' : '';

        return (
            <form onSubmit={submitDates} className={`form ${isOpen}`}>
                <section className='form__box'>
                    <div className='form__group'>
                        <label className='form__group--label'>Start</label>
                        <input
                            onChange={(e) => setStartingDate(e.target.value)}
                            className='form__group--input' 
                            type='date' 
                            value={startingDate}></input>     
                    </div>

                    <div className='form__group'>
                        <label className='form__group--label'>End</label>
                        <input 
                            onChange={(e) => setEndingDate(e.target.value)}
                            value={endingDate}
                            className='form__group--input' 
                            type='date'
                        ></input>     
                    </div>
                </section>

                <button type='submit' className='form__button'>Submit</button>
                
            </form>
        )
    }

    return (
        <section className='form__container'>
            <div className='form__control' onClick={toggleForm}>
                <h3 className='form__control--label'>Options</h3>
                <button className='form__control--icon'>
                    <IconContext.Provider value={{style: {fontSize: '2rem'}}}>
                        {optionsIcon}
                    </IconContext.Provider>    
                </button>
                
            </div>
            {renderForm()}
        </section>
        
    )

}

export default SpendingForm;