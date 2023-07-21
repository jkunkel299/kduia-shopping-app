import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Location = () => {
    const {dispatch} = useContext(AppContext);

    //setting action to update the currency values across the application when the location is changed
    const changeLocation = (val) => {
        dispatch({
            type: 'CHG_LOCATION',
            payload: val,
        })
    }

    return(
        <div className='alert alert-secondary'>Location {
            <select name="Location" id="Location" onChange={(event) => changeLocation(event.target.value)}>
                <option value="£">UK(£)</option>
                <option value="₹">India(₹)</option>
                <option value="€">Europe(€)</option>
                <option value="CAD">Canada(CAD)</option>
            </select>
            }
        </div>
    );
};

export default Location;