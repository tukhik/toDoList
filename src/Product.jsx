import {Name} from './Name.jsx'
import React, {Component} from 'react'
import {Price} from './Price.jsx'
import {Description} from './Description.jsx'


export class Product extends Component {
	 constructor(props){
        super(props);
        this.state = {
            value: props.defaultValue,
        };
        }
     handleClickPrice = ()=>{

        this.setState((state)=>{
        let price = parseFloat(state.value)
        console.log(state.value)
        if(state.value.includes('$')){
         return {
                value: price * 500 + "AMD",
            };
        }

        else {
         return {
                value: price / 500  + "$",
            };
        }  
        }, 
        ()=>{
            console.log(this.state.value);
        });   
    }
    render(){
    	const {name, value, description} = this.props;
        return(
            <div>
   		<Name name = {name}/>
    	<Price price = {value}/>
    	<Description description = {description}/>
    	<h3>{this.state.value}</h3>
            <button onClick= {this.handleClickPrice}> Price</button>
            </div>
        );
    }
}