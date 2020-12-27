import react, {Component} from 'react';
import './index.css';

export default class Input extends Component {
	state = {
		text: " ",
		inputValue: " ",
		arr: []
	};
	handleChange = (event)=>{
		this.setState({
			inputValue: event.target.value
		});
	};
	
 	
	handleClick =()=>{
		const inputValue = this.state.inputValue.trim();
		if(!inputValue){
			return
		}
		this.setState({
			text: this.state.inputValue,
			inputValue: "",
			arr: [...this.state.arr, this.state.inputValue]
		})
	}
 	removeItem=(item)=>{
        this.setState({arr:this.state.arr.splice(item,0)})
       
    };

	render(){ 
		return(<div className= 'addItem'>
			<input value ={this.state.inputValue}
			type = "text" 
			onChange = {this.handleChange}/>
			<button onClick = {this.handleClick}> Click me</button>
			<ol>
			 {this.state.arr.map(item => (
            <li key={item} className= "liClass">{item}<button onClick = {this.removeItem}>Remove</button></li>
          ))}
			</ol>
		</div>)
	}
}
