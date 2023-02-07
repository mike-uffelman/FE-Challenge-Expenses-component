import './SpendingForm.css';

import {IconContext} from 'react-icons';
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import {useState, useEffect} from 'react';
import { fixTimeZone } from '../helpers/Helpers';

function SpendingForm({startDate, endDate, onSubmit}) {
    const [formOpen, setFormOpen] = useState(true);
    const [startingDate, setStartingDate] = useState(startDate);
    const [endingDate, setEndingDate] = useState(endDate)

    const toggleForm = () => {
        setFormOpen(!formOpen)
    }

    const submitDates = (e) => {
        e.preventDefault();
        console.log(e)
        onSubmit(startingDate, endingDate)
    }

    const isOpen = formOpen ? 'isOpen' : '';

    const optionsIcon = formOpen ? <AiOutlineUp  /> : <AiOutlineDown />

    useEffect(() => {
        // console.log(fixTimeZone(endDate))
    }, [])


    const renderForm = () => {

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
                            value={endDate}
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
                <span className='form__control--icon'>
                    <IconContext.Provider value={{style: {fontSize: '2rem'}}}>
                        {optionsIcon}
                    </IconContext.Provider>
                </span>
            </div>
            {renderForm()}
        </section>
        
    )

}

export default SpendingForm;