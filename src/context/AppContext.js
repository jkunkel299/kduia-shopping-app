import React, { createContext, useReducer } from 'react';

//The reducer - used to update the state, based on the action

export const AppReducer = (state, action) => {
    let new_expenses = [];

    //creating switch statement to list results of each action type
    switch (action.type){
        case 'ADD_QUANTITY':
            let updatedqty = false;
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name) {
                    expense.quantity = expense.quantity + action.payload.quantity;
                    updatedqty = true;
                }
                new_expenses.push(expense) //push appends items to the new_expenses array
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };

        case 'RED_QUANTITY':
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name){
                    expense.quantity = expense.quantity - action.payload.quantity;
                }
                expense.quantity = expense.quantity < 0 ? 0: expense.quantity; //look up what this statement does - may check that the value of expense.quantity remains above zero? 
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            };

        case 'DELETE_ITEM':
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name){
                    expense.quantity = 0;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";
            return {
                ...state,
            }
        
        case 'CHG_LOCATION':
            action.type = "DONE";
            state.Location = action.payload;
            return{
                ...state,
            }
        
        default:
            return state;
    }
};

//Setting initial state when the app loads
const initialState = {
    expenses: [
        { id: "Shirt", name:'Shirt', quantity: 0, unitprice: 500 },
        { id: "Jeans", name:'Jeans', quantity: 0, unitprice: 300 },
        { id: "Dress", name:'Dress', quantity: 0, unitprice: 400 },
        { id: "Dinner Set", name:'Dinner Set', quantity: 0, unitprice: 600 },
        { id: "Bags", name:'Bags', quantity: 0, unitprice: 200 },
    ],
    Location: '£'
};

//Creating context - imported by components and used to get the state
export const AppContext = createContext();

//Creating provider component - wraps the components we want to give access to state
//Accepts the children, which are nested (wrapped) components
//Allows updating the state via dispatch
export const AppProvider = (props) => {
    //setting up the app state - takes a reducer and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);
    
    const totalExpenses = state.expenses.reduce((total, item) => {
        return (total = total + (item.unitprice*item.quantity));
    }, 0);

    state.CartValue = totalExpenses;

    return(
        <AppContext.Provider
            value = {{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Location: state.Location
            }}
            >
            {props.children}
        </AppContext.Provider>
    );
};