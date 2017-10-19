import {createStore,combineReducers} from 'redux';
import uuid from 'uuid';

//Add Expense
const addExpense =(
	{
		description='',
		note='',
		amount=0,
		createdAt=0
	}={}
) =>({
	type:'ADD_EXPENSE',
	expense:{
		id:uuid(),
		description,
		note,
		amount,
		createdAt
	}
});
//Remove Expense

const removeExpense =({id}={}) =>({
	type:'REMOVE_EXPENSE',
	id
});
//Edit Expense

const editExpense =(id,updates)=>({
	type:'EDIT_EXPENSE',
	id,
	updates
});
//Set Text Filter

const setTextFilter = (text ='') =>({
	type:'SET_TEXT_FILTER',
	text
})

//Sort By Date
const sortByDate = () =>({
	type:'SORT_BY_DATE'
});

//Sort By Amount
const sortByAmount = () =>({
	type:'SORT_BY_AMOUNT'
});

//Set Start Date
const setStartDate =(startDate) =>({
	type:'START_DATE',
	startDate
});

//Set End Date
const setEndDate =(endDate) =>({
	type:'END_DATE',
	endDate
});

//Expenses Reducer
const expensesReducerDefaultState =[];

const expensesReducer=(state=expensesReducerDefaultState,action) =>{
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state,action.expense]; //spread operator
		case 'REMOVE_EXPENSE':
			return state.filter(({id})=> id !== action.id);
		case 'EDIT_EXPENSE' :
			return state.map((expense) =>{
				if(expense.id === action.id){
					return {
						...expense,
						...action.updates
					};
				}else{
					return expense;
				}
			});
		default:
			return state;
	}
};


//Filters Reducer
const filtersReducerDefaultState ={
	text:'',
	sortBy:'date',
	startDate:undefined,
	endDate:undefined
};

const filtersReducer =(state=filtersReducerDefaultState,action)=>{
	switch(action.type){
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text:action.text
			}
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy:'amount'
			}
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy:'date'
			}
		case 'START_DATE':
			return{
				...state,
				startDate:action.startDate
			}
		case 'END_DATE':
			return {
				...state,
				endDate:action.endDate
			}
		default:
		return state;
	}
};

//Get Visible Expenses
const getVisibleExpenses =(expenses,{text,sortBy,startDate,endDate}) =>{
	return expenses.filter((expense)=>{
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;
	}).sort((a,b)=>{
		if(sortBy === 'date'){
			return a.createdAt < b.createdAt ? 1:-1;
		}
		if(sortBy === 'amount'){
			return a.amount < b.amount ? 1:-1;
		}
	});
}
//store creation
const store = createStore(
	combineReducers({
		expenses:expensesReducer,
		filters:filtersReducer
	}));

store.subscribe(() =>{
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
	console.log(visibleExpenses);
});

const expenseOne =store.dispatch(addExpense({description:'Rent',amount:200,createdAt:11000}));
const expenseTwo= store.dispatch(addExpense({description:'Coffee',amount:400,createdAt:1000}));

// store.dispatch(removeExpense({id:expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id,{amount:600}));
 //store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//store.dispatch(setStartDate(-1000));
// store.dispatch(setStartDate());
//store.dispatch(setEndDate(0));

const demoState ={
	expenses :[{
		id:'pfgobcdsof',
		description:'January Rent',
		note:'This was the final payment for the lease',
		amount: 14000,
		createdAt:0
	}],
	filters:{
		text:'rent',
		sortBy:'amount',
		startDate:undefined,
		endDate:undefined
	}
};




