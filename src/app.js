import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expences';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = configureStore();


//add Expenses
store.dispatch(addExpense({description:'Water Bill',amount:100,createdAt:21000}));
store.dispatch(addExpense({description:'Utility Bill',amount:300,createdAt:25000}));
store.dispatch(setTextFilter('water'));

const state =store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
console.log(visibleExpenses);

const jsx =(
		<Provider store={store}>
			<AppRouter/>
		</Provider>
	);

ReactDOM.render(jsx,document.getElementById('app'));

