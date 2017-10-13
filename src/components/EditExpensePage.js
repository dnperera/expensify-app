import React from 'react';
import ReactDOM from 'react-dom';

const EditExpensePage = (props) =>{
	console.log(props.match.params);
	return(
		<div>
			Edit yor existing expences.
		</div>
	);
}



export default EditExpensePage;