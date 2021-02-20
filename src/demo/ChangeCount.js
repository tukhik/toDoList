import React from 'react';
import {connect} from 'react-redux';


function ChangeCount (props){
	return (
		<div>
		<button
		onClick = {props.increment}
		> 
		Increment
		</button>
		<button
		onClick = {props.decrement}
		> 
		Decrement
		</button>
		</div>

		)
}

const mapDispatchToProps = (dispatch) => {
	return {
		increment: ()=>{
			dispatch({type: 'INCREMENT'})
		},
		decrement: ()=>{
			dispatch({type: 'DECREMENT'})
		}
	};
};

export default connect(null, mapDispatchToProps)(ChangeCount);