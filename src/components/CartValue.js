//importing React and useContext hook
import React, { useContext } from 'react';
//importing AppContext
import { AppContext } from '../context/AppContext';

const CartValue = () => {
    //connecting to the context using useContext hook in order to get values from global state
    const { expenses, Location } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += (item.unitprice * item.quantity));
    }, 0);

    //using Bootstrap Alert classes to give a grey background
    return (
        <div className='alert alert-primary'>
            <span>Cart Value: {Location}{totalExpenses}</span>
        </div>
    );
};

export default CartValue;
